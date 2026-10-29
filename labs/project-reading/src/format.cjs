function formatReport(report) {
  return [
    `Sessões concluídas: ${report.completedCount}`,
    `Minutos estudados: ${report.totalMinutes}`
  ].join('\n');
}

module.exports = { formatReport };
