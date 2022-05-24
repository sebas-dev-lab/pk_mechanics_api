export default class RegexHelper {
  private emailvalidation: RegExp;
  private stringsValidation: RegExp;

  constructor() {
    this.emailvalidation = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    this.stringsValidation = new RegExp('/^[pLs]+$/u');
  }

  validatemail = (target: string): boolean => this.emailvalidation.test(target);
  validatestring = (target: string): boolean => this.stringsValidation.test(target);
}
