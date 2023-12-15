/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const allPet = (req, res, next) => {
      const storedCookies = req.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=').map(c => c.trim());
            acc[key] = value;
            return acc;
        }, {});
      const userRegisteredToken = storedCookies.userRegistered;
      const id = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;
      console.log(id);
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
      }
}

//module.exports = allPet;

/*SELECT *, TIMESTAMPDIFF(YEAR, petDoB, CURDATE()) AS years, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7 / 4) AS months, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7) AS weeks, TIMESTAMPDIFF(DAY, petDoB, CURDATE()) AS days FROM Pet*/