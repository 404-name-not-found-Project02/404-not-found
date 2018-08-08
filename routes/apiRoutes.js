var db = require("../models");

module.exports = function(app) {
  // Get all appointments
  app.get("/api/appointments", function(req, res) {
    db.Appointments.findAll({}).then(function(dbAppointments) {
      res.json(dbAppointments);
    });
  });
  // Get all clients
  app.get("/api/clients", function(req, res) {
    db.Clients.findAll({}).then(function(dbClients) {
      res.json(dbClients);
    });
  });

  // Create a new appointment
  app.post("/api/appointments", function(req, res) {
    db.Appointments.create(req.body).then(function(dbAppointments) {
      res.json(dbAppointments);
    });
  });

   // Create a new client
   app.post("/api/clients", function(req, res) {
    db.Clients.create(req.body).then(function(dbClients) {
      res.json(dbClients);
    });
  });

  // Delete an appointment by id
  app.delete("/api/appointments/:id", function(req, res) {
    db.Appointments.destroy({ where: { id: req.params.id } }).then(function(dbAppointments) {
      res.json(dbAppointments);
    });
  });

  // Delete a client by id
  app.delete("/api/clients/:id", function(req, res) {
    db.Clients.destroy({ where: { id: req.params.id } }).then(function(dbClients) {
      res.json(dbClients);
    });
  });
};

// will create the rest, but thinking they might want to be in their own .js files to keep things in order
// create a new note

// update a note

// delete a note

// show note by client id

// create a new supply

// update a supply

// delete a supply

// show supply by client id
