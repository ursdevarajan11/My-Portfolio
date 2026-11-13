import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Mail,
} from 'lucide-react'
import { profile } from '../data/site.js'
import SocialIcon from './SocialIcon.jsx'
import '../styles/Hero.css'

const resumeFileName = profile.resumePdf.slice(profile.resumePdf.lastIndexOf('/') + 1)

function Hero() {
  const [photoAvailable, setPhotoAvailable] = useState(true)
  const [resumeAvailable, setResumeAvailable] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(profile.resumePdf, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const isPdf = response.headers.get('content-type')?.includes('application/pdf')
        setResumeAvailable(response.ok && isPdf)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResumeAvailable(false)
        }
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="availability-badge">
            <span className="availability-dot" />
            Open to opportunities
          </p>
          <p className="hero-intro">Hello, I&apos;m</p>
          <h1>
            Devaraja
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-description">
            A Computer Science graduate who builds responsive web experiences,
            solves practical problems, and keeps exploring full stack
            development, AI, and Generative AI.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore Projects <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a
              className="button button-outline"
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              aria-label="View resume PDF in a new tab"
            >
              View Resume <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {resumeAvailable ? (
              <a
                className="button button-quiet"
                href={profile.resumePdf}
                download
                aria-label={`Download ${profile.name} resume PDF`}
              >
                <Download size={16} aria-hidden="true" /> Download Resume
              </a>
            ) : (
              <button
                className="button button-quiet resume-unavailable"
                type="button"
                disabled
                aria-label={`Download Resume unavailable; add ${resumeFileName} to public/assets`}
                title={`Add ${resumeFileName} to public/assets to enable downloading.`}
              >
                <Download size={16} aria-hidden="true" /> Download Resume
              </button>
            )}
          </div>
          {!resumeAvailable && (
            <p className="resume-note">
              Add the resume PDF to <code>public/assets</code> to enable downloading.
            </p>
          )}
          <div className="hero-socials" aria-label="Social links">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${profile.name} on GitHub (opens in a new tab)`}
            >
              <SocialIcon name="github" />
            </a>
            <a
              className={!profile.linkedIn ? 'is-placeholder' : ''}
              href={profile.linkedIn || '#contact'}
              target={profile.linkedIn ? '_blank' : undefined}
              rel={profile.linkedIn ? 'noreferrer' : undefined}
              aria-label={profile.linkedIn ? 'Visit LinkedIn profile' : 'Add your LinkedIn URL'}
            >
              <SocialIcon name="linkedin" />
            </a>
            <a
              className={!profile.email ? 'is-placeholder' : ''}
              href={profile.email ? `mailto:${profile.email}` : '#contact'}
              aria-label={profile.email ? 'Send an email' : 'Add your professional email'}
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-frame">
            {photoAvailable ? (
              <img
                className="hero-portrait"
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                onError={() => setPhotoAvailable(false)}
              />
            ) : (
              <div className="portrait-fallback" role="img" aria-label={`Portrait placeholder for ${profile.name}`}>
                <span>DR</span>
                <small>Add your professional photo to public/images/profile.jpg</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
