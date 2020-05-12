import React from "react";
import { Entry, Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { Card, Rating } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const CheckEntry: React.FC<{ entry: HealthCheckEntry; diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Meta>{entry.type}</Card.Meta>
        <Card.Description>Specialist: {entry.specialist}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p>{entry.description}</p>
          <Rating icon="heart" disabled rating={entry.healthCheckRating} maxRating={3} />
          <ul>
            {entry.diagnosisCodes && (
              entry.diagnosisCodes.map(code => (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              ))
            )}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const HospEntry: React.FC<{ entry: HospitalEntry; diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Meta>{entry.type}</Card.Meta>
        <Card.Description>Specialist: {entry.specialist}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p>{entry.description}</p>
          <p>
            Discharged on {entry.discharge.date}
          </p>
          <p>Reason for discharge: {entry.discharge.criteria}</p>
          <ul>
            {entry.diagnosisCodes && (
              entry.diagnosisCodes.map(code => (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              ))
            )}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalEntry: React.FC<{ entry: OccupationalHealthcareEntry; diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Meta>{entry.type}</Card.Meta>
        <Card.Description>Specialist: {entry.specialist}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p>{entry.description}</p>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
          )}
          {!entry.sickLeave && (
            <p>
              No sick leave
            </p>
          )}
          <ul>
            {entry.diagnosisCodes && (
              entry.diagnosisCodes.map(code => (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              ))
            )}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const VisitEntry: React.FC<{ entry: Entry; diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <CheckEntry entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default VisitEntry;