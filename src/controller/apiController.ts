import { NextFunction, Request, Response } from 'express';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';
import httpResponse from '../util/httpResponse';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponse(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      httpError(next, error as Error, req, 500);
    }
  }
};
