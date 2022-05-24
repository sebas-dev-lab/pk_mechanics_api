import express from 'express';
import TransactionsServices from '../services/Transactions.services';
import Util from '../utils/Utils';

export default class TransactionControllers extends TransactionsServices {
  constructor() {
    super();
    this.createTransactionControllers = this.createTransactionControllers.bind(this);
    this.getByDataServicesControllers = this.getByDataServicesControllers.bind(this);
    this.getTransactionByIdControllers = this.getTransactionByIdControllers.bind(this);
    this.updateTransactionController = this.updateTransactionController.bind(this);


    this.setController = this.setController.bind(this);
  }

  setResponseController(status: any, error: boolean, data?: any) {
    if (!error) {
      Util.setSuccess(status.code, status.message, data);
    } else {
      Util.setError(status.code, status.message);
    }
  }

  async setController(func: any, res: express.Response, content?: any) {
    try {
      let { status, error, data } = await func(content);
      this.setResponseController(status, error, data);
    } catch (e: any) {
      Util.setError(400, e.message);
    }
    return Util.send(res);
  }

  async createTransactionControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.createTransactionService, res, req.body);
  }

  async getByDataServicesControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.getByDataServices, res, req.body);
  }

  async getTransactionByIdControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.getTransactionById, res, {tid: req.params.tid});
  }  
  
  async updateTransactionController(req: express.Request, res: express.Response) {
    return await this.setController(this.updateServices, res, { update: req.body, tid: req.params.tid });
  }
}
