const mongoose = require("mongoose");
const moment = require('moment');
let Task = require("../models/Task");

let taskController = {};

//show list of Tasks
taskController.list = (req,res) => {
  Task.find({}, (err, tasks) => {
         if (err) return res.status(500).send("There was a problem finding the tasks.");
         res.render("../views/tasks/index", {tasks: tasks,moment: moment});

     });
};

//show task by id
taskController.show = (req,res) => {
  Task.findById(req.params.id, (err, task) => {
         if (err) return res.status(500).send("There was a problem finding the task.");
         if (!task) return res.status(404).send("No task found.");
        res.render("../views/tasks/show", {task: task, moment: moment});

     });
};

//create new task
taskController.create = (req,res) => {
  res.render("../views/tasks/create");
};

// save new task
taskController.save = (req,res) => {
  let task = new Task({
    title: req.body.title,
    description:req.body.description,
    assignee:req.body.assignee,
    startDate:moment(req.body.startDate,"YYYY-MM-DD").toISOString(),
    endDate:moment(req.body.endDate,"YYYY-MM-DD").toISOString(),
    status:req.body.status,
    actionPlan:req.body.actionPlan,
    retrospective:req.body.retrospective
  });
  task.save((err,task) => {
     if (err) return res.status(500).send("There is a problem in storing the task.Please go back and check that you entered the data in all fields.");
     res.redirect("/tasks/show/"+task._id);

  });
};

// Edit a task
taskController.edit = (req,res) => {
  Task.findById(req.params.id, (err, task) => {
         if (err) return res.status(500).send(err);
         if (!task) return res.status(404).send("No task found.");
         res.render("../views/tasks/edit", {task: task , moment: moment});
     });
};

//Update a task
taskController.update = (req,res) => {
  Task.findByIdAndUpdate({_id: req.params.id},{ $set: { title: req.body.title,
                                                  description:req.body.description,
                                                  assignee:req.body.assignee,
                                                  startDate:moment(req.body.startDate,"YYYY-MM-DD").toISOString(),
                                                  endDate: moment(req.body.endDate,"YYYY-MM-DD").toISOString(),
                                                  status :req.body.status,
                                                  actionPlan:req.body.actionPlan,
                                                  retrospective:req.body.retrospective
                                                 }}, {new:true}, (err, task) => {
         if (err) res.render("../views/tasks/edit", {task: req.body});
         if (!task) return res.status(404).send("No task found.");
         res.redirect("/tasks/show/"+task._id);
     });
};

//Delete a task
taskController.delete = (req,res) => {
  Task.remove({_id: req.params.id}, (err) => {
         if (err) return res.status(500).send(err);
         res.redirect("/tasks");
     });
};

module.exports  = taskController;
