"use client";
import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Modal ,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '@/Components/login/page';
import Register from '@/Components/register/page';
import Event_form from '@/Components/event_form/page';
import Styles from './ModalComponent.module.css';
import axios from 'axios';
import SearchModal from '@/Components/SearchDataModal/page';
import Client_Email_Modal from '@/Components/client_Email_Modal/page';
import { FaCalendarAlt, FaClock, FaUserAlt } from "react-icons/fa"; // Icons for date, time, and user count
const HomePage = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [currentModal, setCurrentModal] = useState({
    loginModal: false,
    registerModal: false,
   
    searchModal:false,
    clientEmail_Modal:false
  });
  const [modalTitle, setModalTitle] = useState('');
  const [eventlist, setEventList] = useState([]);
  const [event_id, setEvent_id] = useState('');
  const [filter, setFilter] = useState('All');  
  const[search_code,setSearch_Code]=useState('');
  const [showModalGet_started,setShowModalGet_started]=useState(false);
  const [event_Data,setEvent_data]=useState({
    title:'',
    description:'',
    category_name:'',
    time:'',
    date:'',
    location:'',
    photo:null

  })
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const eventsPerPage = 3; // Show 3 events per page

  const closeModal = () => {
    setCurrentModal({ loginModal: false, registerModal: false });
    setShowmodal(false);
  };

  const ShowmodalLogin = () => {
    setCurrentModal({
      loginModal: true,
      registerModal: false,
    });
    setShowmodal(true);
  };
  const showClient_Email_Modal =()=>{
    setModalTitle('SignIn as Client');
    setCurrentModal({
      event_bookedform:false,
      registerModal:false,
      loginModal:false,
      searchModal:false,
      clientEmail_Modal:true
  })
  setShowmodal(true);
  setShowModalGet_started(false);
  }

  const Show_eventform = async (event_id) => {
    setEvent_id(event_id);
    await fetch_events();
    setCurrentModal({
      loginModal: false,
      registerModal: false,
      event_bookedform: true,
    });
    setShowmodal(true);
  };

  const fetch_events = async (category_id = null) => {
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
      manimum_slot:data.manimum_slot,
      photo:data.photo
    })
    setEvent_id(data.event_id);
    setShowmodal(true);
    setCurrentModal({
      event_bookedform:false,
      registerModal:false,
      loginModal:false,
      searchModal:true
  })
   }

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

  useEffect(() => {
    fetch_events();
 
  }, []);


  const handleFilterChange = (category_id) => {
    setFilter(category_id === null ? 'All' : category_id);  // Set filter to 'All' if category_id is null
    fetch_events(category_id);  // Pass null to fetch all events
    setCurrentPage(1);  // Reset to the first page on filter change
  };
  
  const filteredEvents = eventlist;
  return (
    <>
      <div>
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.logo}>CDO Local Events</div>
          <nav style={styles.nav}>
            <ul style={styles.navList}></ul>
            <div style={styles.navButtons}>
            <Button variant="primary" style={styles.signInButton}  onClick={showClient_Email_Modal}>Sign as Client</Button>
              <Button variant="primary" style={styles.signInButton} onClick={ShowmodalLogin}>Sign as Organizer</Button>
            </div>
          </nav>
        </header>

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
                  {/* <span>Slot: {event.total_registrations}/{event.manimum_slot}</span>
                  <div className="d-flex justify-content-between align-items-center">
                    {event.total_registrations >= event.manimum_slot ? (
                      <p style={{ color: 'red', fontWeight: 'bold' }}>Full</p>
                    ) : (
                   
                    )}
                     
                  </div> */}
                  <Button onClick={() => setShowModalGet_started(true)}>Book Now</Button>
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

      <Modal show={showmodal} onHide={closeModal} className={Styles.customModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentModal.loginModal && (
            <Login closeModal={closeModal} setCurrentModal={setCurrentModal} setShowmodal={setShowmodal} />
          )}
          {currentModal.registerModal && <Register closeModal={closeModal} />}
          {currentModal.event_bookedform && (
            <Event_form closeModal={closeModal} event_id={event_id} refreshloader={fetch_events} />
          )}
           {currentModal.searchModal && (
            <SearchModal closeModal={closeModal} setCurrentModal={setCurrentModal} eventdata={event_Data} setShowModalGet_started={setShowModalGet_started} />
          )}
           {currentModal.clientEmail_Modal && (
            <Client_Email_Modal  />
          )}
        </Modal.Body>
      </Modal>


      <Modal show={showModalGet_started}  onHide={()=>setShowModalGet_started(false)}className={Styles.customModal} size="sm" centered>
      <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
        <div>
              <h5>Ready to book this event?</h5>
              <Button variant="primary" onClick={showClient_Email_Modal}>
                Get Started
              </Button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4285f4',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    marginRight: '30px',
    gap: '20px',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  signInButton: {
    marginLeft: '10px',
  },
  filterButtons: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0',
  },
  eventCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  eventTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  eventDescription: {
    color: '#555',
  },
};

export default HomePage;
