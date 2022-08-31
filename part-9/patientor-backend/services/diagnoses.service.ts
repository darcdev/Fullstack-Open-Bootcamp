
import diagnosesData from '../data/diagnostics';
import { Diagnostic } from '../types';


const getDiagnoses = (): Diagnostic[] => {
    return diagnosesData;
};

export default {
    getDiagnoses
};