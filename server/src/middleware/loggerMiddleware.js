const { log } = require('../utils/logger');

const requestLogger = (req, res, next) => {
  log(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { requestLogger };
