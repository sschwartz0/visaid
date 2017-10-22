const { readFile } = require('fs');
const { join } = require('path');
const { pick } = require('lodash');
const { pipe } = require('lodash/fp');
const { getUserInfo } = require('../services/utils/visa-api/visa');

const users = '../mock-db/users.json';

exports.getUserDetail = (req, res, next) => {
  getUserInfo()
    .then(user => {
      res.json(JSON.parse(user));
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  readFile(join(__dirname, users), 'utf-8', (err, data) => {
    if (err) return next(err);
    const { id } = req.params;
    const users = JSON.parse(data);
    const result = pipe(
      getUserById,
      filterByPermissions(Object.keys(req.query))
    )(id, users);
    return res.json(result);
  });
};

const getUserById = (id, users) =>
  users.filter(user => +user.id === +id)[0];

const filterByPermissions = (perms) => (user) => pick(user, perms.concat(['user']));
