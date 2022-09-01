export type Diagnostic = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn: string;
    occupation: string
};

export enum Gender {
    Male = 'male',
    Female = 'female',
}

export type NonSensitivePatients = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;