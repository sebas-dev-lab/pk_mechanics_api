import { Model, UUIDV4 } from 'sequelize';
import PolicyAttributes from '../interfaces/policy.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Policy extends Model<PolicyAttributes> {
    static associate(models: any) {
      Policy.belongsToMany(models.Service, {
        through: models.PolicyServices,
        foreignKey: 'pid',
      });
    }
  }

  Policy.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM('B', 'M', 'Y', 'C'),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      permission: {
        type: DataTypes.ENUM('A', 'NA'),
        defaultValue: 'A',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Policy',
    }
  );
  return Policy;
};
