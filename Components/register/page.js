"use client";

import React, { useState } from 'react';
import axios from 'axios';
const RegisterForm = ({ closemodal }) => {
  const [registerData, setregisterData] = useState({
    fullname: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setregisterData({ ...registerData, [e.target.name]: e.target.value });
  };

const register = async()=>{
  const url = "http://localhost/event-api/api/organizer.php";

  const formdata= new FormData();
  formdata.append("json",JSON.stringify(registerData));
  formdata.append("operation","register");

  const response = await axios.post(url,formdata);
    console.log(response.data);
  if(response.data == 1){
    alert("register successfully");
    closemodal();
  }else{
    alert("register failed");
  }
}
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
    
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={registerData.fullname}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={registerData.address}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={registerData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none' }} onClick={register}>
          Register
        </button>
     
    </div>
  );
};

export default RegisterForm;
