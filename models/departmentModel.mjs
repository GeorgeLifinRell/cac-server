import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "./index.mjs";

export const DepartmentModel = sequelize.define("Departments", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collegeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Colleges",
      key: "id",
    },
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
