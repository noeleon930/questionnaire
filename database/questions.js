var db = require('./connect_db');

var questions = db.collection('questions');

module.exports = questions;
