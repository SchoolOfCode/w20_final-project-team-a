import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import "./Signup.scss";
import "../04-User-Base.scss";
import pinhead from "../../../Components/VisualAssets/BackgroundsPlus/User Signup PinHead.png";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState([{ msg: "" }]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: API_URL + "users/signup",
      data: { email, displayName, password, password2 },
    })
      .then((response) => {
        if (response.data.success) {
          setSuccess(true);
          setFailure(false);
        } else {
          setFailureMsg(response.data.msg);
          setFailure(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="user-page-container">
        <LeftVerticalTitle title="Sign Up"></LeftVerticalTitle>
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
                  onBlur={(e) => setEmail(e.target.value)}
                ></input>
              </p>
            </section>
            <section>
              <label htmlFor="displayName">display name</label>
              <p>
                <input
                  type="text"
                  placeholder="lewis"
                  name="displayName"
                  id="displayName"
                  onBlur={(e) => setDisplayName(e.target.value)}
                ></input>
              </p>
            </section>
            <section>
              <label htmlFor="password">password</label>
              <p>
                <input
                  type="password"
                  // placeholder="enter password"
                  name="password"
                  id="password"
                  onBlur={(e) => setPassword(e.target.value)}
                ></input>
              </p>
            </section>
            <section>
              <label htmlFor="password">confirm password</label>
              <p>
                <input
                  type="password"
                  // placeholder="re-enter password"
                  name="password2"
                  id="password2"
                  onBlur={(e) => setPassword2(e.target.value)}
                ></input>
              </p>
            </section>
            <section className="user-registered-link">
              Already registered? Click{" "}
              <a href="/login" title="Click to login">
                here
              </a>{" "}
              to login
            </section>
            <section className="user-submit">
              <button
                type="submit"
                className="user-submit-button"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </section>
          </form>
          <section className="signup-messages-container">
            {success && (
              <div
                className="signup-messages-container-success"
                style={{ backgroundColor: "lightgreen", color: "black" }}
              >
                <h3 className="signup-messages-text">
                  Your account has been sucessfully registered. Click{" "}
                  <a href="/login">here</a> to login
                </h3>
              </div>
            )}
            {failure && (
              <div
                className="signup-messages-container-failure"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <p className="signup-message-header">
                  The following error(s) occurred:
                </p>
                {failureMsg &&
                  failureMsg.map((errorMsg, i) => {
                    return (
                      <ul>
                        <li className="signup-messages-text" key={i}>
                          - {errorMsg.msg}
                        </li>
                      </ul>
                    );
                  })}
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Signup;