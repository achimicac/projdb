/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const userprofile = async (req, res, next) => {
      try {
            db.query('SELECT * FROM User WHERE id = ?', [req.params.id], (err, result) => {
                  if (err) {
                        return console.log("Can't found this user");
                  }else{
                        //console.log("from userprofile.js: " + req.params.id + " name: " + result[0].username);
                        res.userdata = result[0];
                        return next();
                  }
            })
      } catch (error) {
            throw error;
            
      }
}

//module.exports = userprofile;