use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, FromRow, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct TodoModel {
    pub id: Uuid,
    pub task: String,
    pub deadline: NaiveDateTime,
    pub status: String,
    pub pinned: Option<bool>,
    pub userid: Option<Uuid>,
}

#[derive(Debug, FromRow, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct UserModel {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub created_at: NaiveDateTime,
}
