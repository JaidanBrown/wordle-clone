import React, { useState } from 'react'
import Data from '../data/data.json'

const GUESSES = 6
const WORD_LENGTH = 5

const answer = Data.answers[Math.floor(Math.random() * Data.answers.length)]

const answerArray = answer.repeat(GUESSES).split('')

const grid = Array(GUESSES * WORD_LENGTH).fill('')

const BoardNewNew = () => {
  const [guess, setGuess] = useState([])
  const [currentValue, setCurrentValue] = useState([])
  const [position, setPosition] = useState(0)

  const handleChange = (e, index) => {
    // console.log(answerArray)
    // console.log(guess)
    grid[index.index] = e.target.value
    setPosition(position + 1)
    setGuess([...guess, e.target.value])

    guess.map((g, idx) => {
      if (g == answer[idx]) {
        console.log('Match')
      }
    })
  }
  const Cell = (index) => {
    return (
      <input
        id={index.index}
        maxLength={1}
        className='cell'
        value={grid[index.index]}
        onChange={(e) => handleChange(e, index)}
        disabled={position === index.index ? false : true}
      />
    )
  }

  return (
    <>
      {answer}
      <div className='new-board'>
        {grid.map((item, i) => {
          return <Cell index={i} key={i} />
        })}
      </div>
    </>
  )
}

export default BoardNewNew
