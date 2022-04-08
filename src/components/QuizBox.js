import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const QuizBox = ({ que }) => {
	const { data, id } = que;
	const path = `/quiz/${id}`
	const [copy, setCopy] = useState("Copy");
	return (
		<div className="relative m-3 hover:text-blue-500 p-3 border-2 w-72 rounded-lg hover:border-blue-500 duration-150 cursor-pointer overflow-hidden">
			<p title='Click To Copy' className='absolute right-2 cursor-pointer text-xs font-bold' onClick={() => {
				navigator.clipboard.writeText(window.origin + path)
				setCopy("Copied!")
				setTimeout(() => {
					setCopy("Copy")
				}, 2000);
			}}>{copy}</p>
			<Link to={path}>
				<div className="font-bold text-ellipsis whitespace-nowrap overflow-hidden text-lg">
					{data.title}
				</div>
			</Link>
			<p className='text-black'>Date: {data.date}</p>
		</div>
	)
}

export default QuizBox