import { useState } from 'react'
import {
  ArrowUpRight,
  Mail,
  Phone,
  Send,
} from 'lucide-react'
import { profile } from '../data/site.js'
import '../styles/Contact.css'
import SocialIcon from './SocialIcon.jsx'

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

function Contact() {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSending, setIsSending] = useState(false)

  function validate(formData) {
    const nextErrors = {}
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const subject = String(formData.get('subject') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!subject) nextErrors.subject = 'Please enter a subject.'
    if (!message) nextErrors.message = 'Please enter a message.'
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const nextErrors = validate(formData)
    setErrors(nextErrors)
    setStatus({ type: '', message: '' })

    if (Object.keys(nextErrors).length > 0) return

    if (!formspreeEndpoint) {
      const emailSubject = encodeURIComponent(formData.get('subject'))
      const body = encodeURIComponent(
        `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nSubject: ${formData.get('subject')}\n\n${formData.get('message')}`,
      )
      const recipient = profile.email ? `${profile.email}` : ''
      setStatus({
        type: 'notice',
        message: 'Formspree is not configured. Open an email draft to send this message.',
        href: `mailto:${recipient}?subject=${emailSubject}&body=${body}`,
      })
      return
    }

    setIsSending(true)
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error('The message could not be sent. Please try again or email me directly.')
      }

      form.reset()
      setErrors({})
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'The message could not be sent. Please try again.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="section-pad contact-section" id="contact">
      <div className="container">
        <div className="section-heading contact-heading">
          <p className="eyebrow">06 — Contact</p>
          <h2>Let&apos;s build something great together.</h2>
          <p className="body-copy">
            Have an opportunity, a question, or an interesting idea? I&apos;d like to hear from you.
          </p>
        </div>
        <div className="contact-layout">
          <aside className="contact-details">
            <p className="contact-overline">Contact details</p>
            <h3>{profile.name}</h3>
            <p className="contact-detail-subtitle">{profile.role}</p>
            <div className="contact-detail-list">
              <ContactDetail
                icon={Mail}
                label="Email"
                value={profile.email || 'Add your professional email'}
                href={profile.email ? `mailto:${profile.email}` : undefined}
              />
              <ContactDetail
                icon={Phone}
                label="Phone"
                value={profile.phone || 'Add your phone number'}
                href={profile.phone ? `tel:${profile.phone}` : undefined}
              />
            </div>
            <div className="contact-social-links">
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
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                onChange={() => setErrors((current) => ({ ...current, name: '' }))}
              />
              {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                onChange={() => setErrors((current) => ({ ...current, email: '' }))}
              />
              {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                onChange={() => setErrors((current) => ({ ...current, subject: '' }))}
              />
              {errors.subject && <span className="field-error" id="contact-subject-error">{errors.subject}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                onChange={() => setErrors((current) => ({ ...current, message: '' }))}
              />
              {errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}
            </div>
            {status.message && (
              <p className={`form-status ${status.type}`} role="status" aria-live="polite">
                {status.message}
                {status.href && <a href={status.href}>Open email draft</a>}
              </p>
            )}
            <button className="button button-primary send-button" type="submit" disabled={isSending}>
              {isSending ? 'Sending…' : 'Send Message'}
              <Send size={16} aria-hidden="true" />
            </button>
            {!formspreeEndpoint && (
              <p className="form-configuration-note">
                Formspree isn&apos;t configured yet; submitting opens an email draft instead.
              </p>
            )}
          </form>
        </div>
        <a className="contact-github-link" href={profile.github} target="_blank" rel="noreferrer">
          GitHub profile <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function ContactDetail({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="contact-detail-icon"><Icon size={17} aria-hidden="true" /></span>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </>
  )

  return href ? (
    <a className="contact-detail" href={href}>{content}</a>
  ) : (
    <div className="contact-detail">{content}</div>
  )
}

export default Contact
