/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const petprofile = async (req, res, next) => {
      try {
            db.query("SELECT *,  YEAR(CURRENT_TIMESTAMP) - YEAR(petDoB) - (RIGHT(CURRENT_TIMESTAMP, 5) < RIGHT(petDoB, 5)) as age FROM Pet WHERE petID = ?", [req.params.petid], (err, result) => {
                  if (err) {
                        return console.log("Can't found this user");
                  }else{
                        //console.log("from petprofile.js: " + req.params.petid + " name: " + result[0].petName);
                        res.pet_inform = result[0];
                        return next();
                  }
            })
      } catch (error) {
            throw error;
            
      }
}

//module.exports = petprofile;