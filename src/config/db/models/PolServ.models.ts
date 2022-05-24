import { Model } from 'sequelize';
import InterServPolAttributes from '../interfaces/serv_pol.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class PolicyServices extends Model<InterServPolAttributes> {
    static associate(models: any) {
    }
  }

  PolicyServices.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PolicyServices',
    }
  );
  return PolicyServices;
};
