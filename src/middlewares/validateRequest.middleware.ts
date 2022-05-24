import express from 'express';
import { responseServices } from '../config/interfaces/General.interfaces';
import Envconfig from '../config/server/Envconfig';
import Util from '../utils/Utils';

export default class ValidateMiddlewares extends Envconfig {
  response: responseServices;

  constructor() {
    super();
    this.response = { error: false, status: {}, data: {} };
    this.validateKeysMiddleware = this.validateKeysMiddleware.bind(this);
  }

  async validateKeysMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const header = req.headers;
      if (!header.hasOwnProperty('x-server-key') || !header['x-server-key']) throw new Error('401');
      if (header["x-server-key"] !== this.server_key) throw new Error('401')

    } catch (e: any) {
      Util.setError(401, "Unauthorized.");
      return Util.send(res);
    }
    next();
  }
}
