"use client";
import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUserAlt } from "react-icons/fa"; // Icons for date, time, and user count
import 'bootstrap/dist/css/bootstrap.min.css';
const page =({closemodal,email,client_id})=> {

      
    const[UpcommingEventList,setUpcommingEventList]=useState([]);

    const fetchUpcomming_event = async()=>{
    const url = 'http://localhost/event-api/api/client.php';
    
     const json={
      client_id:client_id
     }
     
     const formdata= new FormData();
     formdata.append("json",JSON.stringify(json));
     formdata.append("operation","fetch_Upcomming_event")
     const response= await axios.post(url,formdata);
     console.log(response.data);
     setUpcommingEventList(response.data)
    }

    const cancel_registration = async(reg_id)=>{
   
      const isConfirmed = window.confirm("Are you sure you want to cancel your registration?");
      
      if (!isConfirmed) {
        return; 
      }

      const url = 'http://localhost/event-api/api/client.php';

      const json={
        reg_id:reg_id
      }

      const formdata= new FormData();
      formdata.append("json",JSON.stringify(json));
      formdata.append("operation","cancel_registration");

      const response= await axios.post(url,formdata);
      console.log(response.data);

      if(response.data == 1){
        alert("Registration cancelled");
        fetchUpcomming_event();
      }else{
        alert("Registration not cancelled");
      }

    }

    useEffect(()=>{
        fetchUpcomming_event();
    },[])

  return (
    <>
       <Container className="py-5">
           
           <Row className="gy-4">
             {UpcommingEventList.map((event, index) => (
               <Col md={4} key={index}>
                 <Card className="p-3 shadow-sm">
                   <Card.Img
                     variant="top"
                     src={`http://localhost/event-api/api/images/${event.photo}`}
                     alt="Event Banner"
                     style={{
                       width: "100%", // Set to your desired 2x2 size (in pixels)
                       height: "200px", // Ensure it's a square
                       objectFit: "cover", // Ensure the image covers the space without distortion
                     }}
                   />
        
                   <Card.Body>
                     <h5>{event.title}</h5>
                     <span>{event.category_name}</span>
                     <p className="text-muted">
                     {event.discription}{event.title}.
                     </p>
                     
                     <div className="d-flex align-items-center mb-2">
                       <FaCalendarAlt className="me-2" />
                       <span>{event.date}</span>
                       <FaClock className="ms-3 me-2" />
                       <span>{event.time}</span>
                     </div>
                     <span>{event.location}</span><br/>
                     <span>{event.event_code}</span>
                   <div className="d-flex justify-content-between align-items-center">
                   {event.status === 'cancelled' ? (
                      <span className="text-danger">Cancelled</span>
                    ) : (
                      <Button variant="danger" className="btn-sm" onClick={() => cancel_registration(event.reg_id)}>
                        Cancel Registration
                      </Button>
                    )}

                     </div>
                   </Card.Body>
                 </Card>
               </Col>
             ))}
           </Row>
         </Container>
    </>
  )
}

export default page