import { useState } from "react";
import { editSentenceAPI } from "../../../../../server/server";
import { ISentence } from "../../../../../interfaces/ISentence";

type EditFlashcardProps = {
  editingSentenceId: number | null;
  sentence: ISentence;
  setEditingSentenceId: React.Dispatch<React.SetStateAction<number | null>>;
  idModule: number;
  sentences: ISentence[];
  setSentences: React.Dispatch<React.SetStateAction<ISentence[]>>;
};

const EditSentence: React.FC<EditFlashcardProps> = ({
  editingSentenceId,
  sentence,
  setEditingSentenceId,
  idModule,
  sentences,
  setSentences,
}) => {
  const [editingDataOriginal, setEditingDataOriginal] = useState<string>(
    sentence.original
  );
  const [editingDataTranslated, setEditingDataTranslated] = useState<string>(
    sentence.translated
  );

  const handleEdit = async (id: number) => {
    const dataSend: ISentence = {
      id: id,
      original: editingDataOriginal,
      translated: editingDataTranslated,
      moduleId: idModule,
    };

    try {
      await editSentenceAPI(id, dataSend);
      const updatedSentences = sentences.map((s) =>
        s.id === id
          ? {
              ...s,
              original: editingDataOriginal,
              translated: editingDataTranslated,
            }
          : s
      );
      console.log(updatedSentences);
      setSentences(updatedSentences);
      setEditingSentenceId(null);
    } catch (error) {
      alert("Unable to edit sentence");
    }
  };

  return (
    <>
      {editingSentenceId !== sentence.id ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setEditingSentenceId(sentence.id);
          }}
        >
          <h3>{sentence.original}</h3>
          <h3>{sentence.translated}</h3>
        </div>
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
            value={editingDataOriginal}
            onChange={(e) => setEditingDataOriginal(e.target.value)}
          />
          <input
            className="input-style"
            type="text"
            value={editingDataTranslated}
            onChange={(e) => setEditingDataTranslated(e.target.value)}
          />
          <button
            className="input-save"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(sentence.id);
              setEditingSentenceId(null);
            }}
          >
            Save
          </button>
          <button
            className="input-cancel"
            onClick={() => {
              setEditingSentenceId(null);
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};
export default EditSentence;
