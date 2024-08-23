import { Request } from 'express';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import responseMessage from '../constant/responseMessage';
import { THttpError } from '../types/types';
import logger from './logger';

export default (error: Error, req: Request, errorStatusCode: number = 500): THttpError => {
  const errorObj: THttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip ?? null,
      method: req.method,
      url: req.originalUrl
    },
    message:
      error instanceof Error
        ? error.message || responseMessage.SOMETHING_WENT_WRONG
        : responseMessage.SOMETHING_WENT_WRONG,
    data: null,
    trace: error instanceof Error ? { error: error.stack } : null
  };

  // Log
  logger.error('CONTROLLER_ERROR', { meta: errorObj });

  // Production ENV check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
    delete errorObj.trace;
  }

  return errorObj;
};
