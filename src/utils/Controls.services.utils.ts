import { carCreateData } from "../config/interfaces/Services/Car.interfaces";
import { specialCharactersValidate } from "./Validations.utils";

export default class ControlServices {

    static genericCharactersValidationForm (value: string): boolean {
        let result = true;
        if (value.match(specialCharactersValidate)) result = false;
        return result;
    }
    
    static genericIdValidation (value: string): boolean {
        if(value.match(specialCharactersValidate)) return false;
        return true;
    }

    static createCarPropsControl ({ 
        brand,
        model,
        year,
        patent,
        color,
    }:carCreateData): boolean {
        let result = true;
        if (brand.length >= 50 || model.length >= 50 
            || !this.genericCharactersValidationForm(brand) 
            || !this.genericCharactersValidationForm(model)) result = false;
        if (year.length >= 5
            || !this.genericCharactersValidationForm(year)
            ) result = false;
        if (patent.length >= 20 || color.length >= 20
            || !this.genericCharactersValidationForm(patent)
            || !this.genericCharactersValidationForm(color)
            ) result = false;
        return result
    }

    static controlData (data: any): boolean {
        let result = true;
        Object.values(data).forEach((v: any) => {
            if (!this.genericCharactersValidationForm(v)) result = false
        })
        return result;
    }

    static policyDataControl (data: any): boolean {
        let result = true;

        if (data.hasOwnProperty('type')) {
            const types = [ 'B', 'M', 'Y', 'C', ]
            if (!types.includes(data.type ? data.type : '')) return false;
          }

          if (data.hasOwnProperty('permission')) {
            const permission = [ 'A', 'NA', ]
            if (!permission.includes(data.permission ? data.permission : '')) return false;
          }
          const controlData = JSON.parse(JSON.stringify(data))
          if (controlData.hasOwnProperty('active')) {
              if (typeof controlData.active !== 'boolean') return false;
              delete controlData.active
            }
        if (!this.controlData(controlData)) return false;

          return result
    }

    static servicesDataControl (data: any): boolean {
        let result = true;
         Object.entries(data).forEach(([k, v])=>{
            if (k === 'name' && typeof v === 'string' && v.length >50) result = false;
            if (k === 'active' && typeof v !== 'boolean') result = false;
            if (k === 'amount' && typeof v !== 'number') result = false;
         });
          return result
    }

    static transactionDataControl (data: any): boolean {
        const status = ['c', 'a', 'f']
        let result = true;
        Object.entries(data).forEach(([k, v]) => {
            if(k === 'amount' && typeof v !== 'number')result = false;
            if(k === 'status' && typeof v === 'string' && !status.includes(v)) result = false
            if((k === 'owid' || k === 'cid' ) && typeof v !== 'string') result = false;
            if(k === 'svid' && !Array.isArray(v)) result = false;
        });
        return result
    }
}