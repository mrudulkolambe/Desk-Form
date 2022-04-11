import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { UserQuizContextProvider } from "./context/QuizQueDataContext";
import Login from "./pages/Login";
import { Main } from "./pages/Main";
import View from "./pages/View";
import CreateQuiz from "./pages/CreateQuiz"
import Quiz from "./pages/Quiz";
import ViewScore from "./pages/ViewScore";
import CreateForm from "./pages/CreateForm";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <UserQuizContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/auth" exact element={<Login />} />
            <Route path="/createquiz/:classID" exact element={<CreateQuiz />} />
            <Route path="/createquiz" exact element={<CreateQuiz />} />
            <Route path="/form/create" exact element={<CreateForm />} />
            <Route path="/view" exact element={<View />} />
            <Route path="/quiz/:quizID" exact element={<Quiz />} />
            <Route path="/score/:quizID" exact element={<ViewScore />} />
          </Routes>
        </UserQuizContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
