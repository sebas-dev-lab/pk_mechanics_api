import express from 'express';
import OwnerServices from '../services/Owner.services';
import Util from '../utils/Utils';

export default class OwnerControllers extends OwnerServices {
  constructor() {
    super();
    this.createOwnerController = this.createOwnerController.bind(this);
    this.getAllOwnerController = this.getAllOwnerController.bind(this);
    this.patchAllOwnerController = this.patchAllOwnerController.bind(this);
    this.getByOidOwnerController = this.getByOidOwnerController.bind(this);
    this.getByDataOwnerController = this.getByDataOwnerController.bind(this);
    this.deleteOwnerController = this.deleteOwnerController.bind(this);
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

  async createOwnerController(req: express.Request, res: express.Response) {
    return await this.setController(this.createOwner, res, req.body);
  }

  async getAllOwnerController(req: express.Request, res: express.Response) {
    return await this.setController(this.getOwners, res, req.body);
  }

  async patchAllOwnerController(req: express.Request, res: express.Response) {
    return await this.setController(this.updateOwner, res, {
      owid: req.params.owid,
      update: req.body,
    });
  }

  async getByOidOwnerController(req: express.Request, res: express.Response) {
    return await this.setController(this.getOwnerByOwid, res, {
      owid: req.params.owid,
    });
  }

  async getByDataOwnerController(req: express.Request, res: express.Response) {
    return await this.setController(this.getOwnerByData, res, req.query);
  }

  async deleteOwnerController(req: express.Request, res: express.Response) {
    return await this.setController(this.deleteOwner, res, {
      owid: req.params.owid,
    });
  }
}
