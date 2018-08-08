CREATE DATABASE client_and_me;

USE DATABASE client_and_me;

CREATE TABLE providers(
    id int NOT NULL AUTO_INCREMENT,
    last_name varchar(100) NOT NULL,
    first_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    brand_name varchar(100) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE clients(
    id int NOT NULL AUTO_INCREMENT,
    last_name varchar(100) NOT NULL,
    first_name varchar(100) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE appointments(
    id int NOT NULL AUTO_INCREMENT,
    provider_id int NOT NULL,
    client_id int NOT NULL,
    date timestamp NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE supplies(
    id int NOT NULL AUTO_INCREMENT,
    appointment_id int NOT NULL,
    appointment_date date NOT NULL, 
    provider_id int NOT NULL,
    client_id int NOT NULL,

    PRIMARY KEY (id)   
);

CREATE TABLE notes(
    id int NOT NULL AUTO_INCREMENT,
    appointment_id int,
    provider_id int NOT NULL,
    client_id int NOT NULL,
    note varchar(256),

    PRIMARY KEY (id)
);
