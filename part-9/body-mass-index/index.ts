import express, { Express, Response, Request } from 'express';
import calculateBmi from './bmiCalculator';
const app : Express = express();

app.get('/hello', (_req : Request, res : Response) => {
    res.send('Hello');
})

app.get('/bmi', (req: Request, res: Response) => {
    const { height, weight } = req.query;
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.send({
            error : "malformatted parameters"
        })
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
        height,
        weight,
        bmi
    })
})
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})