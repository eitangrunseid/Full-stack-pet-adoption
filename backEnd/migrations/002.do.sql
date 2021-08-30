CREATE TABLE IF NOT EXISTS pets (
pet_id int NOT NULL AUTO_INCREMENT,
type varchar(30) not null,
name  varchar(30) NOT NULL,
color varchar(30) not null,
breed varchar(30) not null,
status varchar(30) not null,
weight varchar(30) not null,
height varchar(30) not null,
pet_pic varchar(1000) not null,
diet varchar(30) not null,
allergies varchar(30) not null,
user_id int,
PRIMARY KEY (pet_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);