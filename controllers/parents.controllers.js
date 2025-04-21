const { newParent, getParentById } = require("../models/parents.model");

/**
 * POST /api/parents
 * Creates a new parent in MongoDB.
 */
async function postParent(req, res) {
  console.log("POST /api/parents body:", req.body);
  try {
    const parent = await newParent(req.body);
    return res.status(201).json(parent);
  } catch (err) {
    console.error("Error creating parent:", err.message);
    return res.status(500).json({ msg: "Error creating parent" });
  }
}

/**
 * GET /api/parents/:id
 * Fetches a parent by its Auth0 ID.
 */
async function fetchParentById(req, res) {
  console.log(`GET /api/parents/${req.params.id}`);
  try {
    const parent = await getParentById(req.params.id);
    if (!parent) {
      return res.status(404).json({ msg: "Parent not found" });
    }
    return res.json(parent);
  } catch (err) {
    console.error("Error fetching parent:", err.message);
    return res.status(500).json({ msg: "Error fetching parent" });
  }
}

module.exports = {
  postParent,
  fetchParentById,
};
