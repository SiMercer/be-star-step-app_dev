const {
  createNewKid,
  selectKidById,
  updateStarKidById,
  getKidsByParentId,
} = require("../models/kids.model");

exports.postKid = async (req, res, next) => {
  try {
    const newKid = await createNewKid(req.body);
    res.status(201).json(newKid);
  } catch (err) {
    next(err);
  }
};

exports.getKidById = async (req, res, next) => {
  try {
    const kid = await selectKidById(req.params.childId);
    res.json(kid);
  } catch (err) {
    next(err);
  }
};

exports.patchStarsKidById = async (req, res, next) => {
  try {
    const kid = await updateStarKidById(req.params.childId, req.body.stars);
    res.json(kid);
  } catch (err) {
    next(err);
  }
};

exports.getKidsByParentId = async (req, res, next) => {
  try {
    const kids = await getKidsByParentId(req.params.parentID);
    res.json(kids);
  } catch (err) {
    next(err);
  }
};
