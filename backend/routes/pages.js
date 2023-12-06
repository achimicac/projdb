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
import {userprofile} from '../controllers/userprofile.js';
import {allPet} from '../controllers/home.js';
import {petprofile} from '../controllers/petprofile.js';
import {petdelete} from '../controllers/petDelete.js';
import {petvaccine} from '../controllers/petvaccine.js';
import {calendar} from '../controllers/calendar.js';
import json from "body-parser";
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

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public" });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public/" });
});

router.get("/userprofile/:id", userprofile, (req, res, next) => {
    try {
        res.render("userprofile", {id: res.userdata.id, username: res.userdata.username});
        next();
    } catch (error) {
        console.log(error);
    }
});

router.get("/petregister", (req, res) => {
    res.sendFile("petregister.html", {root: "./public/"});
    console.log("From routes/pages.js/petregister--sendFile");
    //res.send("/home");
});

/*router.get("/home", allPet, (req, res, next) => {
    res.render("home", {all_pet: res.all_pet});
    next();
});*/
router.get("/home/:id", allPet, (req, res, next)=>{
    const data = res.all_pet;
    return res.json(data);
});

router.get("/petprofile/:petid", petprofile, petvaccine, (req, res, next) => {
    res.render("petprofile", {pet_inform: res.pet_inform, pet_DoB: formatDate(res.pet_inform.petDoB), core_vac: res.core_vac});
    next();
})

router.get("/petprofile/:petid/edit", petprofile, (req, res, next) => {
    res.render("petEdit", {pet_inform: res.pet_inform, pet_DoB: formatDate(res.pet_inform.petDoB)});
    next();
});

router.get("/userprofile/:id/edit", userprofile, (req, res, next) => {
    res.render("userEdit", {user_inform: res.userdata});
    next();
});

router.get("/petprofile/:petid/delete", petdelete,(req, res) => {
    res.redirect('/home');
})

router.get("/all_events", calendar, (req, res) => {
    // Logic to retrieve all events
    // For example, let's say you have an array of events
    const allEvents = res.all_event;
  
    res.json({ allEvents }); // Sending the events as JSON
  });
  

router.get("/calendar", (req, res) => {
    /*res.sendFile("calendar.html", {root: "./public/"}, (request, resp) => {
        resp.send({all_event: JSON.stringify(res.all_event)})
    });*/
    res.sendFile("calendar.html", {root: "./public/", })
    //next();
})

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


router.get("/logout", logout);

//module.exports = router;