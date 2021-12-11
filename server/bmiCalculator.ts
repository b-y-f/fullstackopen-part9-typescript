type Result = string;

export const calculateBmi = (h:number, w: number) : Result => {
  const value = w / (h * 0.01) ** 2;
  if (value < 18.5) {
    return 'Underweight';
  } if (value >= 18.5 && value <= 24.9) {
    return 'Normal weight';
  }
  return 'Obesity';
};

// const height = Number(process.argv[2]);
// const weight = Number(process.argv[3]);

// console.log(`height ${height} cm and weight ${weight} KG, result is:`, calculateBmi(height, weight));
