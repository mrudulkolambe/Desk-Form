import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { UserQuizContextProvider } from "./context/QuizQueDataContext";
import Login from "./pages/Login";
import { Main } from "./pages/Main";
import Create from "./pages/Create";
import View from "./pages/View";
import Quiz from "./pages/Quiz";
import ViewScore from "./pages/ViewScore";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <UserQuizContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/auth" exact element={<Login />} />
            <Route path="/create/:classID" exact element={<Create />} />
            <Route path="/create" exact element={<Create />} />
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
