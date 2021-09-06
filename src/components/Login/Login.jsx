import React, { useRef, useState } from "react";
import { loginUser } from "../../services/userServices";
import { toast } from "react-toastify";
import { Sugar } from "react-preloaders";
import { withRouter } from "react-router-dom";
import {Redirect} from 'react-router'
import simpleReactValidator from "simple-react-validator";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Actions/user";
import { deCodedToken } from "../../utils/deCodedToken";
import { isEmpty } from "lodash";


const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState();
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const validator = useRef(
    new simpleReactValidator({
      messages: {
        required: "پر کردن این قسمت الزامی است.",
        min: "کمتر از ۵ حرف نباید باشد.",
        email: "ایمیل وارد شده صحیح نمی باشد.",
      },
      element: (message) => <div style={{ color: "red" }}> {message}</div>,
    })
  );
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      if (validator.current.allValid()) {
        setLoading(true);
        const { status, data } = await loginUser(user);
        if (status === 200) {
          toast.success("ورود موفقیت آمیز بود.", {
            position: "top-right",
            closeOnClick: true,
          });
          localStorage.setItem("token", data.token);
          dispatch(setUser(deCodedToken(data.token).payload.user))
          setLoading(false);
          history.replace("/");
          reset();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false);
      toast.error("مشکلی پیش آمده.", {
        position: "top-right",
        closeOnClick: true,
      });
    }
  };

  if(!isEmpty(user)) {return <Redirect to="/"/>}

  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> ورود به سایت </h2>
        </header>
        <Helmet>
          <title>تاپلرن|ورود به سایت</title>
        </Helmet>
        {loading ? (
          <Sugar times={0} color="red" customLoading={loading} />
        ) : null}
        <div className="form-layer">
          <form action="" method="" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="ایمیل"
                aria-describedby="email-address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validator.current.showMessageFor("email");
                }}
              />
              {validator.current.message("email", email, "required|email")}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validator.current.message("password", password, "required")}
            </div>

            <div className="remember-me">
              <label>
                <input type="checkbox" name="" /> مرا بخاطر بسپار{" "}
              </label>
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده
                ام !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> عضویت در سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> ورود به سایت </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default withRouter(Login);
