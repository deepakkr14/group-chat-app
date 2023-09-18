const path = require("path");

const express = require("express");

const userController = require("./user-controller");

const router = express.Router();
const auth=require('./auth')

// router.get("/getAll", userController.getEverything);

router.post("/users/singup",userController.postaddNew);
router.post("/users/login",userController.postlogin);
router.post("/users/message",auth,userController.postMessage);
router.get("/users/viewmessage",auth,userController.getMessage);

// router.get("/delete/:id", userController.postDelete);


module.exports = router;
