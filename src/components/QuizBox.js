import React from 'react'
import { Link } from 'react-router-dom';

const QuizBox = ({ que }) => {
	const { data, id } = que;
	const path = `/quiz/${id}`
	return (
		<Link to={path}>
			<div className="hover:text-blue-500 p-3 border-2 w-72 rounded-lg hover:border-blue-500 duration-150 cursor-pointer overflow-hidden">
				<div className="font-bold text-ellipsis whitespace-nowrap overflow-hidden text-lg">
					{data.title}
				</div>
				<p className='text-black'>Date: {data.date}</p>
			</div>
		</Link>
	)
}

export default QuizBox