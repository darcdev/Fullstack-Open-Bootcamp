import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Total = ({ parts }) => {
  const sum = parts.reduce((accum, part) => accum + part.exercises, 0);
  return <b>total of {sum} exercises</b>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
