import calculateExercises from "./exerciseCalculator";

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

