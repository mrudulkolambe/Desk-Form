import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Alert = ({ flag, message, messageSetter, link, linkText }) => {
  const alert_dom = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (flag) {
      const animate_alert = () => {
        alert_dom.current.classList.add("show_alert");
        const timeOut = setTimeout(() => {
          alert_dom.current.classList.remove("show_alert");
          messageSetter("");
          clearTimeout(timeOut);
        }, 3000);
      };
      return () => {
        animate_alert();
      };
    }
  }, [flag]);

  return (
    <div
      id="alert-1"
      ref={alert_dom}
      className="absolute alert_pos flex p-4 mb-4 bg-blue-100 rounded-lg  w-2/3 m-auto"
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-5 h-5 text-blue-700 "
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="ml-3 text-sm font-medium text-blue-700 ">
        {message}
        <a
        onClick={() => {navigate(link)}}
          className="animate-bounce cursor-pointer font-bold underline hover:text-blue-800 dark:hover:text-blue-900"
        >
          {" "}{linkText}
        </a>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Alert;
