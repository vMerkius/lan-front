import { useEffect, useState } from "react";
import {
  deleteSubjectAPI,
  deleteWordAPI,
  getFlashcardWordsAPI,
  getLessonSubjectsAPI,
} from "../../../../../../server/server";
import "./subjects.scss";
import { ISubject } from "../../../../../../interfaces/ISubject";
import AddSubjects from "./AddSubjects/AddSubjects";

const Subjects = ({ id }: any) => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [showAddSubjectsSection, setShowAddSubjectsSection] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      const fetchedSubjects = await getLessonSubjectsAPI(id);
      console.log(fetchedSubjects);
      setSubjects(fetchedSubjects);
    };
    fetchSubjects();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await deleteSubjectAPI(id);
      const newSubjects = subjects.filter((subject) => subject.id !== id);
      setSubjects(newSubjects);
    } catch {
      alert("Unable to delete subject");
    }
  };

  return (
    <div>
      {showAddSubjectsSection && (
        <AddSubjects
          setShowAddSection={setShowAddSubjectsSection}
          idLesson={id}
        />
      )}
      {subjects.map((subject) => (
        <div className="subject-container" key={subject.id}>
          <div className="subject-container__main">
            <h3>{subject.name}</h3>
            <button
              className="subject-container__main__delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(subject.id);
              }}
            >
              delete
            </button>
          </div>
          <h4>{subject.description}</h4>
        </div>
      ))}
      <div className="subject-add-bar">
        <button
          className="add-bar"
          onClick={(e) => {
            e.stopPropagation();
            setShowAddSubjectsSection(true);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Subjects;
