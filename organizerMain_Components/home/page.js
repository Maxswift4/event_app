"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react'
import styles from './page.module.css';
const page =()=> {
  const [count_event,setCount_event]= useState('');
  const [count_atendees,setcount_atendees]= useState('');
  const Count_event = async () => {
    const url = "http://localhost/event-api/api/event.php";
  

    const formdata = new FormData();
 
    formdata.append("operation", "count_event");

    const response = await axios.post(url, formdata);
    console.log(response.data);
   setCount_event(response.data[0].approved_count)
  };

  const Count_atendees = async () => {
    const url = "http://localhost/event-api/api/event.php";
  

    const formdata = new FormData();
 
    formdata.append("operation", "count_attendees");

    const response = await axios.post(url, formdata);
    console.log(response.data);
   setcount_atendees(response.data[0].user_count)
  };



  useEffect(()=>{
    Count_atendees();
    Count_event();
  },[])
  return (
    <div className={styles.mainContent}>
    {/* Navbar */}
 
    {/* Content Area */}
    <div className={styles.content}>
      <h3>Overview</h3>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h4>Upcoming Events</h4>
          <p>{count_event} Events</p>
        </div>
        <div className={styles.card}>
          <h4>Attendees</h4>
          <p>{count_atendees} Participants</p>
        </div>
        <div className={styles.card}>
          <h4>Revenue</h4>
          <p>$5000</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page