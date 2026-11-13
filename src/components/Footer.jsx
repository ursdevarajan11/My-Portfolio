import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../data/site.js'
import '../styles/Footer.css'
import SocialIcon from './SocialIcon.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-identity">
          <a className="footer-brand" href="#home">{profile.brand}</a>
          <p>{profile.role}</p>
        </div>
        <nav className="footer-portfolio-links" aria-label="Portfolio links">
          <a href={profile.portfolioDemo} target="_blank" rel="noopener noreferrer">
            Live Portfolio
          </a>
          <a href={profile.portfolioGithub} target="_blank" rel="noopener noreferrer">
            Portfolio Source
          </a>
        </nav>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <SocialIcon name="github" />
          </a>
          <a
            className={!profile.linkedIn ? 'is-placeholder' : ''}
            href={profile.linkedIn || '#contact'}
            target={profile.linkedIn ? '_blank' : undefined}
            rel={profile.linkedIn ? 'noreferrer' : undefined}
            aria-label={profile.linkedIn ? 'LinkedIn profile' : 'Add your LinkedIn URL'}
          >
            <SocialIcon name="linkedin" />
          </a>
          <a
            className={!profile.email ? 'is-placeholder' : ''}
            href={profile.email ? `mailto:${profile.email}` : '#contact'}
            aria-label={profile.email ? `Email ${profile.name}` : 'Add your professional email'}
          >
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>
        <a className="back-to-top" href="#home">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Designed &amp; built with care.</p>
      </div>
    </footer>
  )
}

export default Footer
