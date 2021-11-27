import data from '../data/diagnoses.json';
import {Diagnoses} from '../types'; 

const getEntries = ():Array<Diagnoses> => {
  return data;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};