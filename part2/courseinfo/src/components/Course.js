const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => {
  return (
    <p>
    {part.name} {part.exercises}
  </p>
  )
}
  

const Content = ({ parts }) => 
<>
  {parts.map(element => <Part key={element.id} part={element}/>)}
</>
    

  const Course = ({course}) => (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </>
  )

  export default Course