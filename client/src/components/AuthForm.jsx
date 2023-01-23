import { useState } from "react";
import {
  Box, Button, TextField,
  Typography, useTheme, useMediaQuery
} from '@mui/material'
import { EditOutlined } from "@mui/icons-material"
import { Formik } from "formik"
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from '../state'
import Dropzone from "react-dropzone";
import FlexBetween from './FlexBetween';
import { LOGIN_API, REGISTER_API } from '../consts/apiRoute';

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
}

const initialValuesLogin = {
  email: "",
  password: "",
}
function AuthForm() {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register'
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })
    // formData.append('picturePath', values.picture.name);

    const response = await fetch(REGISTER_API, {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      onSubmitProps.resetForm();
      setPageType('login');
      return;
    }
    const error = await response.json();
    console.error(error.message || error.error)
  }

  const login = async (values, onSubmitProps) => {
    const response = await fetch(LOGIN_API, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
      const loggedUser = await response.json();
      if (loggedUser) {
        dispatch(setLogin({
          user: loggedUser.user,
          token: loggedUser.token
        }))
        navigate("/home");
      }
      return;
    }
    const error = await response.json();
    console.error(error.message || error.error)
  }
  const handleSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: isNonMobile ? "span 2" : "span 4",
                  }} />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: isNonMobile ? "span 2" : "span 4",
                  }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: 'span 4'
                  }} />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: 'span 4'
                  }} />

                <Box gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem">
                  <Dropzone
                    accept={{ 'image/*': ['.jpg', '.jpeg', '.png'], }}
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`1px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer"
                          }
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>) :
                          (<FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>)
                        }
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              type="email"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }} />

            <TextField
              type="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }} />

          </Box>

          {/* BUTTONS */}
          <Button fullWidth type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": {
                color: palette.primary.main
              }
            }}>
            {isLogin ? "LOGIN" : "REGISTER"}
          </Button>
          <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light
              }
            }}>
            {isLogin ? "Don't have an account? Sign Up here." :
              "Already have an account? Login here."}
          </Typography>
        </form>
      )
      }
    </Formik >
  )
}

export default AuthForm;
