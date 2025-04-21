const { Parents } = require("../db/test_data/test.schema");

exports.newParent = async ({ parentName, auth0Id }) => {
  if (!parentName || !auth0Id) {
    const err = new Error("Missing parentName or auth0Id");
    err.status = 400;
    err.msg = "Missing parentName or auth0Id";
    throw err;
  }
  return await Parents.create({ _id: auth0Id, parentName });
};

exports.getParentById = async (id) => {
  return await Parents.findById(id);
};
