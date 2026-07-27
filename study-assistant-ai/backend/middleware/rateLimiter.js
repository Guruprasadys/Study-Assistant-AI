import rateLimit from "express-rate-limit";

/**
 * Azure OpenAI API Rate Limiter
 *
 * Limits each IP to 20 requests per minute.
 */

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute

  max: 20,

  standardHeaders: true,

  legacyHeaders: false,

  skipSuccessfulRequests: false,

  message: {
    success: false,
    retry: true,
    error: "Too many requests. Please wait 1 minute before trying again."
  },

  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      retry: true,
      error: options.message.error,
      retryAfter: Math.ceil(options.windowMs / 1000)
    });
  }
});