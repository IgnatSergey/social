import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
import {
  login,
  getCaptchaThunkCreater,
  setCaptcha,
  setErrorMessage,
} from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import {
  getAuthStatus,
  getCaptcha,
  getErrorMessage,
  getMyUserId,
} from "../../redux/auth-selector";
import { Formik, Field, Form } from "formik";
import { validRequired } from "../common/validators/validators";
import newCaptchaPhoto from "../../assets/new-captcha-button.png";

const LoginForm = (props) => {
  return (
    <>
      <h1 className="login-header">Authorization</h1>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          props.onLogin(
            values.login,
            values.password,
            values.rememberMe,
            values.captcha
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="login-form">
              <div className="login-input-wrapper">
                <label htmlFor="rememberMe">Login:</label>
                <Field
                  className="login-input"
                  placeholder="Login"
                  name="login"
                  component="input"
                  validate={validRequired}
                />
                {errors.login && touched.login && (
                  <div className="error">{errors.login}</div>
                )}
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="password">Password:</label>
                <Field
                  className="login-input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  component="input"
                  validate={validRequired}
                />
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="login-input-wrapper-checkbox">
                <label htmlFor="rememberMe">Remember</label>
                <Field
                  className="login-input"
                  id="rememberMe"
                  type="checkbox"
                  name="rememberMe"
                  component="input"
                />
              </div>
              <button type="submit">Login</button>
            </div>
            {props.captcha && (
              <div className="login-captcha-wrapper">
                <img className="captcha" src={props.captcha} />
                <div className="captcha-input-wrapper">
                  <Field
                    className="captcha-input"
                    id="captcha"
                    type="text"
                    name="captcha"
                    component="input"
                    validate={validRequired}
                  />
                  <button
                    className="new-captcha"
                    type="button"
                    onClick={() => {
                      props.getNewCaptcha();
                    }}
                  >
                    <img className="new-captcha-imege" src={newCaptchaPhoto} />
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {props.errorMessage && <div className="error">{props.errorMessage}</div>}
    </>
  );
};

const Login = (props) => {
  useEffect(() => {
    return () => {
      props.setCaptcha(null);
      props.setErrorMessage(null);
    };
  }, []);

  if (props.isAuth) {
    return <Navigate to={`/profile/${props.userId}`} />;
  }
  return (
    <LoginForm
      onLogin={props.login}
      errorMessage={props.errorMessage}
      captcha={props.captcha}
      getNewCaptcha={props.getCaptchaThunkCreater}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getMyUserId(state),
    isAuth: getAuthStatus(state),
    errorMessage: getErrorMessage(state),
    captcha: getCaptcha(state),
  };
};

export default connect(mapStateToProps, {
  login,
  getCaptchaThunkCreater,
  setCaptcha,
  setErrorMessage,
})(Login);
