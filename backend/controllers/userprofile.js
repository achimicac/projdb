/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const userprofile = async (req, res, next) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

      try {
            db.query('SELECT * FROM User WHERE id = ?', [decodedToken.id], (err, result) => {
                  if (err) {
                        return console.log("Can't found this user");
                  }else{
                        //console.log("from userprofile.js: " + req.params.id + " name: " + result[0].username);
                        /*const row = res[0];
                        const picdata = row.pfp;
                        const buf = new Buffer(picdata, "binary");
                        fs.writeFileSync(outputfile, buf);*/
                        res.userdata = result;
                        //res.pic = outputfile
                        next();
                  }
            })
      } catch (error) {
            throw error;
            
      }
}

//module.exports = userprofile;