var db = require("../models");
var firebase = require('firebase');
var googleStorage = require('@google-cloud/storage');
var Multer = require('multer');
var moment = require("moment");

var storage = googleStorage({
  projectId: "name-not-found",
  keyFilename: "404-name-not-found-c00295caa4a3.json"
});

var bucket = storage.bucket("name-not-found.appspot.com");

var multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

module.exports = function (app) {
  // Get all appointments
  app.get("/api/appointments/:id", function (req, res) {
    db.Appointments.findAll({
      where: { provider_id: req.params.id },
      attributes: ['id', 'title', 'start', 'end']
    }).then(function (dbAppointments) {
      res.json(dbAppointments);
    });
  });

  app.get("/api/appointments/table/:id", function (req, res) {
    db.Appointments.findAll({
      where: {
        provider_id: req.params.id,
        start: { $gte: moment().subtract(1, 'days').toDate() }
      },
      attributes: ['id', 'title', 'start', 'end', 'note'],
      order: [
        ['start', 'ASC'],
      ],
    }).then(function (dbAppointments) {
      res.json(dbAppointments);
    });
  });

  // Create a new appointment
  app.post("/api/appointments", function (req, res) {
    db.Appointments.create(req.body).then(function (dbAppointments) {
      console.log(req.body)
      res.json(dbAppointments);
    });
  });

  app.post("/api/appointments/:id", function (req, res) {
    db.Appointments.update({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      note: req.body.note
    },
      { where: { id: req.params.id } }).then((dbAppointments) => { res.json(dbAppointments); })
  });

  app.post("/api/providers", function (req, res) {
    db.Providers.create(req.body).then(function (dbProviders) {
      // res.redirect();
      // res.json(dbAppointments);
    });
  });
  app.get("/api/providers/:id", function (req, res) {
    db.Providers.findAll({
      where: {
        firebase_id: req.params.id,
      },
    }).then(function (dbProviders) {
      res.json(dbProviders);
    });
  });
  // Create a new client
  // app.post("/api/clients", function (req, res) {
  //   db.Clients.create(req.body).then(function (dbClients) {
  //     res.json(dbClients);
  //   });
  // });

  // Delete an appointment by id
  app.delete("/api/appointments/delete/:id", function (req, res) {
    db.Appointments.destroy({ where: { id: req.params.id } }).then(function (dbAppointments) {
      res.json(dbAppointments);
    });
  });


  app.post("/api/upload/:id", multer.single("photo"), (req, res) => {
    console.log("Upload Image");

    let file = req.file;
    if (!file) {
      reject("No image file");
    }
    let newFileName = `ProfileIMG_${req.params.id}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    }).on("error", (error) => {
      console.log(error);
      res.status(500).send({
        status: "Error"
      });
    }).on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      res.status(200).send({
        status: "success"
      });
    }).end(file.buffer);
  });

  app.get("/api/upload/:id", function (req, res) {
    let fileName = `ProfileIMG_${req.params.id}`;

    let file = bucket.file(fileName);

    file.exists().then(function (data) {
      var doesExist = false;
      if (data[0])
        doesExist = true;

      res.status(200).json(data[0]);
    });
  });
};

