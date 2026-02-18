import * as dto from "./iot.dto.js";
import * as connector from "../../shared/storage/db.connector.js";

export const getDataDevice = async () => {
  const data = await connector.loadDataDevice();

  return dto.getDataDeviceResponse(data);
};

export const getDataMeasurement = async (device) => {
  dto.getDataMeasurementValidate(device);

  const data = await connector.loadDataMeasurement(device);

  return dto.getDataMeasurementResponse(data);
};

export const saveDataMeasurement = async (payload) => {
  dto.saveDataMeasurementValidate(payload);

  const response = connector.saveDataMeasurement(payload);

  await dto.saveDataMeasurementResponse(response);
};
