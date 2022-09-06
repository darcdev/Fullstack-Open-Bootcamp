import Content from "./Content";
import Home from "./Home";
import Total from "./Total";
import { Course } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Course[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Home title={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div >
  );
};

export default App;