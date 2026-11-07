import { skills } from '../data/skills.js'
import '../styles/Skills.css'

function Skills() {
  return (
    <section className="section-pad section-surface" id="skills">
      <div className="container">
        <div className="section-heading skills-heading">
          <p className="eyebrow">03 — Skills & tools</p>
          <h2>The tools behind the work.</h2>
          <p className="body-copy">
            A growing toolkit across frontend, backend, data, and development workflows.
          </p>
        </div>
        <div className="skill-groups">
          {skills.map(({ category, items }) => (
            <article className="skill-group" key={category}>
              <h3>{category}</h3>
              <div className="skill-list">
                {items.map(({ name, icon, variant = 'original' }) => (
                  <div className="skill-chip" key={name}>
                    <span className="skill-logo" aria-hidden="true">
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-${variant}.svg`}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.hidden = true
                        }}
                      />
                    </span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
