/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Segment,
} from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Entry, Gender, Patient } from "../types";
import { EntryDetails } from "./EntryDetails";
import { AddEntryForm } from "../AddPatientModal/AddEntryForm";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [diagResult, setDiagResult] = React.useState<Diagnosis[]>();

  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: Entry) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      // dispatch(addPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

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

  interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Entry) => void;
    error?: string;
  }

  const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

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
          <Segment key={i}>
            <EntryDetails entry={entry} />
          </Segment>
          // <div key={i}>
          //   <p>{entry.description}</p>
          //   <ul>
          //     {entry?.diagnosisCodes?.map((code, i) => (
          //       <li key={i}>
          //         {code} {getDiagName(code)}
          //       </li>
          //     ))}
          //   </ul>
          // </div>
        ))}
      </Container>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;
