const fs = require('fs');
const {join}= require('path');
const fileName = "../mock-db/requests.json";
const requestsDB = require(join(__dirname,fileName));


const createSession = function(req, res) {
    if (!requestsDB[req.body.internalAccountID]) {
        requestsDB[req.body.internalAccountID] = {
            safetyCode: req.body.safetyCode,
            expirationTime: Date.now() + 300000,
            status: "CREATED",
            location: req.body.location,
            permissions: req.body.permissions.reduce((acc,ele) => acc[ele] = true, {})
        };
        fs.writeFile(join(__dirname,fileName), JSON.stringify(requestsDB,null,2 ), (err) => {
        if (err) res.send(err);
        else res.send('success!');
        });
    } else {
        res.send('Session already exists');
    }
}

/*
Request Body Schema
    {
        safetyCode: string,
        internalAccountID: string,
        permissions: string[]
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

  SAMPLE COMMAND
  curl -H "Content-Type: application/json" -X POST -d '{"safetyCode":"123456","internalAccountID":"efkhwr3tn43tkfewkjfnskjfn36", "permissions": ["Name", "Address", "Credit Score"]}' localhost:3000/v1/requests
*/
module.exports = {createSession : createSession};
