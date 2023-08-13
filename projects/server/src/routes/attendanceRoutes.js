const express = require("express");
const checkToken = require("../middleware/isLogin");
const {
  clockIn,
  clockOut,
  getAttendanceHistory,
} = require("../controllers/attendanceController");
const router = express.Router();

router.post("/clock-in", checkToken, clockIn);
router.post("/clock-out", checkToken, clockOut);
router.get("/history", checkToken, getAttendanceHistory);

module.exports = router;
