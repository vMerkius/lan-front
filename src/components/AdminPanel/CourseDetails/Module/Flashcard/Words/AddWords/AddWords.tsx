import { useState } from "react";
import "./add-words.scss";
import { addWordAPI } from "../../../../../../../server/server";
import { IWordCreation } from "../../../../../../../interfaces/IWord";

type AddWordProps = {
  setShowAddWordsSection: (show: boolean) => void;
  fId: number;
};

const AddWords: React.FC<AddWordProps> = ({ setShowAddWordsSection, fId }) => {
  const [formWords, setFormWords] = useState([
    {
      originalWord: "",
      translatedWord: "",
      flashcardId: fId,
    },
  ]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const list: any = [...formWords];
    list[index][name] = value;
    setFormWords(list);
  };
  const handleAddClick = () => {
    setFormWords([
      ...formWords,
      { originalWord: "", translatedWord: "", flashcardId: fId },
    ]);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...formWords];
    list.splice(index, 1);
    setFormWords(list);
  };

  const handleAdd = async () => {
    for (const word of formWords) {
      if (word.originalWord === "" || word.translatedWord === "") {
        alert("Please fill all the fields for every word");
        return;
      }
      await addWordAPI(word);
    }
    window.location.reload();
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
        <h2 className="add-words-container__add__heading">Words</h2>

        <form className="add-words-container__add__form">
          {formWords.map((word, index) => (
            <div
              className="add-words-container__add__form__container"
              key={index}
            >
              <label className="add-words-container__add__form__row">
                <input
                  name="originalWord"
                  placeholder="Original Word"
                  value={word.originalWord}
                  onChange={(e) => handleChange(index, e)}
                />
              </label>
              <label className="add-words-container__add__form__row">
                <input
                  name="translatedWord"
                  placeholder="Translated Word"
                  value={word.translatedWord}
                  onChange={(e) => handleChange(index, e)}
                />
              </label>

              <button
                className="remove-btn"
                type="button"
                onClick={() => handleRemoveClick(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            className=" add-words-container__add__form__row__add-answer"
            type="button"
            onClick={handleAddClick}
          >
            Add More
          </button>
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
