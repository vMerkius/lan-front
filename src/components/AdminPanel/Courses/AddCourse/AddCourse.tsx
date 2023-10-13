import { useState } from "react";
import "./add-course.scss";
import { addCourseAPI } from "../../../../server/server";

type AddCourseProps = {
  setShowAddSection: (show: boolean) => void;
};

const AddCourse: React.FC<AddCourseProps> = ({ setShowAddSection }) => {
  const [formData, setFormData] = useState({
    language: "",
    level: "",
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
    };

    if (dataSend.language === "" || dataSend.level === "") {
      alert("Please fill all the fields");
    } else {
      addCourseAPI(dataSend);
      window.location.reload();
    }
  };
  return (
    <div className="course-container">
      <div className="course-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>

        <h2 className="course-container__add__heading">Course</h2>
        <form className="course-container__add__form">
          <label className="course-container__add__form__row">
            <span>Name:</span>
            <input
              className="input-style"
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </label>
          <label className="course-container__add__form__row">
            <span>Description:</span>
            <input
              className="input-style"
              type="text"
              name="level"
              value={formData.level}
              onChange={handleChange}
            />
          </label>

          <button
            className="add-btn course-container__add__form__button"
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

export default AddCourse;
