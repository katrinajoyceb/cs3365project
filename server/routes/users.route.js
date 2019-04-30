/**
 * @description: Calls to API
 */


const express = require('express');
const app = express();
const usersRoutes = express.Router();

let Users = require('../models/users');

usersRoutes.route('/add').post(function (req, res) {
  let users = new Users(req.body);
  users.save()
    .then(users => {
      res.status(200).json({'users': 'users added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

usersRoutes.route('/').get(function (req, res) {
    Users.find(function (err, userss){
    if(err){
      console.log(err);
    }
    else {
      res.json(userss);
    }
  });
});
module.exports = usersRoutes;