const express = require('express');
const app = express();

import {calculateBmi} from './bmiCalculator'

app.get('/', (_req: any, res: any ) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req:any , res:any) => {
  const {height, weight} = req.query
  
  const bmi = calculateBmi(height, weight)

  if (!height || !weight) {
    res.json({
      error: "malformatted parameters"
    })
  }else{
    res.json({height , weight, bmi})
  }
  
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
