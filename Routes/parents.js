const express = require("express");
const router = express.Router();

const {
  postParent,
  fetchParentById,
  fetchParentPinById,
} = require("../controllers/parents.controllers");

router.post("/", postParent);

router.get("/:id", fetchParentById);

router.patch("/parents/:auth0Id/pin", updateParentPin);

module.exports = router;
