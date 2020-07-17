const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const List = require("../models/List");

module.exports = (app) => {
  // gets ALL List from database
  app.get("/get/list", async (req, res) => {
    let lists = await List.find({}, (err) => {
      err ? console.log(err) : null;
    });
    res.send(lists);
  });

  // Create a new List
  app.post("/new/list", (req, res) => {
    let newList = new List({
      title: req.body.title,
      lists: [
        {
          category: "house",
          importance: 4,
          body: "Fix the fire detector",
          notes: "for safety",
        },
      ],
      created: new Date().toUTCString(),
    });

    newList.save((err) => {
      err;
    });

    res.send(newList);
  });

  // add new list item to it's List
  app.post("/new/listItem/:id", (req, res) => {
    const { category, body, importance, notes } = req.body;
    // creates new list item to be updated in the database
    var listUpdate = {
      category,
      body,
      importance,
      notes,
    };

    console.log(listUpdate);
    // finds the selected list and updates the lists array with a new list object
    List.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { lists: listUpdate } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    res.send(listUpdate);
  });

  // Find and edit a list item inside of a list
  app.post("/update/listItem/:id", async (req, res) => {
    let id = req.params.id;

    const { category, body, importance, notes } = req.body;
    const listItemUpdate = {
      category,
      body,
      importance,

      notes,
    };

    // this will require placeholder values of the previous list item values to prevent them from being overwritten with nothing
    await List.updateOne(
      // finds a database entry that matches both the _id and the subdocument collection id passed to the url
      { "lists._id": id },
      // sets the list object using the position identifier ($) to locate the specific
      // array index and updates it with the variable containing the req.body
      { $set: { "lists.$": listItemUpdate } },
      (err, item) => {
        console.log(item);
        res.send(item);
      }
    );
  });
};
