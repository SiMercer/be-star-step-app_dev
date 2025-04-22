const { Reward } = require("../db/test_data/test.schema");

exports.selectRewardById = async (id) => {
  const doc = await Reward.findById(id);
  if (!doc) {
    const err = new Error("Reward not found");
    err.status = 404;
    throw err;
  }
  const { _id, title, cost, redeemedBy, isRedeemed, createdBy } = doc;
  return { reward_id: _id, title, cost, redeemedBy, isRedeemed, createdBy };
};

exports.selectRewards = async (queries) => {
  if (!queries.createdBy) {
    const err = new Error("Bad Request – use createdBy query");
    err.status = 400;
    throw err;
  }
  const docs = await Reward.find({ createdBy: queries.createdBy });
  return docs.map(
    ({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => ({
      reward_id: _id,
      title,
      cost,
      redeemedBy,
      isRedeemed,
      createdBy,
    })
  );
};

exports.createRewards = async (body) => {
  body.isRedeemed = false;
  const doc = await Reward.create(body);
  const { _id, title, cost, isRedeemed, createdBy } = doc;
  return { reward_id: _id, title, cost, isRedeemed, createdBy };
};

exports.updateRewardsById = async (reward_id, body) => {
  const doc = await Reward.findByIdAndUpdate(reward_id, body, { new: true });
  if (!doc) {
    const err = new Error("Reward not found");
    err.status = 404;
    throw err;
  }
  const { _id, title, cost, redeemedBy, isRedeemed, createdBy } = doc;
  return { reward_id: _id, title, cost, redeemedBy, isRedeemed, createdBy };
};

exports.removeRewardsById = async (reward_id) => {
  const doc = await Reward.findByIdAndDelete(reward_id);
  if (!doc) {
    const err = new Error("Reward not found");
    err.status = 404;
    throw err;
  }
  return { reward_id: doc._id };
};

exports.getRewardsByParentId = async (parentID) => {
  if (!parentID) {
    const err = new Error("Missing parentID");
    err.status = 400;
    throw err;
  }
  const docs = await Reward.find({ createdBy: parentID });
  return docs.map(
    ({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => ({
      reward_id: _id,
      title,
      cost,
      redeemedBy,
      isRedeemed,
      createdBy,
    })
  );
};
