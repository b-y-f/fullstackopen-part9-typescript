import express from "express";

import patientService from "../services/patientService";

import { toNewPatient } from "../services/utils";
import { Entry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.NonSensitivePatientEntries());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatient(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientService.getAllInfoById(id);
  // console.log(id);
  res.json(patient);
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.getAllInfoById(req.params.id);
  const bodyEntry = req.body as Entry;
  const id = req.params.id;

  if (patient) {
    res.json(patientService.addEntryToData(id, bodyEntry));
  }
});

export default router;
