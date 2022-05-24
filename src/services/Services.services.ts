import db from '../config/db/models';
import { responseServices } from '../config/interfaces/General.interfaces';
import ServicesInterface, { servicesByidData, servicesCreateData, servicesToUpdateData, serviceToUpdatePolicyData } from '../config/interfaces/Services/Services.interfaces';
import { getStatus } from '../helpers/statuscode.helpers';
import ControlServices from '../utils/Controls.services.utils';

export default class ServicesService implements ServicesInterface {
    response: responseServices;

    constructor() {
        this.response = { error: false, status: {}, data: {} };
        this.createServices = this.createServices.bind(this);
        this.getByIdServices = this.getByIdServices.bind(this);
        this.getAllServices = this.getAllServices.bind(this);
        this.updateServices = this.updateServices.bind(this);
        this.deleteServices = this.deleteServices.bind(this);
        this.updatePolicyServices = this.updatePolicyServices.bind(this);
      }
  async createServices (data: servicesCreateData): Promise<responseServices>  {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      if (!ControlServices.servicesDataControl(data)) throw new Error('400');

      const control = await db.Service.findOne({ where: { name: data.name }})
      if (control) throw new Error('403');

      const newService = await db.Service.create(data);

      const s = await db.Service.findOne({ where: { id: newService.dataValues.id }})

      let p : Array<any> = [];
      for (let i in data.pid) {
        const policy = await db.Policy.findOne({ where: { id: data.pid[i] }})
        p.push(policy)
      }

      await s.addPolicies(p)
      const f = await s.getPolicies()

      return this.setResponse('201', false, f);
    }catch(e:any){
      return this.setResponse(e.message, true);

    }
  }

  async getByIdServices ({ sid }: servicesByidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      if (!sid) throw new Error('400');
      const service = await db.Service.findOne({where: { sid }, include: db.Policy})
      if (!service) throw new Error('404');

      return this.setResponse('200', false, service);

    }catch(e:any){
      return this.setResponse(e.message, true);

    }
  }
  async getAllServices (): Promise<responseServices>  {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      const services = await db.Service.findAll({include: db.Policy})
      if (!services) throw new Error('404');

      return this.setResponse('200', false, services);

    }catch(e:any){
      return this.setResponse(e.message, true);

    }
  }
  async updateServices ({ sid, update }: servicesToUpdateData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      if(!sid || !update) throw new Error('400');
      if (!ControlServices.servicesDataControl(update)) throw new Error('400');
      
      const control = await db.Service.findOne({ where: { sid }});
      if (!control) throw new Error('404');

      const updateService = await db.Service.update(update, {
        where: { sid }
      })
      return this.setResponse('200', false, updateService);

    }catch(e:any){
      return this.setResponse(e.message, true);

    }
  }

  async updatePolicyServices ({ sid, policy }: serviceToUpdatePolicyData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      console.log(policy)
      if(!sid || !policy) throw new Error('400');
      if (!Array.isArray(policy)) throw new Error('400');
      
      const control = await db.Service.findOne({ where: { sid }});
      if (!control) throw new Error('404');

      let p : Array<any> = [];
      for (let i in policy) {
        const pl = await db.Policy.findOne({ where: { id: policy[i] }})
        if (!pl) throw new Error('404');
        p.push(pl)
      }
      await control.setPolicies([])
      await control.addPolicies(p)
      const f = await control.getPolicies()

      return this.setResponse('200', false, f);

    }catch(e:any){
      return this.setResponse(e.message, true);

    }
  }

  async deleteServices ({ sid }: servicesByidData): Promise<responseServices> {
    this.response = { error: false, status: {}, data: {} };
    
    try{
      if (!sid) throw new Error('400');
      const control = await db.Service.findOne({ where: { sid }});
      
      
      if (!control) throw new Error('404');
      await control.setPolicies([])
      await db.Service.destroy({ where: { sid } });

      const controlfind = await db.Service.findOne({ where: { sid }});
      if (controlfind) throw new Error('404');

      return this.setResponse('200', false, null);

    }catch(e:any){
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