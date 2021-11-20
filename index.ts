import { calculateBmi } from './bmiCalculator';

import express,{ Request, Response } from 'express';


const app = express();

app.get('/', (_req: never, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req:Request, res:Response) => {
  const { height, weight } = req.query;

  const bmi = calculateBmi(Number(height), Number(weight));

  if (!height || !weight) {
    res.json({
      error: 'malformatted parameters',
    });
  } else {
    res.json({ height, weight, bmi });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
