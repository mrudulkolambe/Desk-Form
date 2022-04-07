import React from 'react'
import { useUserQuiz } from '../context/QuizQueDataContext'
import PreviewQueBox from './PreviewQueBox'

const Preview = ({ title, desc, flag }) => {
	const { queData, queArr } = useUserQuiz()
	return (
		<form className={flag ? "flex mt-6 m-auto w-full flex-col justify-start h-3/4": "hidden"}>
			<div>
				<div className="relative px-3 mb-3">
					<h1 className="text-3xl font-bold">{title || "Title"}</h1>
				</div>
				<div className="relative px-3 flex-auto ">
					<h3 className="text-xl font-semibold text-gray-600">
						{desc || "Description"}
					</h3>
				</div>
				<hr className="my-3" />
				<div className="w-full rounded m-auto flex flex-col">
					{/* <PreviewQueBox data={queData} /> */}
					{queArr && queArr.map((que, i) => {
						return <PreviewQueBox key={que.que} order={i} data={que} />
					})}
				</div>
			</div>
		</form>
	)
}

export default Preview