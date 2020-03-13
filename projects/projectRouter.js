const express = require("express");

const projects = require("../data/helpers/projectModel.js");


const router = express.Router();

router.get("/", (req, res) => {
projects.get()
.then(projects => {
    res.status(200).json(projects)
    })
.catch(err => {
    res.status(500).json({message: err})
    })
})

router.get("/:id", validateIfProjectExists, (req, res) => {
    projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

router.get("/:id/actions", (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(projaction => {
        res.status(200).json(projaction)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

router.post("/", (req, res) => {
    projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

router.put("/:id", (req, res) => {
    projects.update(req.params.id, req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

router.delete("/:id", (req, res) => {
    projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

function validateIfProjectExists (req, res, next) {
    projects.get(req.params.id)
      .then(project => {
        if (project) {
          next();
        } else {
          res.status(404).json({message: "No such project exists"});
        }
      });
  }


module.exports = router; 