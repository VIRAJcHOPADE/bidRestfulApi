const sql = require("./db.js");

// constructor
const bid = function(bid) {
  this.title = bid.title;
  this.description = bid.description;
  this.published = bid.published;
};

bid.create = (newbid, result) => {
  sql.query("INSERT INTO bids SET ?", newbid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created bid: ", { id: res.insertId, ...newbid });
    result(null, { id: res.insertId, ...newbid });
  });
};

bid.findById = (id, result) => {
  sql.query(`SELECT * FROM bids WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found bid: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found bid with the id
    result({ kind: "not_found" }, null);
  });
};

bid.getAll = (title, result) => {
  let query = "SELECT * FROM bids";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bids: ", res);
    result(null, res);
  });
};

bid.getAllPublished = result => {
  sql.query("SELECT * FROM bids WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bids: ", res);
    result(null, res);
  });
};

bid.updateById = (id, bid, result) => {
  sql.query(
    "UPDATE bids SET title = ?, description = ?, published = ? WHERE id = ?",
    [bid.title, bid.description, bid.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found bid with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bid: ", { id: id, ...bid });
      result(null, { id: id, ...bid });
    }
  );
};

bid.remove = (id, result) => {
  sql.query("DELETE FROM bids WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found bid with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bid with id: ", id);
    result(null, res);
  });
};

bid.removeAll = result => {
  sql.query("DELETE FROM bids", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} bids`);
    result(null, res);
  });
};

module.exports = bid;
