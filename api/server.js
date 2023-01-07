const app = require("./app");
const debug = require("debug")("todo-api");
const http = require("http");

// Normalize Port
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Set the PORT
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Setting up callbacks
// incase errors are encountered
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`.bgRed);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`.bgRed);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const PORT = app.get("port");
const onServerStart = () => {
  console.log(`TODO Api server is running on PORT: ${PORT}`.brightYellow.bold);
};

// Start the Server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, onServerStart);

// const app = require("./app"
// const express = require("express");
// const colors = require("colors");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const morgan = require("morgan");
// // const routes = require("./app/routes/TaskRoutes");s

// //! Import TaskSchema
// const Task = require("./app/models/taskSchema");

// const app = express();
// dotenv.config({ path: "./env" });
// app.use(express.json());
// app.use(cors());

// if (process.env.MODE === "development") {
//   app.use(morgan("dev"));
// }
// const PORT = process.env.PORT || 3001;

// //! ROUTES
// routes(app);

// //! HOSTING
// app.listen(PORT, console.log(`Server listening on ${PORT}`.brightYellow.bold));

// app.get("/tasks", async (req, res) => {
//   const tasksList = await Task.find();
//   res.json(tasksList);
// });

// app.post("/tasks/new", async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(200).send("Task created");
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.delete("/tasks/delete/:id", async (req, res) => {
//   try {
//     const result = await Task.findByIdAndDelete(req.params.id);
//     // res.json(result);
//     res.status(200).send("Task has been deleted");
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.put("/tasks/update/:id", async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const updatedTask = new Task.findById(taskID);
//     console.log(updatedTask);
//     updatedTask.status = !updatedTask.status;

//     const task = await Task.findOneAndUpdate({ _id: taskID }, updatedTask, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// });
