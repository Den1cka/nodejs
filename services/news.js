const news = [];

module.exports.get = (id) => {
  const obj = news[id];
  if (obj === undefined) {
    throw new Error('Record does not exist!');
  }
  return obj;
};

module.exports.getAll = () => news;

module.exports.create = (obj) => {
  const id = news.push(obj) - 1;
  return id;
};

module.exports.update = (id, obj) => {
  if (news[id] === undefined) {
    throw new Error('Record does not exist!');
  }
  news[id] = obj;
  return id;
};

module.exports.delete = (id) => {
  if (news[id] === undefined) {
    throw new Error('Record does not exist!');
  }
  news[id] = null;
  return id;
};
