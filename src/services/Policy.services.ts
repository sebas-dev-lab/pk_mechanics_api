import db from '../config/db/models';
import { responseServices } from '../config/interfaces/General.interfaces';
import PolicyInterfaces, {
  policyByIdData,
  policydata,
  policyUpData,
} from '../config/interfaces/Services/Policy.interfaces';
import { getStatus } from '../helpers/statuscode.helpers';
import ControlServices from '../utils/Controls.services.utils';

export default class PolicyServices implements PolicyInterfaces {
  response: responseServices;

  constructor() {
    this.response = { error: false, status: {}, data: {} };
    this.createPolicy = this.createPolicy.bind(this);
    this.getPolicyById = this.getPolicyById.bind(this);
    this.getPolicies = this.getPolicies.bind(this);
    this.updatePolicy = this.updatePolicy.bind(this);
    this.deletePolicy = this.deletePolicy.bind(this);
  }

  setResponse(code: string, error: boolean, data?: any) {
    this.response.data = data;
    this.response.error = error;
    this.response.status = getStatus(code);
    return this.response;
  }
  async createPolicy({ title, description, permission, type, active }: policydata): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    try {
        if (!title || !description || !permission || !type) {
            throw new Error('400');
        }
        if (!ControlServices.policyDataControl({ title, description, permission, type, })) {
            throw new Error('400')
        }

        const controlTitle = await db.Policy.findOne({ where:{ title } })
       
        if (controlTitle) throw new Error('403')
       
        const newPolicy = await db.Policy.create({ title, description, permission, type, active: active ? active : true })

        return this.setResponse('201', false, newPolicy);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async getPolicyById({ pid }: policyByIdData): Promise<responseServices> {
    try {
      if (!pid) throw new Error('400')

      const policy = await db.Policy.findOne({ where: { id: pid }, attributes: ['id', 'type', 'title', 'description', 'active', 'permission'] })

      if (!policy)throw new Error('404')  

      return this.setResponse('200', false, policy);
    } catch (e: any) {
      console.log(e);
      return this.setResponse(e.message, true);
    }
  }

  async getPolicies(): Promise<responseServices> {
    try {
      const policies = await db.Policy.findAll({attributes: ['id', 'type', 'title', 'description', 'active', 'permission']})

      return this.setResponse('200', false, policies);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }

  async updatePolicy({ pid, update }: policyUpData): Promise<responseServices> {
    try {
      if (!pid || !update) throw new Error('400')

      if (!ControlServices.policyDataControl(update)) throw new Error('400');

      const control = await db.Policy.findOne({ where: { id: pid } })
         
      if (!control) throw new Error('404')
   
      const updatePolicy = await db.Policy.update(update, { where: { id: pid } })

      return this.setResponse('200', false, updatePolicy);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }
  
  async deletePolicy({ pid }: policyByIdData): Promise<responseServices> {
    try {
      if (!pid) throw new Error('400');

      const control = await db.Policy.findOne({ where: { id: pid } })
         
      if (!control) throw new Error('404')

      await db.Policy.destroy({ where: { id: pid } })

      const controldelete = await db.Policy.findOne({ where: { id: pid } })
         
      if (controldelete) throw new Error('409')
   
      return this.setResponse('200', false, null);
    } catch (e: any) {
      return this.setResponse(e.message, true);
    }
  }
}
