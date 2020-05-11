import patientData from '../../data/patients';
import { Patient, NewPatient, Entry } from '../types';
import toNewPatient, { parseEntries } from '../utils';

let patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsNonSensitive = (): Omit<Patient, 'ssn' | 'entries'>[] => {
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

const addPatientEntry = (id: string, entry: Entry): Patient | undefined => {
  const patient = findById(id);
  if (patient) {
    const updatedEntries = patient.entries.concat({ ...entry, id: String(Date.now()) });

    const updatedPatient = {
      ...patient,
      entries: parseEntries(updatedEntries)
    };
    patients = patients.map(patient => patient.id === id ? updatedPatient : patient);
    return updatedPatient;
  }
  return patient;
};

export default {
  getPatients,
  getPatientsNonSensitive,
  addPatient,
  findById,
  addPatientEntry
};