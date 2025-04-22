const express = require("express");
const router = express.Router();

const {
  postKid,
  getKidById,
  patchStarsKidById,
  getKidByParentId,
} = require("../controllers/kids.controllers");

router.post("/kids", postKid);

router.get("/kids/:childId", getKidById);

router.patch("/kids/:childId/stars", patchStarsKidById);

router.get("/kids/parent/:parentId", getKidByParentId);

module.exports = router;
