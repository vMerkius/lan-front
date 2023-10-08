import { useState } from "react";
import "./add-words.scss";
import { IWordCreation } from "../../../../../../../interfaces/IWord";

type WordTranslationOrImageProps = {
  fId: number;
  switchMode: boolean;
  setSwitchMode: (switchMode: boolean) => void;
  setShowAddWordsSection: (show: boolean) => void;
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveClick: (index: number) => void;
  handleAddClick: () => void;
  formWords: Array<IWordCreation>;
  setFormWords: (formWords: Array<IWordCreation>) => void;
  handleAdd: () => void;
};

const WordTranslationOrImage: React.FC<WordTranslationOrImageProps> = ({
  fId,
  switchMode,
  setSwitchMode,
  setShowAddWordsSection,
  handleChange,
  handleRemoveClick,
  handleAddClick,
  formWords,
  setFormWords,
  handleAdd,
}) => {
  return (
    <div className="add-words-container" onClick={(e) => e.stopPropagation()}>
      <div className="add-words-container__add">
        <button
          className={`switch-btn ${switchMode ? "switch-btn--active" : ""}`}
          onClick={() => {
            setSwitchMode(!switchMode);
            setFormWords([
              {
                originalWord: "",
                translatedWord: "",
                imageUrl: "",
                flashcardId: fId,
              },
            ]);
          }}
        >
          <span
            className={`switch-btn__slider ${
              switchMode ? "switch-btn__slider--active" : ""
            }`}
          ></span>
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddWordsSection(false);
          }}
        >
          X
        </button>
        {switchMode ? (
          <h2 className="add-words-container__add__heading">Image Word</h2>
        ) : (
          <h2 className="add-words-container__add__heading">
            Word Translation
          </h2>
        )}

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
              {switchMode ? (
                <label className="add-words-container__add__form__row">
                  <input
                    name="imageUrl"
                    placeholder="Image Url"
                    value={word.imageUrl}
                    onChange={(e) => handleChange(index, e)}
                  />
                </label>
              ) : (
                <label className="add-words-container__add__form__row">
                  <input
                    name="translatedWord"
                    placeholder="Translated Word"
                    value={word.translatedWord}
                    onChange={(e) => handleChange(index, e)}
                  />
                </label>
              )}

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

export default WordTranslationOrImage;
