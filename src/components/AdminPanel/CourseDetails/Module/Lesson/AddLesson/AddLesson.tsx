import { useState } from "react";
import "./add-lesson.scss";
import { addFlashcardAPI, addLessonAPI } from "../../../../../../server/server";

type AddLessonProps = {
  setShowAddSection: (show: boolean) => void;
  idModule: number;
};
const AddLesson: React.FC<AddLessonProps> = ({
  setShowAddSection,
  idModule,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    moduleId: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    const dataSend: any = {
      ...formData,
      moduleId: idModule,
    };
    if (dataSend.name === "" || dataSend.description === "") {
      alert("Fill all fields");
    } else {
      addLessonAPI(dataSend);
      window.location.reload();
    }
  };
  return (
    <div className="add-lesson-container">
      <div className="add-lesson-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        <h2 className="add-lesson-container__add__heading">Lesson</h2>
        <form className="add-lesson-container__add__form">
          <label className="add-lesson-container__add__form__row">
            Name:
            <input
              className="input-style"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="add-lesson-container__add__form__row">
            Description:
            <input
              className="input-style"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <button
            className="add-btn add-lesson-container__add__form__button"
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

export default AddLesson;
