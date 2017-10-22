const fs = require('fs');
const { join } = require('path');
const { getUserInfo } = require('../services/utils/visa-api/visa');

const fileName = '../mock-db/requests.json';

const submitResponse = function (req, res) {
  fs.readFile(join(__dirname, fileName), 'utf-8', (err, requestsDB) => {
    requestsDB = JSON.parse(requestsDB);
    const session = requestsDB[req.body.safetyCode];
    let sentPermissions = requestsDB[req.body.safetyCode].permissions;
    if (!session) res.status(500).send('no active sessions found with that code');
    Object.keys(session.permissions).forEach(name => {
      session.permissions[name] = req.body.permissions[name];
    });
    session.status = 'INPROGRESS';
    fs.writeFile(join(__dirname, fileName), JSON.stringify(requestsDB, null, 2), (err) => {
      if (err) return res.status(500).send(err);
      getUserInfo()
        .then(user => {
          user = JSON.parse(user);
          fs.readFile(join(__dirname, fileName), 'utf-8', (err, newDB) => {
            newDB = JSON.parse(newDB);
            session.userData = {};
            Object.keys(session.permissions).forEach(permission => {
              session.userData[permission] = 1;//formatData(user, permission);
              delete sentPermissions[permission];
            });
            Object.keys(sentPermissions).forEach(ele => {
                session.userData[ele] = null;
            });
            console.log(session)
            session.status = 'COMPLETE';
            fs.writeFile(join(__dirname, fileName), JSON.stringify(requestsDB, null, 2), (err) => {
              if (err) res.status(500).send(err);
              res.send('completed data fetch');
            });
          });
        })
        .catch(err => res.send(err));
    });
  });
};

const formatData = function (responseOb, permission) {
  if (permission === 'Name') return responseOb.firstName + responseOb.lastName;
  if (permission === 'address') {
    const ob = Object.assign({}, responseOb.resource.address);
    delete ob.addressLine3;
    delete ob.country;
    return Object.keys(ob).reduce((acc, ele) => `${acc} ${ob[ele]}`, '');
  }
  if (permission === 'mobileNumber' || permission === 'homeNumber') {
      permission = responseOb.resource.homeNumber;
    return `1 (${permission.slice(0, 2)}) ${permission.slice(2, 5)}-${permission.slice(5, 9)}}`;
  }
  if (permission === 'ssn') {
    return `${permission.slice(0, 3)}-${permission.slice(3, 5)}-${permission.slice(5, 9)}`;
  }
  if (permission === 'primary') {
    return permission;
  }
  if (permission === 'birthday') {
    return permission;
  }
  if (permission === 'creditRating') {
      return false;
  }
  if (permission === 'visaStanding') {
      return true;
  }
  if (permission === 'income') {
      return "$100,000+";
  }
  return null;
};


module.exports = { 
  submitResponse
};

/*
submitResponse request Body Schema
    {
        safetyCode: string,
        permissions: string[]    
    }


DB Schema
'efkhwr3tn43tkfewkjfnskjfn36': {  //internal visa user id
    'safetyCode': string,
    'expirationTime': number,
    'status': string,
    'location': number,
    'permissions': {
        'permissionName': boolean
    }
  }


  Sample post COMMAND
    curl -H 'Content-Type: application/json' -X POST -d '{'safetyCode': '171031', 'permissions': {'Address': false,'Picture': true,'Employment Status': true,'Occupation': true}}' localhost:3000/v1/submit

  */