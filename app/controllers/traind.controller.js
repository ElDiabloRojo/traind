const db = require("../models");
const Traind = db.traind;

// Create and Save a new Traind
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Traind
  const traind = new Traind({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Traind in the database
  traind
    .save(traind)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Traind."
      });
    });
};

// Retrieve all Traind from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Traind.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Traind with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Traind.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};
// Update a Traind by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Traind.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Traind with id=${id}. Maybe Traind was not found!`
        });
      } else res.send({ message: "Traind was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Traind with id=" + id
      });
    });
};

// Delete a Traind with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Traind.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Traind with id=${id}. Maybe Traind was not found!`
        });
      } else {
        res.send({
          message: "Traind was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Traind with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Traind.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Traind were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all traind."
      });
    });
};

// Find all published Traind
exports.findAllPublished = (req, res) => {
  Traind.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving traind."
      });
    });
};