import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Login({saveUserData}) {

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  let validate = Yup.object({
    email: Yup.string().required('Email is Required').email('Email invalid'),
    password: Yup.string().required('password is Required').matches(/^[A-Z][a-z0-9]{3,8}$/, 'password must start with capital'),

  }) 
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    }, validationSchema: validate,
    onSubmit: sendLoginData
  })
  async function sendLoginData(values) {
    setIsLoading(true)
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values).catch((err)=> {
      setApiError(err.response.data.message)
      setIsLoading(false)
    })
    if(data.message == "success") {
      localStorage.setItem("userToken", data.token)
      saveUserData();
      setIsLoading(false)
      navigate('/home')
    }
  }
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
    <div className="w-75 m-auto">
      <h3>Login :</h3>
      <form onSubmit={formik.handleSubmit}>
        {apiError? <div className='alert alert-danger'>{apiError}</div>: '' }

        <label htmlFor="email">Email</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='email' id='email' value={formik.values.email} type="email" />
        {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
        
        <label htmlFor="password">Password</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='password' id='password' value={formik.values.password} type="password" />
        {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

        {isLoading? <button className='btn btn-success'><i className='fa fa-spin fa-spinner'></i></button> : <button className='btn btn-success' type='submit'>Login</button>}
        
        
      </form>
    </div>
    </>
  )
}
