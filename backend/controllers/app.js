import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const appoint = (req, res, next) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);
      try {
            db.query("UPDATE * FROM Pet INNER JOIN Appointment ON Pet.petID = Appoinment.petID INNER JOIN Procedural ON Appointment.procID = Procedural.procID where id = ?", [decodedToken.id], (err, result) => {
                  //console.log("from userprofile.js: " + req.params.id + " name: " + result[0].username);
                  res.allevent = result;
                  console.log(result)
                  return next();
            })
      } catch (error) {
            throw error;      
      }
}