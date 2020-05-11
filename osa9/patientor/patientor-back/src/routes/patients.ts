import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNonSensitive());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    console.log(addedPatient);
    res.send(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Cannot find patient with that id');
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const updatedPatient = patientService.addPatientEntry(req.params.id, req.body);
    res.send(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;