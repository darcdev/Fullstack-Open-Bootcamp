import { Gender, HealthCheckEntry, HealthCheckRating, OccupationalHealthcareEntry, TypesEntry } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTypeEntry = (param: any): param is TypesEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(TypesEntry).includes(param);
};

export const parseTypeEntry = (type: unknown): TypesEntry => {
    if (!type || !isTypeEntry(type)) {
        throw new Error('Incorrect or missing type entry');
    }
    return type;
};


export const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing name');
    }
    return description;
};

export const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing name');
    }
    return specialist;
};

export const validateHealtCheckParams = (entry: HealthCheckEntry): boolean => {
    if (!entry.healthCheckRating && !Object.values(HealthCheckRating).includes(entry.healthCheckRating)) return false;
    return true;
};

export const validateOccupationalHealthcareCheckParams = (entry: OccupationalHealthcareEntry): boolean => {
    if (!entry.employerName && typeof entry.employerName !== "string") return false;
    return true;
};