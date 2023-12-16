/*const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const userprofile = require("../controllers/userprofile");
const allPet = require("../controllers/home");
const petprofile = require("../controllers/petprofile");
const petdelete = require("../controllers/petDelete");
const petvaccine = require("../controllers/petvaccine");
const calendar = require("../controllers/calendar");
const { json } = require("body-parser");
export const router = express.Router();*/
import express from "express";
import {loggedIn} from '../controllers/loggedIn.js';
import {logout} from '../controllers/logout.js';
/*import {userprofile} from '../controllers/userprofile.js';
import {allPet} from '../controllers/home.js';
import {petprofile} from '../controllers/petprofile.js';
import {petdelete} from '../controllers/petDelete.js';
import {petvaccine} from '../controllers/petvaccine.js';
import {calendar} from '../controllers/calendar.js';
import {article} from '../controllers/articles.js';
import {appoint} from '../controllers/app.js';
import json from "body-parser";
import { login } from "../controllers/login.js";
import { petregister } from "../controllers/petregister.js";
import { petEdit } from "../controllers/petedit.js";*/

import {register, login, petregister, petEdit, petdelete, calendar, article, allPet, petprofile, petvaccine, appoint, userprofile} from "../controllers/AllMethod.js";
export const router = express.Router();

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
    let day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

router.get("/", loggedIn, (req, res) => {
    if (req.user) {
        res.render("index", {status: "loggedIn", name: req.user.username, id: req.user.id});
        console.log("From pages.js: " + req.user.username);
    } else {
        res.render("index", {status: "no", name: "nothing"});
        console.log('Ihere');
    }
});

/*router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public" });
});*/

/*router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public/" });
});*/
router.post("/login", login);
router.post("/register", register);

/*router.get("/userprofile/:id", userprofile, (req, res, next) => {
    try {
        res.render("userprofile", {id: res.userdata.id, username: res.userdata.username});
        next();
    } catch (error) {
        console.log(error);
    }
});*/

router.get("/petregister", petregister);
router.post("/petregister", petregister);

/*router.get("/home", allPet, (req, res, next) => {
    res.render("home", {all_pet: res.all_pet});
    next();
});*/

/*router.get("/petprofile/:petid/edit", petprofile, (req, res, next) => {
    res.render("petEdit", {pet_inform: res.pet_inform, pet_DoB: formatDate(res.pet_inform.petDoB)});
    next();
    const data = res.pet_inform;
    return res.json(data);
    next();
});*/

router.put("/petprofile/:petid/edit", petEdit, (req, res)=> {
    res.redirect("/petprofile/:petid")
})

/*router.get("/userprofile/:id/edit", userprofile, (req, res, next) => {
    res.render("userEdit", {user_inform: res.userdata});
    next();
});*/

router.get("/petprofile/:petid/delete", petdelete,(req, res) => {
    res.redirect('/home');
})

router.get("/all_events", calendar, (req, res) => {
    // Logic to retrieve all events
    // For example, let's say you have an array of events
    const allEvents = res.all_event;
  
    res.json({ allEvents }); // Sending the events as JSON
  });
  

/*router.get("/calendar", (req, res) => {
    res.sendFile("calendar.html", {root: "./public/"}, (request, resp) => {
        resp.send({all_event: JSON.stringify(res.all_event)})
    });
    res.sendFile("calendar.html", {root: "./public/", })
    //next();
})*/

/*router.get("/userprofile/:id/petregister", (req, res, next) => {
    console.log(req.originalUrl);
    res.send({id: req.params.id});
    next();
})*/

/*router.get("/userprofile/:id/petregister", (req, res, next) => {
    res.sendFile("petregister.html", {root: "./public"});
    console.log("From routes/pages.js/petregister");
})*/

/*app.get('/user/:uid/photos/:file', function(req, res){
    var uid = req.params.uid
      , file = req.params.file;
  
    req.user.mayViewFilesFrom(uid, function(yes){
      if (yes) {
        res.sendFile('/uploads/' + uid + '/' + file);
      } else {
        res.send(403, 'Sorry! you cant see that.');
      }
    });
});*/


/////////////////////////////////////////////////////////Edit with Frontend

/*router.get("/register", register, (req, res, next) => {
    return res.status
})*/

router.post("/register", register, (req, res) => {
    res.redirect('/login')
});

router.get("/register", register, (req, res, next) => {
    return res.status
})

router.get("/articles", article, (req, res, next) => {
    const data = res.all_article;
    return res.json(data);
})

router.get("/home", allPet, (req, res, next)=>{
    const data = res.petData;
    return res.json(data);
    
});

router.get("/records", appoint, (req, res, next) => {
    const data = res
} )

router.get("/petprofile/:petid", petprofile, (req, res) => {
    const data = res.petinfo;
    return res.json(data);
})

router.get("/petprofile/:petid/vaccine", petvaccine, (req, res, next) => {
    const data = res.core_vac;
    return res.json(data);
})

router.get("/calendar", calendar,  (res, req) => {
    const data = res.all_event;
    return res.json(data)                                                                                              
})

router.put("/appointment/:appid", appoint)

router.get("/profile", userprofile, (req, res) => {
    const data = res.userdata
    return res.json(data);
})



router.get("/logout", logout);

//module.exports = router;