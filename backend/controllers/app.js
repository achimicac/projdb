import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const appoint = (req, res, next) => {
      //const id = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;
      //pet,app,procedural
      try {
            db.query("SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appoinment.petID INNER JOIN Procedural ON Appointment.procID = Procedural.procID where id = ?", [27], (err, result) => {
                  //console.log("from userprofile.js: " + req.params.id + " name: " + result[0].username);
                  res.allevent = result;
                  console.log(result)
                  return next();
            })
      } catch (error) {
            throw error;      
      }
}