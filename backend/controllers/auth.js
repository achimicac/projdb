/*const express = require("express");
const register = require("./register");
const login = require("./login");
const userprofile = require("./userprofile");
const petregister = require("./petregister");
const allPet = require("./home");
const petprofile = require("./petprofile");
const petedit = require("./petEdit");
const useredit = require("./userEdit");
const petdelete = require("./petDelete");
const petvaccine = require("./petvaccine");
const calendar = require("./calendar");
const addEventCalen = require("./addEventCalen");*/
//const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
import express from 'express';
import {register} from './register.js';
import {login} from './login.js';
import {userprofile} from './userprofile.js';
import {petregister} from './petregister.js';
import {allPet} from './home.js';
import {petprofile} from './petprofile.js';
import {petEdit} from './petedit.js';
import {userEdit} from './useredit.js';
//import {petdelete} from './petdelete.js';
import {petvaccine} from './petvaccine.js';
import {calendar} from './calendar.js';
import { appoint } from './app.js';
export const router = express.Router();

//router.post("/register", register);
/*router.post("/login", login);
router.post("/userprofile/:id", userprofile)
router.post("/petregister", petregister);
router.post("/home", allPet);
router.post("/petprofile/:petid", petprofile, petvaccine);
router.put("/petprofile/:petid/edit", petEdit);
router.post("/userprofile/:id/edit", userEdit);
router.post("/calendar", add_event);
router.put("/appointment/:appid", appoint)*/

//module.exports = router;