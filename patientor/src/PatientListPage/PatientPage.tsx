import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatientInfo = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "ADD_PATIENT", payload: patient });
      } catch (error) {
        console.error(error);
      }
    };
    void fetchPatientInfo(id);
  }, []);

  console.log(patient);

  const selectGenderIcon = (gender?: Gender): string => {
    switch (gender) {
      case "female":
        return "venus";
      case "male":
        return "mars";
      default:
        return "genderless";
    }
  };

  // const differentEntries = (entries:Entry[]):Entry[] => {
  //   switch (entries.type) {
  //     case 'HealthCheck':

  //       break;
  //     case 'Hospital'

  //     case 'OccupationalHealthcare'
  //     default:
  //       break;
  //   }
  // }

  return (
    <div className="App">
      <Container>
        <h2>
          {patient?.name}{" "}
          <Icon className={selectGenderIcon(patient?.gender)}></Icon>
        </h2>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
        <h2>entries</h2>
        {patient?.entries?.map((entry, i) => (
          <div key={i}>
            <p>{entry.description}</p>
            <ul>
              {entry?.diagnosisCodes?.map((code, i) => (
                <li key={i}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;
