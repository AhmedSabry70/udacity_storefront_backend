CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price decimal NOT NULL,
    category VArCHAR(100) NOT NULL
);


  INSERT INTO products ( name, price, category) VALUES 
  ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95,'mens_clothes'),
  ('Mens Casual Premium Slim Fit T-Shirts',22.3,'mens_clothes'),
  ('John Hardy Womens Legends Naga Gold & Silver Dragon Station Chain Bracelet',695, 'jewelery'),
  ('Solid Gold Petite Micropave', 168, 'jewelery'),
  ('WD 2TB Elements Portable External Hard Drive - USB 3.0 ', 64, 'electronics'),
  ('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109, 'electronics'),
  ('BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats', 56.99, 'womens_clothes'),
  ('Lock and Love Womens Removable Hooded Faux Leather Moto Biker Jacket', 29.95, 'womens_clothes');

