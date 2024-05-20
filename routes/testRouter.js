const express = require("express");
const testController = require("../controllers/testController");

const router = express.Router();

router.get("", testController.getTest);

module.exports = router;
