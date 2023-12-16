import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
const saltRounds = 10;

class Information {
      getInform(){};
      checkAccount(){};
      addProfile(){};
      editProfile(){};
}

class User extends Information {

      #db
      #userID
      constructor(db, userID){
            super();
            this.#db = db
            this.#userID = userID
      }

      async executeQuery(sql, params) {
            return new Promise((resolve, reject) => {
                  this.#db.query(sql, params, (err, results) => {
                        if (err) {
                        reject(err);
                        } else {
                        resolve(results);
                        }
                  });
            });
      }

      async getInform(userID) {
            const sql = 'SELECT * FROM User WHERE id = ?';
            try {
                const userInform = await this.executeQuery(sql, [userID]);
                return userInform[0];
            } catch (error) {
                console.log("Can't find this user");
                throw error;
            }
      }
    

      async checkAccount(username, email) {
            const sql = 'SELECT * FROM User WHERE username = ? OR email = ?'
            const account = await this.executeQuery(sql, [username, email]);
            if (typeof account[0] !== 'undefined') {
                  if (account[0].username === username) {
                        return {status: "error", error: "This username has already been in use"}
                  } 
                  else if (account[0].email === email){
                        return {status: "error", error: "This email has already been in use"}
                  }
            } else {
                  return false
            }
      }

      async addProfile(username, pw, fname, lname, email, phone, pfp){
            const sql = 'INSERT INTO User SET ?'
            const user_data = {username: username, pw: pw, fname: fname, lname: lname, email: email, phone: phone, pfp: pfp}
            await this.#db.query(sql, user_data)
      }

      async editProfile(id, username, fname, lname, email, phone){
            const sql = 'UPDATE User SET username=?, fname=?, lname=?, email=?, phone=? WHERE id=?'
            const user_data = [username, fname, lname, email, phone, pfp, id]
            await this.#db.query(sql, user_data, (editErr, editStatus) => {
                  if (editUserErr) {
                        return {status: "error", error: "Edit Unsuccess"}
                  } else {
                        return {status: "success", success: "Edit Success"}
                  }
            })
      }

      async getAllEvent(date) {
            const sql = 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID INNER JOIN Procedural ON Appointment.procID = Procedural.procID WHERE id = ? AND date = ?'
            const allEvent = await this.executeQuery(sql, [this.#userID, date])
            return allEvent[0];
      }

      async editEventDate(appID, date) {
            const sql = 'UPDATE Appointment SET date = ? WHERE appID = ?'
            await this.#db.query(sql, [date, appID])
      }

      async editEventStatus(appID, status){
            const sql = 'UPDATE Appointment SET status = ? WHERE appID = ?'
            await this.#db.query(sql, [date, appID])
      }

      async getArticle() {
            const sql = 'SELECT DISTINCT Articles.* FROM User INNER JOIN Pet ON User.id = Pet.id INNER JOIN Articles ON Pet.petType = Articles.petType WHERE User.id = ?'
            const allArticle = await this.executeQuery(sql, [this.#userID]);
            return allArticle;
      }
}

class Pet extends Information {
      #db
      #userID

      constructor(db, userID){
            super();
            this.#db = db
            this.#userID = userID
      }

      async executeQuery(sql, params) {
            return new Promise((resolve, reject) => {
                  this.#db.query(sql, params, (err, results) => {
                        if (err) {
                        reject(err);
                        } else {
                        resolve(results);
                        }
                  });
            });
      }

      async getInform(petID) {
            const sql = 'SELECT * FROM Pet WHERE petID = ?';
            try {
                const allPet = await this.executeQuery(sql, [this.#userID]);
                console.log(allPet[0]);
                return allPet[0];
            } catch (error) {
                console.log("Can't find your pet");
                throw error;
            }
      }

      async checkAccount(petName) {
            const sql = 'SELECT * FROM Pet WHERE petName = ? AND id = ?'
            const account = await this.executeQuery(sql, [petName, this.#userID]);
            if (typeof account[0] !== 'undefined') {
                  return {status: error, error: `${petName} is your pet!`}
            } else {
                  return false
            }
      }

      async addProfile(petName, petType, petDoB, petGender){
            const sql = 'INSERT INTO Pet SET ?'
            const pet_data = {petName: petName, petType: petType, petDoB: petDoB, petGender: petGender, phone: phone, pfp: null, id: this.#userID}
            await this.#db.query(sql, pet_data)
      }

      async editProfile(petName, petType, petDoB, petGender){
            const sql = 'UPDATE Pet SET ?'
            const pet_data = {petName: petName, petType: petType, petDoB: petDoB, petGender: petGender, phone: phone, pfp: null, id: this.#userID}
            await this.#db.query(sql, user_data, (editUserErr, editStatus) => {
                  if (editUserErr) {
                        return {status: "error", error: "Edit Unsuccess"}
                  } else {
                        return {status: "success", success: "Edit Success"}
                  }
            })
      }

      async deleteProfile(petID){
            const sql = 'DELETE Pet, Appointment FROM Pet, Appointment WHERE (Pet.petID = Appointment.petID) AND (Pet.petID = ?)'
            await this.#db.query(sql, [petID], (editUserErr, editStatus) => {
                  if (editUserErr) {
                        return {status: "error", error: "Edit Unsuccess"}
                  } else {
                        return {status: "success", success: "Edit Success"}
                  }
            })
      }

      async checkPetType(petID){
            const sql = 'SELECT petType FROM Pet WHERE petID = ?'
            const petType = await this.executeQuery(sql, [petID]);
            return petType[0];
      }

      getVaccine(){};
      getRecord(){};
}

class Cat extends Pet {
      constructor(db, userID){
            super(db, userID);
      }

      async getCatVaccine(){
            const sql = 'SELECT * FROM Procedural WHERE petType = ? AND procName = ?'
            const dogVaccine = await super.method(executeQuery(sql, [petID, "Cat", "core vaccination"]));
            return dogVaccine;
      }

      
      async setVaccine(petID, procID){
            const sql = 'INSERT INTO Appointment SET ?'
            const vaccine = { petID: petID, procID: procID, status: 'info' }
            await db.query(executeQuery(sql, vaccine));
      }

      async getVaccine(petID){
            const sql = 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.petID = ? AND Procedural.procName = ?'
            const allVaccine = await super.method(executeQuery(sql, [petID, "core vaccination"]));
            return allVaccine;
      };

      async getRecord(petID){
            const sql = 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.petID = ?'
            const allRecord = await super.method(executeQuery(sql, [petID]));
            return allRecord;
      };
}

class Dog extends Pet {
      constructor(db, userID){
            super(db, userID);
      }

      async getDogVaccine(){
            const sql = 'SELECT * FROM Procedural WHERE petType = ? AND procName = ?'
            const dogVaccine = await super.method(executeQuery(sql, [petID, "Dog", "core vaccination"]));
            return dogVaccine;
      }

      
      async setVaccine(petID, procID){
            const sql = 'INSERT INTO Appointment SET ?'
            const vaccine = { petID: petID, procID: procID, status: 'info' }
            await db.query(executeQuery(sql, vaccine));
      }

      async getVaccine(petID){
            const sql = 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.petID = ? AND Procedural.procName = ?'
            const allVaccine = await super.method(executeQuery(sql, [petID, "core vaccination"]));
            return allVaccine;
      };

      async getRecord(petID){
            const sql = 'SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.petID = ?'
            const allRecord = await super.method(executeQuery(sql, [petID]));
            return allRecord;
      };
}


const id = 27;

const user = new User(db, id);
const pet = new Pet(db, id);
const dog = new Dog(db, id);
const cat = new Cat(db, id);

export const register = async (req, res) => {
      const { username, pw, fname, lname, email, phone, pfp } = req.body;
      if(!username || !pw || !fname || !lname || !email || !phone){
            return res.json({ status: "error", error: "Please enter all your information"})
      }
      else {
            const checkAccount = await user.checkAccount(username, email);
            if (checkAccount === false) {
                  bcrypt.hash(pw, saltRounds, function (err, hash){
                        createuser.addUser(username, pw, fname, lname, email, phone)
                        return res.json({status: "success", success: "User has been registered"})
                  })
            } else {
                  return res.json(checkAccount)
            }
      }
}

export const petregister = async (req, res) => {
      const { petName, petType, petDoB, petPfp, petGender} = req.body;
      if(!petName || !petType || !petDoB || !petPfp || !petGender){
            return res.json({ status: "error", error: "Please enter all your pet information" })}
      else {
            const checkAccount = await pet.checkAccount(petName);
            if(checkAccount === false) {
                  pet.addProfile(petName, petType, petDoB, petGender)
                  db.query('SELECT * FROM Pet where id = ? and petName = ?', [id, petName], (peterr, petresult) => {
                        if (petType == "Cat") {
                              const cat_vac = cat.getCatVaccine()
                              cat.setVaccine(petresult[0].petID, cat_vac[0].procID)
                        } else {
                              
                        }
                  })
                  return res.json({status: "success", success: "User has been registered"})
            } else {
                  return res.json(checkAccount)
            }
}}

export const login = async (req, res) => {
      try {
        const { username, pw } = req.body;
        if (!username || !pw){
          return res.json({ status: "error",
            error: "Please enter your email and your password",
          })}
        else {
          db.query('SELECT * FROM User where username = ?',[username], async (err, results) => {
              if (err) throw err;
              if (!results || results.length === 0) {
                return res.json({
                  status: "error",
                  error: "Account not found or incorrect password",
                });
              } else {
                const storedHashedPassword = results[0].pw;
                bcrypt.compare(pw, storedHashedPassword, (error, isMatch) => {
                  if (error) {
                    throw error;
                  }
    
                  if (isMatch) {
                    const id = results[0].id;
                    const token = jwt.sign(
                      { id: id, username: results[0].username },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: "30m", // or use process.env.JWT_EXPIRES
                      }
                    );
                    const cookieOptions = {
                      expiresIn: new Date(
                        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                      ),
                      httpOnly: true,
                    };
    
                    res.cookie("userRegistered", token);
                    console.log("cookie" + req.cookies.userRegistered);
                    res.status(200).json({ status: "success", success: "User logged in", token });
                    //res.json({ status: "success", success: "User logged in" });
                  } else {
                    return res.json({
                      status: "error",
                      error: "Account not found or incorrect password",
                    });
                  }
                });
              }
            }
          );
        }
      } catch (err) {
        console.log(err);
        res.json({ status: "error", error: "Something went wrong" });
      }
};

export const appoint = (req, res, next) => {
      db.query("SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appoinment.petID INNER JOIN Procedural ON Appointment.procID = Procedural.procID where id = ?", [27], (err, result) => {
            console.log(result)
            return next();
      })
}

export const calendar = async (req, res, next) => {
      const {date} = req.body;
      const event = user.getAllEvent(date);
            res.all_event = event;
            return next();
}

export const allPet = (req, res, next) => {
        db.query("SELECT *, TIMESTAMPDIFF(YEAR, petDoB, CURDATE()) AS years, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7 / 4) AS months, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7) AS weeks, TIMESTAMPDIFF(DAY, petDoB, CURDATE()) AS days FROM Pet WHERE id = ?", [id], (err, result) => {
          if (err) {
            return res.send("Can't find this user");
          } else {
            const bufferBase64 = Buffer.from(result[0].petPfp, 'binary').toString('base64');
    
            res.petData = result;
            res.petPic = bufferBase64;
            
            return next();
          }
        });
};

export const petdelete = async (req, res, next) => {
      const statusdel = pet.deleteProfile(req.params.petid)
}

export const petEdit = async (req, res, next) => {

      const { petName, petType, petDoB, petPfp, petGender} = req.body;

            pet.editProfile( petName, petType, petDoB, petPfp, petGender)
            db.query('UPDATE Pet SET petName=?, petType=?, petDoB=?, petPfp=?, petGender=? WHERE petID=?', [petName, petType, petDoB, petPfp, petGender, req.params.petid], (err, result) => {
                  if (err) {
                        console.log("Can't Edit pet inform" + petName , petDoB);
                        console.log(err);
                  }else{
                        console.log("Edit pet inform success");
                        res.json({status: "success", success: "User has been registered"});
                  }
            })
}

export const petprofile = async (req, res, next) => {
      const petdata = pet.getInform(req.params.id);
      res.petinfo = petdata
}

export const userEdit = async (req, res, next) => {
      const { username, fname, lname, email, phone } = req.body;
      res.json(user.editProfile(id, username, fname, lname, email, phone))
}

export const article = (req, res, next) => {
      const allarti = user.getAllEvent(27)
      return next();
}

export const petvaccine = async (req, res, next) => {
            db.query('SELECT * FROM Pet INNER JOIN Appointment ON Pet.petID = Appointment.petID INNER JOIN Procedural ON Procedural.procID = Appointment.procID INNER JOIN Vaccine ON Vaccine.vacID = Procedural.vacID WHERE Pet.petID = ? AND Procedural.procName = ?',
                  [req.params.petid, "core vaccination"], (err, result) => {
                        res.core_vac = result;
                        next();
                  }
            )
}

export const userprofile = async (req, res, next) => {
      return res.userdata = user.getInform(id)
}

export const theirrecord = async (req, res, next) => {
      return res.record = cat.getRecord(27)
}