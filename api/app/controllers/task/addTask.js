const Task = require("../../models/taskSchema");

// To Create a Task
exports.addTask = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Create a new task object
  // req.body should strictly follow Task Model
  const task = new Task(req.body);

  // Save the object as document in MongoDb
  task
    .save()
    .then((createdTask) => {
      res.status(201).json({
        status: "Success",
        message: "Task Created SuccessFully!",
        task: {
          ...createdTask._doc,
          taskID: createdTask._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        message: "Error in DB Operation!",
        error: error,
      });
    });
};
