import patientsData from '../data/patients';
import { NewPatient, PublicPatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getNonSensitivePatients = (): PublicPatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patientsData.find(patient => patient.id === id);
    return patient;
};

const addPatient = (entryPatient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...entryPatient
    };
    patientsData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    getPatientById,
    addPatient
};