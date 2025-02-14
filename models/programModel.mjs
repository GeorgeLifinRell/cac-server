import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "./index.mjs";

export const Department = sequelize.define("Departments", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
    values: ["UG", "PG"],
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
