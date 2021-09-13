import * as yup from 'yup';

export const UserLoginValidationSchema = yup.object().shape({
    email: yup.string()
      .required('An email address is required to login')
      .email('Invalid Email'),
    password: yup.string()
      .required('A password is required')
      .min(6, 'Your password is at least 6 characters'),
  });