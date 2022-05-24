import { Model, UUIDV4 } from 'sequelize';
import TransactionsAttributes from '../interfaces/transactions.interfaces';

module.exports = (sequelize: any, DataTypes: any) => {
  class Transactions extends Model<TransactionsAttributes> {
  
    static associate(models: any) {

      Transactions.belongsTo(models.Car, {
        foreignKey: 'cid',
      })

      Transactions.belongsToMany(models.Service, {
        through: "History",
        foreignKey: 'tid', 
      })

    }
  }

  Transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      owid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sids: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('complete', 'active', 'failed'),
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transactions',
    }
  );
  return Transactions;
};
