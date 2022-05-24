import { responseServices } from "../General.interfaces";

export type servicesCreateData = {
    pid: Array<number>;
    active: boolean;
    name: string;
    amount: number;
}

export type servicesToUpdateData = {
    sid: string,
    update: any,
}


export type indexData = {
    [key: string]: string;
}

export type servicesByidData = {
    sid: string;
}

export type serviceToUpdatePolicyData = {
    sid: string;
    policy : Array<number>;
}

export default interface ServicesInterface {
    createServices:(data: servicesCreateData) => Promise<responseServices>;
    getByIdServices: (data: servicesByidData) => Promise<responseServices>;
    getAllServices: () => Promise<responseServices>;
    updateServices: (data: servicesToUpdateData) => Promise<responseServices>;
    updatePolicyServices: (data: serviceToUpdatePolicyData) => Promise<responseServices>;
    deleteServices: (data: servicesByidData) => Promise<responseServices>;
}