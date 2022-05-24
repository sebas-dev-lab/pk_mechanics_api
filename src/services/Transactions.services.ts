import { StatusTr } from '../config/db/interfaces/transactions.interfaces';
import db from '../config/db/models';
import { responseServices } from '../config/interfaces/General.interfaces';
import TransactionsInterface, {
  transactionByData,
  transactionCreateData,
  transactionsToUpdateData,
  updateTransactionByData,
} from '../config/interfaces/Services/Transactions.interfaces';
import { getStatus } from '../helpers/statuscode.helpers';
import ControlServices from '../utils/Controls.services.utils';
import PolicyValidation, { validateObject } from '../utils/PolicyValidation.utils';

export default class TransactionsServices implements TransactionsInterface {
  response: responseServices;

  constructor() {
    this.response = { error: false, status: {}, data: {} };
    this.createTransactionService = this.createTransactionService.bind(this);
    this.getByDataServices = this.getByDataServices.bind(this);
    this.updateServices = this.updateServices.bind(this);
    this.getTransactionById = this.getTransactionById.bind(this);
  }
  async createTransactionService(
    data: transactionCreateData
  ): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      if (!ControlServices.transactionDataControl(data)) throw new Error('400');

      const owControl = await db.Owners.findOne({
        where: {
          oid: data.owid,
        },
      });
      if (!owControl) throw new Error('404');

      const crControl = await db.Car.findOne({
        where: {
          cid: data.cid,
        },
      });
      if (!crControl) throw new Error('404');

      const srvs: Array<any> = [];
      let amount = 0;
      for (let i in data.svid) {
        let svControl = await db.Service.findOne({
          where: {
            id: data.svid[i],
          },
          include: [{
              model: db.Policy,
              attributes: ["type", "title", "description", "permission"]
          }]
        });
        if (!svControl) throw new Error('404');
        srvs.push(svControl);
        amount += svControl.dataValues.amount;
      }

      const validate: validateObject = PolicyValidation.validateCreateTransaction(srvs, crControl);

      if (!validate.isValid) {
        return this.setResponse('403', true);
      }

      console.log(data)
      const newTransaction = await db.Transactions.create({
        cid: crControl.dataValues.id,
        owid: owControl.dataValues.id,
        sids: data.svid,
        amount,
        date: new Date(),
        status: StatusTr.a,
      });

      await newTransaction.addServices(srvs);

      const trControl = await db.Transactions.findOne({
        where: {
          id: newTransaction.dataValues.id,
        },
        attributes: ['amount', 'status', 'date'],
        include: [{
            model: db.Service,
            attributes: ['sid', 'active', 'amount', 'name',],
            include: [{
                model: db.Policy,
                attributes: ['type', 'title', 'description', 'active', 'permission']
            }]
        }]
      });

      return this.setResponse('201', false, trControl);
    } catch (e: any) {
      console.log(e);
      return this.setResponse(e.message, true);
    }
  }

  async getByDataServices({
    owid,
    cid,
    status,
  }: transactionByData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      let owControl = null;
      let where: transactionByData = {};

      if (owid) {
        owControl = await db.Owners.findOne({
          where: {
            oid: owid,
          },
        });
        if (!owControl) throw new Error('404');
        where.owid = owControl.dataValues.id;
      }
      if (cid) {
        const crControl = await db.Car.findOne({
          where: {
            cid: cid,
          },
        });
        if (!crControl) throw new Error('404');
        where.cid = crControl.dataValues.id;
      }
      if (status) {
        where.status = status;
      }

      const trControl = await db.Transactions.findAll({
        where: where,
        attributes: ['id', 'amount', 'sids', 'status', 'date'],
        include: [
          {
            model: db.Service,
            attributes: ['active', 'name', 'amount'],
          },
        ],
      });

      return this.setResponse('200', false, trControl);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async updateServices({
    tid,
    update,
  }: transactionsToUpdateData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      if (!tid || !update) throw new Error('400');
      const k = Object.keys(update);
      const test = ['status', 'svids', 'amount'];
      const testStatus = ['a', 'c', 'f'];

      for (let t in k) {
        if (!test.includes(k[t])) throw new Error('400');
      }
      const transaction = await db.Transactions.findOne({
        where: {
          id: tid,
        },
      });
      if (!transaction) throw new Error('404');

      const toUpdate: updateTransactionByData = {};

      if (update.hasOwnProperty('status')) {
        if (!testStatus.includes(update.status.toLowerCase())) {
          throw new Error('400');
        }
        const st = update.status.toLowerCase();
        toUpdate.status =
          st === 'a' ? StatusTr.a : st === 'c' ? StatusTr.c : StatusTr.f;
      }

      const srvs: Array<any> = [];
      if (update.svids) {
        let amount = 0;
        for (let i in update.svids) {
          let svControl = await db.Service.findOne({
            where: {
              id: update.svids[i],
            },
          });
          if (!svControl) throw new Error('404');
          srvs.push(svControl);
          amount += svControl.dataValues.amount;
        }
        toUpdate.sids = update.svids;
        toUpdate.amount = amount;
      }

      const upd = await db.Transactions.update(toUpdate, {
        where: { id: tid },
      });

      if (update.svids) {
        await transaction.setServices([]);
        await transaction.addServices(srvs);
      }

      return this.setResponse('200', false, upd);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async getTransactionById({
    tid,
  }: transactionsToUpdateData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };

    try {
      if (!tid) throw new Error('400');
      const transaction = await db.Transactions.findOne({
        where: {
          id: tid,
        },
        attributes: ['amount', 'sids', 'status', 'date'],
        include: [
          {
            model: db.Service,
            attributes: ['active', 'name', 'amount'],
          },
        ],
      });
      if (!transaction) throw new Error('404');

      return this.setResponse('200', false, transaction);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  setResponse(code: string, error: boolean, data?: any) {
    this.response.data = data;
    this.response.error = error;
    this.response.status = getStatus(code);
    return this.response;
  }
}
