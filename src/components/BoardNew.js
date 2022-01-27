import React, { useState, useRef } from 'react'
import Data from '../data/data.json'

const GUESSES = 6
const WORD_LENGTH = 5

const answer = Data.answers[Math.floor(Math.random() * Data.answers.length)]
const splitAnswer = answer.split('')

const grid = Array(GUESSES)
	.fill('')
	.map((x) => Array(WORD_LENGTH).fill(''))

const BoardNew = () => {
	const [turn, setTurn] = useState(0)
	const [input, setInput] = useState(grid)
	const [rowInput, setRowInput] = useState([])

	const handleChange = (e, x, y) => {
		let values = [...input]
		values[x][y] = e.target.value
		setInput(values)
		setRowInput([...rowInput, e.target.value])

		if (y < WORD_LENGTH - 1) {
			e.target.parentNode.children[y + 1].focus()
		}
	}

	const handleSubmit = (e, x, y) => {
		if (e.key === 'Enter') {
			if (x < GUESSES - 1) {
				if (e.target.id.slice(-1) == 4 && rowInput.length === WORD_LENGTH) {
					setTurn(turn + 1)
					setRowInput([])
					setTimeout(() => {
						e.target.parentNode.parentNode.children[x + 1].children[0].focus()
					}, 0)
				}
			} else {
				// End of the game
			}
		}
	}

	const checkLetters = (letters) => {}

	return (
		<div className='board'>
			{answer}
			{grid.map((items, index) => {
				return (
					<div className='row' key={index}>
						{items.map((subItems, sIndex) => {
							return (
								<input
									id={`${index}-${sIndex}`}
									maxLength={1}
									value={input[index][sIndex]}
									className='cell'
									key={`${index}-${sIndex}`}
									onChange={(e) => handleChange(e, index, sIndex)}
									disabled={turn === index ? false : true}
									onKeyPress={(e) => handleSubmit(e, index, sIndex)}
								/>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default BoardNew
