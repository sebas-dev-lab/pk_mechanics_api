import { Model, UUIDV4 } from 'sequelize';
import CredentialsAttributes from '../interfaces/credentials.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Credentials extends Model<CredentialsAttributes> {
  
    static associate(models: any) {
        Credentials.belongsTo(models.Manager, {
            foreignKey: 'mid',
          })
    }
  }

  Credentials.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      private: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      mid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Credentials',
    }
  );
  return Credentials;
};
