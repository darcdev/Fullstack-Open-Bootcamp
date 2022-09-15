export type Diagnostic = {
    code: string;
    name: string;
    latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn: string;
    occupation: string;
    entries: Entry[];
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;