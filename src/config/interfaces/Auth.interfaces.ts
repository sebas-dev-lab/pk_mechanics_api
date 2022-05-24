

export interface RegistrationData {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  cellphone: string;
  address: string;
  dni: string;
  'cuil/t': string;
  username?: string;
}


export interface AuthenticationServices {
  commerceUserRegistracion: Function,
  customerUserRegistration: Function,
  commerceUserLogin: Function,
  customerUserLogin: Function,
  commerceUserLogout: Function,
  customerUserLogout: Function
  validateUser: Function,
}


export interface Extradata {
  typeuser: string,
  pin: string,  
  password: string,
  comid: string,
}

export type ExtradataLogin = {
  pin: string,  
  password: string,
  comid: string,
  username: string,
  email: string,
}