import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

export const article = (req, res, next) => {
      //const id = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;

      try {
            db.query("SELECT DISTINCT Articles.* FROM User INNER JOIN Pet ON User.id = Pet.id INNER JOIN Articles ON Pet.petType = Articles.petType WHERE User.id = ?", [27], (err, result) => {
                  //console.log("from userprofile.js: " + req.params.id + " name: " + result[0].username);
                  res.all_article = result;
                  return next();
            })
      } catch (error) {
            throw error;      
      }
}