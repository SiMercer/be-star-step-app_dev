const { Kids, Parents } = require("../db/test_data/test.schema");

exports.createNewKid = async ({ name, age, avatar, parentID }) => {
  if (!name || age == null || !avatar || !parentID) {
    const err = new Error("Missing info");
    err.status = 400;
    throw err;
  }

  if (
    typeof name !== "string" ||
    typeof avatar !== "string" ||
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    typeof parentID !== "string"
  ) {
    const err = new Error("Invalid data type entered");
    err.status = 400;
    throw err;
  }

  const parentExists = await Parents.findById(parentID);
  if (!parentExists) {
    const err = new Error("Parent not found");
    err.status = 404;
    throw err;
  }

  const kid = new Kids({ name, age, avatar, parentID });
  return await kid.save();
};

exports.selectKidById = async (childID) => {
  const kid = await Kids.findById(childID);
  if (!kid) {
    const err = new Error("Kid not found");
    err.status = 404;
    throw err;
  }
  return kid;
};

exports.updateStarKidById = async (childID, stars) => {
  if (stars == null) {
    const err = new Error("Missing stars value");
    err.status = 400;
    throw err;
  }
  const updatedKid = await Kids.findByIdAndUpdate(
    childID,
    { $inc: { stars } },
    { new: true }
  );
  if (!updatedKid) {
    const err = new Error("Kid not found");
    err.status = 404;
    throw err;
  }
  return updatedKid;
};

exports.getKidsByParentId = async (parentID) => {
  return await Kids.find({ parentID });
};
