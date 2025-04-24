const express = require("express");
const router = express.Router();

const {
  postParent,
  fetchParentById,
  setParentPin,
} = require("../controllers/parents.controllers");

router.post("/", postParent);
router.get("/:id", fetchParentById);
router.patch("/:id/pin", setParentPin);

module.exports = router;
