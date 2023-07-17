import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Stats = ({good, neutral, bad}) => {
  let statsDetails = 'No feedback given'
  let sumOfVotes = good + neutral + bad
  let average = 0;  let positivePercent = 0

  if (sumOfVotes > 0) {
    average = ((good * 1) + (neutral * 0) + (bad * -1)) / sumOfVotes
    positivePercent = (good / sumOfVotes) * 100;
    statsDetails = <>
        <table>
          <tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={sumOfVotes}/>
            <StatisticLine text='average' value={average}/>
            <StatisticLine text='positive' value={positivePercent}/>
          </tbody>
        </table>
    </>
  }
  
  return (
    <>
      <h1>statistics</h1>
      {statsDetails}
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
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App