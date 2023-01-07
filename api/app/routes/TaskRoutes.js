const express = require("express");
const {
  addTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  markTask,
  deleteTask,
} = require("../controllers/TaskController");

const router = express.Router();

//! POST METHOD
router.route("/").post(addTask);

//! GET METHOD
router.get("/", getAllTasks);
router.get("/:taskID", getSingleTask);

//! PUT METHOD
router.put("/:taskID", updateTask);

//! PATCH METHOD
router.patch("/:taskID", markTask);

//! DELETE METHOD
router.delete("/:taskID", deleteTask);

// export the task routes
module.export = router;

// "use strict";

// const express = require("express");

// const {
//   addTask,
//   getAllTask,
//   getSingleTask,
//   updateTask,
//   markTask,
//   deleteTask,
// } = require("../controllers/TaskController");

// const router = express.Router();

// //! POST METHOD
// router.post("/", addTask);

// //! GET METHOD
// router.get("/", getAllTask);
// router.get("/:taskID", getSingleTask);

// //! PUT METHOD
// router.put("/:taskID", updateTask);

// //! PATCH METHOD
// router.patch("/:taskID", markTask);

// //! DELETE METHOD
// router.delete("/:taskID", deleteTask);

// // export the task routes
// module.export = router;
