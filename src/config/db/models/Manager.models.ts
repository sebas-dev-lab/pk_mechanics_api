import { Model, UUIDV4 } from 'sequelize';
import UserAttributes from '../interfaces/manager.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Manager extends Model<UserAttributes> {
  
    static associate(models: any) {
      Manager.hasOne(models.Credentials, {
        foreignKey: 'mid',
      })
    }
  }

  Manager.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      mid: {
        type: DataTypes.STRING(300),
        defaultValue: UUIDV4,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Manager',
    }
  );
  return Manager;
};
