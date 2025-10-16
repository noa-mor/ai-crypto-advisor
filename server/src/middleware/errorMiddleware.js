const { error } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  error(err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

module.exports = { errorHandler };
