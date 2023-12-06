/*const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
//Check the login
//Have next because this is gonna be middleweight of a page
const loggedIn = (req, res, next) => {
      if (!req.cookies.userRegistered) return next();
      //Try catch bz we dealing with a snychronous function we should mostly have the track catch block
      try {
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
            db.query('SELECT * FROM User WHERE id = ?', [decoded.id], (err, result) => {
                  if (err) return next();
                  req.user = result[0];
                  return next();
            })
      } catch (err) {
            if (err) return next();
      }
}
module.exports = loggedIn;*/

/*const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';
//Check the login
//Have next because this is gonna be middleแว of a page
export const loggedIn = (req, res, next) => {
      if (!req.user){
      //Try catch bz we dealing with a snychronous function we should mostly have the track catch block
            try {
                  const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
                  db.query('SELECT * FROM User WHERE id = ?', [decoded.id], (err, result) => {
                        console.log("from loggedIn.js: " + result[0].id);
                        if (err) return next();
                        req.user = result[0];
                        return next()
                  })
            } catch (err) {
                  return next();
            }
      }
}
//module.exports = loggedIn;