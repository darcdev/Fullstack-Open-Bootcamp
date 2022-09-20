import express from 'express';
import patientsService from '../services/patients.service';
import { Entry } from '../types';
import toNewEntry from '../utils/toNewEntry';
import toNewPatient from '../utils/toNewPatient';
import { validateHealtCheckParams, validateOccupationalHealthcareCheckParams } from '../utils/validations';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(400);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addPatient = patientsService.addPatient(newPatient);
        res.json(addPatient);
    } catch (error: unknown) {
        let errorMessage = 'Somewthing went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {

        const patient = patientsService.getPatientById(req.params.id);
        const newEntry: Entry = toNewEntry(req.body) as Entry;

        switch (newEntry.type) {
            case "HealthCheck":
                if (!validateHealtCheckParams(newEntry)) throw new Error('Missing values');
                break;
            case "OccupationalHealthcare":
                if (!validateOccupationalHealthcareCheckParams(newEntry)) throw new Error('Missing Values');
                break;
        }
        if (patient && newEntry) {
            const addEntry = patientsService.addEntryPatient(patient, newEntry);
            res.json(addEntry);
        }
    } catch (error: unknown) {
        let errorMessage = 'Somewthing went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;

