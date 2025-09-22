import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import navicon1 from '../../assets/img/nav-icon1.svg';
import navicon2 from '../../assets/img/nav-icon2.svg';
import navicon3 from '../../assets/img/nav-icon3.svg';
import './Navbar.css';
const Navbar = () => {
  const[activeLink, setActiveLink] = useState('home');
  const[scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if(window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
     <BootstrapNavbar expand="lg" className={scrolled ? "scrolled" : ""} >
      <Container>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" >
          <span className="navbar-toggler-icon"></span>
        </BootstrapNavbar.Toggle>
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skill" className={activeLink === 'skill' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skill')}>Skill</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')} >Projects</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icons">
              <a href="#"><img src={navicon1} alt=''/></a>
              <a href="#"><img src={navicon2} alt=''/></a>
              <a href="#"><img src={navicon3} alt=''/></a>
            </div>
            <button className="vvd" onClick={() => console.log("Connect button clicked")}><span>Let’s Connect</span></button>
          </span>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar