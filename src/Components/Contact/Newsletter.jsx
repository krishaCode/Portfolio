import React from 'react'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'

function Newsletter({onValidated, status, message}) {
    const [email, setEmail] = React.useState('');
    
    useEffect(() => {
        if (status === 'success') clearFields();
    }, [status])

    const clearFields = () => {
        setEmail('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        email && email.indexOf("@") > -1 && onValidated({
            EMAIL: email
        });
    }
  return (
    <Col lg={12}>
      <div className='newsletter-bx'>
        <Row>
            <Col lg={12} md={6} xl={5}>
              <h3>Subscribe to our Newsletter</h3>
              {status === 'sending' && <Alert>Sending...</Alert>}
              {status === 'error' && <Alert variant='danger'>{message}</Alert>}
              {status === 'success' && <Alert variant='success'>{message}</Alert>}
            </Col>
            <Col md={6} xl={7}>
              <form onSubmit={(e) => {e.preventDefault(); subscribe(e.target.email.value); e.target.email.value = ''}}>
                <div className='new-email-bx'>
                  <input type='email' name='email' placeholder='Email Address' required />
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </Col>
        </Row>
      </div>
    </Col>
  )
}

export default Newsletter