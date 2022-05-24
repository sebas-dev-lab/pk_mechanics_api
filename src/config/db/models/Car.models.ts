import { Model, UUIDV4 } from 'sequelize';
import CarAttributes from '../interfaces/car.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Car extends Model<CarAttributes> {
  
    static associate(models: any) {
      Car.belongsTo(models.Owners, {
        foreignKey: 'owid',
      })

      Car.hasMany(models.Transactions, {
        foreignKey: 'cid',
      })
    }
  }

  Car.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cid: {
        type: DataTypes.STRING(100),
        defaultValue: UUIDV4,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      patent: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      owid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Car',
    }
  );
  return Car;
};
