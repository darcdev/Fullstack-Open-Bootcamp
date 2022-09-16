import React from 'react';
import { Diagnostic, Entry } from "../types";
import assertNever from '../utils/assertNever';
import HealthEntry from './HealthEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import { Work, MedicalServices } from '@mui/icons-material';

const EntryDetails: React.FC<{ entry: Entry, diagnostics: { [code: string]: Diagnostic } }> = ({ entry, diagnostics }) => {
    return <div style={{ border: "2px solid black", padding: "1rem", marginBottom: "1rem" }}>
        <p>{entry.date} {entry.type === "HealthCheck" ? <MedicalServices /> : <Work />}</p>
        <p>{entry.description}</p>
        <ul>
            {entry.diagnosisCodes?.map(code => {
                const descriptionCode = diagnostics[code]?.name;
                return <li key={code}>{code} {descriptionCode}</li>;
            })}
        </ul>
        {(() => {
            switch (entry.type) {
                case "Hospital":
                    return <HospitalEntry entry={entry} />;
                case "OccupationalHealthcare":
                    return <OccupationalEntry entry={entry} />;
                case "HealthCheck":
                    return <HealthEntry entry={entry} />;
                default:
                    return assertNever(entry);
            }
        })()}
        <p>Diagnose by {entry.specialist}</p>
    </div>;

};

export default EntryDetails;