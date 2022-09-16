import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Typography } from '@material-ui/core';
import { Male, Female, Transgender } from '@mui/icons-material';
import { updateActualPatient, useStateValue } from '../state';
import EntryDetails from '../components/EntryDetails';

const PatientById = () => {
    const { id: patientId } = useParams<{ id: string }>();
    const [{ patient, diagnostics }, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchPatientById = async () => {
            if (patientId && patientId !== patient?.id) {
                const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
                dispatch(updateActualPatient(data));
            }
        };
        void fetchPatientById();
    }, []);

    return (
        <div>
            {patient ? <div style={{ marginTop: "1rem" }}>
                <Typography variant="h4">
                    {patient.name} {patient.gender === Gender.Male ? <Male /> : patient.gender === Gender.Female ? <Female /> : <Transgender />}
                </Typography>
                <div>
                    <p><strong>ssn: </strong>{patient.ssn}</p>
                    <p><strong>occupation: </strong>{patient.occupation}</p>
                </div>
                <div>
                    <Typography variant="h6">
                        Entries
                    </Typography>
                    <div>
                        {patient.entries.length > 0 && patient.entries.map(entry => {
                            return <div key={entry.id}>
                                <EntryDetails entry={entry} diagnostics={diagnostics} />
                            </div>;
                        })}
                    </div>
                </div>
            </div> : <Typography variant="h4">
                Paciente No existe
            </Typography>}

        </div>
    );
};

export default PatientById;