/**
 * @description: Schema for Account
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Account = new Schema({
    userid: {
        type: String
    },
    accounttype: {
        type: String
    },
    balance: {
         type: Number
    }

},{
    collection: 'account'
});

module.exports = mongoose.model('Account', Account);