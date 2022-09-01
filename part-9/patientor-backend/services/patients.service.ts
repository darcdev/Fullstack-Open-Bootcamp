import patientsData from '../data/patients';
import { NonSensitivePatients, Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
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

export default {
    getPatients,
    getNonSensitivePatients,
    getPatientById
};