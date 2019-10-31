const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
      type: String
  },
  age:{
      type: Number,
      default:null
  }
});

const Players = mongoose.model("Players", PlayerSchema)

module.exports = Players;