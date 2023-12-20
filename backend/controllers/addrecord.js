
const saltRounds = 10;
import {db} from '../routes/db-config.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
      const { procName, date, petType, forGender } = req.body;
      
      if(!procName || !date || !petType) return res.json({
            status: "error",
            error: "Please enter all your information"
      })
      else{
            db.query("SELECT * FROM Procedural WHERE procName = ?", [procName], async (procerr, procres) => {
                  if (procres) {
                        db.query("INSERT INTO Appointment SET", {petID: req.params.petid, procID: procres[0].procID, date: date, status: 'success'})
                  } else {
                        db.query("INSERT INTO Procedural SET", {procName: procName, petType: petType, forGender: forGender}, (errproc, resproc)=>{
                              db.query("SELECT procID FROM Procedural WHERE procName = ?", [resproc[0].procID], (finderr, resfind)=>{
                                    db.query("INSERT INTO Appointment SET", {petID: req.params.petid, procID: resfind[0].procID, date: date, status: 'success'}, (apperr, appres)=>{
                                          res.json({status: 'success', success: 'Already Add Appintment for your pet'})
                                    })
                              })
                        })
                        
                  }
            })
      }
}