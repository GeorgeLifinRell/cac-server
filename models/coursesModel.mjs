import { sequelize } from "./index.mjs";
import { Sequelize, DataTypes } from "sequelize";

export const Course = sequelize.define("Course", {
  courseCode: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
  },
  courseName: {
    type: DataTypes.STRING,
    required: true,
  },
  courseType: {
    type: DataTypes.STRING,
    required: true,
  },
  L: {
    type: DataTypes.INTEGER,
    required: true,
  },
  T: {
    type: DataTypes.INTEGER,
    required: true,
  },
  P: {
    type: DataTypes.INTEGER,
    required: true,
  },
  TCP: {
    type: DataTypes.INTEGER,
    required: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    required: true,
  },
  category: {
    type: DataTypes.STRING,
    required: true,
  },
  semester: {
    type: DataTypes.INTEGER,
    required: true,
  },
  programme: {
    type: DataTypes.STRING,
    required: true,
  },
  vertical: {
    type: DataTypes.STRING,
    required: true,
  },
  extension: {
    type: DataTypes.STRING,
    required: true,
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
