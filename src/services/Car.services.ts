import db from '../config/db/models';
import { responseServices } from '../config/interfaces/General.interfaces';
import CarServicesInterface, {
  carCreateData,
  carOwnerByOwidData,
  carToByCidData,
  carToUpdateData,
  indexData,
} from '../config/interfaces/Services/Car.interfaces';
import { getStatus } from '../helpers/statuscode.helpers';
import ControlServices from '../utils/Controls.services.utils';

export default class CarServices implements CarServicesInterface {
  response: responseServices;

  constructor() {
    this.response = { error: false, status: {}, data: {} };
    this.createCar = this.createCar.bind(this);
    this.getAllOwnerCar = this.getAllOwnerCar.bind(this);
    this.getOneByCidCar = this.getOneByCidCar.bind(this);
    this.getAllCar = this.getAllCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.updateCar = this.updateCar.bind(this);
  }

  setResponse(code: string, error: boolean, data?: any) {
    this.response.data = data;
    this.response.error = error;
    this.response.status = getStatus(code);
    return this.response;
  }

  async createCar({
    brand,
    model,
    year,
    patent,
    color,
    owid,
  }: carCreateData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try {
      if (!brand || !model || !year || !patent || !color || !owid) {
        throw new Error('400');
      }
      if (!ControlServices.createCarPropsControl({ brand, model, year, patent, color, owid, })) {
        throw new Error('400');
      }

      const controlOwner = await db.Owners.findOne({
        where: {
          oid: owid,
        },
        attributes: ['id'],
      });

      if (!controlOwner) throw new Error('404');

      const controlCar = await db.Car.findOne({
        where: {
          patent,
        },
      });
      console.log(controlCar)
      if (controlCar) throw new Error('403');

      const newCar = await db.Car.create({
        brand,
        model,
        year,
        patent,
        color,
        owid: controlOwner.dataValues.id,
      });

      delete newCar.dataValues.id;
      return this.setResponse('201', false, newCar);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }
  async updateCar(data: carToUpdateData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try{
      if (Object.keys(data).length === 0) throw new Error('400')
      let updateObj : indexData = {};
      Object.entries(data).forEach(([key, value]) => {
        if (!ControlServices.genericCharactersValidationForm(value)) throw new Error('400');
        if (!value && value.length === 0 ) throw new Error('400');
        if (key !== 'cid' && key !== 'owid') updateObj[key] = value; 
      }) 

      const controlOwner = await db.Owners.findOne({
        where: {
          oid: data.owid,
        },
        attributes: ['oid'],
        include: [
          {
            model: db.Car,
            foreignkeys: 'owid',
            where: { cid: data.cid },
            attributes: ['cid', 'model', 'patent', 'brand', 'color', 'year']
          },
        ],
      });

      if (!controlOwner) throw new Error('404');
      if (controlOwner.dataValues.Cars.length === 0) throw new Error('404')
      
      const carUpdate = await db.Car.update(updateObj, {
        where: {
          cid: data.cid
        }
      })

      return this.setResponse('200', false, carUpdate);
    }catch(e:any){
      return this.setResponse(e.message, true);
    }
  }
  async deleteCar({ cid, owid }: carToByCidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try{
      if (!cid || !ControlServices.genericIdValidation(cid)) throw new Error('403')
      if (!owid || !ControlServices.genericIdValidation(owid)) throw new Error('403')

      const controlOwner = await db.Owners.findOne({
        where: {
          oid: owid,
        },
        attributes: ['oid'],
        include: [
          {
            model: db.Car,
            foreignkeys: 'owid',
            where: { cid },
            attributes: ['cid', 'model', 'patent', 'brand', 'color', 'year']
          },
        ],
      });

      if (!controlOwner) throw new Error('404');
      if (controlOwner.dataValues.Cars.length === 0) throw new Error('404')

      await db.Car.destroy({
        where: {
          cid,
        },
      })

      const controlCar = await db.Car.findOne({
        where: {
          cid,
        },
      })

      if (controlCar) throw new Error('409');

      return this.setResponse('200', false, controlCar);
    }catch(e:any){

      return this.setResponse(e.message, true);
    }
  }

  async getAllOwnerCar({ owid }: carOwnerByOwidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      if (!owid || !ControlServices.genericIdValidation(owid)) throw new Error('403')

      const controlOwner = await db.Owners.findOne({
        where: {
          oid: owid,
        },
        attributes: ['oid'],
        include: [
          {
            model: db.Car,
            foreignkeys: 'owid',
            attributes: ['cid', 'model', 'patent', 'brand', 'color', 'year']
          },
        ],
      });

      if (!controlOwner) throw new Error('404');

      return this.setResponse('200', false, controlOwner);
    }catch(e:any){

      return this.setResponse(e.message, true);
    }
  }

  async getOneByCidCar({ cid, owid }: carToByCidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try{
      if (!cid || !ControlServices.genericIdValidation(cid)) throw new Error('403')
      if (!owid || !ControlServices.genericIdValidation(owid)) throw new Error('403')


      const controlOwner = await db.Owners.findOne({
        where: {
          oid: owid,
        },
        attributes: ['oid'],
        include: [
          {
            model: db.Car,
            foreignkeys: 'owid',
            where: { cid },
            attributes: ['cid', 'model', 'patent', 'brand', 'color', 'year'],
          },
        ],
      });

      if (!controlOwner) throw new Error('404');

      return this.setResponse('200', false, controlOwner);
    }catch(e:any){

      return this.setResponse(e.message, true);
    }
  }

  async getAllCar(): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try{

      const cars = await db.Car.findAll({
        attributes: ['cid', 'model', 'patent', 'brand', 'color', 'year'],
      });

      if (!cars) throw new Error('404');

      return this.setResponse('200', false, cars);
    }catch(e:any){

      return this.setResponse(e.message, true);
    }
  }
}
