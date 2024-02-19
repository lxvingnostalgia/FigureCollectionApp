import React, { useState } from "react";
import Validation from './RegisterValidation';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register(){
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.username === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/register', values)
      .then(res => {
        alert('Register successful');
        navigate('/login');
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Register</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="username"><strong>Username</strong></label>
            <input type="text" placeholder='Enter username' name='username' onChange={handleInput} className='form-control rounded-0'/>
            {errors.username && <span className='text-danger'> {errors.username}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter email' name='email' onChange={handleInput} className='form-control rounded-0'/>
            {errors.email && <span className='text-danger'> {errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0'/>
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-dark w-100 rounded-0'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register;