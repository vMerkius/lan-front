import { useState } from "react";
import "./add-module-or-quiz.scss";
import { addModuleAPI, addQuizAPI } from "../../../../server/server";

type AddModuleOrQuizProps = {
  setShowAddSection: (show: boolean) => void;
  module: boolean | undefined;
  cId: number;
};

const AddModuleOrQuiz: React.FC<AddModuleOrQuizProps> = ({
  setShowAddSection,
  module,
  cId,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    courseId: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    const dataSend = {
      ...formData,
      courseId: cId,
    };

    if (dataSend.name === "" || dataSend.description === "") {
      alert("Please fill all the fields");
    } else {
      if (module) {
        addModuleAPI(dataSend);
      } else {
        addQuizAPI(dataSend);
      }
      window.location.reload();
    }
  };
  return (
    <div className="module-quiz-container">
      <div className="module-quiz-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        {module ? (
          <h2 className="module-quiz-container__add__heading">Module</h2>
        ) : (
          <h2 className="module-quiz-container__add__heading">Quiz</h2>
        )}
        <form className="module-quiz-container__add__form">
          <label className="module-quiz-container__add__form__row">
            <span>Name:</span>
            <input
              className="input-style"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="module-quiz-container__add__form__row">
            <span>Description:</span>
            <input
              className="input-style"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <button
            className="add-btn module-quiz-container__add__form__button"
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

export default AddModuleOrQuiz;
