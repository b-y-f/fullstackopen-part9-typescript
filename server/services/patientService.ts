import { v1 as uuid } from "uuid";
import data from "../data/patients";
import { PublicPatient, NewPatient, Patient } from "../types";

const NonSensitivePatientEntries = (): PublicPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (p: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...p,
  };
  data.push(newPatient);
  return newPatient;
};

const getAllInfoById = (id: string): Patient | undefined => {
  const patients = data.map(
    ({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
  return patients.find((i) => i.id === id);
};

export default {
  NonSensitivePatientEntries,
  addPatient,
  getAllInfoById,
};
