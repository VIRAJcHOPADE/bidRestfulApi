module.exports = app => {
  const bids = require("../controllers/bid.controller.js");

  var router = require("express").Router();

  // Create a new bid
  router.post("/", bids.create);

  // Retrieve all bids
  router.get("/", bids.findAll);

  // Retrieve all published bids
  router.get("/published", bids.findAllPublished);

  // Retrieve a single bid with id
  router.get("/:id", bids.findOne);

  // Update a bid with id
  router.put("/:id", bids.update);

  // Delete a bid with id
  router.delete("/:id", bids.delete);

  // Delete all bids
  router.delete("/", bids.deleteAll);

  app.use('/api/bids', router);
};
