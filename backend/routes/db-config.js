//Manage DB
/*const sql = require("mysql");
const dotenv = require("dotenv").config();*/
import sql from "mysql"
import dotenv from 'dotenv';
const dotenvconst = dotenv.config();
export const db = sql.createConnection({
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DB_PORT,
});

 //export db and access it anywhere