
import { ContentParams } from "./types";

const Total = ({ courseParts }: ContentParams) => {
    return <div>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>

};
export default Total;

