type indexData = {
  [key: string]: string;
};

export type validateObject = { isValid: boolean; message: string };

export default class PolicyValidation {
  static validateCreateTransaction(
    services: Array<any>,
    carProps: any
  ): validateObject {
    let validate = {
      isValid: true,
      message: '',
    };

    const reference: indexData = {
      b: 'brand',
      m: 'model',
      y: 'year',
      c: 'color',
    };

    services.forEach((item) => {
      if (item.active) {
        const policies = item.Policies;
        policies.forEach((p: any) => {
          const test = carProps.dataValues[reference[p.type.toLowerCase()]];
          if (p.type === 'Y' && Number(test) < Number(p.title)) {
            validate.isValid = false;
            validate.message = p.description;
          } else if (
            test.toLowerCase() === p.title.toLowerCase() &&
            p.permission === 'NA'
          ) {
            validate.isValid = false;
            validate.message = p.description;
          }
        });
      } else {
        validate.isValid = false;
        validate.message = 'Inactive Service.';
      }
    });

    return validate;
  }
}
