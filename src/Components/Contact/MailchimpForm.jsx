import React, { useState } from 'react';
import { Col, Row, Alert } from 'react-bootstrap';

const MailchimpForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.indexOf('@') > -1) {
      setStatus('sending');
      // Simulate API call
      setTimeout(() => {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      }, 1000);
    } else {
      setStatus('error');
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter<br /> & Never miss latest updates</h3>
            {status === 'success' && <Alert variant="success">{message}</Alert>}
            {status === 'error' && <Alert variant="danger">{message}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input 
                  value={email} 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email Address" 
                />
                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default MailchimpForm
