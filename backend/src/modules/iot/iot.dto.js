export const getDataDeviceResponse = (data) => {
  return {
    status: "success",
    data,
  };
};

export const getDataMeasurementResponse = (data) => {
  return {
    status: "success",
    data,
  };
};

export const saveDataMeasurementResponse = () => {
  return {
    status: "success",
  };
};

export const errorResponse = (message) => {
  return {
    status: "error",
    message,
  };
};

//------------------------------------------------------

export const getDataMeasurementValidate = (query) => {};

export const saveDataMeasurementValidate = (payload) => {
  if (!payload) {
    throw new Error("No payload provided");
  }

  if (!payload.device) {
    throw new Error("The device is not defined");
  }

  if (!payload.data) {
    throw new Error("The data is not defined");
  }
};
