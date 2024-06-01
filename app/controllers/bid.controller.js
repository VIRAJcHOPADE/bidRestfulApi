const bid = require("../models/bid.model.js");

// Create and Save a new bid
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a bid
  const bid = new bid({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save bid in the database
  bid.create(bid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the bid."
      });
    else res.send(data);
  });
};

// Retrieve all bids from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  bid.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bids."
      });
    else res.send(data);
  });
};

// Find a single bid by Id
exports.findOne = (req, res) => {
  bid.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found bid with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving bid with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published bids
exports.findAllPublished = (req, res) => {
  bid.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bids."
      });
    else res.send(data);
  });
};

// Update a bid identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  bid.updateById(
    req.params.id,
    new bid(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found bid with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating bid with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a bid with the specified id in the request
exports.delete = (req, res) => {
  bid.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found bid with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete bid with id " + req.params.id
        });
      }
    } else res.send({ message: `bid was deleted successfully!` });
  });
};

// Delete all bids from the database.
exports.deleteAll = (req, res) => {
  bid.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bids."
      });
    else res.send({ message: `All bids were deleted successfully!` });
  });
};
