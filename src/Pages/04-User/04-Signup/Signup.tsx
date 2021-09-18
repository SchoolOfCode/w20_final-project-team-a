import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import "../04-User-Base.scss";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSignupValidationSchema } from "../../../Components/ReactComponents/Signup/UserSignupValidationSchema";
import CircleCircuit from "../../../Components/VisualAssets/BackgroundsPlus/CircleCircuit.svg";
import CircuitHead from "../../../Components/VisualAssets/BackgroundsPlus/CircuitHead.svg";
import CircuitYellow from "../../../Components/VisualAssets/BackgroundsPlus/CircuitHeadYellow.svg";
import HorizontalCircuit from "../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

type UserSignupForm = {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [failureMsg, setFailureMsg] = useState([{ msg: "" }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignupForm>({
    resolver: yupResolver(UserSignupValidationSchema),
  });

  const onSubmit = (formData: UserSignupForm) => {
    axios({
      method: "POST",
      url: API_URL + "users/signup",
      data: { formData },
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
        <HorizontalCircuit className="circuit-line-left"></HorizontalCircuit>
        <LeftVerticalTitle title="Sign Up"></LeftVerticalTitle>
        <section className="user-form-container">
          <section className="user-image-container">
            <img
              src={CircleCircuit}
              alt="circle circuit design"
              className="user-image-circuit-cricle"
            />
            {!success && !failure && (
              <img
                src={CircuitYellow}
                alt="circuit head design"
                className="user-image-circuit-head"
              />
            )}
            {!success && failure && (
              <img
                src={CircuitHead}
                alt="circuit head design"
                className="user-image-circuit-incorrect"
              />
            )}
            {success && !failure && (
              <img
                src={CircuitHead}
                alt="circuit head design"
                className="user-image-circuit-success"
              />
            )}
          </section>
          <form className="user-form-input" onSubmit={handleSubmit(onSubmit)}>
            <section className="user-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                {...register("email")}
                placeholder="your@email.here"
                name="email"
                id="email"
                className={`user-signup ${errors.email ? "invalid-input" : ""}`}
              ></input>
              <div className="invalid-input-message">
                {errors.email?.message}
              </div>
            </section>
            <section className="user-form-group">
              <label htmlFor="displayName">Display Name:</label>
              <input
                type="text"
                {...register("displayName")}
                placeholder="password"
                name="displayName"
                id="displayName"
                className={`user-signup ${
                  errors.displayName ? "invalid-input" : ""
                }`}
              ></input>
              <div className="invalid-input-message">
                {errors.displayName?.message}
              </div>
            </section>
            <section className="user-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                {...register("password")}
                name="password"
                id="password"
                className={`user-signup ${
                  errors.password ? "invalid-input" : ""
                }`}
              ></input>
              <div className="invalid-input-message">
                {errors.password?.message}
              </div>
            </section>
            <section className="user-form-group">
              <label htmlFor="password">Confirm Password:</label>
              <input
                type="password"
                {...register("confirmPassword")}
                name="confirmPassword"
                id="confirmPassword"
                className={`user-signup ${
                  errors.confirmPassword ? "invalid-input" : ""
                }`}
              ></input>
              <div className="invalid-input-message">
                {errors.confirmPassword?.message}
              </div>
            </section>
            <section className="user-registered-link">
              Already registered? Click{" "}
              <a href="/login" title="Click to login">
                here
              </a>{" "}
              to login
            </section>
            {success && (
              <div className="user-messages-container-success">
                <h3 className="user-messages-text-success">
                  Your account has been successfully registered. Click{" "}
                  <a href="/login">here</a> to login
                </h3>
              </div>
            )}
            {failure && (
              <div className="user-messages-container-failure">
                <p className="user-message-header">
                  {`The following error${
                    failureMsg.length > 1 ? "s" : ""
                  } occurred:`}
                </p>
                {failureMsg &&
                  failureMsg.map((errorMsg, i) => {
                    return (
                      <ol>
                        <li className="user-messages-text-failure" key={i}>
                          {errorMsg.msg}
                        </li>
                      </ol>
                    );
                  })}
              </div>
            )}
            <section className="user-submit">
              <button type="submit" className="user-submit-button">
                Submit
              </button>
            </section>
          </form>
          <section className="user-messages-container"></section>
        </section>
      </div>
    </div>
  );
};

export default Signup;
