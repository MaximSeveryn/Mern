const mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      description: {
       type: String,
       required: true
     },
    assignee: {
      type: String,
      required: true
    },
    actionPlan:{
      type: String,
      default:'Do the first things first'
    },
    startDate: {
      type:Date,
      required: true
    },
    endDate: {
       type: Date,
       required: true
    },
    status: {
     type: String,
     default:'ToDo'
    },
    retrospective: {
      type: String,
      default:'keep on improving'
    }

});

module.exports = mongoose.model('Task', TaskSchema);
