import { ForeignKeyConstraintError, Model, UUIDV4 } from 'sequelize';
import ServicesAttributes from '../interfaces/services.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Service extends Model<ServicesAttributes> {

    static associate(models: any) {

      Service.belongsToMany(models.Policy, {
        through: models.PolicyServices,
        foreignKey: 'sid',
      });

      Service.belongsToMany(models.Transactions, {
        through: "History",
        foreignKey: 'sid', 
      })
    }
  }

  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sid: {
        type: DataTypes.STRING(300),
        defaultValue: UUIDV4,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  return Service;
};
