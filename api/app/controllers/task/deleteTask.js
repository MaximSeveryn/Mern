const Task = require("../../models/taskSchema");

// To Delete a Task
exports.deleteTask = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Task Id to delete
  const taskID = req.params.taskID;

  // Execute Update
  Task.findOneAndDelete({
    _id: taskID,
  })
    .then((deleteTask) => {
      res.status(201).json({
        status: "Success",
        message: "Task Deleted Successfully!",
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
