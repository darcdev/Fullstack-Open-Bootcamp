import express, { Express, Response, Request } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app: Express = express();

app.use(express.json());

interface exerciseRequestBody {
    daily_exercises: number[],
    target : number
}

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

app.post('/exercises', (req: Request, res: Response) => {
    const { daily_exercises, target } : exerciseRequestBody = req.body;

    if (!daily_exercises || target == null) {
        return res.json({
            error : 'parameters missing'
        })
    }

    let validParameters:boolean = false;
    if (Array.isArray(daily_exercises) && !isNaN(Number(target))) {
        let allNumbers = !daily_exercises.some((time: number) => isNaN(time))
        validParameters = allNumbers
    }

    if (!validParameters) {
           return res.json({
            error : 'malformatted parameters'
        })
    }

    const exerciseResult = calculateExercises(daily_exercises, target);

    return res.json(exerciseResult)
})
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})