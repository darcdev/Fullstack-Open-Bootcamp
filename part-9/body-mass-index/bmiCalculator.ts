
const tableCategories= {
    "1": "Underweight (Severe thinness)" ,
    "2": "Underweight (Moderate thinness)",
    "3": "Underweight (Mild thinness)",
    "4": "Normal (healty weight)",
    "5": "Overweight (Pre-obese)",
    "6": "Obese (Class I)",
    "7": "Obese (Class II)",
    "8": "Obese (Class III)"
}

function calculateBmi(height: number, weight: number): string {
    
    const bmi = (weight / ((height / 100) ** 2));
    
    if (bmi < 15) {
        return tableCategories["1"];
  } else if (bmi >= 15 && bmi < 16) {
        return tableCategories["2"];
  } else if (bmi >= 16 && bmi < 18.5) {
        return tableCategories["3"];
  } else if (bmi >= 18.5 && bmi < 25) {
        return tableCategories["4"];
  } else if (bmi >= 25 && bmi < 30) {
        return tableCategories["5"];
  } else if (bmi >= 30 && bmi < 35) {
        return tableCategories["6"];
  } else if (bmi >= 35 && bmi < 40) {
        return tableCategories["7"];
  } else if (bmi >= 40) {
        return tableCategories["8"];
  }
  return "Opps! something went wrong! its no posibble calculate bmi";
}

console.log(calculateBmi(192, 40));