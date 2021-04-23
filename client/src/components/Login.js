import React, { useRef, useEffect } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "./Login.css";
import {
  fetchUser,
  addRecipeToMenu,
  createProfile,
  getDateMilSec,
  inicialIngredientList,
} from "../actions";
// -=-=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-
const Login = (props) => {
  //
  // -=-=-=-=-=-=-=-= Initial Variables =-=-=-=-=-=-=-=-
  let emailValid = true;
  let passwordValid = true;
  const loginBox = useRef(null);
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= useEffect Hook =-=-=-=-=-=-=-=-
  console.log(props, "PROPS");
  useEffect(() => {
    // Check to see if the information was loaded, which means that the user info was successfully retrieved
    if (Object.keys(props.userReducer).length !== 0) {
      props.getDateMilSec();
      //populate the menu state if user has a menu saved
      if (props.userReducer.menuHistory) {
        props.addRecipeToMenu(
          "",
          "",
          JSON.parse(props.userReducer.menuHistory)
        );
      }
      // populate the ingredient list state if user has already items added
      if (props.userReducer.ingredientsList) {
        props.inicialIngredientList(
          JSON.parse(props.userReducer.ingredientsList)
        );
      }
      //If it is a new user redirect to profile page so the user can finish filling their information, otherwise go to the home page where the meals of today are going to be displayed:
      if (props.userReducer.name) {
        props.history.push("/");
      } else {
        props.history.push("/profile");
        props.reset();

        return;
      }
    }

    // Load the warning pop-up to give the user credentials to test the web-app and add event listener to close the pop-up:
    if (loginBox.current) {
      setTimeout(() => {
        if (!loginBox.current) return;
        loginBox.current
          .closest(".login-container")
          .querySelector(".login-msg ")
          .classList.add("loaded");
      }, 500);

      loginBox.current
        .closest(".login-container")
        .querySelector(".close-popup ")
        .addEventListener("click", function () {
          loginBox.current
            .closest(".login-container")
            .querySelector(".login-msg ").style.display = "none";
        });
    }
  }, [props.userReducer]);

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Helper functions - Clear error messages =-=-=-=-=-=-=-=-
  const clearErrorMsgs = () => {
    loginBox.current.querySelector(".error-not-found-account").style.display =
      "none";
    loginBox.current.querySelector(".error-message-email").style.display =
      "none";
    loginBox.current.querySelector(".error-message-password").style.display =
      "none";
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Helper function - Validate password =-=-=-=-=-=-=-=-

  const passwordIsValid = (values) => {
    if (!values.password) return false;
    const password = values.password.replaceAll(" ", "");
    if (password.length < 8) return false;
    const letters = /^[A-Za-z]+$/;
    if (password.match(letters)) {
      return false;
    }
    const Numbers = /^[0-9]+$/;
    if (password.match(Numbers)) {
      return false;
    }
    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (password.match(specialChar)) {
      return false;
    }
    return true;
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Helper function - Validate e-mail =-=-=-=-=-=-=-=-
  const emailIsValid = (values) => {
    if (!values.email) return false;
    const email = values.email;
    if (email.includes(" ")) return false;
    const specialChar = /[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]/;

    if (specialChar.test(email)) return false;

    if (!email.includes("@") || !email.includes(".")) return false;

    if (
      !(
        props.signInValues.email.indexOf("@") <=
        props.signInValues.email.length - 3
      )
    )
      return false;
    return true;
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Helper function - Handle form submit =-=-=-=-=-=-=-=-
  const onFormSubmit = async (formValues, _, props) => {
    clearErrorMsgs();
    // Attempt to fetch the user information in the DB according to the email and password:
    await props.fetchUser(formValues.email, formValues.password);
    // In case the API returns false an error message is shown:
    if (!props.userReducer && loginBox.current) {
      loginBox.current.querySelector(".error-not-found-account").style.display =
        "block";
    }
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Helper function - Handle sign in =-=-=-=-=-=-=-=-
  const handleSignIn = async (e) => {
    clearErrorMsgs();
    e.preventDefault();

    if (!props.signInValues) {
      loginBox.current.querySelector(".error-message-email").style.display =
        "block";
      loginBox.current.querySelector(".error-message-password").style.display =
        "block";
      return;
    }

    // Checking if the e-mail entered is valid:

    if (!emailIsValid(props.signInValues)) {
      emailValid = false;
    } else {
      emailValid = true;
    }

    loginBox.current.querySelector(
      ".error-message-email"
    ).style.display = emailValid ? "none" : "block";

    // Checking if the password entered meets the requirements:

    if (!passwordIsValid(props.signInValues)) {
      passwordValid = false;
    } else {
      passwordValid = true;
    }
    loginBox.current.querySelector(
      ".error-message-password"
    ).style.display = passwordValid ? "none" : "block";

    // In case both password and email are valid, check if email was used before and return a new user or false in case the user was registered already:
    if (passwordValid && emailValid) {
      await props.createProfile(props.signInValues);
      if (
        (!props.userReducer || Object.keys(props.userReducer).length <= 0) &&
        loginBox.current
      ) {
        loginBox.current.querySelector(".error-message-account").style.display =
          "block";
      }
    }
  };
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Render Content =-=-=-=-=-=-=-=-
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
          <p className="error-message-account">
            This e-mail has already been registered. Please try again.
          </p>
          <p className="error-not-found-account">
            The e-mail or password entered do not match or are not registered.
          </p>
        </form>
      </div>
      <div className="login-msg">
        <h2 className="close-popup">X</h2>
        <h2 className="close-popup-header">Read me!</h2>
        <p>
          <div className="text-explanation">
            Please, use the following credentials if you want to take a look at
            the app but do not want to create an account:
          </div>
          <br />
          <span>
            E-mail: user@email.com
            <br />
            Password: password123
          </span>
        </p>
      </div>
    </div>,
    document.getElementById("login")
  );
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const formWrapper = reduxForm({
  form: "loginInfo",
})(Login);

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userReducer: state.userReducer,
    signInValues: state.form.loginInfo ? state.form.loginInfo.values : "",
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  addRecipeToMenu,
  createProfile,
  getDateMilSec,
  inicialIngredientList,
})(formWrapper);
