import { useState,useEffect } from 'react'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ArrowRightCircle } from 'react-bootstrap-icons'
import headerImg from '../../assets/img/profile.png'
import './Banner.css'

function Banner() {
 const [loopNum, setLoopNum] = useState(0);
 const [isDeleting, setIsDeleting] = useState(false);
 const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
 const name = 'Krishan';
 const [text, setText] = useState('');
 const [delta, setDelta] = useState(300 - Math.random() * 100);
 const period = 2000;

useEffect(() => {
  let ticker = setInterval(() => {
    tick();
  }, delta)
  return () => { clearInterval(ticker) };
}, [text])

const tick = () => {
  let i = loopNum % toRotate.length;
  let fullText = toRotate[i];
  let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
  setText(updatedText);

  if(isDeleting) {
    setDelta(prevDelta => prevDelta / 2);
  }
  if(!isDeleting && updatedText === fullText) {
    setIsDeleting(true);
    setDelta(period);
  } else if(isDeleting && updatedText === '') {
    setIsDeleting(false);
    setLoopNum(loopNum + 1);
    setDelta(500);
  }
}

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to my Portfolio</span>
            <h1>{`Hi! I'm `}<span className="name">{name}</span></h1>
            <h2 className="roles"><span className="wrap">{text}</span><span className="cursor" aria-hidden="true">&nbsp;</span></h2>
            <p>I’m a dedicated web developer passionate about building responsive, user-friendly websites using modern technologies like React, Node.js, and Firebase.
</p>
            <button onClick={() => console.log('connect')}>Let's Connect <ArrowRightCircle size={25} /></button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="Header Img"/>
          </Col>
        </Row>
      </Container>
    </section>  
  )
}

export default Banner