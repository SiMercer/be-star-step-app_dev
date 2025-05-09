const { newParent, getParentById } = require("../models/parents.model");
const { Parent } = require("../db/test_data/test.schema");

exports.postParent = async (req, res, next) => {
  try {
    console.log("POST /api/parents body:", req.body);
    const parent = await newParent(req.body);
    res.status(201).json(parent);
  } catch (err) {
    console.error("Error creating parent:", err.message);
    res.status(err.status || 500).json({ msg: err.message });
  }
};

exports.fetchParentById = async (req, res, next) => {
  try {
    const parent = await getParentById(req.params.id);
    res.json(parent);
  } catch (err) {
    console.error("Error fetching parent:", err.message);
    res.status(err.status || 500).json({ msg: err.message });
  }
};

exports.fetchParentPinById = async (req, res, next) => {
  const { id } = req.params;
  const { pin } = req.body;

  if (!pin || pin.length !== 4) {
    return res.status(400).json({ msg: "Invalid PIN format" });
  }

  try {
    const updated = await Parent.findByIdAndUpdate(id, { pin }, { new: true });
    if (!updated) return res.status(404).json({ msg: "Parent not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update PIN" });
  }
};

exports.setParentPin = async (req, res) => {
  const { id } = req.params;
  const { pin } = req.body;

  if (!pin || pin.length !== 4) {
    return res.status(400).json({ error: "PIN must be 4 digits long." });
  }

  try {
    const parent = await Parent.findByIdAndUpdate(id, { pin }, { new: true });

    if (!parent) return res.status(404).json({ error: "Parent not found." });

    res.status(200).json(parent);
  } catch (err) {
    console.error("Failed to update PIN:", err);
    res.status(500).json({ error: "Server error" });
  }
};
