var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Appointments.findAll({}).then(function(dbAppointments) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });

    // Load signup page
    app.get("/signup", function(req, res) {
      db.Appointments.findAll({}).then(function(dbAppointments) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
      });
    });

    // load dashboard page
    app.get("/dashboard", function(req, res) {
      db.Clients.findAll({}).then(function(dbClients) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
      });
    });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Clients.findOne({ where: { id: req.params.id } }).then(function(dbClients) {
      res.sendFile(path.join(__dirname, "../public/404.html"));
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/404.html"));
  });
};
