import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "./../../services/userServices";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const { status } = await registerUser(user);
      if (status === 201) {
        toast.success("کاربر با موفقیت ساخته شد.", {
          position: "top-right",
          closeOnClick: true,
        });
        reset();
      }
    } catch (ex) {
      toast.error("مشکلی پیش آمده.", {
        position: "top-right",
        closeOnClick: true,
      });
      console.log(ex);
    }
    //   .then(({ data, status }) => {
    //     if (status === 201) {
    //       toast.success("کاربر با موفقیت ساخته شد.", {
    //         position: "top-right",
    //         closeOnClick: true,
    //       });
    //       console.log(data);
    //       reset();
    //     }
    //   })
    //   .catch((ex) => {
    //     toast.error("مشکلی پیش آمده.", {
    //       position: "top-right",
    //       closeOnClick: true,
    //     });
    //     console.log(ex);
    //   });

    // console.log(user);
  };
  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> عضویت در سایت </h2>
        </header>

        <div className="form-layer">
          <form action="" method="" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="username">
                <i className="zmdi zmdi-account"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="نام و نام خانوادگی"
                aria-describedby="username"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="ایمیل"
                aria-describedby="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="accept-rules">
              <label>
                <input type="checkbox" name="" /> قوانین و مقررات سایت را
                میپذیرم{" "}
              </label>
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

export default Register;
