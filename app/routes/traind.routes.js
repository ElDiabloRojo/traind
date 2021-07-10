module.exports = app => {
  const traind = require("../controllers/traind.controller.js");

  var router = require("express").Router();

  // Create a new Traind
  router.post("/", traind.create);

  // Retrieve all Traind
  router.get("/", traind.findAll);

  // Retrieve all published Traind
  router.get("/published", traind.findAllPublished);

  // Retrieve a single Traind with id
  router.get("/:id", traind.findOne);

  // Update a Traind with id
  router.put("/:id", traind.update);

  // Delete a Traind with id
  router.delete("/:id", traind.delete);

  // Create a new Traind
  router.delete("/", traind.deleteAll);

  app.use('/api/traind', router);
};