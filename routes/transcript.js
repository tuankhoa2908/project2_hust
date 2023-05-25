const express = require("express");
const router = express();
const { transcript } = require("../controllers/index");

router.post("/inputscore", transcript.input_module_score);
router.get("/gettranscript", transcript.get_transcript);

module.exports = router;
