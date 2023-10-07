import { useState } from "react";
import { IFlashcard } from "../../../../../interfaces/IFlashcard";
import { editFlashcardAPI } from "../../../../../server/server";

type EditFlashcardProps = {
  editingFlashcardId: number | null;
  flashcard: IFlashcard;
  setEditingFlashcardId: React.Dispatch<React.SetStateAction<number | null>>;
  IdModule: number;
  flashcards: IFlashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<IFlashcard[]>>;
};

const EditFlashcard: React.FC<EditFlashcardProps> = ({
  editingFlashcardId,
  flashcard,
  setEditingFlashcardId,
  IdModule,
  flashcards,
  setFlashcards,
}) => {
  const [editingData, setEditingData] = useState<string>(flashcard.name);

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
    <>
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
          className="input-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            className="input-style"
            type="text"
            value={editingData}
            onChange={(e) => setEditingData(e.target.value)}
          />
          <button
            className="input-save"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(flashcard.id);
              setEditingFlashcardId(null);
            }}
          >
            Save
          </button>
          <button
            className="input-cancel"
            onClick={() => {
              setEditingFlashcardId(null);
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};
export default EditFlashcard;
