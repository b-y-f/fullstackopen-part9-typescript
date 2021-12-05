import React from "react";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartDesc {
  type: "normal";
  // description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDesc {
  type: "submission";
  // description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartDesc {
  name: string;
  exerciseCount: number;
  type: string;
  description: string;
}

interface CourseRequirementPart extends CoursePartBase {
  requirements: Array<string>;
  type: "special";
  description: string;
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementPart;

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case "normal":
      return <i>{part.description}</i>;
    case "groupProject":
      return <p>project exercise {part.groupProjectCount}</p>;

    case "submission":
      return (
        <>
          <i>{part.description}</i>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      );

    case "special":
      return <p> required skills: {part.requirements.join(", ")}</p>;

    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map(
      (part, i): JSX.Element => (
        <>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <Part part={part} key={i} />
        </>
      )
    )}
  </>
);

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce(
      (carry: number, part: CoursePart) => carry + part.exerciseCount,
      0
    )}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
