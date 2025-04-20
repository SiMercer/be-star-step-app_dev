const { newParent, getParentById } = require("../models/parents.model");

exports.postParent = async (req, res) => {
  try {
    const parent = await newParent(req.body);
    res.status(201).send(parent);
  } catch (err) {
    console.error("Error creating parent:", err.message || err);
    res.status(500).send({ msg: "Error creating parent" });
  }
};

const fetchParentById = async (req, res) => {
  const { parent_id } = req.params;
  try {
    const parent = await getParentById(parent_id);

    if (!parent) {
      return res.status(404).send({ msg: "Parent not found" });
    }

    res.status(200).send(parent);
  } catch (err) {
    res.status(400).send({ msg: "Invalid id" });
  }
};

module.exports = { postParent, fetchParentById };
