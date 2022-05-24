import { responseServices } from '../General.interfaces';

export type ownerdata = {
  name: string;
  lastname: string;
  dni: string;
  cellphone: string;
  email: string;
};

export type ownerToUpdate = {
  name?: string;
  lastname?: string;
  dni?: string;
  cellphone?: string;
  email?: string;
};

export type ownerUpData = {
  owid: string;
  update: ownerToUpdate;
};

export type ownerOwidData = {
  owid: string;
};

export type ownerByData = {
  dni?: string;
  cellphone?: string;
  email?: string;
}

export default interface OwnerServiceInterface {
  createOwner(data: ownerdata): Promise<responseServices>;
  getOwnerByOwid(data: ownerOwidData): Promise<responseServices>;
  getOwnerByData(data: ownerByData): Promise<responseServices>;
  getOwners(): Promise<responseServices>;
  updateOwner(data: ownerUpData): Promise<responseServices>;
  deleteOwner(data: ownerOwidData): Promise<responseServices>;
}
