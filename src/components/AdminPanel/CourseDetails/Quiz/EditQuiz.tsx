import { useEffect, useState } from "react";
import { IQuiz } from "../../../../interfaces/IQuiz";
import { editQuizAPI } from "../../../../server/server";

type EditFlashcardProps = {
  quiz: IQuiz;
  setQuiz: React.Dispatch<React.SetStateAction<IQuiz>>;
};

const EditQuiz: React.FC<EditFlashcardProps> = ({ quiz, setQuiz }) => {
  const [editQuizName, setEditQuizName] = useState<boolean>(false);
  const [editQuizDesc, setEditQuizDesc] = useState<boolean>(false);

  const [editingDataName, setEditingDataName] = useState<string>(quiz.name);
  const [editingDataDescription, setEditingDataDescription] = useState<string>(
    quiz.description
  );

  useEffect(() => {
    setEditingDataName(quiz.name);
    setEditingDataDescription(quiz.description);
  }, [quiz]);

  const handleEdit = async () => {
    const dataSend: IQuiz = {
      id: quiz.id,
      name: editingDataName,
      description: editingDataDescription,
      courseId: quiz.courseId,
    };
    try {
      await editQuizAPI(quiz.id, dataSend);
      setQuiz(dataSend);
      setEditQuizName(false);
      setEditQuizDesc(false);
    } catch (error) {
      alert("Unable to edit quiz");
    }
  };

  return (
    <div className="edit-quiz-container">
      {!editQuizName ? (
        <h2
          onClick={(e) => {
            e.stopPropagation();
            setEditQuizName(true);
          }}
        >
          {quiz.name}
        </h2>
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
            value={editingDataName}
            onChange={(e) => setEditingDataName(e.target.value)}
          />
          <button
            className="input-save"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
              setEditQuizName(false);
            }}
          >
            Save
          </button>
          <button
            className="input-cancel"
            onClick={() => {
              setEditQuizName(false);
            }}
          >
            X
          </button>
        </div>
      )}
      {!editQuizDesc ? (
        <h3
          onClick={(e) => {
            e.stopPropagation();
            setEditQuizDesc(true);
          }}
        >
          {quiz.description}
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
            value={editingDataDescription}
            onChange={(e) => setEditingDataDescription(e.target.value)}
          />
          <button
            className="input-save"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
              setEditQuizDesc(false);
            }}
          >
            Save
          </button>
          <button
            className="input-cancel"
            onClick={() => {
              setEditQuizDesc(false);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};
export default EditQuiz;
