const Task = require("../../models/taskSchema");

// To get list of Todos
exports.getAllTasks = (req, res, next) => {
  // Log This Request
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  // Set up Task query
  const TaskQuery = Task.find().sort({
    onDate: -1,
  });
  // Execute todo query
  TaskQuery.then((tasks) => {
    if (!tasks.length) {
      return res.status(404).json({
        status: "Success",
        message: "No Todos found!",
        tasks: tasks,
        tasksAmount: tasks.length,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Todos Fetched Successfully!",
      tasks: tasks,
      tasksAmount: tasks.length,
    });
  }).catch((error) => {
    res.status(500).json({
      status: "Error",
      message: "Error in DB Operation!",
      error: error,
    });
  });
};
