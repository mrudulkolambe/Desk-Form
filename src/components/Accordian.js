import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
// import FileNameDisplay from "../component/FileNameDisplay"

const Accordian = ({ data }) => {
  const [isShown, setIsShown] = useState(false);
  const handleAccordian = () => {
    isShown ? setIsShown(false) : setIsShown(true)
  }
  const [score, setScore] = useState(0)
  const responses = data.response

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
          <p>Score: {score}/{responses.length}</p>
          <p>Correct: {score}</p>
          <p>Incorrect: {responses.length - score}</p>
        </div>
      </div>
    </>
  );
};

export default Accordian;
