import express from 'express';

import patientService from '../services/patientService';

import toNewPatientEntry from '../services/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.NonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);

  const newPatient = patientService.addPatient(newPatientEntry);

  res.send(newPatient);

});

export default router;