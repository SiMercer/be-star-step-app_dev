const { newParent, getParentById } = require("../models/parents.model");

async function postParent(req, res) {
  console.log("POST /api/parents body:", req.body);
  try {
    const parent = await newParent(req.body);
    console.log("✔ Created parent:", parent);
    res.status(201).json(parent);
  } catch (err) {
    console.error("Error creating parent:", err);

    res
      .status(err.status || 500)
      .json({ msg: err.msg || err.message || "Internal Server Error" });
  }
}

async function fetchParentById(req, res) {
  console.log("GET /api/parents/:id →", req.params.id);
  try {
    const parent = await getParentById(req.params.id);
    if (!parent) {
      return res.status(404).json({ msg: "Parent not found" });
    }
    res.json(parent);
  } catch (err) {
    console.error("Error fetching parent:", err);
    res
      .status(err.status || 500)
      .json({ msg: err.msg || err.message || "Internal Server Error" });
  }
}

module.exports = { postParent, fetchParentById };
