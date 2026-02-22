import * as mock from "./engine/mock.js";
import * as sql from "./engine/mysql.js";

let db;
const engine = process.env?.ENGINE ?? "";

if (engine.toLowerCase() === "mysql") {
  console.log("ENGINE: MySQL");
  db = sql;
} else {
  console.log("ENGINE: Mock");
  db = mock;
}

db.initialize();

export const getUniqueDeviceData = async () => {
  return await db.getUniqueDeviceData();
};

export const getMeasurementData = async (device) => {
  return await db.getMeasurementData(device);
};

export const addMeasurementData = async (payload) => {
  const data = await db.addMeasurementData(payload);

  console.log(data);

  return data;
};
