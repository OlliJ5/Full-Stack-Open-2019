import patientData from '../../data/patients.json';
import { Patient, NewPatient } from '../types';
import toNewPatient from '../utils';

const patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  object.entries = [];
  return object;
});

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsNonSensitive = (): Omit<Patient, 'ssn'|'entries'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: String(Date.now()),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNonSensitive,
  addPatient,
  findById
};