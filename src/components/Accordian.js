import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";

const Accordian = ({ data, deleteResponse }) => {
  const [isShown, setIsShown] = useState(false);
  const handleAccordian = () => {
    isShown ? setIsShown(false) : setIsShown(true)
  }
  const [score, setScore] = useState(0)
  const responses = data.response
  const { quizID } = useParams()
  const handleDeleteResponse = async () => {
    await deleteDoc(doc(db, "QUIZ", `${quizID}`, "RESPONSES", `${data.id}`));
    deleteResponse("The Response Has Been Deleted!")
  }

  useEffect(() => {
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
      <div className="m-auto my-4 rounded-lg overflow-hidden duration-200">
        <div className={isShown ? "cursor-pointer border-2 p-3 rounded-t-lg flex justify-between items-center" : "flex justify-between items-center rounded-t-lg rounded-b-lg cursor-pointer border-2 p-3"} onClick={handleAccordian}>
          <div className="font-extrabold text-blue-600 flex">{data.user} <div className="text-black ml-1 font-light">({data.email})</div></div>
          <div className="flex items-center">
            <p className="mr-6">Date: {data.date}</p>
            {!isShown ? <FaChevronDown /> : <FaChevronUp />}
          </div>
        </div>
        <div className={isShown ? "flex flex-wrap justify-between items-center duration-300 border-2 p-3 border-t-0 rounded-lg rounded-t-none overflow-hidden" : "overflow-hidden accordian_hidden"}>
          <div className="flex flex-wrap justify-between items-center w-full">
            <p className="font-extrabold">Score: {score}/{responses.length}</p>
            <p className="font-extrabold text-green-600">Correct: {score}</p>
            <p className="font-extrabold text-red-600">Incorrect: {responses.length - score}</p>
          </div>
          <div className="flex justify-end w-full">
          <button onClick={handleDeleteResponse} className="mt-3 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
          >
            Delete Response
          </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Accordian;
