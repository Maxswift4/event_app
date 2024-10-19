"use client";
import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUserAlt } from "react-icons/fa"; // Icons for date, time, and user count
    const page =({closemodal,email,client_id})=> {
        
        const[currentEventList,setCurrentEventList]=useState([]);

        const fetchCurrent_event = async()=>{
        const url = 'http://localhost/event-api/api/client.php';
        
         const json={
          client_id:client_id
         }
         
         const formdata= new FormData();
         formdata.append("json",JSON.stringify(json));
         formdata.append("operation","fetch_currentEvent")
         const response= await axios.post(url,formdata);
         console.log(response.data);
         setCurrentEventList(response.data)
        }
        useEffect(()=>{
        fetchCurrent_event();
        },[])
       
        
          return (
            <Container className="py-5">
           
              <Row className="gy-4">
                {currentEventList.map((event, index) => (
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
                          {/* <span>
                            <FaUserAlt className="me-1" /> {event.registered} registered
                          </span>
                          <Button variant="primary" className="btn-sm">
                            Register
                          </Button> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          );
        };
        
    

    export default page