const express = require("express");
const router = express();

const { profile_user } = require("../controllers/index");

router.post("/create", profile_user.create_profile);
router.get("/getinfo", profile_user.get_profile);

module.exports = router;
