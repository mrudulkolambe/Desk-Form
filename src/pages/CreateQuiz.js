import React, { useEffect, useState } from "react";
import Preview from "../components/Preview";
import QuizMain from "../components/QuizMain";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useUserQuiz } from "../context/QuizQueDataContext";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const CreateQuiz = () => {
  const [flag, setFlag] = useState(false)
  const { classID } = useParams()
  const { description, setDescription, title, setTitle, integrate, setClassID} = useUserQuiz()
  const { user } = useUserAuth()
  useEffect(() => {
    if(user){
      setClassID(classID)
    }
  }, [user]);

  const handlePreview = () => {
    if (flag) {
      setFlag(false)
    }
    else {
      setFlag(true)
    }
  }
  
  
  return (
    <>
      <div className={integrate ? "w-screen": "hidden"}>

        <div className="flex justify-center items-center mt-3">
          <h1 className="font-bold text-3xl text-center mx-3">Create Quiz</h1>
          <button onClick={handlePreview} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-between">Preview {!flag ? <AiOutlineEye className="ml-2 text-lg" /> : <AiOutlineEyeInvisible className="ml-2 text-lg" />}</button>
        </div>
        {/* fixed top-28 */}
        <div className="flex px-3 md:px-28">
          {/* Create Quiz */}
          {/* md:w-1/3 w-screen px-6 md:px-2 fixed top-32 left-0 overflow-scroll h-3/4 */}
          <form className={flag ? "hidden" : "m-auto w-full"} >
            <div className="relative px-6 flex-auto mb-6">
              <label
                htmlFor="QuizTitle"
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
            <div className="relative px-6 flex-auto my-6">
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
            <div className="rounded m-auto flex flex-col">
              <QuizMain />
              {/* <hr className="bg-slate-600 mb-6" />
              <h1 className="text-3xl font-bold">Preview : </h1>
              <Preview title={title} desc={description} flag={!flag} /> */}
            </div>
          </form>

          {/* Preview */}
          <Preview title={title} desc={description} flag={flag} />
        </div>
      </div>
      {/* <div className={!integrate ? "font-bold text-center text-3xl mt-5": "hidden"}>You Don't Have Access</div> */}

    </>
  );
};

export default CreateQuiz;
