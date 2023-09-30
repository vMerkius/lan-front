import { useEffect, useState } from "react";
import { IQuiz } from "../../../../interfaces/IQuiz";
import {
  deleteQuestionAPI,
  getModuleQuizAPI,
  getQuizQuestionsAPI,
} from "../../../../server/server";
import { useParams } from "react-router";
import { IQuestion } from "../../../../interfaces/IQuestion";
import "./quiz.scss";
import Answers from "./Answers/Answers";
import AddQuestion from "./AddQuestion/AddQuestion";

const Quiz = () => {
  const value = useParams();
  const id = Number(value.idQuiz);
  const [selectedQuestionId, setSelectedQuestionId] = useState<
    number | undefined | null
  >(null);
  const [quiz, setQuiz] = useState<IQuiz>({
    id: 0,
    name: "",
    description: "",
    courseId: 0,
  });
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [showAddSection, setShowAddSection] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedQuiz = await getModuleQuizAPI(id);
      const fetchedQuestions = await getQuizQuestionsAPI(id);
      setQuiz(fetchedQuiz);
      setQuestions(fetchedQuestions);
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteQuestionAPI(id);
      const newQuestions = questions.filter((question) => question.id !== id);
      setQuestions(newQuestions);
    } catch (error) {
      alert("Unable to delete question");
    }
  };
  return (
    <div className="quiz-container">
      {showAddSection && (
        <AddQuestion idQuiz={id} setShowAddSection={setShowAddSection} />
      )}
      <div className="quiz-container__header">
        <h1>Quiz</h1>
        <button
          className="quiz-container__header__button add-btn--big"
          onClick={() => {
            setShowAddSection(!showAddSection);
          }}
        >
          Add Question
        </button>
      </div>
      <h2>{quiz.description}</h2>
      {questions.map((question) => (
        <div
          key={question.id}
          onClick={() => {
            setSelectedQuestionId((prevId) =>
              prevId === question.id ? null : question.id
            );
          }}
        >
          <div className="quiz-container__bar quiz-container__bar--main">
            <h4>{question.description}</h4>
            <div className="quiz-container__bar__buttons">
              <button
                className="quiz-container__bar__buttons__button quiz-container__bar__buttons__button--delete"
                onClick={() => {
                  handleDelete(question.id);
                }}
              >
                -
              </button>
              {selectedQuestionId !== question.id ? (
                <h3>&#8681;</h3>
              ) : (
                <h3>&#8679;</h3>
              )}
            </div>
          </div>
          {selectedQuestionId === question.id && <Answers id={question.id} />}
        </div>
      ))}
    </div>
  );
};

export default Quiz;
