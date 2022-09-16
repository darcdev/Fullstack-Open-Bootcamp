import { State } from "./state";
import { Diagnostic, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "SET_DIAGNOSTIC_LIST";
    payload: Diagnostic[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: 'UPDATE_ACTUAL_PATIENT';
    payload: Patient;
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSTIC_LIST":
      return {
        ...state,
        diagnostics: {
          ...action.payload.reduce(
            (memo, diagnostic) => ({ ...memo, [diagnostic.code]: diagnostic }),
            {}
          ),
          ...state.diagnostics
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_ACTUAL_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload };
};

export const setDiagnosticList = (payload: Diagnostic[]): Action => {
  return { type: "SET_DIAGNOSTIC_LIST", payload };
};

export const updateActualPatient = (payload: Patient): Action => {
  return { type: "UPDATE_ACTUAL_PATIENT", payload };
};

export const addPatient = (payload: Patient): Action => {
  return { type: "ADD_PATIENT", payload };
};