import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { Sugar } from "react-preloaders";
import simpleReactValidator from "simple-react-validator";
import { registerUser } from "./../../services/userServices";
import { Helmet } from "react-helmet";

const Register = ({ history }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState();
  const [policy, setPolicy] = useState();
  const [loading, setLoading] = useState(false);

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
    setFullname("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      fullname,
      email,
      password,
    };

    try {
      if (validator.current.allValid()) {
        setLoading(true);
        const { status } = await registerUser(user);
        console.log(validator.current);
        if (status === 201) {
          setLoading(false);
          toast.success("کاربر با موفقیت ساخته شد.", {
            position: "top-right",
            closeOnClick: true,
          });
          history.replace("/login");
          reset();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      toast.error("مشکلی پیش آمده.", {
        position: "top-right",
        closeOnClick: true,
      });
      setLoading(false);
    }
  };
  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> عضویت در سایت </h2>
        </header>
        <Helmet>
          <title>تاپلرن|عضویت در سایت</title>
        </Helmet>
        {loading ? <Sugar times={0} color="red" /> : null}
        <div className="form-layer">
          <form action="" method="" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="username">
                <i className="zmdi zmdi-account"></i>
              </span>
              <input
                type="text"
                name="fullname"
                className="form-control"
                placeholder="نام و نام خانوادگی"
                aria-describedby="username"
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                  validator.current.showMessageFor("fullname");
                }}
              />
              {validator.current.message(
                "fullname",
                fullname,
                "required|min:5"
              )}
            </div>

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
              {validator.current.message("email", email, "required|email")}{" "}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  validator.current.showMessageFor("password");
                }}
              />
              {validator.current.message("password", password, "required")}
            </div>

            <div className="accept-rules">
              <label>
                <input
                  type="checkbox"
                  name="policy"
                  value={policy}
                  onChange={(e) => {
                    setPolicy(e.currentTarget.checked);
                    validator.current.showMessageFor("policy");
                  }}
                />{" "}
                قوانین و مقررات سایت را میپذیرم{" "}
              </label>
              {validator.current.message("policy", policy, "required")}
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> عضویت در سایت </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default withRouter(Register);
