const express = require("express");
const router = express.Router();

const {
  postParent,
  fetchParentById,
} = require("../controllers/parents.controllers");

router.post("/", postParent);

router.get("/:id", fetchParentById);

module.exports = router;
