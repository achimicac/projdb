/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const calendar = async (req, res, next) => {
      const {date} = req.body;
      db.query( 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID WHERE id = ? AND date LIKE *2023-12-13*', [27, date], (error, results) => {
            res.all_event = results;
            return next();
      })
}
//module.exports = calendar;
//return res.json({status: "error", error: "This username has already been in use"})