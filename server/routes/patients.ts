import express from 'express';

import diagService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagService.NonSensitivePatientEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;