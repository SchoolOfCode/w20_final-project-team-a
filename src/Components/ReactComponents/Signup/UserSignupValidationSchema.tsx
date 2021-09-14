import * as yup from 'yup';

export const UserSignupValidationSchema = yup.object().shape({
    email: yup.string()
      .required('An email address is required')
      .email('Invalid Email'),
    displayName: yup.string()
      .required('A display name is required')
      .max(20, 'Display name must be less than 20 characters'),
    password: yup.string()
      .required('A password is required')
      .min(6, 'Your password must be at least 6 characters'),
    confirmPassword: yup.string()
      .required('You must enter your password again')
      .oneOf([yup.ref('password'), null], 'The passwords do not match'),
  });