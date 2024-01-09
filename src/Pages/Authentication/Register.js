import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialValues = { fname: "", lname: "", gender: "", email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 Characters").required("Password is Required")
};
const Register = () => {
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    values.gender = gender;
    console.log("handle submit", values)
    dispatch(registerUserAction({ data: values }))
  }

  const handleChange = (e) => {
    setGender(e.target.value);

  }
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className='space-y-5'>
          <div className='space-y-5'>
            <div>
              <Field as={TextField} name="fname" placeholder="First Name" type="text" variant="outlined" fullWidth />
              <ErrorMessage name='fname' component={"div"} className='text-red-500' />
            </div>
            <div>
              <Field as={TextField} name="lname" placeholder="Last Name" type="text" variant="outlined" fullWidth />
              <ErrorMessage name='lname' component={"div"} className='text-red-500' />
            </div>
            <RadioGroup
              onChange={handleChange}
              row
              aria-label="gender"
              name="gender"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <ErrorMessage name='gender' component={"div"} className='text-red-500' />
            </RadioGroup>
            <div>
              <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth />
              <ErrorMessage name='email' component={"div"} className='text-red-500' />
            </div>
            <div>
              <Field as={TextField} name="password" placeholder="Password" type="password" variant="outlined" fullWidth />
              <ErrorMessage name='password' component={"div"} className='text-red-500' />
            </div>
          </div>
          <Button sx={{ padding: ".8rem 0rem" }} fullWidth type='submit' variant="contained" color="primary">Register</Button>
        </Form>
      </Formik>
      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>
          if you have already account ?
          <Button onClick={() => navigate("/login")}>Login</Button>
        </p>
      </div>
    </>
  )
}

export default Register