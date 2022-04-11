import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import QuizQue from "../components/QuizQue";
import { useUserQuiz } from "../context/QuizQueDataContext";
import QuizResponses from "../components/QuizResponses";
import ScoreQuestion from "../components/ScoreQuestion";
import Alert from "../components/Alert";

const Quiz = () => {
  const navigate = useNavigate()
  const [score, setScore] = useState(0);
  const { user } = useUserAuth();
  const { quizID } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswer] = useState([]);
  const { getCurrentDate } = useUserQuiz();
  const [tab, setTab] = useState("QUIZ");
  const [flag, setFlag] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const dummy = {
    title: "Loading...",
    description: "Loading...",
    response: [],
    questions: []
  }
  const [data, setData] = useState(dummy);

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
        answer.correctAns = opt
      }
    });
    setAnswer(arr);
  };

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "QUIZ", `${quizID}`), (doc) => {
        setChecked(doc.data().acceptingResponses)
        setShowResponse(doc.data().showResponse)
        console.log(doc.data())
        setCurrentQuiz(doc.data());
      });
      return () => {
        unsub();
      };
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "QUIZ", `${quizID}`, "RESPONSES", `${user.uid}`), (doc) => {
        if (doc.data() === undefined) {
          return
        }
        else {
          setData(doc.data())
          setFlag(true)
        }
      });
      return () => {
        unsub()
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
      questions: currentQuiz.Questions
    });
    call_alert("Your Reponses Has Been Submitted!")
  };

  const call_alert = (content) => {
    setAlert(true);
    setMessage(content);
    const timeout = setTimeout(() => {
      setAlert(false);
      clearTimeout(timeout);
    }, 10);
  };

  useEffect(() => {
    setTitle(currentQuiz.title)
    setDescription(currentQuiz.description)
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

  const handleUpdateChanges = async () => {
    const docRef = doc(db, "QUIZ", `${quizID}`);
    const docRef2 = doc(db, "classes", `${currentQuiz && currentQuiz.classID}`, "work", `${currentQuiz && currentQuiz.workID}`);
console.log(showResponse)
    await updateDoc(docRef, {
      title: title,
      description: description,
      acceptingResponses: checked,
      showResponse: showResponse
    }).then(async () => {
      await updateDoc(docRef2, {
        title: title,
        description: description,
      })
      .then(() => {
        call_alert("Changes Saved")
      })
    })

  }

  const handleAcceptResponse = () => {
    checked ? setChecked(false) : setChecked(true)
  }
  const handleShowResponse = () => {
    showResponse ? setShowResponse(false) : setShowResponse(true)
  }

  const [title, setTitle] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");

  return (
    <>
      <Alert
        message={message}
        flag={alert}
        messageSetter={setMessage}
      />
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
             user && currentQuiz.creator === btoa(user.uid)
                ? "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
                : "hidden"
            }
          >
            <ul className="flex flex-wrap -mb-px justify-center">
              <li className="mr-2">
                <a
                  onClick={() => {
                    setTab("QUIZ");
                  }}
                  className={
                    tab === "QUIZ"
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
                    setTab("RESPONSES");
                  }}
                  className={
                    tab === "RESPONSES"
                      ? "cursor-pointer inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                      : "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600  dark:hover:text-gray-300"
                  }
                  aria-current="page"
                >
                  Responses
                </a>
              </li>
              <li className="mr-2">
                <a
                  onClick={() => {
                    setTab("SETTINGS");
                  }}
                  className={
                    tab === "SETTINGS"
                      ? "cursor-pointer inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                      : "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600  dark:hover:text-gray-300"
                  }
                  aria-current="page"
                >
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div >
            <div
              className={
                tab === "QUIZ" ? "w-full rounded m-auto flex flex-col " : "hidden"
              }
            >
              <div
                className={
                  currentQuiz && currentQuiz.acceptingResponses ? "" : "hidden"
                }
              >
                <div className={flag ? "hidden" : ''}>
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
              </div>
              <div
                className={
                  currentQuiz && !currentQuiz.acceptingResponses ? "" : "hidden"
                }
              >
                <h1 className="text-lg font-bold">
                  This Quiz Is No longer accepting Responses
                </h1>
              </div>
              <div className={!flag ? "hidden" : ""}>
                <h1 className="text-lg font-bold text-center my-3">
                  <hr className={currentQuiz.creator === btoa(user.uid) ? "hidden" : "my-3"} />
                  {"Your Response Has Been Recorded!"}
                </h1>
                <div className={showResponse || currentQuiz.creator === btoa(user.uid) ? "" : "hidden"}>

                  <h3 className="text-xl font-semibold text-gray-600 flex flex-wrap justify-around items-center my-4">
                    <p>Score: {score}/{data && data.response.length}</p>
                    <p>Correct: {score}</p>
                    <p>Correct: {data && data.response.length - score}</p>
                  </h3>
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
            </div>

            <div
              className={
                tab === "RESPONSES" ? "w-full rounded m-auto flex flex-col " : "hidden"
              }
            >
              <QuizResponses />
            </div>
            <div
              className={
                tab === "SETTINGS" ? "w-full rounded m-auto flex flex-col " : "hidden"
              }
            >
              <div className="relative px-6 flex-auto my-6 mb-3">
                <label
                  htmlFor="QuizDesc"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Quiz Title :
                </label>
                <input
                  id="QuizTitle"
                  className="rounded-md w-full"
                  placeholder="Quiz Title"
                  autoComplete="off"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="relative px-6 flex-auto my-1">
                <label
                  htmlFor="QuizDesc"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Quiz Description :
                </label>
                <input
                  id="QuizDesc"
                  className="rounded-md w-full"
                  placeholder="Quiz Description"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="relative px-6 flex-auto my-1">
                <label
                  htmlFor="QuizDesc"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Desk Form Link :
                </label>
                <input
                  id="Desk Form Link"
                  className="rounded-md w-full cursor-pointer"
                  placeholder="Quiz Description"
                  autoComplete="off"
                  value={`${window.origin}/auth/?redirect=quiz/${quizID}`}
                  readOnly
                  onClick={(e) => {
                    navigator.clipboard.writeText(e.target.value);
                    call_alert("Desk Form Link Copied To Clipboard!")
                  }}
                />
              </div>
              <div className="flex items-start my-6 mb-3 px-6">
                <div className="flex items-center h-5">
                  <input id="remember" ariaDescribedBy="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" onClick={handleAcceptResponse} checked={checked} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="font-medium text-gray-900">Accept Responses</label>
                </div>
              </div>
              <div className="flex items-start mb-6 px-6">
                <div className="flex items-center h-5">
                  <input id="show" ariaDescribedBy="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" onClick={handleShowResponse} checked={showResponse} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="font-medium text-gray-900">Show Responses After Submission</label>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-36"
                  type="button"
                  onClick={handleUpdateChanges}
                >
                  Update Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Quiz;
