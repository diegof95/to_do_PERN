

# create database to_do_pern;

create table to_do(
  to_do_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  is_done BOOLEAN NOT NULL default 'false'
);