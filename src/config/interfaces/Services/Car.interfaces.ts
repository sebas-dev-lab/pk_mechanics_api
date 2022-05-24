import { responseServices } from "../General.interfaces";

export type carCreateData = {
    brand: string;
    model: string;
    year: string;
    patent: string;
    color: string;
    owid: string;
}

export type carToUpdateData = {
    brand?: string;
    model?: string;
    year?: string;
    patent?: string;
    color?: string;
    owid: string;
    cid: string;
}

export type indexData = {
    [key: string]: string;
}

export type carToByCidData = {
    cid: string;
    owid: string;
}

export type carOwnerByOwidData = {
    owid: string;
}

export default interface CarServicesInterface {
    createCar:(data: carCreateData) => Promise<responseServices>;
    updateCar: (data: carToUpdateData) => Promise<responseServices>;
    deleteCar: (data: carToByCidData) => Promise<responseServices>;
    getAllOwnerCar: (data: carOwnerByOwidData) => Promise<responseServices>;
    getOneByCidCar: (data: carToByCidData) => Promise<responseServices>;
    getAllCar: () => Promise<responseServices>;
}