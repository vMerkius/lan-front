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
import EditQuiz from "./EditQuiz";
import EditQuestion from "./EditQuestion";

const Quiz = () => {
  const value = useParams();
  const id = Number(value.idQuiz);
  const [selectedQuestionId, setSelectedQuestionId] = useState<
    number | undefined | null
  >(null);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null
  );
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

      <EditQuiz quiz={quiz} setQuiz={setQuiz} />

      {questions.map((question) => (
        <div key={question.id}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setEditingQuestionId(null);
              setSelectedQuestionId((prevId) =>
                prevId === question.id ? null : question.id
              );
            }}
            className="quiz-container__bar quiz-container__bar--main"
          >
            {/* <h4>{question.description}</h4> */}
            <EditQuestion
              editingQuestionId={editingQuestionId}
              question={question}
              setEditingQuestionId={setEditingQuestionId}
              idQuiz={id}
              questions={questions}
              setQuestions={setQuestions}
            />
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
