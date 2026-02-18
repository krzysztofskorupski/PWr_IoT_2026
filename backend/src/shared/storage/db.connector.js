const _db_mock = [];

export const loadDataDevice = async () => {
  const dataRaw = await loadDataMeasurementAll();

  const dataDevice = dataRaw.map((e) => e["device"]);
  const dataDeviceUnique = new Set(dataDevice);

  return [...dataDeviceUnique];
};

export const loadDataMeasurement = async (device) => {
  if (device) {
    return await loadDataMeasurementSingleDevice(device);
  }
  return await loadDataMeasurementAll();
};

export const saveDataMeasurement = async (payload) => {
  const record = createDataMeasurementRecord(payload);

  _db_mock.push(record);
};

//-----------------------------------------------------------------------

const loadDataMeasurementAll = async () => {
  return _db_mock;
};

const loadDataMeasurementSingleDevice = async (device) => {
  return (await loadDataMeasurementAll()).filter((e) => e["device"] === device);
};

//-----------------------------------------------------------------------

const createDataMeasurementRecord = (payload) => {
  return { id: _db_mock.length + 1, timestamp: new Date(), ...payload };
};
