const express = require("express");

const router = express.Router();

const { seedCountries } = require("../controllers/seedController");

router.post("/seed", seedCountries);

module.exports = router;