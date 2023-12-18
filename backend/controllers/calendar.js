
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const calendar = (req, res, next) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);
      //const {date} = req.body;
      db.query( 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID WHERE id = ? AND date IS NOT NULL', [27], (error, results) => {
            res.all_event = results;
            return next()
            //console.log(res.all_event)
      })
}
//module.exports = calendar;
//return res.json({status: "error", error: "This username has already been in use"})
//'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID WHERE id = ? AND date LIKE *2023-12-13*'