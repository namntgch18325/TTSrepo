const router = require('express').Router();
const Controller = require("../Controller/tts.controller.js");

router.get("/getMp3WihtTimestam",Controller.getMp3WihtTimestam);
router.get("/getOnlyMp3",Controller.getOnlyMP3);
router.post("/callbackurl",Controller.CallBackUrl);

module.exports = router;