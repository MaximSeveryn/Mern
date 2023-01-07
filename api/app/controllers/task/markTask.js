const Task = require("../../models/taskSchema");

// To Mark todo Complete
exports.markTask = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Task Id to modify
  const taskID = req.params.taskID;

  // Execute Update
  Task.findOneAndUpdate(
    {
      _id: taskID,
    },
    {
      isCompleted: true,
      "timestamps.modifiedOn": Date.now(),
      "timestamps.completedOn": Date.now(),
    },
    {
      new: true,
    }
  )
    .then((updatedTodo) => {
      res.status(201).json({
        status: "Success",
        message: "Task Marked as Completed!",
        todo: updatedTodo,
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
