import { StatusTr } from '../../db/interfaces/transactions.interfaces';
import { responseServices } from '../General.interfaces';

export type transactionCreateData = {
  cid: number;
  owid: number;
  svid: Array<number>;
  amount: number;
  date: Date;
  status: StatusTr;
};

export type TransactionsAttributes = {
  cid: number;
  svid: number;
  date: Date;
  status: StatusTr;
};

export type transactionByData = {
  status?: StatusTr;
  owid?: Array<any>;
  cid?: number;
};

export type updateTransactionByData = {
    status?: StatusTr;
    sids?: Array<any>;
    amount?: number;
  };

export type transactionsToUpdateData = {
  tid: string;
  update: any;
};

export type indexData = {
  [key: string]: string;
};

export default interface TransactionsInterface {
  createTransactionService: (
    data: transactionCreateData
  ) => Promise<responseServices>;
  getByDataServices: (data: transactionByData) => Promise<responseServices>;
  updateServices: (data: transactionsToUpdateData) => Promise<responseServices>;
}
