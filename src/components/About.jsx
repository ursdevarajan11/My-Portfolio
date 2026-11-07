import { BriefcaseBusiness, Code2, Lightbulb } from 'lucide-react'
import '../styles/About.css'

function About() {
  return (
    <section className="section-pad section-surface" id="about">
      <div className="container about-layout">
        <div className="section-heading">
          <p className="eyebrow">01 — About me</p>
          <h2>Building useful things for the web.</h2>
        </div>
        <div className="about-content">
          <p className="about-lead">
            I&apos;m Devaraja, a Computer Science and Engineering graduate
            and aspiring Full Stack Developer.
          </p>
          <p className="body-copy">
            I enjoy building responsive web applications, solving problems,
            and learning modern technologies. During my Full Stack Web
            Development internship at Prinston Smart Engineers, I developed a
            Perfume Shop Website and strengthened my end-to-end development
            skills.
          </p>
          <div className="about-highlights">
            <article className="about-highlight">
              <Code2 size={20} aria-hidden="true" />
              <h3>Full stack mindset</h3>
              <p>From thoughtful interfaces to reliable application logic.</p>
            </article>
            <article className="about-highlight">
              <Lightbulb size={20} aria-hidden="true" />
              <h3>Always learning</h3>
              <p>Exploring full stack development, AI, and Generative AI.</p>
            </article>
            <article className="about-highlight">
              <BriefcaseBusiness size={20} aria-hidden="true" />
              <h3>Industry experience</h3>
              <p>Full Stack Web Development internship at Prinston Smart Engineers.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
