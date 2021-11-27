import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.NonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = patientService.addPatient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    name, dateOfBirth, ssn, gender, occupation
  });

  res.send(newPatient);

});

export default router;