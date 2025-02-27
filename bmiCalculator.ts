interface Args {
    arg1: number
    arg2: number
}

const parseArguments = (args: string[]): Args => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments")
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return { arg1: Number(args[2]), arg2: Number(args[3]) }
    }
    else { 
        throw new Error("Provided values were not numbers")
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/(height/100)**2;
    if(bmi < 18.5) {
        return "underweight"
    }
    else if (bmi < 25 ){
        return "normal weight"
    }
    else if (bmi < 30){
        return "overweight"
    }
    else {
        return "obese"
    }
}

if(require.main === module){
    try {
        const { arg1, arg2 } = parseArguments(process.argv)
        console.log(calculateBmi(arg1, arg2))
    }
    catch (error: unknown) {
        let errorMessage = "Something went wrong"
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message
        }
        console.log(errorMessage)
    }
}