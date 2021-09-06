import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import SingleCourse from "../components/common/singleCourse";
import jwt from 'jsonwebtoken'

import Archive from "../components/Course/Archive";
import Course from "../components/Course/Course";
import MainLayouts from "../components/Layouts/MainLayouts";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { paginate } from "../utils/paginate";
import { clearUser, setUser } from "../Actions/user";
import { deCodedToken } from "../utils/deCodedToken";
import Logout from "../components/Login/Logout";
import UserProfile from "../components/Profile/UserProfile";

const Toplearn = (props) => {
  const courses = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  const indexCourses = paginate(courses, 1, 8);

  useEffect( () => {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = deCodedToken(token);
      const dateNow = Date.now() / 1000;
      if(decodedToken.payload < dateNow){
        localStorage.removeItem('token');
        dispatch(clearUser())
      }else {
        dispatch(setUser(decodedToken.payload.user))
      }
    }
  }, [])

  return (
    <MainLayouts>
      <Switch>
        <Route path="/course/:id" component={SingleCourse} />
        <Route path="/archive" component={Archive} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/" exact render={() => <Course courses={indexCourses  } />} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
      </Switch>
    </MainLayouts>
  );
};

export default Toplearn;
