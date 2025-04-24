const { Parent } = require("../db/test_data/test.schema");

exports.newParent = async ({ auth0Id, parentName }) => {
  const existing = await Parent.findOne({ auth0Id });
  if (existing) return existing;

  const parent = new Parent({
    auth0Id,
    parentName,
    pin: "00000"
  });

  return parent.save();
};

exports.getParentById = async (id) => {
  const parent = await Parent.findById(id);
  if (!parent) {
    const err = new Error("Parent not found");
    err.status = 404;
    throw err;
  }
  return parent;
};
