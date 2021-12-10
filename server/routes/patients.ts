import express from 'express';

import patientService from '../services/patientService';

import {toNewPatientEntry} from '../services/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.NonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);

  const newPatient = patientService.addPatient(newPatientEntry);

  res.send(newPatient);

});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const patient = patientService.getAllInfoById(id);
  // console.log(id);
  res.json(patient);

});

export default router;