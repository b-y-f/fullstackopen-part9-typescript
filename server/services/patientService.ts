import data from '../data/patients.json';
import {NonSensitivePatientEntry} from '../types'; 

const NonSensitivePatientEntries = ():NonSensitivePatientEntry[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation})=>({
    id, name, dateOfBirth,gender, occupation
  }));
};

export default {
  NonSensitivePatientEntries,
};