import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express()

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack")
})

app.get('/bmi', (_req, res) => {
        const height = Number(_req.query.height)
        const weight = Number(_req.query.weight)
        if(isNaN(height) || isNaN(weight)){
            res.send({
                error: "malformatted parameters"
            })
        }
        else {
        res.send({
            height: height,
            weight: weight,
            bmi: calculateBmi(height, weight)
        })
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})