import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};