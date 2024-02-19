// Login.js
import React, { useState } from "react";
import Validation from './LoginValidation';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.username === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") {
            alert('Login successful');
            login(values.username); // username to authContext

            navigate('/home');
          } else {
            alert("That account doesn't exist");
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="username"><strong>Username</strong></label>
            <input type="username" placeholder='Enter username' name='username' onChange={handleInput} className='form-control rounded-0' />
            {errors.username && <span className='text-danger'> {errors.username}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-dark w-100 rounded-0'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
