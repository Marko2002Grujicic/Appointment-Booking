import React from "react";
import { Formik } from "formik";

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
} from "../StyledComponents";

const RegistrationForm = () => {
  return (
    <Formik
      onSubmit={registrationForm.submitAction}
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
                  placeholder={registrationForm.formFields.name.label}
                  key={registrationForm.formFields.name.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["name"] && !!errors["name"]}
                  helperText={touched["name"] && errors["name"]}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledFormIcon src={email_icon} alt="user icon" />
                <StyledInput
                  type="text"
                  fullWidth
                  name={registrationForm.formFields.email.key}
                  value={values["email"]}
                  placeholder={registrationForm.formFields.email.label}
                  key={registrationForm.formFields.email.key}
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
                  name={registrationForm.formFields.password.key}
                  value={values["password"]}
                  placeholder={registrationForm.formFields.password.label}
                  key={registrationForm.formFields.password.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched["password"] && !!errors["password"]}
                  helperText={touched["password"] && errors["password"]}
                />
              </StyledInputContainer>
            </StyledInputsWrapper>
          </StyledContainer>
          <SubmitContainer>
            <StyledButton type="submit">Региструј се</StyledButton>
            <StyledLink to="/login"> Улогуј се</StyledLink>
          </SubmitContainer>
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
