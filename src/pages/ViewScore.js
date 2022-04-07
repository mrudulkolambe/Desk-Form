import React, { useState, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import ScoreQuestion from '../components/ScoreQuestion';

const ViewScore = () => {
	const { user } = useUserAuth()
	const dummy = {
		title: "Loading...",
		description: "Loading...",
		response: [],
		questions: []
	}
	const [data, setData] = useState(dummy);
	const { quizID } = useParams();
	const [score, setScore] = useState(0)
	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "QUIZ", `${quizID}`, "RESPONSES", `${user.uid}`), (doc) => {
				setData(doc.data())
			});
			return () => {
				unsub()
			};
		}
	}, [user]);

	useEffect(() => {
		const responses = data.response
		if (!data) {
			return
		}
		setScore(0)
		let i = 0
		responses.forEach((response) => {
			if (data) {
				if (response.correct) {
					i++;
				}
			}
		})
		setScore(i)
	}, [data]);
	return (
		<>
			<form className="flex mt-6 m-auto flex-col justify-start h-3/4 px-3 md:px-12">
				<div className="flex flex-col justify-center ">
					<div className="relative mb-3">
						<h1 className="text-3xl font-bold">
							{data && data.title}
						</h1>
					</div>
					<div className="relative mb-3">
						<h3 className="text-xl font-semibold text-gray-600">
							{data && data.description}
						</h3>
					</div>
					<div className="relative mb-3">
						<h3 className="text-xl font-semibold text-gray-600 flex flex-wrap justify-around items-center">
							<p>Score: {score}/{data && data.response.length}</p>
							<p>Correct: {score}</p>
							<p>Correct: {data && data.response.length - score}</p>
						</h3>
					</div>
					<hr className="my-6 w-11/12 m-auto" />
					<div>
						{
							data && data.questions.map((question, i) => {
								return <ScoreQuestion key={i}
									data={question}
									answer={data.response[i]}
									order={i} />
							})
						}
					</div>
				</div>
			</form>
		</>
	)
}

export default ViewScore