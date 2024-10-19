import React from 'react';
import { Button, Container, Row, Col, Form, Modal ,Card} from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaUserAlt } from "react-icons/fa"; // Icons for date, time, and user count
import 'bootstrap/dist/css/bootstrap.min.css';
import { Henny_Penny } from 'next/font/google';
const Page = ({ closemodal, eventdata, setCurrentModal,setShowModalGet_started }) => {
  return (
    <Col md={6} style={{marginLeft:'200px'}}>
    <Card className="p-3 shadow-sm">
    <Card.Img
       variant="top"
       src={`http://localhost/event-api/api/images/${eventdata.photo}`}
        alt="Event Banner"
        style={{
                width: "100%", // Set to your desired 2x2 size (in pixels)
                height: "200px", // Ensure it's a square
                objectFit: "cover", // Ensure the image covers the space without distortion
              }}
            />

      <Card.Body>
        <h5>{eventdata.title}</h5>
        <span>{eventdata.category_name}</span>
        <p className="text-muted">{eventdata.description}</p>
        <div className="d-flex align-items-center mb-2">
          <FaCalendarAlt className="me-2" />
          <span>{eventdata.date}</span>
          <FaClock className="ms-3 me-2" />
          <span>{eventdata.time}</span>
        </div>
        <span>{event.location}</span><br/>
        <span>Event Code: {eventdata.event_code}</span><br/>
        <span>Slot: {eventdata.total_registrations}/{eventdata.manimum_slot}</span>
        <div className="d-flex justify-content-between align-items-center">
          {eventdata.total_registrations >= eventdata.manimum_slot ? (
            <p style={{ color: 'red', fontWeight: 'bold' }}>Full</p>
          ) : (
            <Button onClick={() =>setShowModalGet_started(true)}>Book Now</Button>
          )}
           
        </div>
     
      </Card.Body>
    </Card>
  </Col>
  );
};

export default Page;
