import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Checkbox } from "@mui/material";

import { useAuth } from "../../../context/AuthProvider";
import { registrationForm } from "../helper/constants";
import user_icon from "../../../assets/form-icons/person.png";
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
  StyledCheckboxContainer,
} from "../../../components/common/StyledComponents";

const RegistrationForm = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegistration = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        values
      );
      login(response.data.token);
      navigate("/login");
    } catch (error) {
      console.error(
        "There was an error registering the user:",
        error.response?.data || error.message
      );
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email is already in use"
      ) {
        actions.setFieldError("email", "emailInUse");
      }
    }
  };

  return (
    <Formik
      onSubmit={handleRegistration}
      initialValues={registrationForm.initialValues}
      validationSchema={registrationForm.schema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledContainer>
            <StyledHeader>
              <img src="/big-logo.png" alt="logo" />
            </StyledHeader>
            <StyledInputsWrapper>
              <StyledInputContainer>
                <StyledFormIcon src={user_icon} alt="user icon" />
                <StyledInput
                  type="text"
                  fullWidth
                  name={registrationForm.formFields.name.key}
                  value={values["name"]}
                  placeholder={t(
                    `form.${registrationForm.formFields.name.key}`
                  )}
                  key={registrationForm.formFields.name.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["name"] && !!errors["name"]}
                  helperText={
                    touched["name"] && errors["name"]
                      ? t(`errors.${errors["name"]}`)
                      : ""
                  }
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledFormIcon src={email_icon} alt="user icon" />
                <StyledInput
                  type="text"
                  fullWidth
                  name={registrationForm.formFields.email.key}
                  value={values["email"]}
                  placeholder={t(
                    `form.${registrationForm.formFields.email.key}`
                  )}
                  key={registrationForm.formFields.email.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["email"] && !!errors["email"]}
                  helperText={
                    touched["email"] && errors["email"]
                      ? t(`errors.${errors["email"]}`)
                      : ""
                  }
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledFormIcon src={password_icon} alt="user icon" />
                <StyledInput
                  fullWidth
                  type="password"
                  name={registrationForm.formFields.password.key}
                  value={values["password"]}
                  placeholder={t(
                    `form.${registrationForm.formFields.password.key}`
                  )}
                  key={registrationForm.formFields.password.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["password"] && !!errors["password"]}
                  helperText={
                    touched["password"] && errors["password"]
                      ? t(`errors.${errors["password"]}`)
                      : ""
                  }
                />
              </StyledInputContainer>
              <StyledCheckboxContainer>
                <FormControlLabel
                  label="Српски"
                  control={
                    <Checkbox
                      checked={values.preferred_language === "rs"}
                      onChange={() => {
                        setFieldValue("preferred_language", "rs");
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="English"
                  control={
                    <Checkbox
                      checked={values.preferred_language === "en"}
                      onChange={() => {
                        setFieldValue("preferred_language", "en");
                      }}
                    />
                  }
                />
              </StyledCheckboxContainer>
            </StyledInputsWrapper>
          </StyledContainer>
          <SubmitContainer>
            <StyledButton type="submit">{t("form.registrate")}</StyledButton>
            <StyledLink to="/login"> {t("form.login")}</StyledLink>
          </SubmitContainer>
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
