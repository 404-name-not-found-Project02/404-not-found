var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Appointments.findAll({}).then(function(dbAppointments) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbAppointments
      });
    });
  });

    // Load signup page
    app.get("/signup", function(req, res) {
      db.Appointments.findAll({}).then(function(dbAppointments) {
        res.render("signup", {
          msg: "Welcome!",
          examples: dbAppointments
        });
      });
    });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Clients.findOne({ where: { id: req.params.id } }).then(function(dbClients) {
      res.render("example", {
        example: dbClients
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
