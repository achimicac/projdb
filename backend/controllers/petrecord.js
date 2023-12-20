/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const petrecord = async (req, res, next) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);
      try {
            db.query("SELECT *, DATE_FORMAT(Appointment.date, '%d %M %Y') appdate  FROM Pet INNER JOIN Appointment ON Appointment.petID = Pet.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.petID = ? AND Appointment.status = 'success'", [req.params.petid], (error, results) => {
                  if (error) {
                      console.error("Error in query:", error);
                      return res.status(500).json({ error: "Database error" });
                  }
                  res.allrec = results;
                  console.log("From Record\n", results);
                  return next();
              });
      } catch (error) {
            throw error;
            
      }
}
