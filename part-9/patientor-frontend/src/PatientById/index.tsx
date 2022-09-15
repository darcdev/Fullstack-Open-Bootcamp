import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Typography } from '@material-ui/core';
import { Male, Female, Transgender } from '@mui/icons-material';

const PatientById = () => {
    const { id: patientId } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | null>(null);

    React.useEffect(() => {
        const fetchPatientById = async () => {
            if (patientId) {
                const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
                setPatient(data);
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
            </div> : <Typography variant="h4">
                Paciente No existe
            </Typography>}

        </div>
    );
};

export default PatientById;