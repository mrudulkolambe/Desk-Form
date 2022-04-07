import React, { useState } from 'react'

const QuizQue = ({ data, order, dataHandle }) => {
	const [position, setPosition] = useState();
	const handleChange = (position) => {
		setPosition(position)
		let option = ""
		if (position === 0) {
			option = option1
		}
		else if (position === 1) {
			option = option2
		}
		else if (position === 2) {
			option = option3
		}
		else {
			option = option4
		}
		dataHandle(order, position, option)
	};
	const { que, option1, option2, option3, option4 } = data;
	return (
		<div className='relative p-6 pt-0 flex-auto mb-6 border-2 rounded-lg'>
			<div className="relative m-auto my-6 flex justify-between items-center">
				<h3 className='font-semibold flex items-center text-2xl'>Q{order + 1} &nbsp; &nbsp; &nbsp;{que || "Quiz Question"}</h3>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">A.</p>
				<label className={position === 0 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-gray-300" :
					"form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<input
						type="radio"
						className="form-radio"
						name={order}
						value="personal"
						checked={position === 0}
						onClick={() => { handleChange(0) }}
					/>
					<span className="ml-2">{option1 || "Option 1"}</span>
				</label>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">B.</p>
				<label className={position === 1 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-gray-300" :
					"form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<input
						type="radio"
						className="form-radio"
						name={order}
						value="personal"
						checked={position === 1}
						onClick={() => { handleChange(1) }}
					/>
					<span className="ml-2">{option2 || "Option 2"}</span>
				</label>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">C.</p>
				<label className={position === 2 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-gray-300" :
					"form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<input
						type="radio"
						className="form-radio"
						name={order}
						value="personal"
						checked={position === 2}
						onClick={() => { handleChange(2) }}
					/>
					<span className="ml-2">{option3 || "Option 3"}</span>
				</label>
			</div>

			<div className="flex items-center justify-around">
				<p className="mr-3">D.</p>
				<label className={position === 3 ?
					"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg my-2 bg-gray-300" :
					"form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg my-2 cursor-pointer"}>
					<input
						type="radio"
						className="form-radio"
						name={order}
						value="personal"
						checked={position === 3}
						onClick={() => { handleChange(3) }}
					/>
					<span className="ml-2">{option4 || "Option 4"}</span>
				</label>
			</div>

		</div>
	)
}

export default QuizQue