const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => {
  return (
    <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Content = ({ parts }) => 
<>
  {parts.map(element => <Part key={element.id} part={element}/>)}
</>
    

  const Course = ({course}) => (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={course.parts.reduce(((total,part) => total + part.exercises),0)}/>
    </>
  )

  export default Course