# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- ✔ Index: `'products/' [GET]` 
- ✔ Show: `'products/:id' [GET]`
- ✔ Create [token required]: `'products/' [POST] (token)`
- ✔️ [ADDED] update [token required]: `'products/:id' [PATCH] (token)`
- ✔️ [ADDED] delete [token required]: `'products/:id'  [DELETE]`
- ✔ [OPTIONAL] Top 5 most popular products `'/dashboard/five-most-expensive'  [GET]`
- ✔ [OPTIONAL] Products by category (args: product category)`'products/category/:category' [GET]`

#### Users
- ✔️ Index [token required]: `'users/' [GET] (token)`
- ✔️ Show [token required]: `'users/:id' [GET] (token)`
- ✔️ Create N[token required]: `'users/' [POST] (token)`
- ✔️ [ADDED] update N[token required]: `'users/:id' [PATCH] (token)`
- ✔️ [ADDED] delete N[token required]: `'users/:id' [DELETE] (token)`

###### Orders
- ✔️ Index [token required]: `'orders/' [GET] (token)`
- ✔️ Show [token required]: `'orders/:id' [GET] (token)`
- ✔️ Create N[token required]: `'orders/' [POST] (token)`
- ✔️ [ADDED] Update order [token required]: `'orders/:id' [patch] (token)`
- ✔️ [ADDED] Delete [token required]: `'orders/:id [DELETE] (token)`

#### Orders
- ✔️ Current Order by user (args: userID id): `orders/current/:userId [GET]`[token required]
- ✔️ [OPTIONAL] Completed Orders by user [token required]: `'orders/completed/:userId' [GET] (token)`
- ✔️ Add Product [CART] : `/orders/:id/addcart [POST] (token required)`

### Dashboard
- ✔ users with orders:` /dashboard/users-with-orders [GET] (token)`
- ✔ products-in-orders: `/dashboard/products-in-orders [GET] (token)`
- ✔ [OPTIONAL] Top 5 most popular products `'/dashboard/five-most-expensive'  [GET]`

## Data Shapes
#### Product
- ✔ id uuid 
- ✔ name
- ✔ price
- ✔ [OPTIONAL] category

```
Table: Product 
(id:uuid [default] uuid_generate_v4() [primary key],
name:varchar(255)[not null], 
price:numeric[not null],
category:varchar(100))
```

#### User
- ✔ id ==> uuid
- ✔ user_name
- ✔ firs_tName
- ✔ last_Name
- ✔ email
- ✔ password

```
Table: User 
(id:id:uuid [default] uuid_generate_v4() [primary key],
user_name:varchar(64)[not null],
first_name:varchar(64)[not null],
last_name:varchar(64)[not null],
email:varchar(150)[not null],
password:varchar(64)[not null])
```

#### Orders
- ✔ id  ==> uuid
- ✔ status of order (active or complete)
- ✔ user_id

```
Table: Order 
(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id uuid REFERENCES users(id) NOT NULL)
 
```
##  Order-Products 
- ✔ id  ==> uuid
- ✔ quantity of each product in the order
- ✔ id of order_products
- ✔ id of each product in the order
```
Table: Order_product 
(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity integer NOT NULL,
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL)



## Database Schema
```
-- users
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(64) NOT NULL
);

-- products
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price decimal NOT NULL,
    category VArCHAR(100) NOT NULL
);


  INSERT INTO products ( name, price, category) VALUES 
  ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95,'mens_clothing'),
  ('Mens Casual Premium Slim Fit T-Shirts',22.3,'mens_clothing'),
  ('John Hardy Womens Legends Naga Gold & Silver Dragon Station Chain Bracelet',695, 'jewelery'),
  ('Solid Gold Petite Micropave', 168, 'jewelery'),
  ('WD 2TB Elements Portable External Hard Drive - USB 3.0 ', 64, 'electronics'),
  ('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109, 'electronics'),
  ('BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats', 56.99, 'womens_clothing'),
  ('Lock and Love Womens Removable Hooded Faux Leather Moto Biker Jacket', 29.95, 'womens_clothing');


-- orders
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id uuid REFERENCES users(id) NOT NULL
);



-- order_products
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity integer NOT NULL,
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL
);
```

```
