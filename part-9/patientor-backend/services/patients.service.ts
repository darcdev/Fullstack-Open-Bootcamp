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

export default {
    getPatients,
    getNonSensitivePatients
};