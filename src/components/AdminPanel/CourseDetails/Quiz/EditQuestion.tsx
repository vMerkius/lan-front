import { useEffect, useState } from "react";
import { IQuestion } from "../../../../interfaces/IQuestion";
import { editQuestionAPI } from "../../../../server/server";

type EditQuestionProps = {
  editingQuestionId: number | null;
  question: IQuestion;
  setEditingQuestionId: React.Dispatch<React.SetStateAction<number | null>>;
  idQuiz: number;
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
};

const EditQuestion: React.FC<EditQuestionProps> = ({
  editingQuestionId,
  question,
  setEditingQuestionId,
  idQuiz,
  questions,
  setQuestions,
}) => {
  const [editingData, setEditingData] = useState<string>(question.description);

  useEffect(() => {
    setEditingData(question.description);
  }, [question]);

  const handleEdit = async (id: number) => {
    const dataSend: IQuestion = {
      id: id,
      description: editingData,
      correctAnswer: question.correctAnswer,
      quizId: idQuiz,
    };

    try {
      await editQuestionAPI(id, dataSend);
      const updatedQuestions = questions.map((q) =>
        q.id === id ? { ...q, description: editingData } : q
      );
      setQuestions(updatedQuestions);
      setEditingQuestionId(null);
    } catch (error) {
      alert("Unable to edit question");
    }
  };

  return (
    <>
      {editingQuestionId !== question.id ? (
        <h3
          onClick={(e) => {
            e.stopPropagation();
            setEditingQuestionId(question.id);
          }}
        >
          {question.description}
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
              handleEdit(question.id);
              setEditingQuestionId(null);
            }}
          >
            Save
          </button>
          <button
            className="input-cancel"
            onClick={() => {
              setEditingQuestionId(null);
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};
export default EditQuestion;
