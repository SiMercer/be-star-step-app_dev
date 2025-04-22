const { Parent } = require("../db/test_data/test.schema");

exports.newParent = async ({ parentName, auth0Id }) => {
  if (!parentName || !auth0Id) {
    const err = new Error("Missing parentName or auth0Id");
    err.status = 400;
    throw err;
  }

  const existing = await Parent.findById(auth0Id);
  if (existing) {
    return existing;
  }

  const parent = await Parent.create({ _id: auth0Id, parentName });
  return parent;
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
