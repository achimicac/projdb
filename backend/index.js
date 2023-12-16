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
'use strict';
import nodemailer from 'nodemailer';
console.log(__dirname);

app.use("/js", express.static(path.join(__dirname + "/public/js")));
app.use("/css", express.static(path.join(__dirname + "/public/css")));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
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

async function main(email) {
      // สร้างออปเจ็ค transporter เพื่อกำหนดการเชื่อมต่อ SMTP และใช้ตอนส่งเมล
      let transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: { // ข้อมูลการเข้าสู่ระบบ
         user: 'atchima.nate@mail.kmutt.ac.th', // email user ของเรา
         pass: 'Autatthis1234!' // email password
       }
      });
      // เริ่มทำการส่งอีเมล
      let info = await transporter.sendMail({
      from: '"สมุดบันทึกสัตว์เลี้ยงของคุณ🐶" <atchima.nate@mail.kmutt.ac.th>', // อีเมลผู้ส่ง
      to: email, // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
      subject: 'Hello!', // หัวข้ออีเมล
      text: 'พรุ่งนี้สัตว์เลี้ยงของคุณมีนัดนะ ไม่ได้ลืมใช่่มั้ย?', // plain text body
      html: '<b>Hello world?</b>' // html body
      });
      // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
      console.log('Message sent: %s', info.messageId);
}
db.query('SELECT DISTINCT email, date, CURRENT_DATE() day, DATEDIFF(CURRENT_DATE, date) datedif  FROM Appointment INNER JOIN Pet ON Appointment.petID = Pet.petID INNER JOIN User ON Pet.id = User.id where User.id = ? ORDER BY date DESC', [27], (err, result) => {
      if((result[0].date < result[0].day) && (result[0].datedif == 1)) {
            main(result[0].email).catch(console.error);
      }
})

app.listen(port);