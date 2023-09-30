import { useState } from "react";
import "./add-question.scss";
import { addAnswersAPI, addQuestionAPI } from "../../../../../server/server";

type AddQuestionProps = {
  setShowAddSection: (show: boolean) => void;
  idQuiz: number;
};

const AddQuestion: React.FC<AddQuestionProps> = ({
  setShowAddSection,
  idQuiz,
}) => {
  const [answerAmount, setAnswerAmount] = useState(2);
  const [rightAnswer, setRightAnswer] = useState(1);
  const [formDataQuestion, setFormDataQuestion] = useState({
    description: "",
    correctAnswer: "",
    quizId: 0,
  });
  const [formDataAnswersPlacehorder, setFormDataAnswersPlacehorder] = useState([
    { name: "pierwsza" },
    { name: "druga" },
    { name: "trzecia" },
    { name: "czwarta" },
  ]);
  const [formDataAnswers, setFormDataAnswers] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
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
      quizId: idQuiz,
    };

    if (
      questionSend.description === "" ||
      questionSend.correctAnswer === "" ||
      formDataAnswers[0].name === "" ||
      formDataAnswers[1].name === ""
    ) {
      alert("Please fill all the fields");
    } else {
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
    }
  };
  return (
    <div className="question-container">
      <div className="question-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        <h2 className="question-container__add__heading">Question</h2>
        <form className="question-container__add__form">
          <label className="question-container__add__form__row">
            Pytanie:
            <input
              className="input-style"
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
                <label className="question-container__add__form__row">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={formDataAnswers[i].name}
                    onChange={() => {
                      setRightAnswer(i + 1);
                    }}
                  />
                  <input
                    className="input-style"
                    type="text"
                    name={`answer${i}`}
                    placeholder={formDataAnswersPlacehorder[i].name}
                    onChange={(e) => handleChangeAnswers(e, i)}
                  />
                </label>
              </div>
            );
          })}
          <button
            className="question-container__add__form__row__add-answer"
            onClick={(e) => {
              e.preventDefault();
              answerAmount < 4 ? setAnswerAmount(answerAmount + 1) : {};
            }}
          >
            Add Answer
          </button>
          <button
            className="add-btn question-container__add__form__button"
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
