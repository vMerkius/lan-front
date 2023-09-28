import { useEffect, useState } from "react";
import "./courses.scss";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../../interfaces/ICourse";
import { getCoursesAPI } from "../../../server/server";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<ICourse[]>([]);
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

  return (
    <div>
      <h1>Courses</h1>
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id}>
            <div
              className="courses-container__tile"
              onClick={() => handleClick(course.id)}
            >
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
          <button className="courses-container__add__btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
