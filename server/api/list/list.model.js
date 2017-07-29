'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('../card/card.model');
const listSchema = new mongoose.Schema({
  // Lesson 2: Implement the List Model
  title: {
    type: String,
    require: true
  },
  position: {
    type: Number
  },
  cards:[{
    ref: 'Card',
    type: Schema.Types.ObjectId
  }]

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('List', listSchema);
