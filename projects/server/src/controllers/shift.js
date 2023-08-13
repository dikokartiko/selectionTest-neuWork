const updateSchedule = async (req, res) => {
  const { userId } = req.params;
  const { clockIn, clockOut, workday } = req.body;

  try {
    // Find the user's schedule
    const schedule = await Schedule.findOne({ where: { userId } });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    // Update the schedule
    await Schedule.update(
      { clockIn, clockOut, workday },
      { where: { userId } }
    );

    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
