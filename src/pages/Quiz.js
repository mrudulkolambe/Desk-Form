import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import QuizQue from "../components/QuizQue";
import { useUserQuiz } from "../context/QuizQueDataContext";
import QuizResponses from "../components/QuizResponses";

const Quiz = () => {
  const [score, setScore] = useState(0);
  const { user } = useUserAuth();
  const { quizID } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswer] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { getCurrentDate } = useUserQuiz();
  const [tab, setTab] = useState(0);

  const answerData = (order, position, option) => {
    let arr = answers;
    let ques = currentQuiz.Questions;
    let opt = "";
    for (let i = 0; i < ques.length; i++) {
      if (ques[i].order === order) {
        opt = ques[i].correctAns;
      }
    }
    arr.forEach((answer) => {
      if (answer.order === order) {
        answer.position = position;
        answer.answer = option;
        answer.correct = option === atob(opt);
      }
    });
    setAnswer(arr);
  };

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "QUIZ", `${quizID}`), (doc) => {
        setCurrentQuiz(doc.data());
      });
      return () => {
        unsub();
      };
    }
  }, [user]);

  useEffect(() => {
    let arr = answers;
    if (questions.length !== 0 && arr.length === 0) {
      for (let i = 0; i < questions.length; i++) {
        let data = {
          order: questions[i].order,
          position: null,
          answer: null,
          correct: false,
          answer: questions[i].correctAns
        };
        arr.push(data);
      }
      setAnswer(arr);
    }
  }, [questions]);
  const handleSubmitFormBtn = async () => {
    let date = getCurrentDate();
    await setDoc(doc(db, "QUIZ", `${quizID}`, "RESPONSES", `${user.uid}`), {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      response: answers,
      date: date,
      timestamp: serverTimestamp(),
      title: currentQuiz.title,
      description: currentQuiz.description,
    });
  };

  useEffect(() => {
    const questions = currentQuiz.Questions;
    let data = [];
    if (questions) {
      for (let i = 0; i < questions.length; i++) {
        let queData = {
          option1: questions[i].option1,
          option2: questions[i].option2,
          option3: questions[i].option3,
          option4: questions[i].option4,
          que: questions[i].que,
          order: questions[i].order,
        };
        data.push(queData);
      }
    }
    setQuestions(data);
  }, [currentQuiz]);

  return (
    <>
      <form className="flex mt-6 m-auto flex-col justify-start h-3/4 px-3 md:px-12">
        <div className="flex flex-col justify-center ">
          <div className="relative mb-3">
            <h1 className="text-3xl font-bold">
              {currentQuiz && currentQuiz.title}
            </h1>
          </div>
          <div className="relative mb-3">
            <h3 className="text-xl font-semibold text-gray-600">
              {currentQuiz && currentQuiz.description}
            </h3>
          </div>
          <div
            className={
              currentQuiz.creator === btoa(user.uid)
                ? "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
                : "hidden"
            }
          >
            <ul className="flex flex-wrap -mb-px justify-center">
              <li className="mr-2">
                <a
                  onClick={() => {
                    setTab(0);
                  }}
                  className={
                    tab === 0
                      ? "cursor-pointer inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                      : "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600  dark:hover:text-gray-300"
                  }
                >
                  Quiz
                </a>
              </li>
              <li className="mr-2">
                <a
                  onClick={() => {
                    setTab(1);
                  }}
                  className={
                    tab === 1
                      ? "cursor-pointer inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                      : "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600  dark:hover:text-gray-300"
                  }
                  aria-current="page"
                >
                  Responses
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 w-11/12 m-auto" />
          <div
            className={
              currentQuiz && currentQuiz.acceptingResponses ? "" : "hidden"
            }
          >
            <div
              className={
                tab === 0 ? "w-full rounded m-auto flex flex-col " : "hidden"
              }
            >
              {questions &&
                questions.map((que, i) => {
                  return (
                    <QuizQue
                      key={i}
                      dataHandle={answerData}
                      data={que}
                      order={i}
                    />
                  );
                })}
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmitFormBtn}
              >
                Submit Form
              </button>
            </div>

            <div
              className={
                tab === 1 ? "w-full rounded m-auto flex flex-col " : "hidden"
              }
            >
              <QuizResponses />
            </div>
          </div>
          <div
            className={
              currentQuiz && !currentQuiz.acceptingResponses ? "" : "hidden"
            }
          >
            <h1 className="text-lg font-bold">
              This Quiz Is No longer accepting responses
            </h1>
          </div>
        </div>
      </form>
    </>
  );
};

export default Quiz;
