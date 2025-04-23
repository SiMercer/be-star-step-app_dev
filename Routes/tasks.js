const {
  postTask,
  deleteTaskById,
  patchTaskById,
  getTasks,
  getTaskById,
  postTaskByParent,
  getTasksByParentId,
  getTasksByAssignedTo,
} = require("../controllers/tasks_controller");

const tasksRouter = require("express").Router();

tasksRouter.route("/").post(postTask).get(getTasks);

tasksRouter.get("/assigned/:assignedToId", getTasksByAssignedTo);

tasksRouter
  .route("/:task_id")
  .get(getTaskById)
  .patch(patchTaskById)
  .delete(deleteTaskById);

tasksRouter
  .route("/parent/:parentID")
  .post(postTaskByParent)
  .get(getTasksByParentId);

module.exports = tasksRouter;
