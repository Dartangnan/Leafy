import React from "react";
import { Field, reduxForm } from "redux-form";
import "./Profile.css";
import { connect } from "react-redux";
import { updateProfile } from "../actions";

// -=-=-=-=-=-=-=-= Adjust React-Form to accept files as input =-=-=-=-=-=-=-=-
const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);
const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      className="avatar-input"
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-=-=-=-=-=-
const Profile = (props) => {
  console.log(__dirname);

  //
  // In case the user is not logged in should be directed to the login page
  if (!props.initialValues || Object.keys(props.initialValues).length === 0) {
    props.history.push("/login");
  }

  // -=-=-=-=-=-=-=-=-=-=-= Handle Submit =-=-=-=-=-=-=-=-=-=-=-=-=-
  const onFormSubmit = (formValues) => {
    const fd = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (
        key === "_id" ||
        !formValues[key] ||
        formValues[key] === props.initialValues[key]
      )
        return;
      fd.append(key, formValues[key]);
    });
    fd.append("_id", formValues._id);
    props.updateProfile(fd);
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  return (
    <>
      <div className="profile-container">
        <h1>Profile</h1>
        <hr />
        <div className="profile-picture">
          <img
            alt=""
            src={
              props.initialValues.avatar
                ? `${props.initialValues.avatar.replaceAll("\\", "/").slice(6)}`
                : ""
            }
          />
        </div>
        <form
          encType="multipart/form-data"
          className="user-information"
          onSubmit={props.handleSubmit(onFormSubmit)}
        >
          <div className="form-field">
            <label>Name:</label>
            <Field
              className="user-field"
              name="name"
              component="input"
              type="text"
            />
          </div>
          <div className="form-field">
            <label>Telephone:</label>
            <Field
              className="user-field"
              name="phone"
              component="input"
              type="text"
            />
          </div>
          <div className="form-field">
            <label>E-mail:</label>
            <Field
              className="user-field"
              name="email"
              component="input"
              type="text"
            />
          </div>
          <div className="form-field">
            <label>Nickname:</label>
            <Field
              className="user-field"
              name="nickName"
              component="input"
              type="text"
            />
          </div>
          <div className="form-field">
            <label>Country:</label>
            <Field
              className="user-field"
              name="country"
              component="input"
              type="text"
            />
          </div>
          <div className="form-field">
            <label>Avatar Picture:</label>
            <Field
              name="avatar"
              component={FileInput}
              type="file"
              accept="image/png, image/jpeg"
            />
          </div>
          <button className="update-btn">Update</button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { initialValues: state.userReducer };
};

const formWrappers = reduxForm({ form: "userInfo", enableReinitialize: true })(
  Profile
);

export default connect(mapStateToProps, { updateProfile })(formWrappers);
