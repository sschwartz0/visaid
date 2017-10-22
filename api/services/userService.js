const { readFile } = require('fs');
const { join } = require('path');
const { pick } = require('lodash');
const { pipe } = require('lodash/fp');

exports.getUser = (req, res, next) => {
  readFile(join(__dirname, '../mock-db/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err);
    const { id } = req.params;
    const users = JSON.parse(data);
    const result = pipe(
      getUserById,
      filterByPermissions(Object.keys(req.query)),
    )(id, users);
    return res.json(result);
  });
};

const getUserById = (id, users) =>
  users.filter(user => +user.id === +id)[0];

const filterByPermissions = (perms) => (user) => pick(user, perms);
