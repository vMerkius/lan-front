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
  const [editingData, setEditingData] = useState<string>(sentence.content);

  const handleEdit = async (id: number) => {
    const dataSend: ISentence = {
      id: id,
      content: editingData,
      moduleId: idModule,
    };

    try {
      await editSentenceAPI(id, dataSend);
      const updatedSentences = sentences.map((s) =>
        s.id === id ? { ...s, content: editingData } : s
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
        <h3
          onClick={(e) => {
            e.stopPropagation();
            setEditingSentenceId(sentence.id);
          }}
        >
          {sentence.content}
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
