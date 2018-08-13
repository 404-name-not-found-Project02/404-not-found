var db = require("../models");
var firebase = require('firebase');
var googleStorage = require('@google-cloud/storage');
var Multer = require('multer');
var moment = require("moment");

var storage = googleStorage({
  projectId: "name-not-found",
  keyFilename: "AIzaSyCpvCQBKnLUqbjDild7Tl9f_o1aVG9bZEs"
});

var bucket = storage.bucket("https://console.cloud.google.com/storage/browser/name-not-found.appspot.com?project=name-not-found");

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
      attributes: ['id', 'title', 'start', 'end']
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
  app.delete("/api/appointments/:id", function (req, res) {
    db.Appointments.destroy({ where: { id: req.params.id } }).then(function (dbAppointments) {
      // res.json(dbAppointments);
    });
  });

  app.post("/api/upload", multer.single("photo"), (req, res) => {
    console.log("Upload Image");

    let file = req.file;
    if (file) {
      uploadImageToStorage(file).then((success) => {
        res.status(200).send({
          status: "success"
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  });



  const uploadImageToStorage = (file) => {
    let prom = new Promise((resolve, reject) => {
      if (!file) {
        reject("No image file");
      }
      let newFileName = `${file.originalname}_${Date.now()}`;

      let fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      blobStream.on("error", (error) => {
        console.log(error);
        reject("Something is wrong! Unable to upload at the moment.");
      });

      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
        resolve(url);
      });

      blobStream.end(file.buffer);
    });
    return prom;
  }
};

