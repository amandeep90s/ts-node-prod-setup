import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import { getRateLimiterMongo } from '../config/rate-limit';
import { EApplicationEnvironment } from '../constant/application';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';

export default (req: Request, _res: Response, next: NextFunction) => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return next();
  }

  if (getRateLimiterMongo !== null) {
    const rateLimiter = getRateLimiterMongo();
    if (rateLimiter !== null) {
      rateLimiter
        .consume(req.ip as string, 1)
        .then(() => next())
        .catch(() => httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429));
    }
  }
};
