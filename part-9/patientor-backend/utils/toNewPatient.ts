import { NewPatient } from "../types";
import { parseDate, parseGender, parseName, parseOccupation, parseSsn } from "./validations";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {

    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };

    return newPatient;

};

export default toNewPatient;