interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
interface exerciseArgs {
    inputs: number[],
    target: number
}

const parseArgs = (args: string[]): exerciseArgs => {
    if (args.length < 4) throw new Error("Not enough arguments");
    let inputs = []
    if(isNaN(Number(args[2]))){
        throw new Error("Provided values were not numbers")
    }
    for(let i = 3; i < args.length; i++){
        if(isNaN(Number(args[i]))){
            throw new Error("Provided values were not numbers")
        }
        else{
            inputs.push(Number(args[i]))
        }
    }
   return { inputs: inputs, target: Number(args[2])}
}

const exerciseCalculator = (inputData: number[], target: number) => {
    const average = inputData.reduce((accumulator, current) => accumulator + current, 0) / inputData.length
    const rating = (average < 0.5 * target)? 1: (average < target)? 2: 3
    const ratingDescription = (rating === 1)? "not good" : (rating === 2)? "not bad": "good"
    return {
        periodLength: inputData.length,
        trainingDays: inputData.filter(day => day > 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription,
        target: target,
        average: average
    }    
}

//console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const { inputs, target } = parseArgs(process.argv)
    console.log(exerciseCalculator(inputs, target))
}
catch (error: unknown) {
    let errorMessage = "Something went wrong"
    if(error instanceof Error){
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}