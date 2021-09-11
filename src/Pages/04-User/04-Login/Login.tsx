import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../config";
import "../04-User-Base.scss";
import pinhead from "../../../Components/VisualAssets/BackgroundsPlus/PinHead.png";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";

type Props = {
  loginStatus: boolean;
  setLoginStatus: (val: boolean) => void;
};

const Login: React.FC<Props> = ({ loginStatus, setLoginStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const history = useHistory();
  const [submit, setSubmit] = useState(false);

  function handleLogin(e: any) {
    e.preventDefault();
    setSubmit(true);
  }
  useEffect(() => {
    if (submit === true) {
      axios
        .post(
          API_URL + "users/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          // console.log(response.data, response)
          if (response.data.sucess) {
            setSuccess(true);
            setFailure(false);
            setSubmit(false);
          } else {
            setFailureMsg(response.data.message);
            setFailure(true);
            setSubmit(false);
            setLoginStatus(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
  const handleLogout = (e: any) => {
    e.preventDefault();
    setLoginStatus(false);
    setSuccess(false);
    setFailure(false);
    setSubmit(false);
    axios.get(API_URL + "users/logout");
  };
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (success === true && timer <= 0) {
      setLoginStatus(true);
      history.push("/dashboard");
      return;
    }
    if (success) {
      const loginRedirectTimer = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(loginRedirectTimer);
    }
  }, [success, history, timer, setLoginStatus]);

  return loginStatus ? (
    <div>
      <h1>Logout</h1>
      <button type="submit" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
    </div>
  ) : (
    <div>
      <div className="user-page-container">
        <LeftVerticalTitle title="Login"></LeftVerticalTitle>
        <section className="user-form-container">
          <section className="user-page-image">
            <img src={pinhead} alt="head" className="user-page-image" />
          </section>
          <form className="user-form-input">
            <section>
              <label htmlFor="email">email address</label>
              <p>
                <input
                  type="email"
                  placeholder="lewis@lewis.ninja"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </p>
            </section>
            <section>
              <label htmlFor="password">password</label>
              <p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </p>
            </section>
            <section className="user-registered-link">
              Not registered? Click{" "}
              <a href="/signup" title="Click to register">
                here
              </a>{" "}
              to register
            </section>
            <section className="user-submit">
              <button
                className="user-submit-button"
                disabled={!email || !password ? true : false}
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
            </section>
          </form>

          <section className="user-messages-container">
            {success && (
              <div className="user-messages-container-success">
                <p className="user-messages-text-success">
                  Logging you in, in {timer} seconds
                </p>
              </div>
            )}
            {failure && (
              <div className="user-messages-container-failure">
                <p className="user-messages-text-failure">{failureMsg}</p>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Login;
