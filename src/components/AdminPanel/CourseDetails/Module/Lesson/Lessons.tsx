import { useParams } from "react-router";
import "./lessons.scss";
import { ILesson } from "../../../../../interfaces/ILesson";
import { useEffect, useState } from "react";
import { deleteLessonAPI, getLessonsAPI } from "../../../../../server/server";
import AddLesson from "./AddLesson/AddLesson";
import Subjects from "./Subjects/Subjects";

const Lessons = () => {
  const value = useParams();
  const IdModule = Number(value.idModule);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [showAddSection, setShowAddSection] = useState<boolean>(false);

  useEffect(() => {
    const fetchLessons = async () => {
      const fetchedLessons = await getLessonsAPI(IdModule);
      setLessons(fetchedLessons);
    };
    fetchLessons();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteLessonAPI(id);
      setLessons(lessons.filter((flashcard) => flashcard.id !== id));
    } catch (error) {
      alert("Unable to delete flashcard");
    }
  };
  return (
    <div className="lesson-container">
      {showAddSection && (
        <AddLesson setShowAddSection={setShowAddSection} idModule={IdModule} />
      )}
      <div className="lesson-container__header">
        <h1>Lessons</h1>
        <button
          className="lesson-container__header__button add-btn--big"
          onClick={() => {
            setShowAddSection(true);
          }}
        >
          Add Lesson
        </button>
      </div>

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => {
            setSelectedLessonId((prevId) =>
              prevId === lesson.id ? null : lesson.id
            );
          }}
        >
          <div className="lesson-container__bar lesson-container__bar--main">
            <h3>{lesson.name}</h3>
            <div className="lesson-container__bar__buttons">
              <button
                className="lesson-container__bar__buttons__button lesson-container__bar__buttons__button--delete"
                onClick={() => {
                  handleDelete(lesson.id);
                }}
              >
                -
              </button>
              {selectedLessonId !== lesson.id ? (
                <h3>&#8681;</h3>
              ) : (
                <h3>&#8679;</h3>
              )}
            </div>
          </div>
          {selectedLessonId === lesson.id && <Subjects id={lesson.id} />}
        </div>
      ))}
    </div>
  );
};

export default Lessons;
