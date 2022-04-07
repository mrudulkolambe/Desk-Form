import React, { useEffect, useState } from 'react'
import Accordian from './Accordian';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase-config';
import { useParams } from 'react-router-dom';

const QuizResponses = () => {
	// const { user } = useUserAuth();
	const [data, setData] = useState([]);
	const { quizID } = useParams()
	useEffect(() => {
		const q = query(collection(db, "QUIZ", `${quizID}`, "RESPONSES"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				const responseData = {
					user: doc.data().name,
					email: doc.data().email,
					date: doc.data().date,
					response: doc.data().response
				}
				data.push(responseData)
			});
			setData(data)
		});
		return () => {
			unsubscribe()
		};
	}, []);

	return (
		<div>
			{ data.map((responseData) => {
				return <Accordian data={responseData}/>
			}) }
		</div>
	)
}

export default QuizResponses