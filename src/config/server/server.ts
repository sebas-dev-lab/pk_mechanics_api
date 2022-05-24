import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// Routes
import routes from '../../routes/index.routes';
// Modules
import Envconfig from './Envconfig';
// Interfaces
import { Settings, ServerInterface } from '../interfaces/Server.interface';
// Database
import db from '../db/models';
// Setting
import path from 'path';

/**
 * @class Server configuration
 */
export default class Server extends Envconfig implements ServerInterface {
  private app: express.Application;
  protected cors: any;
  private helmet: any;
  private versionServer: JSON;
  private urlencoded: any;
  private settings: Settings;

  constructor() {
    super();
    // server
    this.app = express();
    this.settings = require('./config.server.json');
    // Middlewares
    this.helmet = helmet();
    this.cors = cors(this.settings['cors']);
    this.urlencoded = this.settings['urlencode'];

    // includes
    this.versionServer = require('./config.version.server.json');

    // binds
  }

  /**
   * @return void
   */
  setmiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded(this.urlencoded));
    this.app.use(this.cors);
    this.app.use(this.helmet);
    this.app.use('/api/v1', routes);
    this.app.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'VSL');
      next();
    });
    this.app.get('/api/v1/version', (req, res) =>{
      res.sendFile(path.join(__dirname, '/config.version.server.json'));
    })
    this.app.get('/', (req, res) =>{
      res.sendFile(path.join(__dirname, '../../ViewReport/index.html'));
    })
  }

  /**
   * @param callback
   * @return void
   */
  async start(callback?: Function) {
    this.setmiddlewares();
    db.sequelize
      .sync({force: true})
      .then(() => {
        this.app.listen(this.getportconfig(), () => {
          console.log(`Server listen on port ${this.getportconfig()}`);
        });
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  }
}
