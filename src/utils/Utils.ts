export default class Util {
  public statusCode: number;
  public type: string;
  public data: any;
  public message: string;
  static  statusCode: number;
  static message: string;
  static data: any;
  static type: string;

  constructor() {
    this.statusCode = 0;
    this.type = '';
    this.data = null;
    this.message = '';
  }

  static setSuccess(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  static setError(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  static send(res: any) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}
