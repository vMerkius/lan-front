import { useEffect, useState } from "react";
import { ILesson } from "../../../../../interfaces/ILesson";
import { editLessonAPI } from "../../../../../server/server";

type EditLessonProps = {
  editingLessonId: number | null;
  lesson: ILesson;
  setEditingLessonId: React.Dispatch<React.SetStateAction<number | null>>;
  idModule: number;
  lessons: ILesson[];
  setLessons: React.Dispatch<React.SetStateAction<ILesson[]>>;
};

const EditLesson: React.FC<EditLessonProps> = ({
  editingLessonId,
  lesson,
  setEditingLessonId,
  idModule,
  lessons,
  setLessons,
}) => {
  const [editingData, setEditingData] = useState<string>(lesson.name);

  useEffect(() => {
    setEditingData(lesson.name);
  }, [lesson]);

  const handleEdit = async (id: number, desc: string) => {
    const dataSend: ILesson = {
      id: id,
      name: editingData,
      description: desc,
      moduleId: idModule,
    };

    try {
      await editLessonAPI(id, dataSend);
      const updatedLessons = lessons.map((l) =>
        l.id === id ? { ...l, name: editingData } : l
      );
      setLessons(updatedLessons);
      setEditingLessonId(null);
    } catch (error) {
      alert("Unable to edit lesson");
    }
  };
  return (
    <>
      {editingLessonId !== lesson.id ? (
        <h3
          onClick={(e) => {
            e.stopPropagation();
            setEditingLessonId(lesson.id);
          }}
        >
          {lesson.name}
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
              handleEdit(lesson.id, lesson.description);
              setEditingLessonId(null);
            }}
          >
            Save
          </button>
          <button
            className="input-cancel"
            onClick={() => {
              setEditingLessonId(null);
            }}
          >
            X
          </button>
        </div>
      )}{" "}
    </>
  );
};

export default EditLesson;
