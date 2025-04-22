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
    console.error("Error creating kid:", err.message);
    res.status(err.status || 500).json({ msg: err.message });
  }
};

exports.getKidById = async (req, res, next) => {
  try {
    const kid = await selectKidById(req.params.childId);
    res.json(kid);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ msg: err.message });
  }
};

exports.patchStarsKidById = async (req, res, next) => {
  try {
    const kid = await updateStarKidById(req.params.childId, req.body.stars);
    res.json(kid);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ msg: err.message });
  }
};

exports.getKidsByParentId = async (req, res, next) => {
  try {
    const kids = await getKidsByParentId(req.params.parentId);
    res.json(kids);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ msg: err.message });
  }
};
