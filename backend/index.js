//Manage Every part
/*const express = require("express");
var bodyParser = require('body-parser');
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3009;*/
import express from "express";
import {db} from './routes/db-config.js';
import cors from "cors";
const app = express();
import path from "path";
const port = process.env.PORT || 3009;
import cookie from "cookie-parser";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);


app.use("/js", express.static(path.join(__dirname + "/public/js")));
app.use("/css", express.static(path.join(__dirname + "/public/css")));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //Can read the json file that get from user register.html
app.use(cors());
db.connect((err) => {
      if (err) throw err;
      console.log("db connected");
});

import {router} from '../backend/routes/pages.js';
import {router as auth} from './controllers/auth.js';
app.use("/", router);
app.use("/api", auth);

app.listen(port);