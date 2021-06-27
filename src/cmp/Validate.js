import * as yup from 'yup';

const SignInSchema = yup.object({
    uid: yup
      .string('Enter your ERP ID')
      .required('ERP ID is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required')
      ,
  });

const passwordschema=yup.object({
  password: yup
  .string('Enter your password')
  .required('Password is required')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
})
const SignUpSchema = yup.object({
    uid: yup
      .string('Enter your ERP ID')
      .trim()
      .required('ERP ID is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    department: yup
    .string('Select department')
    .required('Department is Required')
    ,
    semester: yup
    .string('Select Semester')
    .required('Semester is Required')
    ,
    Name: yup
    .string('Enter Name')
    .required('Name is Required')
    .min(2,'Invalid Name')
    ,
    section : yup
    .string('Select section')
    .required('Section is Required') 
    ,
    email: yup
    .string('enter Email')
    .required('Email is Required')
    .email('invalid email')
  });



export {SignUpSchema,passwordschema}
export default SignInSchema

