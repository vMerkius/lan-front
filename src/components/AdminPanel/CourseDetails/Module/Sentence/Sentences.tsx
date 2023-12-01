import { useEffect, useState } from "react";
import {
  deleteSentenceAPI,
  getModuleSentencesAPI,
} from "../../../../../server/server";
import { useParams } from "react-router";
import { ISentence } from "../../../../../interfaces/ISentence";
import "./sentence.scss";
import AddSentences from "./AddSentences/AddSentences";
import EditSentence from "./EditSentence";

const Sentences = () => {
  const value = useParams();
  const idModule = Number(value.idModule);
  const [sentences, setSentences] = useState<ISentence[]>([]);
  const [editingSentenceId, setEditingSentenceId] = useState<number | null>(
    null
  );

  const [showAddSentencesSection, setShowAddSentencesSection] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchSentences = async () => {
      const fetchedSentences = await getModuleSentencesAPI(idModule);
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
          mId={idModule}
        />
      )}
      {sentences.map((sentence) => (
        <div
          className="sentence"
          key={sentence.id}
          onClick={(e) => {
            e.stopPropagation();
            setEditingSentenceId(null);
          }}
        >
          <div className="sentence__main">
            <EditSentence
              editingSentenceId={editingSentenceId}
              sentence={sentence}
              setEditingSentenceId={setEditingSentenceId}
              idModule={idModule}
              sentences={sentences}
              setSentences={setSentences}
            />
            {/* <h3>{sentence.content}</h3> */}
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
