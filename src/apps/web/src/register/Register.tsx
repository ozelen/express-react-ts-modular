import 'react-app-polyfill/ie11';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { IUserInput } from '@zelen.uk/types';
import {userSignupValidation as validationSchema} from '@zelen.uk/validation';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      password: '',
      email: '',
      confirmEmail: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: (
      values: IUserInput
    ) => {
      axios.post(process.env.REACT_APP_API_ENDPOINT + 'auth/signup', values)
        .then(() => setAlert({
          type: 'success',
          message: 'Seccessfully registered',
          open: true,
        }))
        .then(() => setTimeout(() => {navigate('/login')}, 2000))
        .catch(e => {
          setAlert({
            type: 'error',
            message: e.response?.data.error || e.message,
            open: true,
          });
        })
    },
  });
  const [alert, setAlert] = useState<{open: boolean, type: AlertColor, message: string}>({
    open: false,
    type: 'success',
    message: '',
  });
  return (
    <div>
      <h1>Signup</h1>
      <Box
        onSubmit={ formik.handleSubmit }
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="John"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </div>
        <div>
          <TextField
            label="Email"
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            label="Confirm Email"
            id="confirmEmail"
            name="confirmEmail"
            placeholder="john@acme.com"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.confirmEmail}
            helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
          />
        </div>
        <div>
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Password"
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
          />
        </div>
        <Button type="submit">Submit</Button>
      </Box>
      <Snackbar open={alert.open} autoHideDuration={5000}>
        <Alert severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
