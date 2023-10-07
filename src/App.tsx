import "./App.css";
import Dashboard from "./components/AdminPanel/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import SideBar from "./components/SideBar/SideBar";
import Stats from "./components/AdminPanel/Stats/Stats";
import Users from "./components/AdminPanel/Users/User";
import Courses from "./components/AdminPanel/Courses/Courses";
import CourseDetails from "./components/AdminPanel/CourseDetails/CourseDetails";

import "./i18n";
import { useTranslation, Trans } from "react-i18next";
import Module from "./components/AdminPanel/CourseDetails/Module/Module";
import Quiz from "./components/AdminPanel/CourseDetails/Quiz/Quiz";
import Flashcards from "./components/AdminPanel/CourseDetails/Module/Flashcard/Flashcard";
import "./shared.scss";
import Lessons from "./components/AdminPanel/CourseDetails/Module/Lesson/Lessons";

function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="app">
        {/* <button onClick={() => changeLanguage("en")}>en</button>
        <button onClick={() => changeLanguage("pl")}>pl</button>
        <h1>{t("dashboard.hello")}</h1> */}
        <div className="side">
          <SideBar></SideBar>
        </div>
        <div className="main">
          <SearchBar></SearchBar>
          <div className="admin-panel-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/users" element={<Users />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />

              <Route path="/courses/:id/quiz/:idQuiz" element={<Quiz />} />
              <Route
                path="/courses/:id/module/:idModule/flashcards"
                element={<Flashcards />}
              />
              <Route
                path="/courses/:id/module/:idModule/lessons"
                element={<Lessons />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
