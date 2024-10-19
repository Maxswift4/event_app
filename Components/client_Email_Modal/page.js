"use client";
import React, { useState } from 'react';
import styles from './EmailForm.module.css'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';


const EmailForm = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const url = "http://localhost/event-api/api/event.php";
    const json = { email };

    const formData = new FormData();
    formData.append('json', JSON.stringify(json));
    formData.append('operation', 'client_login');

    try {
      const response = await axios.post(url, formData);
      const data = response.data;

      if (data && data.length > 0 && data[0].client_id) {
        sessionStorage.setItem('client_id', data[0].client_id);
        sessionStorage.setItem('email', data[0].email);
        router.push('/ClientDashboard');
      } else {
        alert('Invalid email or something went wrong.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>
        Continue
      </button>
    </div>
  );
};

export default EmailForm;