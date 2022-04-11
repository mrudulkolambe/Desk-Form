import React from 'react'

const MCQOptions = ({ option, setoption, count }) => {
	return (
		<>
		<div className='flex flex-wrap justify-between items-center'>
			<label
				className="block text-base font-semibold text-gray-700"
			>
				{`Option	${count+1}.`}
			</label>
			<input
				className="rounded-md w-11/12"
				placeholder={`Option ${count+1}`}
				autoComplete="off"
				value={option}
				onChange={(e) => {setoption(e.target.value)}}
			/>
		</div>
	</>
  )	
}

export default MCQOptions