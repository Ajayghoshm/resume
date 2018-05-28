const mongoose = require("mongoose")

const  Schema= mongoose.Schema;

//schema

const IdeaSchema= new Schema({
  title:{
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  }
});

mongoose.model("Ideas",IdeaSchema);