const {
  createNewKid,
  selectKidById,
  updateStarKidById,
  getKidsByParentId,
} = require("../models/kids_model");

exports.postKid = async (req, res, next) => {
  console.log("POST /api/kids — body:", req.body);

  const { name, age, avatar, parentID } = req.body;
  if (!name || age == null || !avatar || !parentID) {
    return res.status(400).json({ msg: "Missing info" });
  }

  try {
    const newKid = await createNewKid({ name, age, avatar, parentID });
    return res.status(201).json(newKid);
  } catch (err) {
    console.error("Error creating kid:", err);
    return next(err);
  }
};

exports.getKidById = async (req, res, next) => {
  const { childId } = req.params;
  try {
    const kid = await selectKidById(childId);
    if (!kid) {
      return res.status(404).json({ msg: "Kid not found" });
    }
    return res.status(200).json(kid);
  } catch (err) {
    console.error("Error fetching kid by ID:", err);
    return next(err);
  }
};

exports.patchStarsKidById = async (req, res, next) => {
  const { childId } = req.params;
  const { stars } = req.body;

  if (stars == null) {
    return res.status(400).json({ msg: "Missing stars value" });
  }

  try {
    const updated = await updateStarKidById(childId, stars);
    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating kid stars:", err);
    return next(err);
  }
};

exports.getKidByParentId = async (req, res, next) => {
  const { parentID } = req.params;
  try {
    const kids = await getKidsByParentId(parentID);
    return res.status(200).json(kids);
  } catch (err) {
    console.error("Error fetching kids by parent ID:", err);
    return next(err);
  }
};
