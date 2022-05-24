import { EnvsInterface } from '../interfaces/Envs.interfaces';
require('dotenv').config();

/**
 * @class Enviroment config class
 */
export default class Envconfig implements EnvsInterface {
  port: number;
  server_status: string;
  server_key: string;
  secret_key: string;
  salt: string;
  db_dialect: string;
  db_port: number;
  db_name: string;
  db_user: string;
  db_pass: string;
  db_host: string;
  basic_path: string;

  constructor() {
    //   Enviroments
    this.port = Number(process.env.PORT) || 9000;
    this.db_port=  Number(process.env.DB_PORT) || 3306;;
    this.server_status= process.env.NODE_ENV || '';
    this.server_key= process.env.SERVER_KEY || '';
    this.secret_key= process.env.SECRET_KEY || '';
    this.salt= process.env.SALT_CRY || '';
    this.db_dialect= process.env.DB_DIALECT || '';
    this.db_name= process.env.DB_NAME_DEV || '';
    this.db_user= process.env.DB_USER_DEV || '';
    this.db_pass= process.env.DB_PASS_DEV || '';
    this.db_host= process.env.DB_HOST_DEV || '';
    this.basic_path= process.env.BASIC_PATH || '';
  
    // Binds
    this.getportconfig = this.getportconfig.bind(this);
  }

  /**
   * @returns number of port
   */
  getportconfig(): number {
    return this.port;
  }

}
