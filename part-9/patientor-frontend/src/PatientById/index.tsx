import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Button, Typography } from '@material-ui/core';
import { Male, Female, Transgender } from '@mui/icons-material';
import { addEntry, updateActualPatient, useStateValue } from '../state';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientById = () => {
    const { id: patientId } = useParams<{ id: string }>();
    const [{ patient, diagnostics }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patientId || ""}/entries`,
                values
            );
            dispatch(addEntry(newEntry));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                setError(String(e?.response?.data) || "Unrecognized axios error");
            } else {
                setError("Unknown error");
            }
        }
    };
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
                    <Button variant="contained" style={{ marginBottom: "1rem", marginTop: "1rem" }} onClick={() => openModal()}>
                        Add New Entry
                    </Button>
                    <AddEntryModal onClose={closeModal} onSubmit={submitNewEntry} modalOpen={modalOpen} error={error} />
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