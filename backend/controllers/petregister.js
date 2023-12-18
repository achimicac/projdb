/*const db = require("../routes/db-config.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import multer from 'multer';

export const petregister = async (req, res) => {
      const userRegisteredCookie = req.cookies.userRegistered;
      const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

      const { petName, petType, petDoB, petGender} = req.body;
      const {petPfp} = req.files;
      
      //const userId = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET);
      //const id = userId.id;
      
      try {
      if(!petName || !petType || !petDoB || !petPfp || !petGender) return res.json({
            status: "error",
            error: "Please enter all your pet information"
      })
      else {
            //let date = moment(new Date()).format("YYYY-MM-DD");

            //console.log(samplefile)
              const fileconvert = upload.single(petPfp);
              console.log(fileconvert.filename);
            console.log("From control/petregister: " + " : " + petName + "/n" + petDoB + "/n" + petGender + "/n" + petPfp + "/n" + petType);
            //Check ว่าเคยลงไปยัง พวกstatus กับ error successเชื่อมอยู่กับหน้าregister.jsในpublicนะ
            /*db.query('SELECT * FROM Pet WHERE id = ? and petName = ?', [decodedToken.id, petName], async (err, result) => {
                  //console.log("from db: " + result[0].username + " " + result[0].email);
                  console.log("from db: " + result[0]);
                  if (err) throw err;
                  if (result[0]) {
                        return res.json({status: "error", error: petName + " has already been registered."});
                                          }
                  else {

                        db.query('INSERT INTO Pet SET ?', {petName: petName, petType:petType, petDoB: petDoB, petPfp: petPfp, petGender: petGender, id: decodedToken.id}, (error, results) => {
                              if (error) throw error;
                              res.json({status: "success", success: "your pet is ready!"});

                              db.query('SELECT * FROM Pet where id = ? and petName = ?', [decodedToken.id, petName], (peterr, petresult) => {
                                    console.log(petresult);
                                    if (peterr) {
                                          console.log(peterr);
                                    } else {

                                          db.query('SELECT * FROM Procedural WHERE petType = ? AND procName = ?', [petType, 'core vaccination'], async (error, procresult) => {
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    console.log(procresult);
                                                    if (procresult && procresult.length > 0) {
                                                        for (let i = 0; i < procresult.length; i++) {
                                                            db.query('INSERT INTO Appointment SET ?', { petID: petresult[0].petID, procID: procresult[i].procID, status: 'info' });
                                                        }
                                                    }
                                                }
                                            });
                                    }
                              })
                        })
                  }
            })*/}
      } catch (error) {
            console.log(error);
      }
}
//module.exports = petregister;