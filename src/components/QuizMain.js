import React, { useEffect, useRef, useState } from 'react'
import { useUserQuiz } from '../context/QuizQueDataContext';
import QuizOption from './QuizOption'


const QuizMain = () => {

	const { queEditor, addQue, queData, queArr, createQuiz } = useUserQuiz()

	// const [isChecked, setIsChecked] = useState(false);
	const [position, setPosition] = useState();
	const [que, setQue] = useState("")
	const [option1, setOption1] = useState("")
	const [option2, setOption2] = useState("")
	const [option3, setOption3] = useState("")
	const [option4, setOption4] = useState("")
	const [correctAns, setCorrectAns] = useState("")
	const handleChange = (position) => {
		setPosition(position)

	};
	const correct = useRef()
	const handleCreateQuiz = () => {
		createQuiz(queArr)
	}
	const handleAddQueClick = (e) => {
		e.preventDefault()
		if (option1.length != 0 && option1.length != 0 && option1.length != 0 && option1.length != 0 && correctAns.length != 0, que.length != 0) {
			addQue(queData)
			setOption1("")
			setOption2("")
			setOption3("")
			setOption4("")
			correct.current.selected = true
			setQue("")
		}
	}

	useEffect(() => {
		let data = {
			que: que,
			option1: option1,
			option2: option2,
			option3: option3,
			option4: option4,
			correctAns: btoa(correctAns)
		}
		queEditor(data)
	}, [que, option1, option2, option3, option4, correctAns]);

	return (

		<form className='relative flex-auto mb-6' onSubmit={handleAddQueClick}>


			<div className="relative m-auto my-6 px-6">
				<label
					htmlFor="quizQuestion"
					className="block text-base font-semibold text-gray-700 mb-2"
				>
					Quiz Question :
				</label>
				<input
					id="quizQuestion"
					className="rounded-md w-full"
					placeholder="Quiz Question"
					autoComplete="off"
					value={que}
					onChange={(e) => { setQue(e.target.value) }}
				/>
			</div>


			<p className='text-lg font-bold px-6'>Options: </p>

			<div className="flex items-center justify-around px-6">
				<p className="mr-3">A.</p>
				<label className="form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer">
					<span className="ml-2"><input className='m-0 p-0 border-0 bg-transparent h-full' value={option1} onChange={(e) => { setOption1(e.target.value) }} placeholder='Option 1' type="text" /></span>
				</label>
			</div>

			<div className="flex items-center justify-around px-6">
				<p className="mr-3">B.</p>
				<label className="form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer">
					<span className="ml-2"><input className='m-0 p-0 border-0 bg-transparent h-full' value={option2} onChange={(e) => { setOption2(e.target.value) }} placeholder='Option 2' type="text" /></span>
				</label>
			</div>

			<div className="flex items-center justify-around px-6">
				<p className="mr-3">C.</p>
				<label className="form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer">
					<span className="ml-2"><input className='m-0 p-0 border-0 bg-transparent h-full' value={option3} onChange={(e) => { setOption3(e.target.value) }} placeholder='Option 3' type="text" /></span>
				</label>
			</div>

			<div className="flex items-center justify-around px-6">
				<p className="mr-3">D.</p>
				<label className="form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer">
					<span className="ml-2"><input className='m-0 p-0 border-0 bg-transparent h-full' value={option4} onChange={(e) => { setOption4(e.target.value) }} placeholder='Option 4' type="text" /></span>
				</label>
			</div>

			<div className="flex items-center flex-col px-11 mt-3">
				<p className="text-center text-lg">Correct Answer</p>

				<select onChange={(e) => setCorrectAns(e.target.value)} className='outline-none focus:border-blue-700 form-label items-center w-full flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer'>
					<option selected value="" ref={correct} className='font-bold p-3' >--- Choose The Correct Option ---</option>
					<option value={queData.option1}>A. {queData.option1}</option>
					<option value={queData.option2}>B. {queData.option2}</option>
					<option value={queData.option3}>C. {queData.option3}</option>
					<option value={queData.option4}>D. {queData.option4}</option>
				</select>
			</div>

			<div className='w-full px-12 flex justify-between mt-6'>
				<button className="bg-blue-500 text-white mt-2 active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="submit" onClick={handleAddQueClick}
				>
					Add Question
				</button>
				<button className="bg-blue-500 text-white mt-2 active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={handleCreateQuiz}
				>
					Create Quiz
				</button>
			</div>

		</form>
	)
}

export default QuizMain