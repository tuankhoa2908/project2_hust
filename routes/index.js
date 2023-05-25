var express = require("express");
var router = express.Router();

const users = require("./users");
const profile_user = require("./profile_user");
const transcript = require("./transcript");

router.use("/api/users", users);
router.use("/api/profile", profile_user);
router.use("/api/transcript", transcript);

module.exports = router;
