// main page
"use client";
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from '@/organizerMain_Components/Sidebar/page';
import Home from '@/organizerMain_Components/home/page';
import Event from '@/organizerMain_Components/Event/page';

const page = () => {
  const [content, setContent] = useState('home');

  const renderContent = () => {
    switch (content) {
      case 'home':
        return <Home />;
      case 'Event':
        return <Event />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, #f06, #ffcc33, #09f)' }}>
      <VerticalNavbar onLinkClick={setContent} />
      
      <Container className="content" style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px', margin: 'auto' }}>
        {renderContent()}
      </Container>
    </div>
  );
};

export default page;