/**
 * @description: Schema for User
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    username: String,
    password: String
   
},{
    collection: 'users'
});

module.exports = mongoose.model('Users', Users);


