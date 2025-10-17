import React from 'react'
import { Col } from 'react-bootstrap'
import { Github, Linkedin } from 'react-bootstrap-icons'

export const ProjectCard = ({ title, description, imgUrl, github, linkedin }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <div className="proj-links">
            {github && (
              <a href={github} className="proj-link" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} className="proj-link" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Col>
  )
}