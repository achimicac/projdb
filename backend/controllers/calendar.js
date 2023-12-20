import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const calendar = async (req, res, next) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);
      
      db.query("SELECT *, DATE_FORMAT(Appointment.date, '%d %M %Y') appdate  FROM Pet INNER JOIN Appointment ON Appointment.petID = Pet.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.id = ? AND Appointment.date = CURRENT_DATE()", [decodedToken.id], (error, results) => {
            if (error) {
                console.error("Error in query:", error);
                return res.status(500).json({ error: "Database error" });
            }
            res.all_event = results;
            console.log("From Calendar\n", results);
            return next();
        });
}
//module.exports = calendar;
//return res.json({status: "error", error: "This username has already been in use"})
//'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID WHERE id = ? AND date LIKE *2023-12-13*'