const { rateLimit } = require("express-rate-limit");

const ratelimitConfig = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 minutes
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = ratelimitConfig;
