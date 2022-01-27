import React, { useState } from 'react'
import Data from '../data/data.json'

const GUESSES = new Array(6).fill()
const WORD_LENGTH = new Array(5).fill()

const answer = Data.answers[Math.floor(Math.random() * Data.answers.length)]
const splitAnswer = answer.split('')

const handleChange = (event, index) => {
	if (index < WORD_LENGTH.length - 1) {
		const parent = event.target.parentNode.parentNode.children
		const i = parent[index]
		console.log(i)
		parent[index + 1].children[0].focus()
		event.preventDefault()
	} else {
		return
	}
}

const Cell = ({ index, rowIndex, turn }) => {
	return (
		<div className='cell'>
			<input
				maxLength={1}
				disabled={rowIndex !== turn ? true : false}
				onChange={(e) => handleChange(e, index)}
			/>
		</div>
	)
}

const Row = ({ index, turn }) => {
	return (
		<div className='row'>
			{WORD_LENGTH.map((item, i) => {
				return <Cell key={`${i}-cell`} index={i} rowIndex={index} turn={turn} />
			})}
		</div>
	)
}

const Board = () => {
	const [turn, setTurn] = useState(0)
	return (
		<div className='column'>
			{JSON.stringify(answer, null, 2)}
			{GUESSES.map((item, i) => (
				<Row key={`${i}-row`} index={i} turn={turn} />
			))}
		</div>
	)
}

export default Board
