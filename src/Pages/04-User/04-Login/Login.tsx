import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../config";
import "../04-User-Base.scss";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {UserLoginValidationSchema} from "../../../Components/ReactComponents/Signup/UserLoginValidationSchema"
// import pinhead from "../../../Components/VisualAssets/BackgroundsPlus/User Signup PinHead.png";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import Loading from "../../../Components/ReactComponents/Loading/Loading";
import CircleCircuit from "../../../Components/VisualAssets/BackgroundsPlus/CircleCircuit.svg"
import CircuitHead from "../../../Components/VisualAssets/BackgroundsPlus/CircuitHead.svg"
import CircuitYellow from "../../../Components/VisualAssets/BackgroundsPlus/CircuitHeadYellow.svg"

type UserLoginForm = {
  email: string,
  password: string,
}
type Props = {
  loginStatus: boolean;
  setLoginStatus: (val: boolean) => void;
};

const Login: React.FC<Props> = ({ loginStatus, setLoginStatus }) => {

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");

  const history = useHistory();

  const {register, handleSubmit, formState: {errors}} = useForm<UserLoginForm>({
    resolver: yupResolver(UserLoginValidationSchema)
  })

  const onSubmit = (formData:UserLoginForm) => {
    axios.post(
      API_URL + "users/login",
      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data.sucess) {
        setSuccess(true);
        setFailure(false);
      } else {
        setFailureMsg(response.data.message);
        setFailure(true);
        setLoginStatus(false);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

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

  return (
    <div>
      <div className="user-page-container">
        <LeftVerticalTitle title="Login"></LeftVerticalTitle>
        <section className="user-form-container">
        <section className={`${success?"logging-in":"user-image-container"}`}>
            <img src={CircleCircuit} alt="circle circuit design" className={`user-image-circuit-cricle`} />
            {!success && !failure &&
              <img src={CircuitYellow} alt="circuit head design" className="user-image-circuit-head" />
            }
            {!success && failure &&
              <img src={CircuitHead} alt="circuit head design" className="user-image-circuit-incorrect" />
            }
            {success && !failure &&
              <Loading className = "logging-in-spinner" loadingText={`Logging in ${timer} `}/>
            }              
          </section>
        {!success &&
          <form className="user-form-input" onSubmit={handleSubmit(onSubmit)}>
            <section className="user-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                {...register('email')}
                placeholder="your@email.here"
                name="email"
                id="email"
                className={`user-login ${errors.email?"invalid-input" : ""}`}
              ></input>
              <div className="invalid-input-message">{errors.email?.message}</div>
            </section>
            <section className="user-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                {...register('password')}
                name="password"
                id="password"
                className={`user-login ${errors.password?"invalid-input" : ""}`}
                ></input>
                <div className="invalid-input-message">{errors.password?.message}</div>
            </section>
            <section className="user-registered-link">
              Not registered? Click{" "}
              <a href="/signup" title="Click to register">
                here
              </a>{" "}
              to register
            </section>
            <section className="user-messages-container">
            {/* {success && (
              <div className="user-messages-container-success">
                <p className="user-messages-text-success">
                  Logging you in, in {timer} seconds
                </p>
              </div>
            )} */}
            {failure && (
              <div className="user-messages-container-failure">
                <p className="user-messages-text-failure">{failureMsg}</p>
              </div>
            )}
          </section>
          <section className="user-submit">
              <button type="submit" className="user-submit-button" >
                Login
              </button>
          </section>
        </form>
        }
        </section>
      </div>
    </div>
  );
};

export default Login;
