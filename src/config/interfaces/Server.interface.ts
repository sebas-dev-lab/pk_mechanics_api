export interface Settings {
  cors: any;
  urlencode: JSON;
}

export interface ServerInterface {
  setmiddlewares: Function;
  start: Function;
}