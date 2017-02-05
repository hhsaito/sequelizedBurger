// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({
      where: {
        devoured: false
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/devoured", function(req, res) {
    db.Burger.findAll({
      where: {
        devoured: true
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    console.log('This :', req.body);
    db.Burger.create({
      burger_name: req.body.burger_name, 
      devoured: req.body.devoured
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating burgers
  app.put("/api/burgers", function(req, res) {
    console.log('This :', req.body);
    db.Burger.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

};