/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name' + name);
  }

  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }
  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const parseEntries = (array: any[]): Entry[] => {
  const properEntries: Entry[] = [];
  array.map(entry => {
    if (entry.type === "HealthCheck" || entry.type === "Hospital" || entry.type === "OccupationalHealthcare") {
      properEntries.push(entry);
    }
  });
  return properEntries;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    ssn: parseSsn(object.ssn),
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};

export default toNewPatient;