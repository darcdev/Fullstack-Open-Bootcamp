

interface DiagnosticResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


function calculateExercises(hoursByDay: Array<number>, target: number): DiagnosticResult {
    
    const periodLength:number = hoursByDay.length;
    const average: number = hoursByDay.reduce((elem, acc) => acc + elem, 0) / periodLength;
    const trainingDays: number = hoursByDay.filter(day => day > 0).length;
    let success:boolean = false;
    if (average >= target) success = true;
    let rating: number;
    let ratingDescription: string;
    
    if (average >= target) {
        rating = 3;
        ratingDescription = "Congratulations, you accomplished your exercise goals for this week!";
    } else if (average > target * 0.50) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1
        ratingDescription = "Not Good, you didnt reach your exercise goal, Try again next week";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const args = process.argv.splice(2);

try {

    if (args.length < 2) {
        throw new Error('Insufficient Arguments, Please Check your input');
    }
    const [targetArg, ...hoursByDayArg] :string[] = args ;
    const target: number = Number(targetArg);
    const hoursByDay: number[] = hoursByDayArg.map(hour => Number(hour));
    console.log(calculateExercises(hoursByDay, target))
    
} catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
            errorMessage += ` Error: ` + error.message;
      }
      console.log(errorMessage)
}

