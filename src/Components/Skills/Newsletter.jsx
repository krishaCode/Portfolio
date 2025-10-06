import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'

function Newsletter({onValidated, status, message}) {
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        if (status === 'success') clearFields();
    }, [status])

    const clearFields = () => {
        setEmail('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || email.indexOf("@") === -1) return;
        if (typeof onValidated === 'function') {
            onValidated({ EMAIL: email });
        } else {
            // no-op or you could integrate a default behavior
            clearFields();
        }
    }
    
  return (
    <section className="newsletter-section" id="newsletter">
      <Container>
        <div className='newsletter-bx'>
          <Row className="align-items-center">
              <Col lg={5} md={12}>
                <h3>Subscribe to our Newsletter</h3>
                {status === 'sending' && <Alert>Sending...</Alert>}
                {status === 'error' && <Alert variant='danger'>{message}</Alert>}
                {status === 'success' && <Alert variant='success'>{message}</Alert>}
              </Col>
              <Col lg={7} md={12}>
                <form onSubmit={handleSubmit}>
                  <div className='new-email-bx'>
                    <input 
                      type='email' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email Address' 
                      required 
                    />
                    <button type='submit'>Submit</button>
                  </div>
                </form>
              </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default Newsletter