import { parseArgument, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height: number = parseArgument(String(req.query.height));
    const mass: number = parseArgument(String(req.query.weight));
    const message: string = calculateBmi(height, mass);
    res.send({
      height,
      mass,
      bmi: message
    });
  } catch (e) {
    console.log('Something went wrong:', e.message);
    res.status(400).send({ error: 'Malformatted params' });
  }
});

app.post('/exercises', (req, res) => {
  const hours: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  if (!hours || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  try {
    const parsedTarget: number = parseArgument(String(target));
    const parsedHours: number[] = [];

    for (let i = 0; i < hours.length; i++) {
      parsedHours.push(parseArgument(String(hours[i])));
    }


    return res.send(calculateExercises(parsedHours, parsedTarget));
  } catch (e) {
    return res.status(400).send({ error: "malformatted params" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});