CREATE TABLE IF NOT EXISTS users (
user_id int NOT NULL AUTO_INCREMENT,
first_name  varchar(30) NOT NULL,
last_name varchar(30) not null,
email varchar(30) not null,
password varchar(500) not null,
phone int not null,
is_admin varchar(30),
PRIMARY KEY (user_id)
 );