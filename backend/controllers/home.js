import { db } from '../routes/db-config.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import zlib from 'zlib';
import stream from 'stream';

export const allPet = (req, res, next) => {
<<<<<<< HEAD
      /*
      const storedCookies = req.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=').map(c => c.trim());
            acc[key] = value;
            return acc;
        }, {});
      const userRegisteredToken = storedCookies.userRegistered;
      const id = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;
      console.log(id);
      */
      console.log(jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET))
      //const id = req.params.id;
      try {
            db.query("SELECT *, TIMESTAMPDIFF(YEAR, petDoB, CURDATE()) AS years, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7 / 4) AS months, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7) AS weeks, TIMESTAMPDIFF(DAY, petDoB, CURDATE()) AS days FROM Pet WHERE id = ?", [id], (err, result) => {
                  if (err) {
                        return console.log("Can't found this user");
                  }else{
                        //console.log("from userprofile.js: " + req.params.id + " name: " + result[0].username);
                        res.all_pet = result;
                        return next();
                  }
            })
      } catch (error) {
            throw error;      
=======
  try {
    db.query("SELECT *, TIMESTAMPDIFF(YEAR, petDoB, CURDATE()) AS years, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7 / 4) AS months, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7) AS weeks, TIMESTAMPDIFF(DAY, petDoB, CURDATE()) AS days FROM Pet WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.log("Can't find this user");
        return res.status(404).send("Can't find this user");
      } else {
        const bufferBase64 = Buffer.from(result[0].petPfp, 'binary').toString('base64');

        res.petData = result;
        res.petPic = bufferBase64;
        
        return next();
>>>>>>> b85461c (OOP Ver)
      }
    });
  } catch (error) {
    throw error;
  }
};
