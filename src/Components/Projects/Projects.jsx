import React from 'react'
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../../assets/img/project-img1.png";
import projImg2 from "../../assets/img/project-img2.png";
import projImg3 from "../../assets/img/project-img3.png";
import projImg4 from "../../assets/img/project-img4.png";
import projImg5 from "../../assets/img/project-img5.png";
import projImg6 from "../../assets/img/project-img6.png";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from 'react-on-screen';
import './Projects.css';
function Projects() {
    const projects = [
    {
      title: "FEDAS Farm Helping Web",
      description: "Fedas system is given to real time Information about crop for farmers",
      imgUrl: projImg1,
      github: '#',
      linkedin: '#'
    },
    
    {
      title: "Smart Recipe Recommender", 
      description: "AI-powered app that tracks food inventory, recognizes items, suggests recipes, and monitors expiry dates for smarter kitchen management.",
      imgUrl: projImg3,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Farm Management System SUSL",
      description: "Farm Management System SUSL is a digital platform for Agri Faculty staff to manage crops, livestock, schedule tasks, track inventory, and report efficiently.",
      imgUrl: projImg4,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Stockguard System",
      description: "StockGuard is a smart inventory system with real-time stock monitoring, low-stock alerts, product management, data tracking, and a user-friendly interface.",
      imgUrl: projImg5,
      github: '#',
      linkedin: '#'
    },
    {
      title: "AutoHub - Car Sell web",
      description: "Full-stack car selling platform with customer listings, bidding, real-time updates, advanced search, and an admin dashboard for car and bid management.",
      imgUrl: projImg6,
      github: '#',
      linkedin: '#'
    }
    ]

    const mobileProjects = [
    {
      title: "BinGo", 
      description: "BinGo is a mobile app that optimizes garbage collection with real-time route tracking, schedules, notifications, and an admin dashboard for efficient waste management.",
      imgUrl: projImg2,
      github: '#',
      linkedin: '#'
    }
    ]

  return (
     <section className="project" id="projects">
          <Container>
            <Row>
              <Col size={12}>
                <TrackVisibility>
                  {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                    <h2 align="center">Projects</h2>
                    <p>Explore the projects I have developed. These works showcase my ability to design functional, user-friendly systems while applying modern development practices and problem-solving techniques effectively.</p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Web</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Mobile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">Others</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first">
                          <Row>
                            {
                              projects.map((project, index) => {
                                return (
                                  <ProjectCard
                                    key={index}
                                    {...project}
                                    />
                                )
                              })
                            }
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <Row>
                            {
                              mobileProjects.map((project, index) => (
                                <ProjectCard key={index} {...project} />
                              ))
                            }
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <p>No available.</p>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>}
                </TrackVisibility>
              </Col>
            </Row>
          </Container>
          <img className="background-image-right" src={colorSharp2}></img>
        </section>
  )
}

export default Projects