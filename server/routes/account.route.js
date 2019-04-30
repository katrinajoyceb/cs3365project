/**
 * @description: Calls to API
 */


const express = require('express');
const app = express();
const accountRoutes = express.Router();


let Account = require('../models/Account');

accountRoutes.route('/add').post(function (req, res) {
  let account = new Account(req.body);
  account.save()
    .then(account => {
      res.status(200).json({'account': 'account added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

accountRoutes.route('/').get(function (req, res) {
    Account.find(function (err, accounts){
    if(err){
      console.log(err);
    }
    else {
      res.json(accounts);
    }
  });
});


accountRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Account.findById(id, function (err, account){
      res.json(account);
  });
});


accountRoutes.route('/update/:id').post(function (req, res) {
    Account.findById(req.params.id, function(err, account) {
    if (!account)
      return next(new Error('Could not load Document'));
    else {
        account.userid = req.body.userid;
        account.accounttype = req.body.accounttype;
        account.balance = req.body.balance;

        account.save().then(account => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

accountRoutes.route('/delete/:id').get(function (req, res) {
    Account.findByIdAndRemove({_id: req.params.id}, function(err, account){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = accountRoutes;