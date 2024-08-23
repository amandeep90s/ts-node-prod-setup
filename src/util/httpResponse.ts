/* eslint-disable no-console */
import { Request, Response } from 'express';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { THttpResponse } from '../types/types';

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
  console.info('CONTROLLER_RESPONSE', { meta: response });

  // Production ENV check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip;
  }

  res.status(responseStatusCode).json(response);
};
