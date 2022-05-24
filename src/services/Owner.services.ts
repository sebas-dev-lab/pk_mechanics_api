import db from '../config/db/models';
import { responseServices } from '../config/interfaces/General.interfaces';
import OwnerServiceInterface, {
  ownerByData,
  ownerdata,
  ownerOwidData,
  ownerUpData,
} from '../config/interfaces/Services/Owner.interfaces';
import { getStatus } from '../helpers/statuscode.helpers';

/**
 * @class OwnerServices
 */
export default class OwnerServices implements OwnerServiceInterface {
  response: responseServices;
  ownerByData: string[];

  constructor() {
    this.response = { error: false, status: {}, data: {} };
    this.ownerByData = ['dni', 'cellphone', 'email'];
    this.createOwner = this.createOwner.bind(this);
    this.getOwners = this.getOwners.bind(this);
    this.updateOwner = this.updateOwner.bind(this);
    this.getOwnerByOwid = this.getOwnerByOwid.bind(this);
    this.getOwnerByData = this.getOwnerByData.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);
  }

  setResponse(code: string, error: boolean, data?: any) {
    this.response.data = data;
    this.response.error = error;
    this.response.status = getStatus(code);
    return this.response;
  }

  /**
   * @method createOwner
   */
  async createOwner({
    name,
    lastname,
    dni,
    cellphone,
    email,
  }: ownerdata): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      if (!name || !lastname || !dni || !cellphone || !email) {
        throw new Error('400');
      }

      const controlOwner = await db.Owners.findOne({
        where: {
          dni,
        },
      });

      if (controlOwner) throw new Error('403');

      const newOwner = await db.Owners.create({
        name,
        dni,
        lastname,
        cellphone,
        email,
      });

      delete newOwner.dataValues.id;
      return this.setResponse('201', false, newOwner);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  /**
   * @method getOwners
   */
  async getOwners(): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try {
      const owners = await db.Owners.findAll({
        attributes: ['oid', 'name', 'lastname', 'email', 'cellphone', 'active'],
      });
      if (!owners) {
        throw new Error('404');
      }
      return this.setResponse('200', false, owners);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async updateOwner({ owid, update }: ownerUpData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      const controlone = await db.Owners.findOne({
        where: {
          oid: owid,
        },
      });

      if (!controlone) throw new Error('404');
      const owners = await db.Owners.update(update, {
        where: {
          oid: owid,
        },
      });
      return this.setResponse('200', false, owners);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async getOwnerByOwid({ owid }: ownerOwidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      const owner = await db.Owners.findOne({
        where: {
          oid: owid,
        },
        attributes: ['name', 'lastname', 'email', 'cellphone', 'active'],
      });

      if (!owner) throw new Error('404');

      return this.setResponse('200', false, owner);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async getOwnerByData(data: ownerByData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      if (Object.keys(data).length > 1) {
        throw new Error('400');
      }
      const map = Object.entries(data);
      const [key, value] = map[0];

      if (!this.ownerByData.includes(key)) {
        throw new Error('403');
      }
      const owner = await db.Owners.findAll({
        where: {
          [key]: value,
        },
        attributes: ['name', 'lastname', 'email', 'cellphone', 'active'],
      });

      if (!owner) throw new Error('404');

      return this.setResponse('200', false, owner);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async deleteOwner({ owid }: ownerOwidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      const controlone = await db.Owners.findOne({
        where: {
          oid: owid,
        },
      });

      if (!controlone) throw new Error('404');
      await db.Owners.destroy({
        where: {
          oid: owid,
        },
      });
      const controltwo = await db.Owners.findOne({
        where: {
          oid: owid,
        },
      });

      if (controltwo) throw new Error('409');

      return this.setResponse('200', false, null);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }
}
