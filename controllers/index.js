const controllers = {};

controllers.users = require("./users");
controllers.profile_user = require("./profile_user");
controllers.transcript = require("./transcripts");

module.exports = controllers;
