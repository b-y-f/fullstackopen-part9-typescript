import {v1 as uuid} from 'uuid';
import data from '../data/patients.json';
import {NonSensitivePatientEntry, NewPatientEntry, Patient} from '../types'; 
import { parseGender } from './utils';

const NonSensitivePatientEntries = ():NonSensitivePatientEntry[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation})=>({
    id, name, dateOfBirth,gender:parseGender(gender), occupation
  }));
};

const addPatient = (p:NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient = {
    id:id,
    ...p
  };
  data.push(newPatient);
  return newPatient;
};

export default {
  NonSensitivePatientEntries,
  addPatient
};