const {
  createNewKid,
  selectKidById,
  updateStarKidById,
  getKidsByParentId,
} = require("../models/kids_model");

exports.postKid = async (req, res, next) => {
  // log the exact JSON you received
  console.log("POST /api/kids body:", req.body);

  try {
    const newKid = await createNewKid(req.body);
    res.status(201).json(newKid);
  } catch (err) {
    // if err.status/msg thrown in model, respect it
    console.error("Error in postKid:", err);
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Internal server error" });
  }
};

exports.getKidById = async (req, res, next) => {
  const { childId } = req.params;
  try {
    const kid = await selectKidById(childId);
    res.status(200).json(kid);
  } catch (err) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Error fetching kid" });
  }
};

exports.patchStarsKidById = async (req, res, next) => {
  const { childId } = req.params;
  const { stars } = req.body;
  try {
    const kid = await updateStarKidById(childId, stars);
    res.status(200).json(kid);
  } catch (err) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Error updating stars" });
  }
};

exports.getKidByParentId = async (req, res, next) => {
  const { parent_id } = req.params;
  try {
    const kids = await getKidsByParentId(parent_id);
    res.status(200).json(kids);
  } catch (err) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Error fetching kids" });
  }
};
