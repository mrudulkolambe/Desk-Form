import React, { useState } from "react";

const QuizOption = () => {
	const [isChecked, setIsChecked] = useState(false);
	const handleChange = (e) => {
		setIsChecked(e.target.checked);
		isChecked ? setIsChecked(false) : setIsChecked(true)
	};
	return (
		<>
			<div className="flex items-center">
			<p className="mr-3">A.</p>
			<label className={isChecked ?
				"cursor-pointer form-label items-center w-11/12 flex border-2 p-3 rounded-lg mt-2 border-blue-600" :
				"form-label items-center w-11/12 flex border-2 border-gray-300 p-3 rounded-lg mt-2 cursor-pointer"}>
				<input
					type="radio"
					className="form-radio"
					name="accountType"
					value="personal"
					checked={isChecked}
					onClick={handleChange}
				/>
				<span className="ml-2">Personal</span>
			</label>
			</div>
		</>
	);
};

export default QuizOption;
