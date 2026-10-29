const sessions = require('./data/sessions.cjs');
const { formatReport } = require('./format.cjs');
const { createReport } = require('./report.cjs');

const report = createReport(sessions);
process.stdout.write(`${formatReport(report)}\n`);
