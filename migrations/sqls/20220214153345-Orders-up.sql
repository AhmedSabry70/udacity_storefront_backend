CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id uuid REFERENCES users(id) NOT NULL
);




