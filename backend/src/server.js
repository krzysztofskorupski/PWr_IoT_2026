import http from "http";
import app from "./app.js";
import { PORT } from "./config/env.js";

const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
