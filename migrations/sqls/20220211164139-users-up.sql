CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(64) NOT NULL
);


--  INSERT INTO users ( user_name, first_name, last_name, email ,password) VALUES 
--  ('udacity', 'full','stack', 'admin@store.com','uadmin'),
--  ('user123', 'user123','user123', 'user123@store.com','password123'),
--  ('user1232', 'user1232','user1232', 'user1232@store.com','password123'),
--  ('user1233', 'user1233','user1233', 'user1233@store.com','password123');
