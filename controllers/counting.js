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
      let date = new Date(Date.now());
      if (doc.que.length > 1) {
        date = doc.que[1].date;
      }
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut,
        que: doc.que[doc.que.length - 1].number,
        call: doc.que[0].number,
        queTime: date.getTime()
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
      // ...add one to letOut...
      let count = doc.letOut;
      count++;
      doc.letOut = count;
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
      doc.que = [];
      let newDate = new Date(Date.now());
      doc.que.push({
        date: newDate,
        number: 0
      });
      // ...save count...
      await doc.save();
      // ...and return object
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut,
        que: doc.que[doc.que.length - 1].number,
        call: doc.que[0].number,
        queTime: 0
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to put visitor in que...
  que: async (req, data) => {
    try {
      // ...find user...
      const doc = await Users.findById(req.user._id);
      let newDate = new Date(Date.now());
      let number = doc.que[doc.que.length - 1].number;
      number++;
      doc.que.push({
        date: newDate,
        number: number
      });
      // ...save...
      await doc.save();
      // ...and return object
      data.json({
        que: number,
        queTime: doc.que[1].date.getTime()
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to call visitor from que...
  call: async (req, data) => {
    try {
      // ...finds user...
      const doc = await Users.findById(req.user._id);
      if (doc.que.length > 1) {
        // ...removes the first element from the que array (if present) and saves...
        doc.que.shift();
        doc.save();
      }
      // ...set current time if no que is present...
      let date = new Date(Date.now());
      if (doc.que.length > 1) {
        // ...or set time using the second element in the que...
        date = doc.que[1].date;
      }
      // ...and responds
      data.json({
        que: doc.que[doc.que.length - 1].number,
        call: doc.que[0].number,
        queTime: date.getTime()
      });
    } catch (error) {
      console.log(error);
    }
  }
}
