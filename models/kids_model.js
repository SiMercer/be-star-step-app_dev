const { Kids } = require("../db/test_data/test.schema");

exports.createNewKid = async (kidData) => {
  const { name, age, avatar, parentID } = kidData;

  if (!name || age == null || !avatar || !parentID) {
    throw { status: 400, msg: "Missing info" };
  }

  if (
    typeof name !== "string" ||
    typeof avatar !== "string" ||
    typeof parentID !== "string" ||
    typeof age !== "number" ||
    !Number.isInteger(age)
  ) {
    throw { status: 400, msg: "Invalid data type entered" };
  }

  const kid = new Kids({ name, age, avatar, parentID });
  return await kid.save();
};

exports.selectKidById = async (childID) => {
  const kid = await Kids.findById(childID);
  if (!kid) throw { status: 404, msg: "Kid not found" };
  return kid;
};

exports.updateStarKidById = async (childID, stars) => {
  const updatedKid = await Kids.findByIdAndUpdate(
    childID,
    { $inc: { stars } },
    { new: true }
  );
  if (!updatedKid) throw { status: 404, msg: "Kid not found" };
  return updatedKid;
};

exports.getKidsByParentId = async (parentID) => {
  return await Kids.find({ parentID });
};
