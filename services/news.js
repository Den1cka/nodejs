const { News } = require('../mongoose');

async function getAsync(id) {
  const result = await News.findById(id);
  return result;
}

async function getAllAsync() {
  const result = await News.find();
  return result;
}

async function createAsync(obj) {
  const result = await News.create(obj);
  return result._id;
}

async function updateAsync(id, obj) {
  const result = await News.findByIdAndUpdate(id, obj);
  return result._id;
}

async function removeAsync(id) {
  const result = await News.findByIdAndRemove(id);
  return result._id;
}

module.exports = {
  getAsync,
  getAllAsync,
  createAsync,
  updateAsync,
  removeAsync,
};
