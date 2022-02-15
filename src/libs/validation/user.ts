import * as yup from 'yup';

export const userSignupValidation = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  confirmEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email"), null], "Emails must match"),
  fullName: yup
    .string()
    .min(5, 'The full name must be at least 5 characters long')
    .required('Full Name is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password confirmation is required')
    .matches(
      /^(?=.*[A-z])(?=.*[0-9])/,
      'password must be minimum 8 characters with at least one number and one character'
    )
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});
