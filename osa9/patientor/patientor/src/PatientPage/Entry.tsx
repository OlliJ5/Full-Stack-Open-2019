import React from "react";
import { Entry, Diagnosis } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const HealthCheckEntry: React.FC<{ entry: Entry, diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  return (
    <div key={entry.id}>
      <p>{entry.date}: {entry.description}</p>
      <ul>
        {entry.diagnosisCodes && (
          entry.diagnosisCodes.map(code => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

const HospitalEntry: React.FC<{ entry: Entry, diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  return (
    <div key={entry.id}>
      <p>{entry.date}: {entry.description}</p>
      <ul>
        {entry.diagnosisCodes && (
          entry.diagnosisCodes.map(code => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

const OccupationalEntry: React.FC<{ entry: Entry, diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  return (
    <div key={entry.id}>
      <p>{entry.date}: {entry.description}</p>
      <ul>
        {entry.diagnosisCodes && (
          entry.diagnosisCodes.map(code => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

const VisitEntry: React.FC<{ entry: Entry, diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} diagnoses={diagnoses} />
    default:
      return assertNever(entry)
  }
};

export default VisitEntry;