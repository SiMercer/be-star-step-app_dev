const { Parent } = require("../db/test_data/test.schema");

exports.newParent = async ({ parentName, auth0Id }) => {
  if (!parentName || !auth0Id) {
    throw new Error("Missing parentName or auth0Id");
  }

  return await Parent.create({ _id: auth0Id, parentName });
};

exports.getParentById = async (id) => {
  return await Parent.findById(id);
};
