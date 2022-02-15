import 'react-app-polyfill/ie11';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios, { AxiosResponse } from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { IUserContext } from '@zelen.uk/types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface LoginFormProps {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: (
      values: LoginFormProps
    ) => {
      axios.post(process.env.REACT_APP_API_ENDPOINT + 'auth/login', values)
        .then(({data: context}: AxiosResponse<IUserContext>) => {
          localStorage.setItem('session', JSON.stringify(context))
          setAlert({
            type: 'success',
            message: 'Seccessfully logged in',
            open: true,
          })
        })
        .then(() => setTimeout(() => {navigate('/')}, 1000))
        .catch(e => {
          setAlert({
            type: 'error',
            message: e.response?.data.message || e.message,
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
      <h1>Login</h1>
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
            label="Email"
            id="email"
            name="email"
            placeholder=""
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button type="submit">Login</Button>
        <Button type="button" onClick={() => navigate('/register')}>Sign Up</Button>
      </Box>
      <Snackbar open={alert.open} autoHideDuration={5000}>
        <Alert severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
