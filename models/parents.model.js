const { Parents } = require("../db/test_data/test.schema");

exports.newParent = async ({ parentName, auth0Id }) => {
  if (!parentName || !auth0Id) {
    throw Object.assign(new Error("Missing parentName or auth0Id"), {
      status: 400,
    });
  }

  return await Parent.create({ _id: auth0Id, parentName });
};

exports.getParentById = async (id) => {
  return await Parents.findById(id);
};
