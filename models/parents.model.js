const { Parent } = require("../db/test_data/test.schema");

exports.newParent = async ({ auth0Id, parentName }) => {
  if (!auth0Id || !parentName) {
    const err = new Error("Missing auth0Id or parentName");
    err.status = 400;
    throw err;
  }
  // Create with the Auth0 sub as the _id
  return await Parent.create({ _id: auth0Id, parentName });
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
