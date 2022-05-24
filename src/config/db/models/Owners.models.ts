import { Model, UUIDV4 } from 'sequelize';
import OwnersAttributes from '../interfaces/owners.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Owners extends Model<OwnersAttributes> {
  
    static associate(models: any) {
      Owners.hasMany(models.Car, {
        foreignKey: 'owid',
      })
    }
  }

  Owners.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      oid: {
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
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cellphone : {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email : {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dni : {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Owners',
    }
  );
  return Owners;
};
