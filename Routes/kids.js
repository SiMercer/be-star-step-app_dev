const express = require("express");
const router = express.Router();

const {
  postKid,
  getKidById,
  patchStarsKidById,
  getKidsByParentId,
} = require("../controllers/kids.controllers");

router.post("/", postKid);

router.get("/:childId", getKidById);

router.patch("/:childId/stars", patchStarsKidById);

router.get("/parent/:parentID", getKidsByParentId);

module.exports = router;
