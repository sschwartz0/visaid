const fs = require('fs');
const { join } = require('path');
const fileName = "../mock-db/requests.json";


const createSession = function (req, res) {
  fs.readFile(join(__dirname, fileName), 'utf-8', (err, requestsDB) => {
    requestsDB = JSON.parse(requestsDB);
    if (err) res.status(500).send(err);
    if (req.body.safetyCode === undefined) {
      let safetyCode = generateSafetyCode(requestsDB);
      requestsDB[safetyCode] = {
          cardId: req.body.cardId,
          expirationTime: Date.now() + 300000,
          status: "CREATED",
          location: req.body.location,
          permissions: req.body.permissions.reduce((acc,ele) => {
            acc[ele] = true;
            return acc;
          }, {})
      };
      fs.writeFile(join(__dirname,fileName), JSON.stringify(requestsDB, null, 2), (err) => {
      if (err) res.status(500).send(err);
      else {
        res.json({
          safetyCode: safetyCode
        });
      }
      });
    } else {
      let safetyCode = req.body.safetyCode;
      if (!req.body.permissions.length) {
        deleteSession(requestsDB, safetyCode, res);
        return;
      }
      if (requestsDB[safetyCode].cardId === req.body.cardId) {
        requestsDB[safetyCode].permissions = req.body.permissions.reduce((acc,ele) => {
          acc[ele] = true;
          return acc;
        }, {});
        fs.writeFile(join(__dirname,fileName), JSON.stringify(requestsDB, null, 2), (err) => {
          if (err) res.status(500).send(err);
          else {
            res.json({
              safetyCode: safetyCode
            });
          }
          });
      } else {
        res.status(500).send('Card ID mismatch error');
      }
  }
  });
}

const getSession = function (req, res) {
  fs.readFile(join(__dirname, fileName), 'utf-8', (err, requestsDB) => {
    if (err) res.status(500).send(err);
    requestsDB = JSON.parse(requestsDB);
    let session = requestsDB[req.params.safetyCode];
    if (!session) {
      res.status(500).send('no active sessions found with that code');
    } else {
      session.status = "PENDING";
      fs.writeFile(join(__dirname,fileName), JSON.stringify(requestsDB, null, 2), (err) => {
        if (err) res.status(500).send(err);
        else {
          res.json({
            permissions: session.permissions
          });
        }
      });
    }
  });
}

const deleteSession = function (db, safetyCode, res) {
  delete db[safetyCode];
  fs.writeFile(join(__dirname,fileName), JSON.stringify(db, null, 2), (err) => {
    if (err) res.status(500).send(err);
    else {
      res.send('session deleted');
    }
    });
}

const generateSafetyCode = function(db) {
  let safetyCode = Math.floor(100000 + Math.random() * 900000);
  while (db[safetyCode]) {
    safetyCode = Math.floor(100000 + Math.random() * 900000);
  }
  return safetyCode;
}
/*
createSession request Body Schema
    {
        cardId: string,
        permissions: string[]
        safetyCode?: string (if available)
    }


DB Schema
"efkhwr3tn43tkfewkjfnskjfn36": {  //internal visa user id
    "safetyCode": string,
    "expirationTime": number,
    "status": string,
    "location": number,
    "permissions": {
        "permissionName": boolean
    }
  }

  SAMPLE Post COMMAND
  curl -H "Content-Type: application/json" -X POST -d '{"cardId":"23r33t2g24t24g24g42", "permissions": ["Name", "Address", "Credit Score"]}' localhost:3000/v1/requests

  SAMPE Get COMMAND
    curl -H "Content-Type: application/json" -X GET localhost:3000/v1/requests/######


  */
module.exports = { 
  createSession: createSession,
  getSession: getSession
 };
