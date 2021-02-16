const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(testing) {
    return db("testing2")
    .insert(testing, "id")
}

async function update(id, changes) {
  return null;
}

function remove(id) {
    console.log(id)
    return db("testing2")
        .where({ id })
        .del()
}

function getAll() {
  return db('testing2');
}

function findById(id) {
  return null;
}