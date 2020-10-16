import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', formValues)
    .then(res=>{
      console.log(res);
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubblepage');
    })
    .catch(err=>{
      console.log(err)
    })
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
         <label htmlFor='username'>
           <input
           name='username'
           type='text'
           value={formValues.username}
           onChange={handleChange}
          />
         </label>
         <label htmlFor='password'>
           <input 
           type='password'
           name='password'
           value={formValues.password}
           onChange={handleChange}
           />
         </label>
         <button onClick={handleSubmit}>LOG IN</button>
      </form>
    </>
  );
};

export default Login;
