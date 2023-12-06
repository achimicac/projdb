/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';


export const add_event = async (req, res) => {
      const id = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;
      const { name, date, description, tag } = req.body;
      /*if(!username || !pw || !fname || !lname || !email || !phone || !pfp) return res.json({
            status: "error",
            error: "Please enter all your information"
      })*/
      db.query('INSERT INTO Appointment SET ?', {petID: name, date: date, procID: description, status: tag }, (error, results) => {
            if (error) throw error;
            console.log(" Add event success ");
      })
}
//module.exports = add_event;