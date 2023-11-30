import { useEffect, useState } from "react";
import {
  deleteSentenceAPI,
  getModuleSentencesAPI,
} from "../../../../../server/server";
import { useParams } from "react-router";
import { ISentence } from "../../../../../interfaces/ISentence";
import "./sentence.scss";
import AddSentences from "./AddSentences/AddSentences";

const Sentences = () => {
  const value = useParams();
  const id = Number(value.idModule);
  const [sentences, setSentences] = useState<ISentence[]>([]);
  const [showAddSentencesSection, setShowAddSentencesSection] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchSentences = async () => {
      const fetchedSentences = await getModuleSentencesAPI(id);
      setSentences(fetchedSentences);
    };
    fetchSentences();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await deleteSentenceAPI(id);
      const newSentences = sentences.filter((sentence) => sentence.id !== id);
      setSentences(newSentences);
    } catch {
      alert("Unable to delete sentence");
    }
  };

  return (
    <div className="sentence-container">
      <div className="sentence-container__header">
        <div>
          <h1>Sentences</h1>
        </div>
        <button
          className="flashcard-container__header__button add-btn--big"
          onClick={() => {
            setShowAddSentencesSection(true);
          }}
        >
          Add Sentence
        </button>
      </div>
      {showAddSentencesSection && (
        <AddSentences
          setShowAddSentencesSection={setShowAddSentencesSection}
          mId={id}
        />
      )}
      {sentences.map((sentence) => (
        <div className="sentence" key={sentence.id}>
          <div className="sentence__main">
            <h3>{sentence.content}</h3>
            <button
              className="sentence__main__delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(sentence.id);
              }}
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sentences;
