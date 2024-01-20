use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

// write your schemas here
#[derive(Serialize, Deserialize, Debug)]
pub struct NewTodoSchema {
    pub task: String,
    pub deadline: NaiveDateTime,
    pub status: String,
    pub pinned: bool,
    pub userid: Uuid,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NewUserSchema {
    pub username: String,
    pub email: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateTodoSchema {
    pub task: Option<String>,
    pub deadline: Option<NaiveDateTime>,
    pub status: Option<String>,
    pub pinned: Option<bool>,
}
