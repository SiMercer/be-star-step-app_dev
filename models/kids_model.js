const { Child } = require("../db/test_data/test.schema");

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
  const kid = new Child({ name, age, avatar, parentID });
  return await kid.save();
};

exports.selectKidById = async (id) => {
  const kid = await Child.findById(id);
  if (!kid) {
    const err = new Error("Kid not found");
    err.status = 404;
    throw err;
  }
  return kid;
};

exports.updateStarKidById = async (id, stars) => {
  const kid = await Child.findByIdAndUpdate(
    id,
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
  return await Child.find({ parentID });
};
