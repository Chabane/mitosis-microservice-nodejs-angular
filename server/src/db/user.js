'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// create a new user called chris
var user = new User({
  name: 'Nirby',
  username: 'Mitosis',
  password: 'password'
});

// call the built-in save method to save to the database
user.save(function (err) {
  if (err) throw err;

  console.log('User saved successfully!');
});
