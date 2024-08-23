import { Request, Response } from 'express';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { THttpResponse } from '../types/types';
import logger from './logger';

export default (
  req: Request,
  res: Response,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null
) => {
  const response: THttpResponse = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip ?? null,
      method: req.method,
      url: req.originalUrl
    },
    message: responseMessage,
    data
  };

  // Log
  logger.info('CONTROLLER_RESPONSE', { meta: response });

  // Production ENV check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip;
  }

  res.status(responseStatusCode).json(response);
};
