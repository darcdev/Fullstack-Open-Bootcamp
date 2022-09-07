import { ContentParams } from "./types";

const Part = ({ courseParts }: ContentParams) => {

    return <div>
        {courseParts.map(part => {
            switch (part.type) {
                case "normal":
                    return <div><h3>{part.name} {part.exerciseCount}</h3><p> {part.description} </p></div>;
                case "groupProject":
                    return <div><h3>{part.name} {part.exerciseCount}</h3><p> project exercises {part.groupProjectCount} </p></div>;
                case "submission":
                    return <div><h3>${part.name} {part.exerciseCount}</h3><p>{part.description}</p><p>submit to {part.exerciseSubmissionLink} </p></div>;
            }
        })}
    </div>
}
export default Part;