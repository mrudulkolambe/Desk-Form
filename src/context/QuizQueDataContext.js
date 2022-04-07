import React, { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase-config"
import { useUserAuth } from "./UserAuthContext";



const userQuizContext = createContext();

export function UserQuizContextProvider({ children }) {

	const { user } = useUserAuth()
	const [queArr, setQueArr] = useState([]);
	const [queData, setQueData] = useState({});
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [quiz, setQuiz] = useState([]);


	const addQue = (data) => {
		let arr = queArr;
		data.order = queArr.length
		console.log(data)
		arr.push(data)
		setQueArr(arr)
		console.log(queArr)
	}
	const queEditor = (data) => {
		setQueData(data)
	}

	const createQuiz = async (Questions) => {
		let date = getCurrentDate()
		const docRef = await addDoc(collection(db, "QUIZ"), { Questions, title, description, creator: btoa(user.uid), date, acceptingResponses: true });
		console.log("Document written with ID: ", docRef.id);
		setTitle("")
		setQueData({})
		setQueArr([])
		setDescription("")
	}

	const getCurrentDate = () => {
		const dateObj = new Date();
		let date = dateObj.getDate();
		let month = dateObj.getMonth() + 1;
		let year = dateObj.getFullYear();

		if (date <= 9) {
			date = `0${date}`
		}
		if (month <= 9) {
			month = `0${month}`
		}

		const dateString = `${date}-${month}-${year}`
		return dateString
	}

	useEffect(() => {
		if (user) {
			let arr = []
			const q = query(collection(db, "QUIZ"), where("creator", "==", `${btoa(user.uid)}`));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				querySnapshot.forEach((doc) => {
					let doc_data = {
						id: doc.id,
						data: doc.data()
					}
					arr.push(doc_data)
				});
				setQuiz(arr)
			});
			return () => {
				unsubscribe()
			};
		}
	}, [user]);

	const deleteElem = (index) => {
		let arr = queArr;
		let finalArr = []
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].order !== index) {
				arr[i].order = finalArr.length
				finalArr.push(arr[i])
			}

		}
		setQueArr(finalArr)
	}
	return (
		<userQuizContext.Provider value={{deleteElem, quiz, addQue, queArr, queData, queEditor, setQueArr, createQuiz, title, setTitle, description, setDescription, getCurrentDate }}>
			{children}
		</userQuizContext.Provider>
	);
}

export function useUserQuiz() {
	return useContext(userQuizContext);
}
