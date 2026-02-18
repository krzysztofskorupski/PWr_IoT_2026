import { Router } from "express";
import * as service from "./iot.service.js";
import * as dto from "./iot.dto.js";

const router = Router();

router.get("/device", async (req, res) => {
  console.log("Request - List devices");

  try {
    const results = await service.getDataDevice();

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(dto.errorResponse(error.message));
  }
});

router.get("/data", async (req, res) => {
  console.log("Request - Load measurement data");

  try {
    const { device } = req.query;

    const results = await service.getDataMeasurement(device);

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(dto.errorResponse(error.message));
  }
});

router.post("/data", async (req, res) => {
  console.log("Request - Save measurement data");

  try {
    const results = await service.saveDataMeasurement(req.body);

    res.status(201).json(results);
  } catch (error) {
    res.status(400).json(dto.errorResponse(error.message));
  }
});

export default router;
