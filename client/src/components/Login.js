import React, { useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { fetchUser, addRecipeToMenu, createProfile } from "../actions";

const Login = (props) => {
  let emailValid = true;
  let passwordValid = true;
  const loginBox = useRef(null);
  const onFormSubmit = async (formValues, xx, props) => {
    // console.log(formValues);
    console.log(formValues, xx, props);
    console.log(props);
    await props.fetchUser(formValues.email, formValues.password);
    console.log(props.userReducer, "ANSWER FROM REDUCER");
    // props.history.push("/");
  };
  if (Object.keys(props.userReducer).length !== 0) {
    if (props.userReducer.menuHistory) {
      props.addRecipeToMenu("", "", JSON.parse(props.userReducer.menuHistory));
    }
    if (props.userReducer.name) {
      props.history.push("/");
    } else props.history.push("/profile");
  }

  const passwordIsValid = (password) => {
    const hasNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
      (number) => {
        if (password.includes(number)) return 1;
        return 0;
      }
    );
    const result = hasNum.reduce((acc, num) => acc + num);
    return result > 0 ? true : false;
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!props.signInValues || !props.signInValues) {
      loginBox.current.querySelector(".error-message-email").style.display =
        "block";
      loginBox.current.querySelector(".error-message-password").style.display =
        "block";
      return;
    }

    if (
      !props.signInValues.email ||
      !props.signInValues.email.includes("@") ||
      !props.signInValues.email.includes(".") ||
      !props.signInValues.email.indexOf("@") > 0 ||
      !(
        props.signInValues.email.indexOf("@") <=
        props.signInValues.email.length - 3
      )
    ) {
      emailValid = false;
    } else {
      emailValid = true;
    }

    loginBox.current.querySelector(
      ".error-message-email"
    ).style.display = emailValid ? "none" : "block";

    if (
      !props.signInValues.password ||
      !(props.signInValues.password.length >= 8) ||
      !passwordIsValid(props.signInValues.password)
    ) {
      passwordValid = false;
    } else {
      passwordValid = true;
    }
    loginBox.current.querySelector(
      ".error-message-password"
    ).style.display = passwordValid ? "none" : "block";

    if (passwordValid && emailValid) {
      props.createProfile(props.signInValues);
      console.log("User registered");
      console.log(props.userReducer, "ANSWER FROM REDUCER");
    }
  };
  console.log(props.userReducer, "ANSWER FROM REDUCER");

  return ReactDOM.createPortal(
    <div className="login-container">
      <div className="login-box">
        <form
          ref={loginBox}
          onSubmit={props.handleSubmit(onFormSubmit)}
          className="login-box"
        >
          <div className="single-input-label">
            <label>E-mail:</label>
            <Field name="email" component="input" type="email"></Field>
          </div>

          <p className="error-message-email">
            The e-mail typed is not valid. Please try again
          </p>
          <div className="single-input-label">
            <label>Password:</label>
            <Field name="password" component="input" type="password"></Field>
          </div>
          <p className="error-message-password">
            This password is invalid. Make sure it has at least 8 characters and
            contains numbers and letters.
          </p>
          <div className="login-btns">
            <Field
              onClick={handleSignIn}
              name="signin-btn"
              className="signin-btn"
              component="button"
            >
              Sign In
            </Field>
            <Field
              value={"login"}
              name="login-btn"
              className="login-btn "
              component="button"
            >
              Login
            </Field>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("login")
  );
};

const formWrapper = reduxForm({ form: "loginInfo" })(Login);

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
    signInValues: state.form.loginInfo ? state.form.loginInfo.values : "",
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  addRecipeToMenu,
  createProfile,
})(formWrapper);

// login
