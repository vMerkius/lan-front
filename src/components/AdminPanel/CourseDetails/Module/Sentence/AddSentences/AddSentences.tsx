import { useState } from "react";
import { addSentencesAPI } from "../../../../../../server/server";

type AddWordProps = {
  setShowAddSentencesSection: (show: boolean) => void;
  mId: number;
};

const AddSentences: React.FC<AddWordProps> = ({
  setShowAddSentencesSection,
  mId,
}) => {
  const [formSentences, setFormSentences] = useState([
    {
      original: "",
      translated: "",
      moduleId: mId,
    },
  ]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const list: any = [...formSentences];
    list[index][name] = value;
    setFormSentences(list);
  };
  const handleAddClick = () => {
    setFormSentences([
      ...formSentences,
      { original: "", translated: "", moduleId: mId },
    ]);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...formSentences];
    list.splice(index, 1);
    setFormSentences(list);
  };

  const handleAdd = async () => {
    let check = true;
    for (const sentence of formSentences) {
      if (sentence.original === "" || sentence.translated === "") {
        alert("Please fill all the fields for every sentence");
        check = false;
      }
    }
    if (check) {
      console.log(formSentences);
      await addSentencesAPI(formSentences);
      window.location.reload();
    }
  };
  return (
    <div className="add-words-container" onClick={(e) => e.stopPropagation()}>
      <div className="add-words-container__add">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSentencesSection(false);
          }}
        >
          X
        </button>
        <h2 className="add-words-container__add__heading">Content</h2>

        <form className="add-words-container__add__form">
          {formSentences.map((sentence, index) => (
            <div
              className="add-words-container__add__form__container"
              key={index}
            >
              <label className="add-words-container__add__form__row">
                <input
                  name="original"
                  placeholder="original"
                  value={sentence.original}
                  onChange={(e) => handleChange(index, e)}
                />
              </label>
              <label className="add-words-container__add__form__row">
                <input
                  name="translated"
                  placeholder="translated"
                  value={sentence.translated}
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

export default AddSentences;
