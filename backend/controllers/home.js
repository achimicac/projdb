import { db } from '../routes/db-config.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import zlib from 'zlib';
import stream from 'stream';

export const allPet = (req, res, next) => {
  try {
    db.query("SELECT *, TIMESTAMPDIFF(YEAR, petDoB, CURDATE()) AS years, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7 / 4) AS months, FLOOR(TIMESTAMPDIFF(DAY, petDoB, CURDATE()) / 7) AS weeks, TIMESTAMPDIFF(DAY, petDoB, CURDATE()) AS days FROM Pet WHERE id = ?", [27], (err, result) => {
      if (err) {
        console.log("Can't find this user");
        return res.status(404).send("Can't find this user");
      } else {
        const bufferBase64 = Buffer.from(result[0].petPfp, 'binary').toString('base64');

        res.petData = result;
        res.petPic = bufferBase64;
        
        return next();
      }
    });
  } catch (error) {
    throw error;
  }
};
