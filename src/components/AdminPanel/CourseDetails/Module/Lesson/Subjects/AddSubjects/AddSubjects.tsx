import { useState } from "react";
import "./add-subjects.scss";
import {
  addLessonAPI,
  addSubjectsAPI,
} from "../../../../../../../server/server";

type AddSubjectsProps = {
  setShowAddSection: (show: boolean) => void;
  idLesson: number;
};
const AddSubjects: React.FC<AddSubjectsProps> = ({
  setShowAddSection,
  idLesson,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lessonId: 0,
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
      lessonId: idLesson,
    };
    if (dataSend.name === "" || dataSend.description === "") {
      alert("Fill all fields");
    } else {
      addSubjectsAPI(dataSend);
      window.location.reload();
    }
  };
  return (
    <div className="add-subjects-container">
      <div className="add-subjects-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        <h2 className="add-subjects-container__add__heading">Subjects:</h2>
        <form className="add-subjects-container__add__form">
          <label className="add-subjects-container__add__form__row">
            Name:
            <input
              className="input-style"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="add-subjects-container__add__form__row">
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
            className="add-btn add-subjects-container__add__form__button"
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

export default AddSubjects;
