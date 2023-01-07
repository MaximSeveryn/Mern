const Task = require("../models/taskSchema");

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
