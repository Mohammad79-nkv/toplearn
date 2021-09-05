import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import SingleCourse from "../components/common/singleCourse";

import Archive from "../components/Course/Archive";
import Course from "../components/Course/Course";
import MainLayouts from "../components/Layouts/MainLayouts";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { paginate } from "../utils/paginate";

const Toplearn = (props) => {
  const courses = useSelector((state) => state.courses);
  const indexCourses = paginate(courses, 1, 8);

  return (
    <MainLayouts>
      <Switch>
        <Route path="/course/:id" component={SingleCourse} />
        <Route path="/archive" component={Archive} />
        <Route path="/" exact render={() => <Course courses={indexCourses  } />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </MainLayouts>
  );
};

export default Toplearn;
