import calculateBmi from "./bmiCalculator";

const argsv = process.argv.splice(2);

try {
      if (argsv.length < 2) {
            throw new Error('Insufficient Arguments, Please Check your input');
      }
      const height:number = Number(argsv[0]);
      const weight: number = Number(argsv[1]);
      
      console.log(calculateBmi(height,weight))
} catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
            errorMessage += ` Error: ` + error.message;
      }
      console.log(errorMessage)
}
