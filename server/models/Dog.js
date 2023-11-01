// require mongoose, a popular MongoDB library for nodejs
// Mongoose connects in the app.js file. Once mongoose is connected,
// it stays connected across all of the files in this project
// As long as you import this after you have connected,
// then mongoose will give you the active DB connection which is what we want
const mongoose = require('mongoose');

// variable to hold our Model
// A Model is our data structure to handle data. This can be an object, JSON, XML or anything else.
// A mongoDB model is a Mongo database structure with the API attached
// That is, a model has built-in functions for its data structure like find, findOne, etc.
// Usually you will retrieve data from the database through the Model object
let DogModel = {};

/* While Mongo is a schema-less database, meaning we can just store arbitrary objects in it,
   Mongoose does implement a schema system. If you wanted to just store arbitrary objects you
   could just use the mongoDB NodeJS driver: https://www.npmjs.com/package/mongodb

   Information about the differences between MongoDB Driver and Mongoose found here:
   https://www.mongodb.com/developer/article/mongoose-versus-nodejs-driver/

   The schema enforces a semi-rigid format on our data so that it is more of a "known quantity".
   This puts us somewhere between the very rigid SQL format and the very loose Mongo format.

   To create the schema we give it an object. Each top level key (like name, bedsOwned,
   and createdDate) defines a variable our objects can have. We then use individual objects
   to define the features and parameters of each one of those variables.
*/
const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  breed: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

});
// Create the dog model based on the schema. You provide it with a custom discriminator
// (the name of the object type. Can be anything)
// and the schema to make a model from.
// Look at the model variable definition above for more details.
DogModel = mongoose.model('Dog', DogSchema);

// We only want to export the dog model, so we can overwrite the entire exports object.
module.exports = DogModel;
