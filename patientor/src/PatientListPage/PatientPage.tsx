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
  });

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

  return (
    <div className="App">
      <Container>
        <h2>
          {patient?.name}{" "}
          <Icon className={selectGenderIcon(patient?.gender)}></Icon>
        </h2>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </Container>
    </div>
  );
};

export default PatientPage;
