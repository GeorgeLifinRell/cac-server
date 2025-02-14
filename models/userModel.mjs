import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "./index.mjs";

export const UserCredentials = sequelize.define("Users", {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    get() {
      const rawValue = this.getDataValue("createdAt");
      return rawValue ? rawValue.toISOString() : null;
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    get() {
      const rawValue = this.getDataValue("updatedAt");
      return rawValue ? rawValue.toISOString() : null;
    },
  },
});
