import express from 'express';
import CarServices from '../services/Car.services';
import Util from '../utils/Utils';

export default class CarControllers extends CarServices {
  constructor() {
    super();
    this.createCarControllers = this.createCarControllers.bind(this);
    this.getOwenerCarsControllers = this.getOwenerCarsControllers.bind(this);
    this.getOwenerCarByCidControllers = this.getOwenerCarByCidControllers.bind(this);
    this.getAllCarsControllers = this.getAllCarsControllers.bind(this);
    this.deleteCarsControllers = this.deleteCarsControllers.bind(this);
    this.updateCarsControllers = this.updateCarsControllers.bind(this);
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

  async createCarControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.createCar, res, { owid: req.params.owid, ...req.body });
  }

  async getOwenerCarsControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.getAllOwnerCar, res, { owid: req.params.owid });
  }

  async getOwenerCarByCidControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.getOneByCidCar, res, { cid: req.query.car, owid: req.params.owid });
  }

  async getAllCarsControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.getAllCar, res);
  }

  async deleteCarsControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.deleteCar, res, { cid: req.query.car, owid: req.params.owid });
  }

  async updateCarsControllers(req: express.Request, res: express.Response) {
    return await this.setController(this.updateCar, res, {...req.body, cid: req.query.car, owid: req.params.owid });
  }



}
