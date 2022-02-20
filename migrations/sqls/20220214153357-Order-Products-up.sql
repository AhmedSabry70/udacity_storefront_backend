CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity integer NOT NULL,
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL
);