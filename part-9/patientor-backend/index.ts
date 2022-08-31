import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.router';
const app = express();

app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});