import React from 'react'

const TextInput = ({inputText, setinputText}) => {
	return (
		<>
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
			<div className="relative px-6 flex-auto mb-6">
				<input
					className="border-0 border-b-2 w-full rounded"
					placeholder="Answer"
					autoComplete="off"
				/>
			</div>
		</>
	)
}

export default TextInput