import { useEffect, useState } from "react";
import { IWord } from "../../../../../../interfaces/IWord";
import {
  deleteWordAPI,
  getFlashcardWordsAPI,
} from "../../../../../../server/server";
import "./words.scss";

const Words = ({ id }: any) => {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const fetchedWords = await getFlashcardWordsAPI(id);
      setWords(fetchedWords);
    };
    fetchWords();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await deleteWordAPI(id);
      const newWords = words.filter((word) => word.id !== id);
      setWords(newWords);
    } catch {
      alert("Unable to delete word");
    }
  };

  return (
    <div>
      {words.map((word) => (
        <div className="word-container" key={word.id}>
          <div className="word-container__main">
            <h3>{word.originalWord}</h3>
            <h3>-</h3>
            <h3>{word.translatedWord}</h3>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(word.id);
            }}
          >
            -
          </button>
        </div>
      ))}
      <div className="word-add-bar">
        <button className="add-bar">+</button>
      </div>
    </div>
  );
};

export default Words;