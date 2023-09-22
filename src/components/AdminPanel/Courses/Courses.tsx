import { useEffect, useState } from "react";
import "./courses.scss";
import { useNavigate } from "react-router-dom";
import { Course } from "../../../interfaces/ICourse";
import { getCourses } from "../../../server/server";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedUsers = await getCourses();
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
      <div className="tiles">
        {courses.map((course) => (
          <div key={course.id}>
            <div className="tile" onClick={() => handleClick(course.id)}>
              <div className="tile-upper">
                <h3>{course.language}</h3>
              </div>

              <div className="tile-bottom">
                <h3>{course.level}</h3>
              </div>
            </div>
          </div>
        ))}
        <div className="add-course">
          <button className="add-course-btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
