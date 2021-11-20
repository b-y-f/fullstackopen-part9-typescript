interface Data {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}



const calculateExercises = (excersice_hours: Array<number>, target: number): Data => {

    const avgHours = excersice_hours.reduce((a,b)=> a + b, 0)/excersice_hours.length

    const diff = target - avgHours

    let rating = 0

    if (diff > 1) {
        rating = 1
    } else if (diff <= 1 || diff >= -1){
        rating = 2
    } else {
        rating = 3
    }

    return {
        periodLength: excersice_hours.length,
        trainingDays: excersice_hours.filter(h=>h !== 0).length,
        success: target < avgHours,
        rating: rating,
        ratingDescription: 'bbbb',
        target: target,
        average: avgHours
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

