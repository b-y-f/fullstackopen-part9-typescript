import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Gender, Patient } from "../types";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [diagResult, setDiagResult] = React.useState<Diagnosis[]>();

  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatientInfo = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "ADD_PATIENT", payload: patient });
        const { data: diag } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagResult(diag);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchPatientInfo(id);
  }, []);

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

  const getDiagName = (code: string): string | undefined => {
    if (diagResult !== undefined) {
      return diagResult.find((d: Diagnosis) => d.code === code)?.name;
    }
  };

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
                <li key={i}>
                  {code} {getDiagName(code)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;
