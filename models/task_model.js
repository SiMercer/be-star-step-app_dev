const { Task } = require("../db/test_data/test.schema");
const { dataConvert } = require("../utils/data_convert_for_response");
const mongoose = require("mongoose");

exports.createNewTask = async (taskData) => {
  if (
    taskData.assignedTo &&
    !mongoose.Types.ObjectId.isValid(taskData.assignedTo)
  ) {
    const err = new Error("Invalid ObjectId for assignedTo");
    err.status = 400;
    throw err;
  }

  const created = await Tasks.create(taskData);
  const validBefore = dataConvert(created.validBefore);
  return { ...created._doc, validBefore };
};

exports.removeTaskById = async (task_id) => {
  const deleted = await Tasks.findByIdAndDelete(task_id);
  if (!deleted) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  return deleted;
};

exports.editTaskById = async (task_id, updates) => {
  const editedTask = await Tasks.findByIdAndUpdate(task_id, updates, {
    new: true,
  });

  const date = editedTask.validBefore;
  const newDate = dataConvert(date);

  const readyResponse = { ...editedTask._doc, validBefore: newDate };

  return readyResponse;
};

exports.fetchTasks = async (queryKey, queryValue) => {
  const requestToDb = {};

  if (["createdBy", "assignedTo", "_id"].includes(queryKey)) {
    requestToDb[queryKey] = new mongoose.Types.ObjectId(queryValue);
  } else {
    requestToDb[queryKey] = queryValue;
  }

  const listOfTasks = await Tasks.find(requestToDb);

  const newListOfTasks = [];

  listOfTasks.forEach((task) => {
    const date = task.validBefore;
    const newDate = dataConvert(date);
    newListOfTasks.push({ ...task._doc, validBefore: newDate });
  });

  return newListOfTasks;
};
exports.fetchTaskById = async (task_id) => {
  console.log(task_id);
  const task = await Tasks.findById(task_id);
  return task;
};
