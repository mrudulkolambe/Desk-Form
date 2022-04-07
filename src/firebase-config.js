import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCTOx45uOvOgGRal3PPHaHR91mqtfuduCM",
	authDomain: "quiz-app-4940e.firebaseapp.com",
	projectId: "quiz-app-4940e",
	storageBucket: "quiz-app-4940e.appspot.com",
	messagingSenderId: "752585888235",
	appId: "1:752585888235:web:04d580ab691654f39f49ae"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;