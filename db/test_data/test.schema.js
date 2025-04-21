const mongoose = require("mongoose");
// import { v4 as uuidv4 } if you ever want uuids for tasks/rewards

const parentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  parentName: { type: String, required: true },
});

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  stars: { type: Number, default: 0 },
  parentID: { type: String, ref: "Parent", required: true },
  avatar: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["new", "in_progress", "done"],
    default: "new",
  },
  validBefore: Date,
  createdBy: {
    type: String,
    ref: "Parent",
    required: true,
  },
  assignedTo: {
    type: String,
    ref: "Child",
  },
  starsReward: { type: Number, default: 0 },
});

const rewardSchema = new mongoose.Schema({
  title: String,
  isRedeemed: Boolean,
  cost: Number,
  redeemedBy: {
    type: String,
    ref: "Child",
  },
  createdBy: {
    type: String,
    ref: "Parent",
    required: true,
  },
});

const Parent = mongoose.model("Parent", parentSchema);
const Child = mongoose.model("Child", childSchema);
const Task = mongoose.model("Task", taskSchema);
const Reward = mongoose.model("Reward", rewardSchema);

module.exports = { Parent, Child, Task, Reward };
