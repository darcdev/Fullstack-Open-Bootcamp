import express from 'express';
import patientsService from '../services/patients.service';
import toNewPatient from '../utils/toNewPatient';

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

export default router;