const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  parentName: { type: String, required: true },
  pin: { type: String, default: "00000" },
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
  createdBy: { type: String, ref: "Parent", required: true },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    validate: {
      validator: mongoose.Types.ObjectId.isValid,
      message: "Invalid ObjectId for assignedTo",
    },
  },
  starsReward: { type: Number, default: 0 },
});

const rewardSchema = new mongoose.Schema({
  title: String,
  isRedeemed: Boolean,
  cost: Number,
  redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  createdBy: { type: String, ref: "Parent", required: true },
});

const Parent = mongoose.model("Parent", parentSchema);
const Kids = mongoose.model("Child", childSchema);
const Tasks = mongoose.model("Task", taskSchema);
const Reward = mongoose.model("Reward", rewardSchema);

module.exports = { Parent, Kids, Tasks, Reward };
