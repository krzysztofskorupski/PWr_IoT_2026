import mysql from "mysql2/promise";

let _pool;

export const initialize = async () => {
  _pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "system",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  _pool
    .getConnection()
    .then((conn) => {
      console.log("MySQL connection established!");
      conn.release();
    })
    .catch((err) => {
      console.error(`MySQL connection failed${err.message ? `:${err.message}.` : "!"}`);
      process.exit(1);
    });
};

export const getUniqueDeviceData = async () => {
  const query = `SELECT DISTINCT device FROM measurements`;
  const [rows] = await _pool.execute(query);

  return rows.map((e) => e["device"]);
};

export const getMeasurementData = async (device) => {
  if (device) {
    return getMeasurementDataSpecific(device);
  }

  return getMeasurementDataAll();
};

export const addMeasurementData = async (body) => {
  const received_at = new Date();

  const query = `INSERT INTO measurements (device, sensor, payload, received_at) VALUES (?, ?, ?, ?)`;
  await _pool.execute(query, [body.device, body.sensor, body.payload, received_at]);

  return { ...body, received_at };
};

//-----------------------------------------------------------------------

const getMeasurementDataAll = async () => {
  const query = `SELECT * FROM measurements`;
  const [rows] = await _pool.execute(query);

  return rows;
};

const getMeasurementDataSpecific = async (device) => {
  const query = `SELECT * FROM measurements WHERE device = ?`;
  const [rows] = await _pool.execute(query, [device]);

  return rows;
};
