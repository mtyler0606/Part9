import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});

app.get('/bmi', (_req, res) => {
        const height = Number(_req.query.height);
        const weight = Number(_req.query.weight);
        if(isNaN(height) || isNaN(weight)){
            res.status(400).send({
                error: "malformatted parameters"
            });
        }
        else {
        res.send({
            height: height,
            weight: weight,
            bmi: calculateBmi(height, weight)
        });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;
    if(!dailyExercises || !target){
        res.status(400).send({
            error: "parameters missing"
          });
    }

    else if (isNaN(Number(target))){
        res.status(400).send({
            error: "malformatted parameters"
          });
    }
    else{
    const result = exerciseCalculator(
        dailyExercises,
        Number(target)
    );
    res.send({result});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});