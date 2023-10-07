import { useParams } from "react-router";
import "./flashcard.scss";
import {
  IFlashcard,
  IFlashcardCreation,
} from "../../../../../interfaces/IFlashcard";
import { useEffect, useState } from "react";
import {
  deleteFlashcardAPI,
  editFlashcardAPI,
  getFlashcardsAPI,
} from "../../../../../server/server";
import AddFlashcard from "./AddFlashcard/AddFlashcard";
import Words from "./Words/Words";

const Flashcards = () => {
  const value = useParams();
  const IdModule = Number(value.idModule);
  const [editingFlashcardId, setEditingFlashcardId] = useState<number | null>(
    null
  );
  const [editingData, setEditingData] = useState<string>("");
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

  const handleEdit = async (id: number) => {
    const dataSend: IFlashcard = {
      id: id,
      name: editingData,
      moduleId: IdModule,
    };

    try {
      await editFlashcardAPI(id, dataSend);
      const updatedFlashcards = flashcards.map((fc) =>
        fc.id === id ? { ...fc, name: editingData } : fc
      );
      setFlashcards(updatedFlashcards);
      setEditingFlashcardId(null);
    } catch (error) {
      alert("Unable to edit flashcard");
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
              setSelectedFlashcardId((prevId) =>
                prevId === flashcard.id ? null : flashcard.id
              );
            }}
            className="flashcard-container__bar flashcard-container__bar--main"
          >
            {editingFlashcardId !== flashcard.id ? (
              <h3
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingFlashcardId(flashcard.id);
                }}
              >
                {flashcard.name}
              </h3>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <input
                  type="text"
                  value={editingData}
                  onChange={(e) => setEditingData(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(flashcard.id);
                    setEditingFlashcardId(null);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingFlashcardId(null);
                  }}
                >
                  X
                </button>
              </div>
            )}
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
