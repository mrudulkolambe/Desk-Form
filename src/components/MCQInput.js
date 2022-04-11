import React, { useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import MCQOptions from './MCQOptions'
import { BsTrash } from "react-icons/bs"
import Alert from "./Alert"


const MCQInput = ({ inputText, setinputText }) => {
	const [option, setoption] = useState("");
	const [final, setFinal] = useState([])
	const [match, setMatch] = useState(false)
	const [message, setMessage] = useState("")
	let arr = [];
	const handleAddOption = () => {
		if (final.includes(option)) {
			call_alert("Same Option Found!")
		}
		else {
			arr = final;
			arr.push(option)
			setFinal(arr)
			setoption("")
		}
	}
	const call_alert = (content) => {
		setMatch(true);
		setMessage(content);
		const timeout = setTimeout(() => {
			setMatch(false);
			clearTimeout(timeout);
		}, 10);
	};
	const deleteElem = (index) => {
		let arr = final;
		let finalArr = []
		for (let i = 0; i < arr.length; i++) {
			if (i !== index) {
				finalArr.push(arr[i])
			}

		}
		setFinal(finalArr)
	}
	return (
		<>
			<Alert message={message}
				flag={match}
				messageSetter={setMessage} />
			<div className="relative px-6 flex-auto mb-3">
				<label
					htmlFor="question"
					className="block text-base font-semibold text-gray-700 mb-2"
				>
					Question:
				</label>
				<input
					id="question"
					className="rounded-md w-full"
					placeholder="Question"
					autoComplete="off"
					value={inputText}
					onChange={(e) => {
						setinputText(e.target.value);
					}}
				/>
			</div>
			<div className="relative px-6 flex-auto mb-3">
				<label
					className="block text-base font-semibold text-gray-700 mb-2"
				>
					Options:
				</label>
				<div className="relative px-6 mb-3">
					{final.map((option, i) => {
						return (
						
								<div key={i} className='flex justify-between items-center my-3'>
									<div>Option {i + 1}.</div>
									<div className='p-3 border-2 w-11/12 rounded border-gray-300 flex justify-between items-center'>
										<p>{option} {i}</p>
										<BsTrash className='cursor-pointer' onClick={() => {deleteElem(i)}} />
									</div>
								</div>
						)
					})}
					<MCQOptions count={final.length} option={option} setoption={setoption} />
					<button onClick={handleAddOption} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 w-32 mt-4 flex justify-between items-center"><p>Add Option</p><AiOutlinePlus /></button>
				</div>
			</div>
		</>
	)
}

export default MCQInput