import express from "express";
import {db} from './routes/db-config.js';
import cors from "cors";
const app = express();
import path from "path";
const port = process.env.PORT || 3009;
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {router} from '../backend/routes/pages.js';
import {router as auth} from '../backend/controllers/auth.js'

/*app.use("/js", express.static(path.join(__dirname + "/public/js")));
app.use("/css", express.static(path.join(__dirname + "/public/css")));*/
/*app.set("view engine", "ejs");
app.set("views", "./views");*/
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //Can read the json file that get from user register.html
app.use(cors(
      {
            origin: ["http://localhost:3000"],
            methods: ["POST", "GET", "PUT", "DELETE"],
            credentials: true
      }
));
db.connect((err) => {
      if (err) throw err;
      console.log("db connected");
});

app.use("/", router);
app.use("/api", auth);

app.listen(port);