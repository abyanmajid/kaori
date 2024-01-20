use std::sync::Arc;

use axum::{
    routing::{delete, get, patch, post, put},
    Router,
};

use crate::{
    handler::{
        create_new_todo, create_user, delete_todo, delete_user, edit_todo, get_all_todos,
        get_all_users, get_todo, get_user, hello_world_handler,
    },
    AppState,
};

pub fn create_router(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route("/", get(hello_world_handler))
        .route("/todos", get(get_all_todos))
        .route("/todos/new", post(create_new_todo))
        .route(
            "/todos/:id",
            get(get_todo).patch(edit_todo).delete(delete_todo),
        )
        .route("/users", get(get_all_users))
        .route("/users/new", post(create_user))
        .route("/users/:id", get(get_user).delete(delete_user))
        .with_state(app_state)
}
