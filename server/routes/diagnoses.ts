import express from 'express';

import diagService from '../services/diagService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;