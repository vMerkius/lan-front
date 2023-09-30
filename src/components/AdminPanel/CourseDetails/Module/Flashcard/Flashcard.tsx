import { useParams } from "react-router";
import "./flashcard.scss";
import { IFlashcard } from "../../../../../interfaces/IFlashcard";
import { useEffect, useState } from "react";
import {
  deleteFlashcardAPI,
  getFlashcardsAPI,
} from "../../../../../server/server";
import AddFlashcard from "./AddFlashcard/AddFlashcard";
import Words from "./Words/Words";

const Flashcards = () => {
  const value = useParams();
  const IdModule = Number(value.idModule);
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [selectedFlashcardId, setSelectedFlashcardId] = useState<number | null>(
    null
  );
  const [showAddSection, setShowAddSection] = useState<boolean>(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const fetchedFlashcards = await getFlashcardsAPI(IdModule);
      setFlashcards(fetchedFlashcards);
    };
    fetchFlashcards();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFlashcardAPI(id);
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    } catch (error) {
      alert("Unable to delete flashcard");
    }
  };
  return (
    <div className="flashcard-container">
      {showAddSection && (
        <AddFlashcard
          setShowAddSection={setShowAddSection}
          idModule={IdModule}
        />
      )}
      <div className="flashcard-container__header">
        <h1>Flashcards</h1>
        <button
          className="flashcard-container__header__button add-btn--big"
          onClick={() => {
            setShowAddSection(true);
          }}
        >
          Add Flashcard
        </button>
      </div>

      {flashcards.map((flashcard) => (
        <div
          key={flashcard.id}
          onClick={() => {
            setSelectedFlashcardId((prevId) =>
              prevId === flashcard.id ? null : flashcard.id
            );
          }}
        >
          <div className="flashcard-container__bar flashcard-container__bar--main">
            <h3>{flashcard.name}</h3>
            <div className="flashcard-container__bar__buttons">
              <button
                className="flashcard-container__bar__buttons__button flashcard-container__bar__buttons__button--delete"
                onClick={() => {
                  handleDelete(flashcard.id);
                }}
              >
                -
              </button>
              {selectedFlashcardId !== flashcard.id ? (
                <h3>&#8681;</h3>
              ) : (
                <h3>&#8679;</h3>
              )}
            </div>
          </div>
          {selectedFlashcardId === flashcard.id && <Words id={flashcard.id} />}
        </div>
      ))}
    </div>
  );
};

export default Flashcards;
