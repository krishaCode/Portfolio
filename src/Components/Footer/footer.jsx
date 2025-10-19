import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import navicon1 from '../../assets/img/nav-icon1.svg'
import navicon2 from '../../assets/img/nav-icon2.svg'
import navicon3 from '../../assets/img/nav-icon3.png'
import './footer.css'

function Footer() {
  return (
    <footer className='footer'>
        <Container>
      <Row className='align-items-center'>
        <Col sm={12} className="text-center">
                <div className="social-icon">
                    <a href="https://www.linkedin.com/in/krishan-malinda-849b5534b"><img src={navicon1} alt=''/></a>
                    <a href="https://github.com/krishaCode"><img src={navicon2} alt=''/></a>
                    <a href="gkmalinda@std.foc.sab.ac.lk"><img src={navicon3} alt=''/></a>
                </div>
                <p>Copyright 2025. All Rights Reserved</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer