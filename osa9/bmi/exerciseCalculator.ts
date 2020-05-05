interface ExerciseCalc {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): ExerciseCalc => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(h => h > 0).length;
  const success: boolean = trainingDays === periodLength;
  const rating: number = success ? 3 : 1;
  const ratingDescription: string = rating === 3 ? "Good job" : "You didn't meet your goal daily";
  const average: number = hours.reduce((a, b) => a + b, 0) / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parse = (arg: string): number => {
  if (!isNaN(Number(arg))) {
    return Number(arg);
  } else {
    throw new Error('Some value was not a number!');
  }
};

try {
  const target: number = parse(process.argv[2]);
  const hours: number[] = [];

  for (let i = 3; i < process.argv.length; i++) {
    hours.push(parse(process.argv[i]));
  }

  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log('Something went wrong:', e.message);
}
