const { newParent, getParentById } = require("../models/parents.model");

exports.postParent = async (req, res) => {
  console.log("POST /api/parents body:", req.body);
  try {
    const parent = await newParent(req.body);
    res.status(201).send(parent);
  } catch (err) {
    console.error("Error creating parent:", err.message);
    res.status(500).send({ msg: "Error creating parent" });
  }
};

const fetchParentById = async (req, res) => {
  try {
    const parent = await getParentById(req.params.id);
    if (!parent) {
      return res.status(404).send({ msg: "Parent not found" });
    }
    res.send(parent);
  } catch (err) {
    console.error("Error fetching parent:", err.message || err);
    res.status(500).send({ msg: "Error fetching parent" });
  }
};

module.exports = { postParent, fetchParentById };
