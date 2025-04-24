const express = require("express");
const router = express.Router();

const {
  postParent,
  fetchParentById,
  fetchParentPinById,
} = require("../controllers/parents.controllers");

router.post("/", postParent);

router.get("/:id", fetchParentById);

router.patch("/:id/pin", fetchParentPinById)

module.exports = router;
