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

    module ? addModuleAPI(dataSend) : addQuizAPI(dataSend);
    window.location.reload();
  };
  return (
    <div className="module-quiz-container">
      <div className="module-quiz-container__add">
        <button
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        {module ? (
          <h2 className="module-quiz-container__add__heading">add Module</h2>
        ) : (
          <h2 className="module-quiz-container__add__heading">Add Quiz</h2>
        )}
        <form className="module-quiz-container__add__form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

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

export default AddModuleOrQuiz;
