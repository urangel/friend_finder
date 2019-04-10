const express = require('express');
const router = express.Router();

router.use(function timeLog (req, res, next){
    console.log("Time :" + Date.now());
    next();
})

router.get("/", function(req, res){
    let path = __dirname.substr(0, (__dirname.length - 8)) + "/public/home.html";
    res.sendFile(path);
});

router.get("/survey", function(req, res){
    let path = __dirname.substr(0, (__dirname.length - 8)) + "/public/survey.html";
    res.sendFile(path);
});

router.get("*", function(req, res){
    let path = __dirname.substr(0, (__dirname.length - 8)) + "/public/home.html";
    res.sendFile(path);
});

module.exports = router;