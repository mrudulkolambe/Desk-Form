import React, { useEffect, useState } from 'react'

const ScoreQuestion = ({ data, order, answer }) => {
	// const [position, setPosition] = useState();
	const [wrong, setWrong] = useState();
	const [correct, setCorrect] = useState();
	useEffect(() => {
		if (answer.correct) {
			setCorrect(answer.position)
		}
		else {
			setWrong(answer.position)
		}
	}, [answer]);
	const { que, option1, option2, option3, option4 } = data;
	return (
		<div className='relative p-6 pt-0 flex-auto mb-6 border-2 rounded-lg'>
			<div className="relative m-auto my-6 flex justify-between items-center">
				<h3 className='font-semibold flex items-center text-2xl'>Q{order + 1} &nbsp; &nbsp; &nbsp;{que || "Quiz Question"}</h3>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">A.</p>
				<label className={correct === 0 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-green-500 text-white" :
					wrong === 0 ? "form-label items-center w-11/12 flex border-2 border-red-500 p-3 rounded-lg my-2 cursor-pointer bg-red-500 text-white": "form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<span className="ml-2">{option1 || "Option 1"}</span>
				</label>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">B.</p>
				<label className={correct === 1 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-green-500 text-white" :
					wrong === 1 ? "form-label items-center w-11/12 flex border-2 border-red-500 p-3 rounded-lg my-2 cursor-pointer bg-red-500 text-white": "form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<span className="ml-2">{option2 || "Option 2"}</span>
				</label>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">C.</p>
				<label className={correct === 2 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-green-500 text-white" :
					wrong === 2 ? "form-label items-center w-11/12 flex border-2 border-red-500 p-3 rounded-lg my-2 cursor-pointer bg-red-500 text-white": "form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<span className="ml-2">{option3 || "Option 3"}</span>
				</label>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">D.</p>
				<label className={correct === 3 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-green-500 text-white" :
					wrong === 3 ? "form-label items-center w-11/12 flex border-2 border-red-500 p-3 rounded-lg my-2 cursor-pointer bg-red-500 text-white": "form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<span className="ml-2">{option4 || "Option 4"}</span>
				</label>
			</div>

		</div>
	)
}

export default ScoreQuestion