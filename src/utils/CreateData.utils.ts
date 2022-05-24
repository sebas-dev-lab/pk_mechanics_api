import db from '../config/db/models';
import ownsers from '../mocks/owners.mocks.json';
import cars from '../mocks/cars.mocks.json';
import policy from '../mocks/policies.mocks.json';
import services from '../mocks/services.mocks.json';
import ServicesService from '../services/Services.services';

export default async function createDataToTest(): Promise<void> {
  try {
    db.Owners.bulkCreate(ownsers, {
      ignoreDuplicates: true,
    }).then(() => console.log('Owners data have been saved.'));

    db.Car.bulkCreate(cars, {
      ignoreDuplicates: true,
    }).then(() => console.log('Cars data have been saved.'));

    db.Policy.bulkCreate(policy, {
      ignoreDuplicates: true,
    }).then(() => console.log('Policies data have been saved.'));

    const Services = new ServicesService();
    await services.forEach(async (item: any) => {
      await Services.createServices(item);
    });

    
    console.log('Database is ready with basics data.');
  } catch (e) {
    console.log(e);
  }
}
