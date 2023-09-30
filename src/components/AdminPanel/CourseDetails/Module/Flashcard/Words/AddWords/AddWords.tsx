import { useState } from "react";
import "./add-words.scss";
import { addWordAPI } from "../../../../../../../server/server";

type AddWordProps = {
  setShowAddWordsSection: (show: boolean) => void;
  fId: number;
};

const AddWords: React.FC<AddWordProps> = ({ setShowAddWordsSection, fId }) => {
  const [formData, setFormData] = useState({
    originalWord: "",
    translatedWord: "",
    flashcardId: 0,
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
      flashcardId: fId,
    };
    console.log(dataSend);
    if (dataSend.originalWord === "" || dataSend.translatedWord === "") {
      alert("Please fill all the fields");
    } else {
      addWordAPI(dataSend);
      window.location.reload();
    }
  };
  return (
    <div className="add-words-container" onClick={(e) => e.stopPropagation()}>
      <div className="add-words-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddWordsSection(false);
          }}
        >
          X
        </button>
        <h2 className="add-words-container__add__heading">Word</h2>

        <form className="add-words-container__add__form">
          <label className="add-words-container__add__form__row">
            <span>Original:</span>
            <input
              className="input-style"
              type="text"
              name="originalWord"
              value={formData.originalWord}
              onChange={handleChange}
            />
          </label>
          <label className="add-words-container__add__form__row">
            <span>Translated:</span>
            <input
              className="input-style"
              type="text"
              name="translatedWord"
              value={formData.translatedWord}
              onChange={handleChange}
            />
          </label>

          <button
            className="add-btn add-words-container__add__form__button"
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

export default AddWords;
