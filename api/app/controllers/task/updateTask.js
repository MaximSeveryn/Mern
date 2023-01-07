const Task = require("../../models/taskSchema");

// To Update a Task
exports.updateTask = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Get Task Id to modify
  const taskID = req.params.taskID;

  // Get Data to be modified
  const data = req.body;

  // Execute Update
  Task.findOneAndUpdate(
    {
      _id: taskID,
    },
    {
      ...data,
      "timestamps.modifiedOn": Date.now(),
    },
    {
      new: true,
    }
  )
    .then((updatedTask) => {
      res.status(201).json({
        status: "Success",
        message: "Task Updated Successfully!",
        task: updatedTask,
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
