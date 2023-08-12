const express = require("express");
const { register } = require("../controllers/auth");
const { registerValidation } = require("../middleware/register");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.post("/register", registerValidation, isAdmin, register);

module.exports = router;
