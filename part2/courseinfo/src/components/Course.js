const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map(({ id, name, exercises }) => (
      <p key={id}>
        {name} {exercises}
      </p>
    ))}
    <p>
      <strong>
        Total of {parts.reduce((total, cur) => total + cur.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  </div>
);

const Course = (props) => {
  const { name, parts } = props.course;

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
