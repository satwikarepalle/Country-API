const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
    validateCountry
} = require("../middleware/validation");

const {
    createCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry
} = require("../controllers/countryController");

router.post("/", auth, validateCountry, createCountry);

router.get("/", getCountries);

router.get("/:id", getCountryById);

router.put("/:id", auth, validateCountry, updateCountry);

router.delete("/:id", auth, deleteCountry);

module.exports = router;