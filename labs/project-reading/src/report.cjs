function createReport(sessions) {
  const completed = sessions.filter(session => session.status === 'completed');
  const totalMinutes = completed.length === 0
    ? 0
    : completed.reduce((total, session) => total + session.minutes, 0);

  return {
    completedCount: completed.length,
    totalMinutes
  };
}

module.exports = { createReport };
