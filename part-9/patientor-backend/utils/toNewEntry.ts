import { NewEntry } from "../types";
import { parseDate, parseDescription, parseSpecialist, parseTypeEntry } from "./validations";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): NewEntry => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: NewEntry = {
        type: parseTypeEntry(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        ...object
    };
    return newEntry;

};

export default toNewEntry;