import { useEffect, useState } from "react";
import "./courses.scss";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../../interfaces/ICourse";
import { deleteCourseAPI, getCoursesAPI } from "../../../server/server";
import AddCourse from "./AddCourse/AddCourse";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [showAddSection, setShowAddSection] = useState<boolean>(false);
  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedUsers = await getCoursesAPI();
      setCourses(fetchedUsers);
    };
    fetchCourses();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/courses/${id}`);
  };
  const handleDetete = async (id: number) => {
    try {
      await deleteCourseAPI(id);
      const newCourses = courses.filter((course) => course.id !== id);
      setCourses(newCourses);
    } catch {
      alert("Unable to delete course");
    }
  };

  return (
    <div>
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
                  handleDetete(course.id);
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
