import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCourse,
  getCourseAllModules,
  getCourseAllQuizzes,
} from "../../../server/server";
import { Course } from "../../../interfaces/ICourse";
import { Module } from "../../../interfaces/IModule";
import { IQuiz } from "../../../interfaces/IQuiz";
import "./coursedetails.scss";

const CourseDetails = () => {
  const navigate = useNavigate();
  const value = useParams();
  const id = Number(value.id);
  const [showModules, setShowModules] = useState<boolean>(false);
  const [showQuizzes, setShowQuizzes] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>({
    id: 0,
    level: "",
    language: "",
  });
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourse = await getCourse(id);
      const fetchedQuizzes = await getCourseAllQuizzes(id);
      const fetchedModules = await getCourseAllModules(id);
      setCourse(fetchedCourse);
      setQuizzes(fetchedQuizzes);
      setModules(fetchedModules);
    };
    fetchCourses();
  }, []);
  const handleClickModules = (idModule: number) => {
    navigate(`/courses/${id}/module/${idModule}`);
  };
  const handleClickQuiz = (idQuiz: number) => {
    navigate(`/courses/${id}/quiz/${idQuiz}`);
  };
  const handleClickFlashcards = (idModule: number) => {
    navigate(`/courses/${id}/module/${idModule}/flashcards`);
  };
  const handleClickLessons = (idModule: number) => {
    navigate(`/courses/${id}/module/${idModule}/lessons`);
  };

  return (
    <div className="course-details">
      <h1>Course:</h1>
      <h2>
        {course.language} - {course.level}
      </h2>
      <div
        className="bar bar-main"
        onClick={() => {
          setShowModules(!showModules);
        }}
      >
        <h3>Modules</h3>
        {!showModules ? <h3>&#8681;</h3> : <h3>&#8679;</h3>}
      </div>
      {showModules &&
        modules.map((module) => (
          <div
            key={module.id}
            onClick={() => {
              handleClickModules(module.id);
            }}
          >
            <div className="bar bar-details">
              <h4>{module.name}</h4>
              <div className="module-buttons">
                <button>lessons</button>
                <button>flashcards</button>
                <button>more</button>
              </div>
            </div>
          </div>
        ))}

      <div
        className="bar bar-main bar-quizzes"
        onClick={() => {
          setShowQuizzes(!showQuizzes);
        }}
      >
        <h3>Quizzes</h3>
        {!showQuizzes ? <h3>&#8681;</h3> : <h3>&#8679;</h3>}
      </div>
      {showQuizzes &&
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => {
              handleClickQuiz(quiz.id);
            }}
          >
            <div className="bar bar-details">
              <h4>{quiz.name}</h4>
              <div className="quiz-buttons">
                <button
                  onClick={() => {
                    handleClickQuiz(quiz.id);
                  }}
                >
                  more
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CourseDetails;
