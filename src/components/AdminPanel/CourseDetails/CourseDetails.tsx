import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteModuleAPI,
  deleteQuizAPI,
  editModuleAPI,
  editQuizAPI,
  getCourseAPI,
  getCourseAllModulesAPI,
  getCourseAllQuizzesAPI,
} from "../../../server/server";
import { ICourse } from "../../../interfaces/ICourse";
import { IModule } from "../../../interfaces/IModule";
import { IQuiz } from "../../../interfaces/IQuiz";
import "./coursedetails.scss";
import AddModuleOrQuiz from "./AddModuleOrQuiz/AddModuleOrQuiz";

const CourseDetails = () => {
  const navigate = useNavigate();
  const value = useParams();
  const id = Number(value.id);
  const [editingDataModule, setEditingDataModule] = useState<string>("");
  const [editingIdModule, setEditingIdModule] = useState<number | null>(null);
  const [editingDataQuiz, setEditingDataQuiz] = useState<string>("");
  const [editingIdQuiz, setEditingIdQuiz] = useState<number | null>(null);
  const [showAddSection, setShowAddSection] = useState<boolean>(false);
  const [addModule, setAddModule] = useState<boolean>();
  const [showModules, setShowModules] = useState<boolean>(false);
  const [showQuizzes, setShowQuizzes] = useState<boolean>(false);
  const [course, setCourse] = useState<ICourse>({
    id: 0,
    level: "",
    language: "",
  });
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourse = await getCourseAPI(id);
      const fetchedQuizzes = await getCourseAllQuizzesAPI(id);
      const fetchedModules = await getCourseAllModulesAPI(id);
      setCourse(fetchedCourse);
      setQuizzes(fetchedQuizzes);
      setModules(fetchedModules);
    };
    fetchCourses();
  }, []);

  const handleClickQuiz = (idQuiz: number) => {
    navigate(`/courses/${id}/quiz/${idQuiz}`);
  };
  const handleClickFlashcards = (idModule: number) => {
    navigate(`/courses/${id}/module/${idModule}/flashcards`);
  };
  const handleClickLessons = (idModule: number) => {
    navigate(`/courses/${id}/module/${idModule}/lessons`);
  };
  const handleAddClick = (module: boolean) => {
    module === true ? setAddModule(true) : setAddModule(false);
    setShowAddSection(true);
  };
  const handleDeleteQuiz = async (id: number) => {
    try {
      await deleteQuizAPI(id);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (error) {
      alert("Unable to delete quiz");
    }
  };
  const handleDeleteModule = async (id: number) => {
    try {
      await deleteModuleAPI(id);
      setModules(modules.filter((module) => module.id !== id));
    } catch (error) {
      alert("Unable to delete module");
    }
  };

  const handleEditModule = async (idChosen: number, desc: string) => {
    console.log(idChosen, desc);
    const dataSend: IModule = {
      id: idChosen,
      name: editingDataModule,
      description: desc,
      courseId: id,
    };

    try {
      await editModuleAPI(idChosen, dataSend);
      const updatedModules = modules.map((m) =>
        m.id === idChosen ? { ...m, name: editingDataModule } : m
      );
      setModules(updatedModules);
      setEditingIdModule(null);
    } catch (error) {
      alert("Unable to edit module");
    }
  };
  const handleEditQuiz = async (idChosen: number, desc: string) => {
    console.log(idChosen, desc);
    const dataSend: IQuiz = {
      id: idChosen,
      name: editingDataQuiz,
      description: desc,
      courseId: id,
    };

    try {
      await editQuizAPI(idChosen, dataSend);
      const updatedQuizzes = quizzes.map((q) =>
        q.id === idChosen ? { ...q, name: editingDataQuiz } : q
      );
      setQuizzes(updatedQuizzes);
      setEditingIdQuiz(null);
    } catch (error) {
      alert("Unable to edit quiz");
    }
  };

  return (
    <div className="course-details">
      {showAddSection && (
        <AddModuleOrQuiz
          setShowAddSection={setShowAddSection}
          module={addModule}
          cId={course.id}
        />
      )}
      <div className="course-details__header">
        <h1>Course:</h1>

        <div className="course-details__header__buttons">
          <button
            className="course-details__header__buttons__button add-btn--big"
            onClick={() => {
              handleAddClick(false);
            }}
          >
            Add Quiz
          </button>
          <button
            className="course-details__header__buttons__button add-btn--big"
            onClick={() => {
              handleAddClick(true);
            }}
          >
            Add Module
          </button>
        </div>
      </div>
      <h2>
        {course.language} - {course.level}
      </h2>
      <div
        className="course-details__bar course-details__bar--main"
        onClick={() => {
          setShowModules(!showModules);
        }}
      >
        <h3>Modules</h3>
        {!showModules ? <h3>&#8681;</h3> : <h3>&#8679;</h3>}
      </div>
      {showModules &&
        modules.map((module) => (
          <div
            key={module.id}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setEditingIdModule((prevId) =>
                  prevId === module.id ? null : module.id
                );
              }}
              className="course-details__bar course-details__bar--details"
            >
              {/* <h4>{module.name}</h4> */}
              {editingIdModule !== module.id ? (
                <h4
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingIdModule(module.id);
                    setEditingDataModule(module.name);
                  }}
                >
                  {module.name}
                </h4>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input
                    type="text"
                    value={editingDataModule}
                    onChange={(e) => setEditingDataModule(e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditModule(module.id, module.description);
                      setEditingIdModule(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingIdModule(null);
                    }}
                  >
                    X
                  </button>
                </div>
              )}
              <div className="course-details__module-buttons">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickLessons(module.id);
                  }}
                  className="course-details__module-buttons__button"
                >
                  lessons
                </button>
                <button
                  className="course-details__module-buttons__button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickFlashcards(module.id);
                  }}
                >
                  flashcards
                </button>
                <button
                  className="course-details__module-buttons__button course-details__module-buttons__button--delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteModule(module.id);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}

      <div
        className="course-details__bar course-details__bar--main course-details__bar--quizzes"
        onClick={() => {
          setShowQuizzes(!showQuizzes);
        }}
      >
        <h3>Quizzes</h3>
        {!showQuizzes ? <h3>&#8681;</h3> : <h3>&#8679;</h3>}
      </div>
      {showQuizzes &&
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setEditingIdQuiz((prevId) =>
                  prevId === quiz.id ? null : quiz.id
                );
              }}
              className="course-details__bar course-details__bar--details"
            >
              {/* <h4>{quiz.name}</h4> */}
              {editingIdQuiz !== quiz.id ? (
                <h4
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingIdQuiz(quiz.id);
                    setEditingDataQuiz(quiz.name);
                  }}
                >
                  {quiz.name}
                </h4>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input
                    type="text"
                    value={editingDataQuiz}
                    onChange={(e) => setEditingDataQuiz(e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditQuiz(quiz.id, quiz.description);
                      setEditingIdQuiz(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingIdQuiz(null);
                    }}
                  >
                    X
                  </button>
                </div>
              )}
              <div className="course-details__quiz-buttons">
                <button
                  className="course-details__quiz-buttons__button"
                  onClick={() => {
                    handleClickQuiz(quiz.id);
                  }}
                >
                  more
                </button>
                <button
                  className="course-details__quiz-buttons__button course-details__quiz-buttons__button--delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuiz(quiz.id);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CourseDetails;
