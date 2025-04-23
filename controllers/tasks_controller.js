const {
  createNewTask,
  removeTaskById,
  editTaskById,
  fetchTasks,
  fetchTaskById,
  fetchTasksByAssignedTo,
} = require("../models/task_model");

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
    .catch((err) => {
      console.error("POST TASK ERROR:", err);
      res
        .status(500)
        .json({ msg: "Internal Server Error", error: err.message });
    });
};

exports.getTasksByParentId = (req, res, next) => {
  const { parentID } = req.params;
  fetchTasks("createdBy", parentID)
    .then((tasks) => res.json(tasks))
    .catch((err) => {
      console.error("GET TASKS BY PARENT ID ERROR:", err);
      res
        .status(500)
        .json({ error: "Internal server error", detail: err.message });
    });
};

exports.getTasksByAssignedTo = async (req, res) => {
  const { assignedToId } = req.params;

  try {
    const tasks = await fetchTasksByAssignedTo(assignedToId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
