import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Stats = ({good, neutral, bad}) => {
  let sumOfVotes = good + neutral + bad
  let average = 0
  if (sumOfVotes > 0) {
    average = ((good * 1) + (neutral * 0) + (bad * -1)) / sumOfVotes
  }
  
  let positivePercent = 0;
  if (sumOfVotes > 0) {
    positivePercent = (good / sumOfVotes) * 100;
  }
  
  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {sumOfVotes}</div>
      <div>average {average}</div>
      <div>positive {positivePercent} %</div>
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
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App