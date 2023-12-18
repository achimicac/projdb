import { db } from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const allPet = (req, res, next) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);
      console.log(decodedToken.id)
      db.query("SELECT *, TIMESTAMPDIFF(YEAR, petDoB, CURDATE()) AS years, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7 / 4) AS months, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7) AS weeks, TIMESTAMPDIFF(DAY, petDoB, CURDATE()) AS days FROM Pet WHERE id = ?", [decodedToken.id], (err, result) => {
            if (err) {
            console.log("Can't find this user");
            return res.status(404).send("Can't find this user");
            } else {
            res.petData = result;
            return next();
            }
      })
}

//const bufferBase64 = Buffer.from(result[0].petPfp, 'binary').toString('base64');
//res.petPic = bufferBase64;
