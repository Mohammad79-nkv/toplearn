import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getAllCourses } from "../Actions/courses";
import { reducers } from "../Reducers/reducers";

const Store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

Store.dispatch(getAllCourses());
export default Store;
