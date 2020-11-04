// This file contains logic for counting

// Import data model
const Users = require("../model");

// Make handlers available from router.js
module.exports = {

  // Handler for request to load data...
  load: async (req, data) => {
    try {
      // ...finds user...
      const doc = await Users.findById(req.user._id);
      // ...and responds
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to let in visitors...
  in: async (req, data) => {
    try {
      // ...finds user...
      const doc = await Users.findById(req.user._id);
      // ...add one to letIn...
      let count = doc.letIn;
      count++;
      doc.letIn = count;
      // ...save count...
      await doc.save();
      // ...and responds
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to let out visitors...
  out: async (req, data) => {
    try {
      // ...find user...
      const doc = await Users.findById(req.user._id);
      if ((doc.letIn-doc.letOut)>0) {
        // ...add one to letOut...
        let count = doc.letOut;
        count++;
        doc.letOut = count;
      }
      // ...save count...
      await doc.save();
      // ...and responds
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to reset visitor counter...
  reset: async (req, data) => {
    try {
      // ...find user...
      const doc = await Users.findById(req.user._id);
      // ...reset counts...
      doc.letIn = 0;
      doc.letOut = 0;
      // ...save count...
      await doc.save();
      // ...and return object
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
