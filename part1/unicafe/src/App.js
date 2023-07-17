import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Stats = (props) => {
  return (
    <>
      <div>{props.text} {props.value}</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGoodVote = () => {
    let incrementVote = good + 1;
    setGood(incrementVote)
  }

  const incrementNeutralVote = () => {
    let incrementVote = neutral + 1;
    setNeutral(incrementVote)
  }

  const incrementBadVote = () => {
    let incrementVote = bad + 1;
    setBad(incrementVote)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={incrementGoodVote}/>
      <Button text='neutral' handleClick={incrementNeutralVote}/>
      <Button text='bad' handleClick={incrementBadVote}/>
      <h1>statistics</h1>
      <Stats text='good' value={good}/>
      <Stats text='neutral' value={neutral}/>
      <Stats text='bad' value={bad}/>
    </div>
  )
}

export default App