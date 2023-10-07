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
import EditFlashcard from "./EditFlashcard";

const Flashcards = () => {
  const value = useParams();
  const idModule = Number(value.idModule);
  const [editingFlashcardId, setEditingFlashcardId] = useState<number | null>(
    null
  );
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [selectedFlashcardId, setSelectedFlashcardId] = useState<number | null>(
    null
  );
  const [showAddSection, setShowAddSection] = useState<boolean>(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const fetchedFlashcards = await getFlashcardsAPI(idModule);
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
          idModule={idModule}
        />
      )}
      <div className="flashcard-container__header">
        <div>
          <h1>Flashcards</h1>
        </div>
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
        <div key={flashcard.id}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setEditingFlashcardId(null);
              setSelectedFlashcardId((prevId) =>
                prevId === flashcard.id ? null : flashcard.id
              );
            }}
            className="flashcard-container__bar flashcard-container__bar--main"
          >
            <EditFlashcard
              editingFlashcardId={editingFlashcardId}
              flashcard={flashcard}
              setEditingFlashcardId={setEditingFlashcardId}
              IdModule={idModule}
              flashcards={flashcards}
              setFlashcards={setFlashcards}
            />
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
