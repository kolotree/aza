CREATE TABLE IF NOT EXISTS user(id int primary key, email varchar(255), name varchar(255), password varchar(255), role varchar(255), surname varchar(255));
MERGE INTO user KEY (id) VALUES (1, 'admin', 'admin', '$2a$10$GCJmGFauELtnqC4C6GvdJeSNdmyQ0ez5/1FVJvV5aeS4YA7cMmIsi', '0', 'admin');
