import React from "react";
import { Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/header/Header";
import { initialValues, formFields } from "./helper/constants";
import { userSchema } from "./helper/schema";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const CreateUser = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Креирај нови кориснички профил" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: "span 2",
                },
              }}
            >
              {formFields.map((field) => (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={field.label}
                  name={field.key}
                  value={values[field.key]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched[field.key] && !!errors[field.key]}
                  helperText={touched[field.key] && errors[field.key]}
                />
              ))}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: colors.background.reversed,
                  color: colors.background.default,
                  textTransform: "capitalize",
                }}
              >
                Креирај корисника
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUser;
