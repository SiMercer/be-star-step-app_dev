const { Kids } = require("../db/test_data/test.schema");

exports.createNewKid = async ({ name, age, avatar, parentID }) => {
  if (
    !name ||
    typeof name !== "string" ||
    !Number.isInteger(age) ||
    !avatar ||
    typeof avatar !== "string" ||
    !parentID ||
    typeof parentID !== "string"
  ) {
    const err = new Error("Missing or invalid child data");
    err.status = 400;
    throw err;
  }
  const kid = new Kids({ name, age, avatar, parentID });
  return kid.save();
};

exports.selectKidById = async (childId) => {
  const kid = await Kids.findById(childId);
  if (!kid) {
    const err = new Error("Kid not found");
    err.status = 404;
    throw err;
  }
  return kid;
};

exports.updateStarKidById = async (childId, stars) => {
  const kid = await Kids.findByIdAndUpdate(
    childId,
    { $inc: { stars } },
    { new: true }
  );
  if (!kid) {
    const err = new Error("Kid not found");
    err.status = 404;
    throw err;
  }
  return kid;
};

exports.getKidsByParentId = async (parentID) => {
  return Kids.find({ parentID });
};
