import React from "react";
import { Link } from "react-router-dom";
import QuizBox from "../components/QuizBox";
import { useUserQuiz } from "../context/QuizQueDataContext";

export const Main = () => {
  const { quiz } = useUserQuiz()
  return (
    <>
      <div className="h-32 w-full p-5 flex justify-center items-center flex-col">
        <h1 className="text-center text-3xl font-bold">
          Start Creating Your Own Quiz
        </h1>
        <div>
          <button
            className="mt-4 mx-3 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <Link to={"/createquiz"}>Create Quiz</Link>
          </button>
          <button
            className="mt-4 mx-3 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <Link to={"/form/create"}>Create Form</Link>
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-3 text-center">Your Forms</h1>
      <hr className="w-11/12 m-auto my-3" />
      <div className="px-5 py-3 flex flex-wrap">
        {quiz.map((ques) => {
          console.log(ques)
          return <QuizBox key={ques.id} que={ques} />
        })}
      </div>
    </>
  );
};
