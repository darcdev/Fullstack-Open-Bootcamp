export type Diagnostic = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
    occupation: string
};

export type NonSensitivePatients = Omit<Patient, "ssn">;