import { parseArgument, calculateBmi } from './bmiCalculator'
import express from 'express';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});