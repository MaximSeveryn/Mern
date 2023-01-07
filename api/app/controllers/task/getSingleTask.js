const Task = require("../../models/taskSchema");

// To get a specific Task
exports.getSingleTask = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Task Id to modify
  const taskID = req.params.taskID;

  // Execute task query
  Task.findOne({
    _id: taskID,
  })
    .then((task) => {
      if (!task) {
        return res.status(404).json({
          status: "Success",
          message: "No Task found with that Id!",
          task: task,
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Task Fetched Successfully!",
        task: task,
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
