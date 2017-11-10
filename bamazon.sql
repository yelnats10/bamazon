DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  pos int not null,
  item_id integer(10) not NULL,
  product_name VARCHAR(100) NULL,
  department_name varchar(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity integer(10) NULL,
  primary key(pos)
);

SELECT * FROM products;