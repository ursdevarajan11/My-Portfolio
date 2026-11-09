import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/site.js'
import '../styles/Navbar.css'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id)
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={closeMenu}>
          {profile.brand}
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
        <div
          className={`nav-content${isOpen ? ' is-open' : ''}`}
          id="primary-navigation"
        >
          <div className="nav-links">
            {links.map(({ href, label }) => (
              <a
                key={href}
                className={activeSection === href.slice(1) ? 'is-active' : ''}
                href={href}
                aria-current={activeSection === href.slice(1) ? 'location' : undefined}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-resume"
              href="#contact"
              onClick={closeMenu}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
