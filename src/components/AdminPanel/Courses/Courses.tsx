import { useEffect, useState } from "react";
import "./courses.scss";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../../interfaces/ICourse";
import { deleteCourseAPI, getCoursesAPI } from "../../../server/server";
import AddCourse from "./AddCourse/AddCourse";
import Confirmation from "../../shared/confirmation";

const Courses = () => {
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [showAddSection, setShowAddSection] = useState<boolean>(false);
  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedUsers = await getCoursesAPI();
      setCourses(fetchedUsers);
    };
    fetchCourses();
  }, []);
  useEffect(() => {
    handleDelete(courseId);
  }, [reply]);

  const handleClick = (id: number) => {
    navigate(`/courses/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      if (reply) {
        await deleteCourseAPI(id);
        const newCourses = courses.filter((course) => course.id !== id);
        setCourses(newCourses);
      }
    } catch {
      alert("Unable to delete course");
    }
  };

  return (
    <div>
      {showConfirmation && (
        <Confirmation
          setShowConfirmation={setShowConfirmation}
          setReply={setReply}
        />
      )}
      {showAddSection && <AddCourse setShowAddSection={setShowAddSection} />}
      <h1>Courses</h1>
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id}>
            <div
              className="courses-container__tile"
              onClick={() => handleClick(course.id)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCourseId(course.id);
                  setShowConfirmation(true);
                }}
                className="courses-container__tile__delete"
              >
                X
              </button>
              <div className="courses-container__tile--upper">
                <h3>{course.language}</h3>
              </div>

              <div className="courses-container__tile--bottom">
                <h3>{course.level}</h3>
              </div>
            </div>
          </div>
        ))}
        <div className="courses-container__add">
          <button
            className="courses-container__add__btn"
            onClick={() => {
              setShowAddSection(true);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
