import express from 'express';
import PolicyServices from '../services/Policy.services';
import Util from '../utils/Utils';

export default class PolicyControllers extends PolicyServices {
  constructor() {
    super();
    this.createPolicyController = this.createPolicyController.bind(this);
    this.getAllPoliciesController = this.getAllPoliciesController.bind(this);
    this.patchPolicyController = this.patchPolicyController.bind(this);
    this.getPolicyByIdController = this.getPolicyByIdController.bind(this);
    this.deletePolicyController = this.deletePolicyController.bind(this);
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

  async createPolicyController(req: express.Request, res: express.Response) {
    return await this.setController(this.createPolicy, res, req.body);
  }

  async getAllPoliciesController(req: express.Request, res: express.Response) {
    return await this.setController(this.getPolicies, res, req.body);
  }

  async patchPolicyController(req: express.Request, res: express.Response) {
    return await this.setController(this.updatePolicy, res, {
      pid: req.params.pid,
      update: req.body,
    });
  }

  async getPolicyByIdController(req: express.Request, res: express.Response) {
    return await this.setController(this.getPolicyById, res, {
      pid: req.params.pid,
    });
  }

  async deletePolicyController(req: express.Request, res: express.Response) {
    return await this.setController(this.deletePolicy, res, {
      pid: req.params.pid,
    });
  }
}
