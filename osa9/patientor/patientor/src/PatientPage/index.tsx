import React from "react";
import { useParams } from "react-router";
import { useStateValue, setPatient } from "../state";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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
    </div>
  );
};

export default PatientPage;
