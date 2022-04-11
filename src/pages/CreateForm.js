import React, { useState } from 'react'
import FormPreview from '../components/FormPreview';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import TextInput from '../components/TextInput';
import ParaInput from '../components/ParaInput';
import MCQInput from '../components/MCQInput';

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formType, setFormType] = useState("");
  const [preview, setPreview] = useState(false)

  const [inputText, setinputText] = useState("")
  const [inputPara, setinputPara] = useState("")


  const handlePreview = () => {
    if (preview) {
      setPreview(false)
    }
    else {
      setPreview(true)
    }
  }
  return (
    <>
      <button onClick={handlePreview} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-between w-28 m-auto mt-3"><p>Preview</p> {!preview ? <AiOutlineEye className="ml-2 text-lg" /> : <AiOutlineEyeInvisible className="ml-2 text-lg" />}</button>

      <div className={!preview ? "" : "hidden"}>

        <div className="relative px-6 flex-auto mb-6">
          <label
            htmlFor="QuizTitle"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Form Title :
          </label>
          <input
            id="QuizTitle"
            className="rounded-md w-full"
            placeholder="Form Title"
            autoComplete="off"
            value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value);
            }}
          />
        </div>

        <div className="relative px-6 flex-auto mb-6">
          <label
            htmlFor="FormDescription"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Form Description :
          </label>
          <input
            id="FormDescription"
            className="rounded-md w-full"
            placeholder="Form Description"
            autoComplete="off"
            value={formDescription}
            onChange={(e) => {
              setFormDescription(e.target.value);
            }}
          />
        </div>

        <div className="relative px-6 flex-auto mb-6">
          <label
            htmlFor="QuizTitle"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Form Type :
          </label>
          <select className='rounded-md w-full' value={formType} onChange={(e) => { setFormType(e.target.value) }}>
            <option value="" key="" selected className='px-3 font-bold'>Choose Option</option>
            <option value="text" key="text" className='px-3'>Text</option>
            <option value="para" key="para" className='px-3'>Long Text</option>
            <option value="mcq" key="mcq" className='px-3'>Multiple Options</option>
          </select>
        </div>
        {formType === "text" ? <TextInput inputText={inputText} setinputText={setinputText} /> : formType === "para" ? <ParaInput inputText={inputText} setinputText={setinputText}/> : formType === "mcq" ? <MCQInput inputText={inputText} setinputText={setinputText} /> : "Please Choose The Option"}

      </div>

      <FormPreview preivew={preview} />
    </>
  )
}

export default CreateForm