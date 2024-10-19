"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Page = ({ closeModal, event_id, refreshloader,client_id }) => {
  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    confirmEmail: '',  // New state for email confirmation
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const event_form = async () => {
    if (registerData.email !== registerData.confirmEmail) {
      alert("Email and Confirm Email do not match");
      return;
    }

    const url = "http://localhost/event-api/api/event.php";

    const json = {
      booked_data: [registerData],
      event_id: event_id,
      client_id:client_id
    };

    const formdata = new FormData();
    formdata.append("json", JSON.stringify(json));
    formdata.append("operation", "event_booked_submit");

    try {
      const response = await axios.post(url, formdata);
      console.log(response.data);

      if (response.data == 1) {
        // Success
        alert("Event booked successfully");
        refreshloader();
        closeModal();
      } else if (response.data == 2) {
        // Email already registered
        alert("Email is already registered for this event.");
      } else {
        // General failure
        alert("Event booking failed");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred while booking the event.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Event Register Form</h2>

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
          type="email"
          name="confirmEmail"  // New input for confirming email
          placeholder="Confirm Email"
          value={registerData.confirmEmail}
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
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none' }} onClick={event_form}>
        Submit
      </button>
    </div>
  );
};

export default Page;
