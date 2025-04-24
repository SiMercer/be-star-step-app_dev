const express = require("express");
const router = express.Router();
const { setParentPin } = require("../controllers/parents");

const {
  postParent,
  fetchParentById,
  setParentPin,
} = require("../controllers/parents.controllers");

router.post("/", postParent);

router.get("/:id", fetchParentById);

router.patch("/:auth0Id/pin", setParentPin);

module.exports = router;
