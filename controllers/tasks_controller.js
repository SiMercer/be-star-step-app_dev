const {
  createNewTask,
  removeTaskById,
  editTaskById,
  fetchTasks,
  fetchTaskById,
} = require("../models/task_model");
const mongoose = require("mongoose");

exports.postTask = (req, res, next) => {
  return createNewTask(req.body)
    .then((newTaskData) => {
      res.status(201).json(newTaskData);
    })
    .catch(next);
};

exports.deleteTaskById = (req, res, next) => {
  const task_id = req.params.task_id;
  return removeTaskById(task_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.patchTaskById = (req, res, next) => {
  const task_id = req.params.task_id;
  const updates = req.body;
  return editTaskById(task_id, updates)
    .then((updatedTask) => {
      res.status(200).json(updatedTask);
    })
    .catch(next);
};

exports.getTasks = (req, res, next) => {
  const queryKey = Object.keys(req.query)[0];
  const queryValue = Object.values(req.query)[0];
  if (queryKey && queryValue) {
    return fetchTasks(queryKey, queryValue)
      .then((listOfTasks) => {
        res.json(listOfTasks);
      })
      .catch(next);
  } else {
    res.status(404).send({ msg: "Not found" });
  }
};

exports.getTaskById = (req, res, next) => {
  const task_id = req.params.task_id;
  return fetchTaskById(task_id)
    .then((task) => {
      res.json(task);
    })
    .catch(next);
};

exports.postTaskByParent = (req, res, next) => {
  const { parentID } = req.params;
  const taskData = { ...req.body, createdBy: parentID };
  createNewTask(taskData)
    .then((task) => res.status(201).json(task))
    .catch(next);
};

exports.getTasksByParentId = (req, res, next) => {
  const { parentID } = req.params;

  // validate and convert to ObjectId
  if (!mongoose.Types.ObjectId.isValid(parentID)) {
    return res.status(400).json({ error: "Invalid parentID format" });
  }

  const objectId = mongoose.Types.ObjectId(parentID);

  fetchTasks("createdBy", objectId)
    .then((tasks) => res.json(tasks))
    .catch(next);
};
