import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.router';
import patientsRouter from './routes/patients.router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});