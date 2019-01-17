const news = [];

function get(id) {
  const obj = news[id];
  if (obj === undefined) {
    throw new Error('Record does not exist!');
  }
  return obj;
}

function getAll() { return news; }

function create(obj) {
  const id = news.push(obj) - 1;
  return id;
}

function update(id, obj) {
  if (news[id] === undefined) {
    throw new Error('Record does not exist!');
  }
  news[id] = obj;
  return id;
}

function remove(id) {
  if (news[id] === undefined) {
    throw new Error('Record does not exist!');
  }
  news[id] = null;
  return id;
}

module.exports = {
  get,
  getAll,
  create,
  update,
  remove,
};
