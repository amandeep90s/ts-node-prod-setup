import { NextFunction, Request, Response } from 'express';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';
import httpResponse from '../util/httpResponse';
import quicker from '../util/quicker';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponse(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      httpError(next, error as Error, req, 500);
    }
  },
  health: (req: Request, res: Response, next: NextFunction) => {
    try {
      const health = {
        application: quicker.getApplicationHealth(),
        system: quicker.getSystemHealth(),
        timestamp: Date.now()
      };
      httpResponse(req, res, 200, responseMessage.SUCCESS, health);
    } catch (error) {
      httpError(next, error as Error, req, 500);
    }
  }
};
