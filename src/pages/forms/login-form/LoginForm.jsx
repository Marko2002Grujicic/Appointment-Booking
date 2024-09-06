import React, { useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

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
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1 || "/");
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values, actions) => {
    try {
      const response = await axios.post("http://localhost:5000/login", values, {
        withCredentials: true,
      });
      login(response.data.token, response.data.userId);
      navigate("/");
    } catch (error) {
      console.error(
        "There was an error logging in:",
        error.response?.data || error.message
      );
      actions.setFieldError("general", "Login failed. Please try again");
    }
  };

  return (
    <Formik
      onSubmit={handleLogin}
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
            <StyledButton type="submit">Улогуј се</StyledButton>
            <StyledLink to="/registration"> Региструј се</StyledLink>
          </SubmitContainer>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
