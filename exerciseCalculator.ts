interface Data {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (excersice_hours: Array<number>, target: number): Data => {
  const avgHours = excersice_hours.reduce((a, b) => a + b, 0) / excersice_hours.length;

  const diff = target - avgHours;

  let rating = 0;
  let desc = '';

  if (diff > 1) {
    rating = 1;
    desc = 'bad';
  } else if (diff <= 1 || diff >= -1) {
    rating = 2;
    desc = 'not too bad but could be better';
  } else {
    rating = 3;
    desc = 'great';
  }

  return {
    periodLength: excersice_hours.length,
    trainingDays: excersice_hours.filter((h) => h !== 0).length,
    success: target < avgHours,
    rating,
    ratingDescription: desc,
    target,
    average: avgHours,
  };
};

const target = Number(process.argv[2]);
const traningHours: Array<number> = process.argv.slice(3).map((arg) => Number(arg));

console.log(calculateExercises(traningHours, target));
