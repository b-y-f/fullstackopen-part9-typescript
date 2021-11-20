type Result = string

const calculateBmi = (h:number , w: number) : Result => {

    const value = w / (h*0.01)**2

    if (value < 18.5) {
        return 'Underweight'
    } else if (value >= 18.5 && value<=24.9) {
        return 'Normal weight'
    } else {
        return 'Obesity'
    }
}

console.log(calculateBmi(180, 74))