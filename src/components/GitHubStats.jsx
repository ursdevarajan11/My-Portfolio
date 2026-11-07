import { useEffect, useState } from 'react'
import { ArrowUpRight, GitBranch, Star, Users } from 'lucide-react'
import { profile } from '../data/site.js'
import '../styles/GitHubStats.css'
import SocialIcon from './SocialIcon.jsx'

const githubApi = 'https://api.github.com'

function GitHubStats() {
  const [githubData, setGithubData] = useState({
    status: 'loading',
    metrics: null,
  })
  const [calendarError, setCalendarError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const headers = { Accept: 'application/vnd.github+json' }

    Promise.all([
      fetch(`${githubApi}/users/ursdevarajan11`, {
        headers,
        signal: controller.signal,
      }),
      fetch(`${githubApi}/users/ursdevarajan11/repos?per_page=100`, {
        headers,
        signal: controller.signal,
      }),
    ])
      .then(async ([profileResponse, reposResponse]) => {
        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub metrics are temporarily unavailable.')
        }

        const [githubProfile, repositories] = await Promise.all([
          profileResponse.json(),
          reposResponse.json(),
        ])
        const languageCounts = repositories.reduce((counts, repository) => {
          if (repository.language) {
            counts[repository.language] = (counts[repository.language] || 0) + 1
          }
          return counts
        }, {})
        const languages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .slice(0, 6)

        setGithubData({
          status: 'success',
          metrics: {
            repositories: githubProfile.public_repos,
            followers: githubProfile.followers,
            stars: repositories.reduce(
              (total, repository) => total + repository.stargazers_count,
              0,
            ),
            languages,
          },
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setGithubData({ status: 'error', metrics: null })
        }
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="section-pad section-surface" id="github">
      <div className="container">
        <div className="github-heading">
          <div className="section-heading">
            <p className="eyebrow">05 — GitHub performance</p>
            <h2>Consistent learning, in public.</h2>
            <p className="body-copy">
              A live snapshot of my public repositories and the languages used in them.
            </p>
          </div>
          <a
            className="button button-outline"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon name="github" size={17} />
            Visit GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="github-image-grid">
          <article className="github-image-card">
            <h3>GitHub Stats</h3>
            {githubData.status === 'success' ? (
              <div className="github-metrics">
                <Metric icon={GitBranch} label="Public repositories" value={githubData.metrics.repositories} />
                <Metric icon={Star} label="Stars earned" value={githubData.metrics.stars} />
                <Metric icon={Users} label="Followers" value={githubData.metrics.followers} />
              </div>
            ) : (
              <GitHubStatus status={githubData.status} />
            )}
          </article>
          <article className="github-image-card">
            <h3>Top Languages</h3>
            {githubData.status === 'success' ? (
              <div className="github-languages" aria-label="Languages used in public repositories">
                {githubData.metrics.languages.length ? (
                  githubData.metrics.languages.map(([language, count]) => (
                    <div className="github-language" key={language}>
                      <div className="github-language-heading">
                        <span>{language}</span>
                        <span>{count} {count === 1 ? 'repository' : 'repositories'}</span>
                      </div>
                      <div
                        className="github-language-track"
                        role="meter"
                        aria-label={`${language} repositories`}
                        aria-valuemin="0"
                        aria-valuemax={githubData.metrics.repositories}
                        aria-valuenow={count}
                      >
                        <span
                          style={{
                            width: `${(count / githubData.metrics.repositories) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="github-status-message">No public repository languages are available yet.</p>
                )}
              </div>
            ) : (
              <GitHubStatus status={githubData.status} />
            )}
            <p className="github-language-note">
              Ranked by each public repository&apos;s primary language.
            </p>
          </article>
        </div>
        <article className="github-calendar-card">
          <h3>Contribution calendar</h3>
          {calendarError ? (
            <p className="github-status-message" role="status">
              Contribution calendar is temporarily unavailable. Visit GitHub to view recent activity.
            </p>
          ) : (
            <img
              className="github-calendar-image"
              src="https://ghchart.rshah.org/35e0d0/ursdevarajan11"
              alt="GitHub contribution calendar for ursdevarajan11"
              loading="lazy"
              onError={() => setCalendarError(true)}
            />
          )}
        </article>
      </div>
    </section>
  )
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="github-metric">
      <span className="github-metric-icon"><Icon size={17} aria-hidden="true" /></span>
      <span className="github-metric-label">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function GitHubStatus({ status }) {
  return (
    <p className="github-status-message" role="status" aria-live="polite">
      {status === 'loading'
        ? 'Loading live GitHub metrics…'
        : 'Live GitHub metrics are temporarily unavailable. Visit the profile for current activity.'}
    </p>
  )
}

export default GitHubStats
