const { newParent, getParentById } = require("../models/parents.model");

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
