exports.createNewKid = async (kidData) => {
  const { name, age, avatar, parentID } = kidData;

  if (!name || age == null || !avatar || !parentID) {
    throw { status: 400, msg: "Missing info" };
  }

  if (
    typeof name !== "string" ||
    typeof avatar !== "string" ||
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    typeof parentID !== "string"
  ) {
    throw { status: 400, msg: "Invalid data type entered" };
  }

  const parent = await Parent.findById(parentID);
  if (!parent) {
    throw { status: 404, msg: "Parent not found" };
  }

  const kid = new Child({ name, age, avatar, parentID });
  return await kid.save();
};

exports.selectKidById = async (childID) => {
  const kid = await Child.findById(childID);
  if (!kid) {
    throw { status: 404, msg: "Kid not found" };
  }
  return kid;
};

exports.updateStarKidById = async (childID, stars) => {
  const updatedKid = await Child.findByIdAndUpdate(
    childID,
    { $inc: { stars } },
    { new: true }
  );
  if (!updatedKid) {
    throw { status: 404, msg: "Kid not found" };
  }
  return updatedKid;
};

exports.getKidsByParentId = async (parentID) => {
  const kids = await Child.find({ parentID });
  return kids;
};
