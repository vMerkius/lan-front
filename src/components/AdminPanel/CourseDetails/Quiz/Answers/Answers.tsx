import { useEffect, useState } from "react";
import { IAnswer } from "../../../../../interfaces/IAnswer";
import {
  deleteAnswerAPI,
  getQuestionAnswersAPI,
} from "../../../../../server/server";
import "./answers.scss";

type AnswersProps = {
  id: number;
  correct: number;
};

const Answers: React.FC<AnswersProps> = ({ id, correct }) => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  useEffect(() => {
    console.log(correct);
    const fetchAnswers = async () => {
      const fetchedAnswers = await getQuestionAnswersAPI(id);
      setAnswers(fetchedAnswers);
    };
    fetchAnswers();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await deleteAnswerAPI(id);
      const newAnswers = answers.filter((answer) => answer.id !== id);
      setAnswers(newAnswers);
    } catch {
      alert("Unable to delete answer");
    }
  };

  return (
    <div className="answers-container">
      {answers.map((answer, index) => (
        <div className="answers-container__flex" key={answer.id}>
          <div className="answers-container__flex__main">
            <h4
              className={
                correct === index + 1
                  ? "answers-container__flex__main--correct"
                  : ""
              }
            >
              {answer.name}
            </h4>
            <button
              className="answers-container__flex__main__delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(answer.id);
              }}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Answers;
