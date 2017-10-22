const request = require('request');
const config = require('config');
const fs = require('fs');
const Promise = require('bluebird');

const req = request.defaults();

const getBasicAuthHeader = (userId, password) =>
  `Basic ${Buffer.from(`${userId}:${password}`).toString('base64')}`;

const uri = 'https://sandbox.api.visa.com/dcas/cardservices/v1/cards';
const headers = {
  Accept: 'application/json',
  Authorization: getBasicAuthHeader(config.get('visa.VISA_USER_ID'), config.get('visa.VISA_PASSWORD'))
};
const key = fs.readFileSync('/Users/jimmyhuynh/visaid/privateKey.pem');
const cert = fs.readFileSync('/Users/jimmyhuynh/visaid/cert.pem');

const createCardId = () => {
  const body = {
    cardIdModel: [
      {
        pan: '4883836336860016',
        lookUpBalances: true
      }
    ]
  };

  return new Promise((resolve, reject) =>
    req.post({ uri, key, cert, headers: { ...headers, 'Content-Type': 'application/json' }, json: body }, (err, res, body) => {
      if (err) reject(err);
      resolve(body);
    }));
};

exports.getUserInfo = () => createCardId()
  .then(data => data.resource.cards[0].cardId)
  .then(cardId => {
    const getUri = `${uri}/${cardId}/cardholderdetails`;
    return new Promise((resolve, reject) => req.get({ uri: getUri, key, cert, headers }, (err, data, body) => {
      if (err) reject(err);
      resolve(body);
    }));
  });
