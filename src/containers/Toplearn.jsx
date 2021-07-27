import React from "react";
import { Switch, Route } from "react-router-dom";
import Single from "../components/common/Single";

import Archive from "../components/Course/Archive";
import Course from "../components/Course/Course";
import MainLayouts from "../components/Layouts/MainLayouts";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const Toplearn = (props) => {
  return (
    <MainLayouts>
      <Switch>
        <Route path="/Single" component={Single} />
        <Route path="/archive" component={Archive} />
        <Route path="/" exact component={Course} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </MainLayouts>
  );
};

export default Toplearn;
