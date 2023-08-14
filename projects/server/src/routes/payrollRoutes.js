const express = require("express");
const checkToken = require("../middleware/isLogin");
const { getPayrollReport } = require("../controllers/payrollcontroller");
const router = express.Router();

router.get("/report/:userId/:startDate/:endDate", checkToken, getPayrollReport);

module.exports = router;
