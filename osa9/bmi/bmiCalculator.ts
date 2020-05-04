export const calculateBmi = (height: number, mass: number): string => {
  const result: number = (mass) / ((height / 100) ^ 2);
  if (result < 15) {
    return 'Very severely underweight';
  } else if (15 <= result && result < 16) {
    return 'Severely underweight';
  } else if (16 <= result && result < 18.5) {
    return 'Underweight';
  } else if (18.5 <= result && result < 25) {
    return 'Normal (healthy weight)';
  } else if (25 <= result && result < 30) {
    return 'Overweight';
  } else if (30 <= result && result < 35) {
    return 'Obese Class I (Moderately obese)'
  } else if (35 <= result && result < 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
}

export const parseArgument = (arg: string): number => {
  if (!isNaN(Number(arg))) {
    return Number(arg)
  } else {
    throw new Error('Some value was not a number!');
  }
}

try {
  const height: number = parseArgument(process.argv[2]);
  const mass: number = parseArgument(process.argv[3]);
  console.log(calculateBmi(height, mass));
} catch(e) {
  console.log('Something went wrong:', e.message)
}