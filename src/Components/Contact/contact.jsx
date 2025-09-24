import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import contactImg from '../../assets/img/contact-img.svg'
import { Phone } from 'react-bootstrap-icons'

function Contact() {
    const [formDetails, setFormDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        // Add your form submission logic here
        setTimeout(() => {
            setButtonText("Send");
            setStatus({ success: true, message: "Message sent successfully!" });
        }, 2000);
    }

    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact" />
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input 
                                        type="text" 
                                        value={formDetails.firstName} 
                                        placeholder="First Name" 
                                        onChange={(e) => onFormUpdate('firstName', e.target.value)} 
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input 
                                        type="text" 
                                        value={formDetails.lastName} 
                                        placeholder="Last Name" 
                                        onChange={(e) => onFormUpdate('lastName', e.target.value)} 
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input 
                                        type="email" 
                                        value={formDetails.email} 
                                        placeholder="Email" 
                                        onChange={(e) => onFormUpdate('email', e.target.value)} 
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input 
                                        type="tel" 
                                        value={formDetails.phone} 
                                        placeholder="Phone" 
                                        onChange={(e) => onFormUpdate('phone', e.target.value)} 
                                    />
                                </Col>
                                <Col sm={12} className="px-1">
                                    <textarea 
                                        rows="6" 
                                        value={formDetails.message} 
                                        placeholder="Message" 
                                        onChange={(e) => onFormUpdate('message', e.target.value)}
                                    ></textarea>
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                {status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Contact