import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Confetti from 'react-confetti'
import Dice from './components/Dice'

function App() {
  const [dices, setDices] = useState(allNewDice())
  const [correct, setCorrect] = useState(false)
  const [roll, setRoll] = useState(0)
  const [start, setStart] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  if (seconds > 59) {
    setSeconds(0)
    setMinutes((minute) => minute + 1)
  }
  if (minutes > 59) {
    setMinutes(0)
    setHours((hour) => hour + 1)
  }
  if (hours > 23) {
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if (!start) {
        return
      }
      if (correct) {
        return
      }
      setSeconds((second) => second + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [start, !correct])

  useEffect(() => {
    let value = dices[0].value
    let isHeld = dices.every((dice) => dice.isHeld)
    let sameValue = dices.every((dice) => dice.value === value)
    sameValue && isHeld ? setCorrect(true) : setCorrect(false)
  }, [dices])

  function allNewDice() {
    const newArray = []
    for (let i = 0; i < 10; i++) {
      newArray.push({
        id: uuidv4(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
      })
    }
    return newArray
  }

  function holdDice(id) {
    setStart(true)
    if (correct) {
      return
    }
    setDices((dices) =>
      dices.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      })
    )
  }

  function rollDice() {
    if (correct) {
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      setStart(false)
      setDices(allNewDice())
      setRoll(0)
      return
    }
    setDices((dices) =>
      dices.map((dice) => {
        return dice.isHeld === false
          ? { ...dice, value: Math.floor(Math.random() * 6) + 1 }
          : dice
      })
    )
    setRoll((x) => x + 1)
  }
  const diceElements = dices.map((dice) => {
    return (
      <Dice
        key={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        id={dice.id}
        holdDice={() => holdDice(dice.id)}
      />
    )
  })

  return (
    <div className='App'>
      {correct && <Confetti />}
      <div className="title-wrapper">
      {!start && <h1 className='title'>Dice game</h1>}
      {!start && (
        <p className='instructions'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      )}
      </div>
      {start && (
        <div className='start-menu'>
          <h1 className='timer'>
            Time {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </h1>
          <h1 className='count-roll'>Count: {roll}</h1>
        </div>
      )}
      <div className='dice-container'>{diceElements}</div>
      <button
        onClick={rollDice}
        className='roll-button'
      >
        {correct ? 'New Game' : 'Roll'}
      </button>
    </div>
  )
}

export default App
