import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe feedback</h1>
      <p>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </p>
      <p>
        <b>Statistics</b>
      </p>
      <p>
        Good: {good}
      </p>
      <p>
        Neutral: {neutral}
      </p>
      <p>
        Bad: {bad}
      </p>
      <p>
        All: {good + neutral + bad}
      </p>
      <p>
        Average: {(good - bad) / (good + neutral + bad)}
      </p>
      <p>
        Positive: {good / (good + neutral + bad) * 100} %
      </p>
    </div>
  )
}

export default App