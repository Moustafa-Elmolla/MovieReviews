import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  let validate = Yup.object({
    name: Yup.string().required('name is Required').min(3, 'min chars is 3').max(15, 'max chars is 15'),
    email: Yup.string().required('Email is Required').email('Email invalid'),
    password: Yup.string().required('password is Required').matches(/^[A-Z][a-z0-9]{3,8}$/, 'password must start with capital'),
    rePassword: Yup.string().required('password is Required').oneOf([Yup.ref('password')], 'rePassword dont match'),
    phone: Yup.string().required('password is Required').matches(/^01[0125][0-9]{8}$/, 'phone must be egy number')
  }) 
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    }, validationSchema: validate,
    onSubmit:  sendRegisterData
  })
  async function sendRegisterData(values) {
    setIsLoading(true)
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values).catch((err)=> {
      setApiError(err.response.data.message)
      setIsLoading(false)
    })
    if(data.message == "success") {
      setIsLoading(false)
      navigate('/login')
    }
  }
  return (
    <>
    <div className="w-75 m-auto">
      <h3>Register :</h3>
      <form onSubmit={formik.handleSubmit}>
        {apiError? <div className='alert alert-danger'>{apiError}</div>: '' }
        <label htmlFor="name">Name</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='name' id='name' value={formik.values.name} type="text" />
        {formik.errors.name && formik.touched.name? <div className='alert alert-danger'>{formik.errors.name}</div>: ''}
        

        <label htmlFor="email">Email</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='email' id='email' value={formik.values.email} type="email" />
        {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
        
        <label htmlFor="password">Password</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='password' id='password' value={formik.values.password} type="password" />
        {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

        <label htmlFor="rePassword">rePassword</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='rePassword' id='rePassword' value={formik.values.rePassword} type="password" />
        {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

        <label htmlFor="phone">Phone</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' name='phone' id='phone' value={formik.values.phone} type="tel" />
        {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}

        {isLoading? <button className='btn btn-success'><i className='fa fa-spin fa-spinner'></i></button> : <button className='btn btn-success' type='submit'>Register</button>}
        
        
      </form>
    </div>
    </>
  )
}
