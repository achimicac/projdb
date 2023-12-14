/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const calendar = async (req, res, next) => {
      const id = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;
      const { name, date, description, tag } = req.body;
      /*if(!username || !pw || !fname || !lname || !email || !phone || !pfp) return res.json({
            status: "error",
            error: "Please enter all your information"
      })*/
      /*db.query('INSERT INTO Appointment SET ?', {petID: name, date: date, procID: description, status: tag }, (error, results) => {
                              if (error) throw error;
                              console.log(" Add event success ");
      })*/
      db.query( 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID WHERE id = ? AND Appointment.date IS NOT NULL', [27], (error, results) => {
            console.log(results);
            res.all_event = results;
            return next();
      })
}
//module.exports = calendar;
//return res.json({status: "error", error: "This username has already been in use"})