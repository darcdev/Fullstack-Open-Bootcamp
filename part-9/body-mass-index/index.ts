import express, { Express, Response, Request } from 'express';
const app : Express = express();

app.get('/hello', (_req : Request, res : Response) => {
    res.send('Hello');
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})