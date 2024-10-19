// Components/sidebar/page.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

const VerticalNavbar = ({ children,onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (content) => {
    onLinkClick(content);
    setIsOpen(false); 
  };

  return (
    <>
      <button className={styles.menuButton} onClick={toggleNavbar}>
        {isOpen ? <Icon.X style={{ color: 'black' }} size={30} /> : <Icon.List style={{ color: 'black' }} size={30} />}
      </button>
      <div className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
        <a onClick={() => handleLinkClick('home')} className={`${styles.link} ${styles.activeLink}`}>
          <Icon.House className={styles.icon} /> Home
        </a>
        <a onClick={() => handleLinkClick('Event')} className={styles.link}>
          <Icon.PlusSquare className={styles.icon} /> Event
        </a>
        {/* <a onClick={() => handleLinkClick('services')} className={styles.link}>
          <Icon.Clock className={styles.icon} /> Schedule
        </a> */}
        <a onClick={() => handleLinkClick('contact')} className={styles.link}>
          <Icon.Gear className={styles.icon} /> Settings
        </a>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.shifted : ''}`}>
        {children}
      </div>
    </>
  );
};

export default VerticalNavbar;
