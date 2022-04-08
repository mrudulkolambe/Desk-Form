import React, { useEffect, useState } from 'react'
import Accordian from './Accordian';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase-config';
import { useParams } from 'react-router-dom';
import Alert from './Alert';

const QuizResponses = () => {
	// const { user } = useUserAuth();
	const [data, setData] = useState([]);
	const [message, setMessage] = useState("");
	const [flag, setflag] = useState(false);
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
					response: doc.data().response,
					id: doc.id
				}
				data.push(responseData)
			});
			setData(data)
		});
		return () => {
			unsubscribe()
		};
	}, []);


	const call_alert = (content) => {
		setflag(true);
		setMessage(content);
		const timeout = setTimeout(() => {
			setflag(false);
			clearTimeout(timeout);
		}, 10);
	};

	return (
		<div>
			<Alert message={message}
				flag={flag}
				messageSetter={setMessage}  />
			{data.length === 0 ? <p className='text-center text-2xl font-bold mt-4'>No Responses Yet!</p> : data.map((responseData) => {
				return <Accordian key={responseData.id} deleteResponse={call_alert} data={responseData} />
			})}
		</div>
	)
}

export default QuizResponses