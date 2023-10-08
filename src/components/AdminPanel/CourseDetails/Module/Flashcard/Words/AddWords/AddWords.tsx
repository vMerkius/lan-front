import { useState } from "react";
import "./add-words.scss";
import { addWordsAPI } from "../../../../../../../server/server";
import WordTranslationOrImage from "./WordTranslationOrImage";

type AddWordProps = {
  setShowAddWordsSection: (show: boolean) => void;
  fId: number;
};

const AddWords: React.FC<AddWordProps> = ({ setShowAddWordsSection, fId }) => {
  const [switchMode, setSwitchMode] = useState(false);
  const [formWords, setFormWords] = useState([
    {
      originalWord: "",
      translatedWord: "",
      imageUrl: "",
      flashcardId: fId,
    },
  ]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list: any = [...formWords];
    list[index][name] = value;
    setFormWords(list);
  };
  const handleAddClick = () => {
    setFormWords([
      ...formWords,
      { originalWord: "", translatedWord: "", imageUrl: "", flashcardId: fId },
    ]);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...formWords];
    list.splice(index, 1);
    setFormWords(list);
  };

  const handleAdd = async () => {
    let check = true;
    for (const word of formWords) {
      if (word.originalWord === "") {
        alert("Please fill all the fields for every word");
        check = false;
      }
    }
    if (check) {
      await addWordsAPI(formWords);
      window.location.reload();
    }
  };
  return (
    <div>
      <WordTranslationOrImage
        fId={fId}
        switchMode={switchMode}
        setSwitchMode={setSwitchMode}
        setShowAddWordsSection={setShowAddWordsSection}
        formWords={formWords}
        setFormWords={setFormWords}
        handleChange={handleChange}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
        handleAdd={handleAdd}
      />
    </div>
  );
};

export default AddWords;
