use std::sync::Arc;

use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde_json::json;

use crate::{
    model::{TodoModel, UserModel},
    schema::{NewTodoSchema, NewUserSchema, UpdateTodoSchema},
    AppState,
};

pub async fn hello_world_handler() -> impl IntoResponse {
    const MESSAGE: &str = "Hello, World!";

    let json_response = json!({
        "message": MESSAGE,
    });

    (StatusCode::OK, Json(json_response))
}

pub async fn get_all_users(
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(UserModel, "SELECT * FROM users ORDER by id")
        .fetch_all(&data.db)
        .await;

    if query_result.is_err() {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": "failed to fetch all users!"
        });
        return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
    }

    let users = query_result.unwrap();

    let json_response = serde_json::json!({
        "status": "success",
        "results": users.len(),
        "users": users
    });
    Ok(Json(json_response))
}

pub async fn create_user(
    State(data): State<Arc<AppState>>,
    Json(body): Json<NewUserSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let new_id = uuid::Uuid::new_v4();
    let query_result = sqlx::query_as!(
        UserModel,
        "INSERT INTO users (id, username, email) VALUES ($1, $2, $3) RETURNING *",
        new_id,
        body.username.to_string(),
        body.email.to_string()
    )
    .fetch_one(&data.db)
    .await;

    match query_result {
        Ok(user) => {
            let user_response = json!({"status": "success", "data": json!({"user": user})});
            return Ok((StatusCode::CREATED, Json(user_response)));
        }
        Err(error) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"status": "error","message": format!("{:?}", error)})),
        )),
    }
}

pub async fn get_user(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(UserModel, "SELECT * FROM users WHERE id = $1", id)
        .fetch_one(&data.db)
        .await;

    match query_result {
        Ok(user) => {
            let ok_response =
                serde_json::json!({"status": "success", "data": serde_json::json!({"user": user})});

            return Ok(Json(ok_response));
        }
        Err(_) => {
            let error_response = serde_json::json!({
                "status": "fail",
                "message": format!("User #{} not found!", id)
            });
            return Err((StatusCode::NOT_FOUND, Json(error_response)));
        }
    }
}

pub async fn delete_user(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let rows_affected = sqlx::query!("DELETE FROM users WHERE id = $1", id)
        .execute(&data.db)
        .await
        .unwrap()
        .rows_affected();

    if rows_affected == 0 {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": format!("User #{} not found", id)
        });
        return Err((StatusCode::NOT_FOUND, Json(error_response)));
    }

    let json_response = serde_json::json!({
        "status": "success",
        "message": format!("User #{} has been deleted!", id)
    });

    Ok(Json(json_response))
}

pub async fn get_all_todos(
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(TodoModel, "SELECT * FROM todos ORDER BY id",)
        .fetch_all(&data.db)
        .await;

    if query_result.is_err() {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": "failed to fetch todos"
        });
        return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
    }

    let todos = query_result.unwrap();

    let json_response = serde_json::json!({
        "status": "success",
        "results": todos.len(),
        "notes": todos,
    });

    Ok(Json(json_response))
}

pub async fn create_new_todo(
    State(data): State<Arc<AppState>>,
    Json(body): Json<NewTodoSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let new_id = uuid::Uuid::new_v4();
    let query_result = sqlx::query_as!(
        TodoModel,
        "INSERT INTO todos (id, task, deadline, status, pinned, userid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        new_id,
        body.task.to_string(),
        body.deadline,
        body.status.to_string(),
        body.pinned,
        body.userid
    )
    .fetch_one(&data.db)
    .await;

    match query_result {
        Ok(todo) => {
            let response = json!({"status": "success", "data": json!({"todo": todo})});

            Ok((StatusCode::CREATED, Json(response)))
        }
        Err(error) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"status": "error","message": format!("{:?}", error)})),
        )),
    }
}

pub async fn get_todo(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
) -> impl IntoResponse {
    let query_result = sqlx::query_as!(TodoModel, "SELECT * FROM todos WHERE id = $1", id)
        .fetch_one(&data.db)
        .await;

    match query_result {
        Ok(todo) => {
            let ok_response = serde_json::json!({"status": "success", "data": serde_json::json!({
                "todo": todo
            })});
            return Ok(Json(ok_response));
        }
        Err(_) => {
            let error_response = serde_json::json!({
                "status": "fail",
                "message": format!("Todo with ID: {} not found", id)
            });
            return Err((StatusCode::NOT_FOUND, Json(error_response)));
        }
    }
}

pub async fn edit_todo(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
    Json(body): Json<UpdateTodoSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(TodoModel, "SELECT * FROM todos WHERE id = $1", id)
        .fetch_one(&data.db)
        .await;

    if query_result.is_err() {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": format!("Todo #{} not found", id)
        });
        return Err((StatusCode::NOT_FOUND, Json(error_response)));
    }

    let note = query_result.unwrap();

    let query_result = sqlx::query_as!(
        TodoModel,
        "UPDATE todos SET task = $1, deadline = $2, status = $3, pinned = $4 WHERE id = $5 RETURNING *",
        body.task,
        body.deadline,
        body.status,
        body.pinned,
        id,
    )
    .fetch_one(&data.db)
    .await;

    match query_result {
        Ok(todo) => {
            let ok_response = serde_json::json!({"status": "success", "data": serde_json::json!({
                "todo": todo
            })});
            return Ok(Json(ok_response));
        }
        Err(error) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"status": "error", "message": format!("{:?}", error)})),
            ));
        }
    }
}

pub async fn delete_todo(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let rows_affected = sqlx::query!("DELETE FROM todos WHERE id = $1", id)
        .execute(&data.db)
        .await
        .unwrap()
        .rows_affected();

    if rows_affected == 0 {
        let error_response = serde_json::json!({
            "status": "fail",
             "message": format!("Todo with ID: {} not found", id)
        });
        return Err((StatusCode::NOT_FOUND, Json(error_response)));
    }

    let json_response = serde_json::json!({
        "status": "success",
        "message": format!("todo #{} has been deleted!", id)
    });

    Ok(Json(json_response))
}
