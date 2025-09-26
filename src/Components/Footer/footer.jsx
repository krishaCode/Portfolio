import React from 'react'
import MailchimpForm from '../Contact/MailchimpForm'
import { Col, Container, Row } from 'react-bootstrap'
import navicon1 from '../../assets/img/nav-icon1.svg'
import navicon2 from '../../assets/img/nav-icon2.svg'
import navicon3 from '../../assets/img/nav-icon3.svg'
import './footer.css'

function Footer() {
  return (
    <footer className='footer'>
        <Container>
            <Row className='align-items-center'>
                <MailchimpForm/>
                <Col sm={12} className="text-center">
                <div className="social-icon">
                    <a href="#"><img src={navicon1} alt=''/></a>
                    <a href="#"><img src={navicon2} alt=''/></a>
                    <a href="#"><img src={navicon3} alt=''/></a>
                </div>
                <p>Copyright 2025. All Rights Reserved</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer