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

router.get("/:id", validateIfActionExists, (req, res) => {
    actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

router.post("/", validateIfProjectExists, (req, res) => {
    actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })  
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: err });
    });
})

router.put('/:id', (req, res) => {
   actions.update(req.params.id, req.body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: err });
      });
  });

  router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: err });
      });
  });

  function validateIfProjectExists (req, res, next) {
    projects.get(req.body.project_id)
      .then(project => {
        if (project) {
          next();
        } else {
          res.status(404).json({message: "No such project exists"});
        }
      });
  }
  
  function validateIfActionExists (req, res, next) {
    actions.get(req.params.id)
      .then(action => {
        if (action) {
          next();
        } else {
          res.status(404).json({message: "No such action exists"});
        }
      });
  }



module.exports = router; 