const express = require("express");
const router = express.Router();
const { users } = require("../controllers/index");

router.post("/register", users.register_account);
router.post("/login", users.login_account);
router.post("/changepassword", users.change_password);

module.exports = router;
