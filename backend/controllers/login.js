/*const jwt = require("jsonwebtoken");
const db = require("../routes/db-config.js");
const bcrypt = require("bcrypt");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { username, pw } = req.body;
    console.log("From login"+ username + " " + pw);
    if (!username || !pw)
      return res.json({
        status: "error",
        error: "Please enter your email and your password",
      });
    else {
      db.query(
        'SELECT * FROM User where username = ?',
        [username],
        async (err, results) => {
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

<<<<<<< HEAD
                res.cookie("userRegistered", token, cookieOptions);
                console.log(req.cookies)
=======
                res.cookie("userRegistered", token);
                console.log("cookie" + req.cookies.userRegistered);
>>>>>>> b85461c (OOP Ver)
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

//module.exports = login;
