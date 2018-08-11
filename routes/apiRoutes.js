var db = require("../models");

module.exports = function (app) {
  // Get all appointments
  app.get("/api/appointments/:id", function (req, res) {
    db.Appointments.findAll({ where: { ProviderId: req.params.id } }).then(function (dbAppointments) {
      res.json(dbAppointments);
      return (dbAppointments);
    });
  });
  // Get all clients
  app.get("/api/clients", function (req, res) {
    db.Appointments.findAll({
      // where: {firebase_id} and just display the clients column
    }).then(function (dbClients) {
      res.json(dbClients);
    });
  });

  // Create a new appointment
  app.post("/api/appointments", function (req, res) {
    db.Appointments.create(req.body).then(function (dbAppointments) {
    });
  });

  app.post("/api/providers", function (req, res) {
    db.Providers.create(req.body).then(function (dbProviders) {

      res.redirect();
    });
  });
  // Create a new client
  // app.post("/api/clients", function (req, res) {
  //   db.Clients.create(req.body).then(function (dbClients) {
  //     res.json(dbClients);
  //   });
  // });

  // Delete an appointment by id
  app.delete("/api/appointments/:id", function (req, res) {
    db.Appointments.destroy({ where: { id: req.params.id } }).then(function (dbAppointments) {
      res.json(dbAppointments);
    });
  });

  // Delete a client by id
  // app.delete("/api/clients/:id", function (req, res) {
  //   db.Clients.destroy({ where: { id: req.params.id } }).then(function (dbClients) {
  //     res.json(dbClients);
  //   });
  // });
};

