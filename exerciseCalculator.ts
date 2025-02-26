interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))