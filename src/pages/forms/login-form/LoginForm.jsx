import React from "react";
import { Formik } from "formik";

import { loginForm } from "../helper/constants";
import password_icon from "../../../assets/form-icons/password.png";
import email_icon from "../../../assets/form-icons/email.png";

import {
  StyledContainer,
  StyledHeader,
  StyledInputContainer,
  StyledInputsWrapper,
  StyledInput,
  SubmitContainer,
  StyledButton,
  StyledFormIcon,
  StyledLink,
} from "../StyledComponents";

const LoginForm = () => {
  return (
    <Formik
      onSubmit={loginForm.handleFormSubmit}
      initialValues={loginForm.initialValues}
      validationSchema={loginForm.schema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledContainer>
            <StyledHeader>
              <img src="/big-logo.png" alt="logo" />
            </StyledHeader>
            <StyledInputsWrapper>
              <StyledInputContainer>
                <StyledFormIcon src={email_icon} alt="user icon" />
                <StyledInput
                  type="text"
                  fullWidth
                  name={loginForm.formFields.email.key}
                  value={values["email"]}
                  placeholder={loginForm.formFields.email.label}
                  key={loginForm.formFields.email.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["email"] && !!errors["email"]}
                  helperText={touched["email"] && errors["email"]}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledFormIcon src={password_icon} alt="user icon" />
                <StyledInput
                  fullWidth
                  type="password"
                  name={loginForm.formFields.password.key}
                  value={values["password"]}
                  placeholder={loginForm.formFields.password.label}
                  key={loginForm.formFields.password.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["password"] && !!errors["password"]}
                  helperText={touched["password"] && errors["password"]}
                />
              </StyledInputContainer>
            </StyledInputsWrapper>
          </StyledContainer>
          <SubmitContainer>
            <StyledButton type="submit">{"Улогуј се"}</StyledButton>
            <StyledLink to="/registration"> Региструј се</StyledLink>
          </SubmitContainer>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
