import React from "react";
import { useParams } from "react-router";
import { useStateValue, setPatient } from "../state";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import Entry from "./Entry";
import { Modal, Button } from "semantic-ui-react";
import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "./AddEntryForm";

const PatientPage: React.FC = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('päivitetty', updatedPatient);
      closeModal();
      dispatch(setPatient(updatedPatient));
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatient(response.data));
      } catch (e) {
        console.log(e);
      }
    };
    if (!patient || patient.id !== id) {
      fetchPatientInfo();
    }
  }, [dispatch, id, patient]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <p>gender: {patient.gender}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries && (
        patient.entries.map(entry => (
          <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Add an entry</Modal.Header>
        <Modal.Content>
          <AddEntryForm onSubmit={submitEntry} onCancel={closeModal} />
        </Modal.Content>
      </Modal>
      <Button onClick={() => openModal()}>Add entry</Button>
    </div>
  );
};

export default PatientPage;
