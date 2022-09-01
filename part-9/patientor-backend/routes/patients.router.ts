import express from 'express';
import patientsService from '../services/patients.service';

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

export default router;