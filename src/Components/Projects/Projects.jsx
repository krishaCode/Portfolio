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
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Business Startup", 
      description: "Design & Development",
      imgUrl: projImg3,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Business Startup",
      description: "Design & Development", 
      imgUrl: projImg4,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg5,
      github: '#',
      linkedin: '#'
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg6,
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
                          <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">Tab 3</Nav.Link>
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
                          <p>No available.</p>
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