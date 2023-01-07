import "../styles/TodoApp.scss";
import "../styles/tasks/defaultTask.scss";
import { useReducer, useRef } from "react";

// init state
const initState = {
  task: "",
  tasksList: [],
};

//actions
const SET_TASK = "set_task";
const ADD_TASK = "add_task";
const REMOVE_TASK = "remove_task";

const setTask = (payload) => {
  return {
    type: SET_TASK,
    payload,
  };
};

const addTask = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};

const removeTask = (payload) => {
  return {
    type: REMOVE_TASK,
    payload,
  };
};

// reducer
const reducer = (state, action) => {
  // console.log(action);
  // console.log("prev state: " + state);

  let newState;

  switch (action.type) {
    case SET_TASK:
      newState = {
        ...state,
        task: action.payload,
      };
      break;
    case ADD_TASK:
      newState = {
        ...state,
        tasksList: [...state.tasksList, action.payload],
      };
      break;
    case REMOVE_TASK:
      const newTasksList = [...state.tasksList];

      newTasksList.splice(action.payload, 1);

      newState = {
        ...state,
        tasksList: newTasksList,
      };
      break;
    default:
      throw new Error(`Invalid action ${action.type}`);
  }

  console.log(newState);

  return newState;
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { task, tasksList } = state;

  const inputRef = useRef();

  const submitHandler = () => {
    if (task === "") {
      alert("please enter the name of the task!!");
      inputRef.current.focus();
      return;
    }

    dispatch(addTask(task));
    dispatch(setTask(""));

    inputRef.current.focus();
  };

  return (
    // <div id="TodoApp" className='"grid h-screen place-items-center"'>
    <div id="TodoApp" className="">
      <div>
        <div className="TodoApp-content" style={{ padding: "30px" }}>
          <div className="inputSection">
            <input
              ref={inputRef}
              className="inputField"
              value={task}
              placeholder="enter task"
              onChange={(e) => {
                dispatch(setTask(e.target.value));
              }}
            />

            <button
              type="submit"
              className="addTaskBtn"
              onClick={submitHandler}
            >
              {" "}
              +{" "}
            </button>
          </div>

          <ul className="tasksList">
            {tasksList.map((task, index) => (
              <li id="taskItem" key={index}>
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="taskContent"
                >
                  <div className="taskTitle">
                    <div className="titleName">{task}</div>
                    <p className="taskType">personal</p>
                  </div>
                  <div style={{}} className="taskDeleteBtn">
                    <button
                      onClick={() => dispatch(removeTask(index))}
                      className="deleteBtn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TodoApp;
