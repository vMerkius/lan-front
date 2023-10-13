import { useEffect, useState } from "react";
import { IWord } from "../../../../../../interfaces/IWord";
import {
  deleteWordAPI,
  getFlashcardWordsAPI,
} from "../../../../../../server/server";
import "./words.scss";
import AddWords from "./AddWords/AddWords";

type WordsProps = {
  id: number;
};

const Words: React.FC<WordsProps> = ({ id }) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
  const [words, setWords] = useState<IWord[]>([]);
  const [showAddWordsSection, setShowAddWordsSection] =
    useState<boolean>(false);

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

  const shorterWord = (word: string, quantity: number) => {
    if (word.length > quantity) {
      return word.slice(0, quantity) + "...";
    } else {
      return word;
    }
  };

  return (
    <div>
      {showAddWordsSection && (
        <AddWords setShowAddWordsSection={setShowAddWordsSection} fId={id} />
      )}
      {words.map((word) => (
        <div className="word-container" key={word.id}>
          <div className="word-container__main">
            <h3>{word.originalWord}</h3>
            <h3>-</h3>
            {word.translatedWord === "" ? (
              <>
                <h3
                  onMouseEnter={() => setHoveredUrl(word.imageUrl)}
                  onMouseLeave={() => setHoveredUrl(null)}
                >
                  {hoveredUrl === word.imageUrl
                    ? word.imageUrl
                    : shorterWord(word.imageUrl, 20)}

                  {hoveredImage === word.imageUrl && (
                    <div className="image-tooltip">
                      <img
                        className="image-tooltip__image"
                        src={word.imageUrl}
                        alt="Preview"
                        width="200"
                      />
                    </div>
                  )}
                </h3>

                {word.imageUrl !== "" ? (
                  <img
                    onMouseEnter={() => setHoveredImage(word.imageUrl)}
                    onMouseLeave={() => setHoveredImage(null)}
                    src={word.imageUrl}
                    alt="Preview"
                    width="50"
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              <h3>{word.translatedWord}</h3>
            )}
          </div>

          <button
            className="word-container__main__delete-btn"
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
        <button
          className="add-bar"
          onClick={(e) => {
            e.stopPropagation();
            setShowAddWordsSection(true);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Words;
