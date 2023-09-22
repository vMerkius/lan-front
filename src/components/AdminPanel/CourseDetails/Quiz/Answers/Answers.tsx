import { useEffect, useState } from "react";
import { IAnswer } from "../../../../../interfaces/IAnswer";
import { deleteAnswer, getQuestionAnswers } from "../../../../../server/server";

const Answers = ({ id }: any) => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const fetchedAnswers = await getQuestionAnswers(id);
      setAnswers(fetchedAnswers);
    };
    fetchAnswers();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await deleteAnswer(id);
      const newAnswers = answers.filter((answer) => answer.id !== id);
      setAnswers(newAnswers);
    } catch {
      alert("Unable to delete answer");
    }
  };

  return (
    <div>
      {answers.map((answer) => (
        <div key={answer.id}>
          <h3>{answer.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(answer.id);
            }}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default Answers;
