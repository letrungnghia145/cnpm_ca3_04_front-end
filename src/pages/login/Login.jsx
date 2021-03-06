import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import backgroundLogin from "./../../assets/img/background-login.jpg";
import "./../../assets/css/login-style.css";
import logo from "./../../assets/img/logo.png";
import { callApi } from "../../api";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";


export const Login = () => {
  
  const history = useHistory();
  const doLogin = (event) => {
    event.preventDefault();
    callApi("login", "post", {
      username: "nghia1k45",
      password: "172285633",
    }).then((response) => {
      if (response != null) {
        localStorage.setItem("jwt", response.data);
        // const history = useHistory();
        // history.push("/");
        // window.location.reload();
        history.push("/");
      }
    });
  };
  
  const { register, handleSubmit, errors } = useForm();

  function onSubmit(data) {
    console.log("Data submitted: ", data);
  }
  
  return (
    <div className="limiter">
      <div className="logo__back_login">
        <a href="/">
          <img src={logo} alt="" />
        </a>
      </div>
      <div className="container-login100">
        <div className="wrap-login100">
          <form 
          className="login100-form validate-form"
          onSubmit={handleSubmit(onSubmit)}
          >
            <span className="login100-form-title p-b-34">Login</span>
            <div
              className="wrap-input100 rs1-wrap-input100 validate-input m-b-20"
              data-validate="Type user name"
            >
              <input
                id="first-name"
                className="input100"
                type="text"
                name="username"
                placeholder="User name"
                ref={register({
                  required: "Enter your username",
                 })}
              />
              <span className="focus-input100" />
            </div>
            {errors.username && <p style={{color: "red"}} className="error">{errors.username.message}</p>}
            <div
              className="wrap-input100 rs2-wrap-input100 validate-input m-b-20"
              data-validate="Type password"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                ref={register({
                  required: "Enter your password",
                  minLength: {
                    value: 8,
                    message: "Your password is to short, min length is 8"
                  }
                })}
              />
              <span className="focus-input100" />
            </div>
            {errors.password && <p style={{color: "red"}} className="error">{errors.password.message}</p>}
            <div className="container-login100-form-btn">
              <button
                type="submit"
                className="login100-form-btn"
                onClick={(event)=>doLogin(event)}
              >
                Sign in
              </button>
            </div>
            <div className="w-full text-center p-t-27 p-b-239">
              <span className="txt1">Forgot </span>
              <a href="/forgot" className="txt2">
                User name / password?
              </a>
            </div>
            <div className="w-full text-center" style={{ paddingTop: "15px" }}>
              <a href="/register" className="txt3">
                Register
              </a>
            </div>
          </form>
          <div
            className="login100-more"
            style={{ backgroundImage: `url(${backgroundLogin})` }}
          />
        </div>
      </div>
    </div>
  );
};

const isLogin = () => {
  if (localStorage.getItem("jwt") != null) {
    return true;
  }
  return false;
};
