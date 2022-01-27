import React, { useState } from 'react'
import Data from '../data/data.json'

const GUESSES = new Array(6).fill()
const WORD_LENGTH = new Array(5).fill()

const answer = Data.answers[Math.floor(Math.random() * Data.answers.length)]
const splitAnswer = answer.split('')

const Board = () => {
	const [turn, setTurn] = useState(0)
	const [currentInput, setCurrentInput] = useState([])
	const [currentRow, setCurrentRow] = useState([])

	const handleChange = (event, index) => {
		const values = [...currentInput]
		values[index] = event.target.value
		setCurrentInput(values)

		if (index < WORD_LENGTH.length - 1) {
			const parent = event.target.parentNode.parentNode.children
			const i = parent[index]
			parent[index + 1].children[0].focus()
			event.preventDefault()
		} else {
			return
		}
	}

	const Cell = ({ index, rowIndex }) => {
		return (
			<div className='cell'>
				<input
					id={`${index}-${rowIndex}`}
					value={currentInput[index]}
					maxLength={1}
					disabled={rowIndex !== turn ? true : false}
					onChange={(e) => handleChange(e, index, rowIndex)}
				/>
			</div>
		)
	}

	const Row = ({ index }) => {
		return (
			<div className='row'>
				{WORD_LENGTH.map((item, i) => {
					return <Cell key={`${i}-cell`} index={i} rowIndex={index} />
				})}
			</div>
		)
	}

	return (
		<div className='column'>
			{JSON.stringify(answer, null, 2)}
			{GUESSES.map((item, i) => (
				<Row key={`${i}-row`} index={i} />
			))}
		</div>
	)
}

export default Board
