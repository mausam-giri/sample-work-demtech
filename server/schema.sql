CREATE TABLE IF NOT EXISTS campaign (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    templateId TEXT NOT NULL,
    userGroupId TEXT NOT NULL,
    scheduleDate TEXT NOT NULL,
    scheduleTime TEXT NOT NULL
);
