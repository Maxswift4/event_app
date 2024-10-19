"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Home.module.css';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentEventModal from '@/ClientComponents/CurrentEventModal/page';
import UpcomingEventModal from '@/ClientComponents/upcommingEventModal/page';
import { Calendar, momentLocalizer } from 'react-big-calendar'; 
import moment from 'moment'; 
import { Button, Container, Row, Col, Form, Modal ,Card} from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SearchModal from '@/Components/SearchDataModal/page';
import Event_form from '@/Components/event_form/page';
import { FaCalendarAlt, FaClock, FaUserAlt } from "react-icons/fa"; // Icons for date, time, and user count
const localizer = momentLocalizer(moment); 

const Home = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState({
      CurrentModal: false,
      UpcomingModal: false,
      FinishedModal: false,
      event_bookedform: false,
      searchModal:false
  });
  const [event_id, setEvent_id] = useState('');
  const [events, setEvents] = useState([]);
  const [client_id,setClient_id]=useState('')
  const [modalTitle, setModalTitle] = useState('');

  const [eventlist, setEventList] = useState([]);
  const [filter, setFilter] = useState('All');  
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const[search_code,setSearch_Code]=useState('');
  const eventsPerPage = 3; // Show 3 events per page
  const closeModal = () => {
      setCurrentModal({
          CurrentModal: false,
          UpcomingModal: false,
          FinishedModal: false,
      });
      setShowModal(false);
  };

  const [event_Data,setEvent_data]=useState({
    title:'',
    description:'',
    category_name:'',
    time:'',
    date:'',
    location:''

  })

  const showCurrentEventModal = () => {
      setCurrentModal({
          CurrentModal: true,
          UpcomingModal: false,
          FinishedModal: false,
      });
      setModalTitle("Current Event");
      setShowModal(true);
  };

  const showUpcomingEventModal = () => {
      setCurrentModal({
          CurrentModal: false,
          UpcomingModal: true,
          FinishedModal: false,
      });
      setModalTitle("Upcoming Event");
      setShowModal(true);
  };

  const fetchEvents = async () => {
    const url = 'http://localhost/event-api/api/client.php';
    const json = { client_id:sessionStorage.getItem("client_id")};

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "fetch_event");

    try {
        const response = await axios.post(url, formData);
        const eventData = response.data;
        
        const formattedEvents = eventData.map(event => ({
            title:  `Event this day: ${event.title}`,
            start: new Date(event.date),
            end: new Date(event.date), 
        }));
        console.log(formattedEvents)
        setEvents(formattedEvents); 
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
 

  useEffect(() => {
      fetchEvents();

      fetch_eventss();
      setEmail(sessionStorage.getItem("email"));
      setClient_id(sessionStorage.getItem("client_id"));
  }, []);


  const fetch_eventss = async (category_id = null) => {
    const url = 'http://localhost/event-api/api/event.php';
    const json={
      category_id:category_id
    }
    const formdata = new FormData();
    formdata.append("json",JSON.stringify(json));
    formdata.append('operation', 'fetch_event_list');
    

    const response = await axios.post(url, formdata);
    
    console.log(response.data);
    setEventList(response.data);
  };

      // Calculate the events for the current page
      const indexOfLastEvent = currentPage * eventsPerPage;
      const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
      const currentEvents = eventlist.slice(indexOfFirstEvent, indexOfLastEvent);
    
      const nextPage = () => {
        if (currentPage < Math.ceil(eventlist.length / eventsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const prevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      const handleFilterChange = (category_id) => {
        setFilter(category_id === null ? 'All' : category_id);  // Set filter to 'All' if category_id is null
        fetch_eventss(category_id);  // Pass null to fetch all events
        setCurrentPage(1);  // Reset to the first page on filter change
      };
      
      const filteredEvents = eventlist;

      const searchEvent =async()=>{
        if (!search_code.trim()) {
          alert("You need to input the code.");
          return; 
        }
        const url = 'http://localhost/event-api/api/event.php';
    
        const json={
          search_code:search_code
        }
    
        const formdata=new FormData();
        formdata.append("json",JSON.stringify(json));
        formdata.append("operation","searchEvent");
    
        const response= await axios.post(url,formdata);
        const data=response.data[0];
        // console.log(response.data);
         
        setEvent_data({
          title:data.title,
          description:data.description,
          category_name:data.category_name,
          date:data.date,
          time:data.time,
          location:data.location,
          event_code:data.event_code,
          manimum_slot:data.manimum_slot
        })
        setEvent_id(data.event_id);
        setShowModal(true);
        setCurrentModal({
          event_bookedform:false,
          registerModal:false,
          loginModal:false,
          searchModal:true
      })
       }

       const Show_eventform = async (event_id) => {
        setEvent_id(event_id);
        await fetch_eventss();
        setCurrentModal({
          loginModal: false,
          registerModal: false,
          event_bookedform: true,
        });
        setShowModal(true);
      };
  return (
      <>
          <div className={styles.container}>
              <header className={styles.header}>
                  <Image src="/wadhwani-logo.png" alt="Local Event" width={150} height={50} />
                  <nav className={styles.nav}>
                      <a href="#" className={styles.navLinkActive} onClick={showCurrentEventModal}>Current Event</a>
                      <a href="#" className={styles.navLink} onClick={showUpcomingEventModal}>Upcoming Event</a>
                      <a href="#" className={styles.navLink}>Finished Event</a>
                  </nav>
              </header>

              <section className={styles.content}>
          
                  <p className={styles.welcomeTitle}>Welcome, {email}!</p>
                  {/* <span>{email}</span> */}
                  <div className={styles.courseSection}>
                      <h2 className={styles.courseSectionTitle}>My Calendar</h2>
                      <Calendar
                          localizer={localizer}
                          events={events}
                          style={{ height: 500, margin: '50px' }}
                      />
                  </div>
              </section>
                {/* Main Section */}
        <Container className="mt-5">
          <Row>
          <Col lg={6}>
          <div className="mt-4">
             
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                value={search_code}
                onChange={(e) => setSearch_Code(e.target.value)}
                placeholder="Enter code"
                style={{ maxWidth: '300px' }}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                className="ms-2"
                type="submit"
                onClick={searchEvent}
              >
                View Event
              </Button>
            </Col>
          </Row>
          </div>
            </Col>
          </Row>

          {/* Filter Buttons */}
          <div style={styles.filterButtons}>
            <h6>Filter</h6>
            <Button variant={filter === 'All' ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(null)}>
                All
            </Button>
            <Button variant={filter === 1 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(1)}>
              Religion
            </Button>
            <Button variant={filter === 2 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(2)}>
              Education
            </Button>
            <Button variant={filter === 3 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(3)}>
              Party
            </Button>
            <Button variant={filter === 4 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(4)}>
              Food
            </Button>
            <Button variant={filter === 5 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(5)}>
              Music
            </Button>
            <Button variant={filter === 6 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(6)}>
              Technology
            </Button>
            <Button variant={filter === 7 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(7)}>
              Sports
            </Button>
            <Button variant={filter === 8 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(8)}>
              Health
            </Button>
          </div>

          <Row className="mt-4">
          <Container className="py-5">
           
        <Row className="mt-1">
          {currentEvents.map((event, index) => (
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
                  <p className="text-muted">{event.description}</p>
                  <div className="d-flex align-items-center mb-2">
                    <FaCalendarAlt className="me-2" />
                    <span>{event.date}</span>
                    <FaClock className="ms-3 me-2" />
                    <span>{event.time}</span>
                  </div>
                  <span>{event.location}</span><br/>
                  <span>Event Code: {event.event_code}</span><br/>
                  <span>Slot: {event.total_registrations}/{event.manimum_slot}</span>
                  <div className="d-flex justify-content-between align-items-center">
                    {event.total_registrations >= event.manimum_slot ? (
                      <p style={{ color: 'red', fontWeight: 'bold' }}>Full</p>
                    ) : (
                      <Button onClick={() =>Show_eventform(event.event_id)}>Book Now</Button>
                    )}
                     
                  </div>
               
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="secondary" onClick={nextPage} disabled={currentPage === Math.ceil(eventlist.length / eventsPerPage)}>
            Next
          </Button>
        </div>
         </Container>
          </Row>
        </Container>
          </div>

          <Modal show={showModal} onHide={closeModal} fullscreen centered>
              <Modal.Header closeButton>
                  <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {currentModal.CurrentModal && (
                      <CurrentEventModal closeModal={closeModal} email={email} client_id={client_id} />
                  )}
                  {currentModal.UpcomingModal && (
                      <UpcomingEventModal closeModal={closeModal} email={email}  client_id={client_id}/>
                  )}
                  {currentModal.searchModal && (
            <SearchModal closeModal={closeModal} setCurrentModal={setCurrentModal} eventdata={event_Data} />
          )}
            {currentModal.event_bookedform && (
            <Event_form closeModal={closeModal} event_id={event_id} refreshloader={fetch_eventss} client_id={client_id}/>
          )}s
              </Modal.Body>
          </Modal>
      </>
  );
};


export default Home;
