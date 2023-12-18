/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const petEdit = async (req, res, next) => {

      const { petName, petType,bd, petPfp, petGender} = req.body;

      try {
            db.query('UPDATE Pet SET petName=?, petType=?, petDoB=?, petPfp=?, petGender=? WHERE petID=?', [petName, petType,bd, petPfp, petGender, req.params.petid], (err, result) => {
                  if (err) {
                        console.log("Can't Edit pet inform" + petName , petDoB);
                        console.log(err);
                        res.json({error: "success", error: "Edit " + petName + " is not success"});
                  }else{
                        console.log("Edit pet inform success");
                        res.json({status: "success", success: "Edit Success"});
                  }
            })
      } catch (error) {
            console.log(error);
            
      }
}

//module.exports = petEdit;