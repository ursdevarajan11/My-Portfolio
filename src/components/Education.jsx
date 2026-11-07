import { BookOpen, BriefcaseBusiness, GraduationCap, School } from 'lucide-react'
import '../styles/Education.css'

const education = [
  {
    year: '2026',
    title: 'Full Stack Development Training',
    institution: 'NxtWave, Hyderabad',
    icon: BookOpen,
    current: true,
  },
  {
    year: '2022–2026',
    title: 'B.E. Computer Science and Engineering',
    institution: 'Coorg Institute of Technology',
    icon: GraduationCap,
  },
  {
    year: '2020–2022',
    title: 'Pre-University Course (PUC)',
    institution: 'Alva’s PU College',
    icon: School,
  },
  {
    year: '2020',
    title: 'SSLC',
    institution: 'Adarsha Vidyalaya School',
    icon: School,
  },
]

function Education() {
  return (
    <section className="section-pad" id="education">
      <div className="container education-layout">
        <div className="section-heading education-heading">
          <p className="eyebrow">02 — Education & experience</p>
          <h2>Learning, building, growing.</h2>
          <p className="body-copy">
            A foundation in computer science, complemented by hands-on training
            and industry experience.
          </p>
          <article className="internship-card">
            <span className="internship-icon"><BriefcaseBusiness size={19} aria-hidden="true" /></span>
            <div>
              <p className="card-kicker">Internship experience</p>
              <h3>Full Stack Web Development Intern</h3>
              <p>Prinston Smart Engineers</p>
            </div>
          </article>
        </div>
        <div className="education-timeline" aria-label="Education timeline">
          {education.map(({ year, title, institution, icon: Icon, current }) => (
            <article
              className={`timeline-item${current ? ' is-current' : ''}`}
              key={title}
            >
              <span className="timeline-marker"><Icon size={17} aria-hidden="true" /></span>
              <div className="timeline-card">
                <span className="timeline-year">{year}</span>
                <h3>{title}</h3>
                <p>{institution}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
