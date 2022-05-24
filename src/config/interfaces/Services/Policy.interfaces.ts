import { enumPermissions, enumPolicy } from '../../db/interfaces/policy.interfaces';
import { responseServices } from '../General.interfaces';

export type policydata = {
    active: boolean;
    type: enumPolicy;
    title: string;
    description: string;
    permission:enumPermissions;
};

export type policyToUpdate = {
    active?: boolean;
    type?: enumPolicy;
    title?: string;
    description?: string;
    permission?:enumPermissions;
};

export type policyUpData = {
  pid: string;
  update: policyToUpdate;
};

export type policyByIdData = {
  pid: string;
};

export default interface PolicyInterfaces {
  createPolicy(data: policydata): Promise<responseServices>;
  getPolicyById(data: policyByIdData): Promise<responseServices>;
  getPolicies(): Promise<responseServices>;
  updatePolicy(data: policyUpData): Promise<responseServices>;
  deletePolicy(data: policyByIdData): Promise<responseServices>;
}
