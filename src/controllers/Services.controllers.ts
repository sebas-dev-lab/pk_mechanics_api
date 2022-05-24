import express from 'express';
import ServicesService from '../services/Services.services';
import Util from '../utils/Utils';

export default class ServicesControllers extends ServicesService {
  constructor() {
    super();
    this.createServicesController = this.createServicesController.bind(this);
    this.getAllPoliciesController = this.getAllPoliciesController.bind(this);
    this.patchServicesController = this.patchServicesController.bind(this);
    this.patchPolicyServicesController = this.patchPolicyServicesController.bind(this);
    this.getServicesByIdController = this.getServicesByIdController.bind(this);
    this.deleteServicesController = this.deleteServicesController.bind(this);
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

  async createServicesController(req: express.Request, res: express.Response) {
    return await this.setController(this.createServices, res, req.body);
  }

  async getAllPoliciesController(req: express.Request, res: express.Response) {
    return await this.setController(this.getAllServices, res, req.body);
  }

  async patchServicesController(req: express.Request, res: express.Response) {
    return await this.setController(this.updateServices, res, {
      sid: req.params.sid,
      update: req.body,
    });
  }
  
  async patchPolicyServicesController(req: express.Request, res: express.Response) {
    return await this.setController(this.updatePolicyServices, res, {
      sid: req.params.sid,
      policy: req.body?.policy || [],
    });
  }

  async getServicesByIdController(req: express.Request, res: express.Response) {
    return await this.setController(this.getByIdServices, res, {
      sid: req.params.sid,
    });
  }

  async deleteServicesController(req: express.Request, res: express.Response) {
    return await this.setController(this.deleteServices, res, {
      sid: req.params.sid,
    });
  }
}
