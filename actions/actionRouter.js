const express = require("express");
const actions = require("../data/helpers/actionModel.js");
const projects = require("../data/helpers/projectModel.js");


const router = express.Router();

router.get("/", (req, res) => {
actions.get()
.then(action => {
    res.status(200).json(action)
})
.catch(err => {
    res.status(500).json({message: err})
})


})



module.exports = router; 