import { v1 as uuid } from "uuid";
import data from "../data/patients";
import { PublicPatient, NewPatient, Patient, Entry } from "../types";

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

const addEntryToData = (id: string, newEntry: Entry): Entry => {
  const type = newEntry.type;

  const index = data.findIndex((i) => i.id === id);

  if (index < 0) {
    throw new Error("Can not find");
  }

  switch (type) {
    case "HealthCheck":
      const info: Entry = {
        id: uuid(),
        date: newEntry.date,
        specialist: newEntry.specialist,
        type: newEntry.type,
        description: newEntry.description,
        healthCheckRating: newEntry.healthCheckRating,
      };
      data[index].entries.push(info);
      console.log("pushed ...");

      return info;
    case "Hospital":
      const info2: Entry = {
        id: uuid(),
        date: newEntry.date,
        specialist: newEntry.specialist,
        type: newEntry.type,
        description: newEntry.description,
        discharge: newEntry.discharge,
      };
      data[index].entries.push(info2);
      console.log("pushed ...");
      return info2;
    case "OccupationalHealthcare":
      const info3: Entry = {
        id: uuid(),
        date: newEntry.date,
        specialist: newEntry.specialist,
        type: newEntry.type,
        description: newEntry.description,
        employerName: newEntry.employerName,
        sickLeave: newEntry.sickLeave,
      };
      data[index].entries.push(info3);
      console.log("pushed ...");
      return info3;
    default:
      throw new Error("wrong!!!");
  }
};

export default {
  NonSensitivePatientEntries,
  addPatient,
  getAllInfoById,
  addEntryToData,
};
