import Server from './config/server/server';
import createDataToTest from './utils/CreateData.utils';

const server = new Server();

server.start(createDataToTest);
