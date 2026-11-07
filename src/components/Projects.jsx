import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects.js'
import '../styles/Projects.css'
import SocialIcon from './SocialIcon.jsx'

const INITIAL_PROJECT_COUNT = 3

function ProjectLink({ href, icon: Icon, iconProps = {}, children, label }) {
  if (!href) {
    return (
      <button
        className="project-link is-unavailable"
        type="button"
        disabled
        title={`${label} URL has not been provided`}
        aria-label={`${label} URL has not been provided`}
      >
        <Icon size={15} {...iconProps} aria-hidden="true" />
        {children}
      </button>
    )
  }

  return (
    <a className="project-link" href={href} target="_blank" rel="noreferrer">
      <Icon size={15} {...iconProps} aria-hidden="true" />
      {children}
    </a>
  )
}

function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECT_COUNT)

  return (
    <section className="section-pad" id="projects">
      <div className="container">
        <div className="section-heading projects-heading">
          <div>
            <p className="eyebrow">04 — My Top Projects</p>
            <h2>Selected work, built with purpose.</h2>
            <p className="body-copy">
              A selection of applications and ideas across commerce, AI, productivity, and security.
            </p>
          </div>
          <span className="project-count">0{projects.length} projects</span>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <img
                className="project-cover"
                src={project.image}
                alt={`${project.title} project cover`}
                loading="lazy"
              />
              <div className="project-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags" aria-label="Technology stack">
                  {project.technologies.length > 0 ? (
                    project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))
                  ) : (
                    <span>Technologies to be confirmed</span>
                  )}
                </div>
                <div className="project-actions">
                  <ProjectLink
                    href={project.github}
                    icon={SocialIcon}
                    iconProps={{ name: 'github' }}
                    label="GitHub"
                  >
                    GitHub
                  </ProjectLink>
                  <ProjectLink href={project.demo} icon={ArrowUpRight} label="Live demo">
                    Live Demo
                  </ProjectLink>
                </div>
              </div>
              <span className="project-index" aria-hidden="true">0{index + 1}</span>
            </article>
          ))}
        </div>
        {projects.length > INITIAL_PROJECT_COUNT && (
          <div className="projects-toggle-wrap">
            <button
              className="button button-outline projects-toggle"
              type="button"
              onClick={() => setShowAll((expanded) => !expanded)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show Less' : 'View More Projects'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
