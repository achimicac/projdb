/*const db = require("../routes/db-config.js");
const jwt = require("jsonwebtoken");*/
import {db} from '../routes/db-config.js';
import jwt from 'jsonwebtoken';

//ว่าจะมาทำcheck เพิ่มว่าถ้าไม่ใช่เจ้าของsccountให้มันrenderหน้าอื่น

export const petEdit = async (req, res, next) => {

      /*try{  
            form.addEventListener("submit", () => {
            const petedit = {
                  petName: petName.value,
                  petType: petType.value,
                  petDoB: petDoB.value,
                  petPfp: petPfp.value,
                  petGender: petGender.value
            };
            //const id = JSON.parse(document.getElementById("userid").text);
            //Can directly put them here
            fetch(`/api/petprofile/${req.params.petid}/edit`, {
                  method: "POST",
                  body: JSON.stringify(petedit), //Body to be json that string you'll find in the string file text before sending and send the register
                  headers: {"Content-Type": "application/json"}
            })
            .then ( res => res.json())
            //Get and managing data
            .then(data => {
                  if (data.status == "error") {
                        success.style.display = "none"
                        error.style.display = "block"
                        error.innerText = data.error
                  }else {
                        error.style.display = "none"
                        success.style.display = "block"
                        success.innerText = data.success
                  }
            });
      
      })} catch (err) { console.log(err) }*/

      const { petName, petType, petDoB, petPfp, petGender} = req.body;

      try {
            db.query('UPDATE Pet SET petName=?, petType=?, petDoB=?, petPfp=?, petGender=? WHERE petID=?', [petName, petType, petDoB, petPfp, petGender, req.params.petid], (err, result) => {
                  if (err) {
                        console.log("Can't Edit pet inform" + petName , petDoB);
                        console.log(err);
                  }else{
                        console.log("Edit pet inform success");
                        res.json({status: "success", success: "User has been registered"});
                  }
            })
      } catch (error) {
            console.log(error);
            
      }
}

//module.exports = petEdit;