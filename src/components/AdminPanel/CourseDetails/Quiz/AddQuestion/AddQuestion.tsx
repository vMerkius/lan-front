import { useState } from "react";
import "./add-question.scss";
import { addAnswersAPI, addQuestionAPI } from "../../../../../server/server";

type AddQuestionProps = {
  setShowAddSection: (show: boolean) => void;
};

const AddQuestion: React.FC<AddQuestionProps> = ({ setShowAddSection }) => {
  const [answerAmount, setAnswerAmount] = useState(2);
  const [rightAnswer, setRightAnswer] = useState(1);
  const [formDataQuestion, setFormDataQuestion] = useState({
    description: "",
    correctAnswer: "",
    quizId: 0,
  });
  const [formDataAnswers, setFormDataAnswers] = useState([
    { name: "pierwsza" },
    { name: "druga" },
    { name: "trzecia" },
    { name: "czwarta" },
  ]);

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataQuestion({
      ...formDataQuestion,
      [name]: value,
    });
  };
  const handleChangeAnswers = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newAnswers = [...formDataAnswers];
    newAnswers[index].name = value;
    setFormDataAnswers(newAnswers);
  };
  const handleAdd = async () => {
    const questionSend = {
      ...formDataQuestion,
      correctAnswer: "rightAnswer",
      quizId: 1,
    };
    const QuestionAdded = await addQuestionAPI(questionSend);
    const quetionAddedId = QuestionAdded.id;
    const answerSend = [];
    for (let i = 0; i < answerAmount; i++) {
      answerSend.push({
        name: formDataAnswers[i].name,
        questionId: quetionAddedId,
      });
    }
    console.log(answerSend);
    addAnswersAPI(answerSend);
    window.location.reload();
  };
  return (
    <div className="question-container">
      <div className="question-container__add">
        <button
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        <h2>Add Question</h2>
        <form>
          <label>
            Pytanie:
            <input
              type="text"
              name="description"
              value={formDataQuestion.description}
              onChange={handleChangeQuestion}
            />
          </label>
          <h3>Odpowiedzi: (max4)</h3>
          {Array.from(Array(answerAmount).keys()).map((i) => {
            return (
              <div key={i}>
                <label>
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={formDataAnswers[i].name}
                    onChange={() => {
                      setRightAnswer(i + 1);
                    }}
                  />
                  <input
                    type="text"
                    name={`answer${i}`}
                    placeholder={formDataAnswers[i].name}
                    onChange={(e) => handleChangeAnswers(e, i)}
                  />
                </label>
              </div>
            );
          })}
          <button
            onClick={(e) => {
              e.preventDefault();
              answerAmount < 4 ? setAnswerAmount(answerAmount + 1) : {};
            }}
          >
            Add Answer
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
