# Devaraja — Developer Portfolio

A responsive React + Vite portfolio with reusable components and a refined
editorial theme featuring warm ivory, forest green, and terracotta accents.

## Local development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`. Netlify uses `npm run build` and
`dist` as its publish directory; `netlify.toml` includes the SPA fallback.

## Personal assets and links

- Add the professional portrait at `public/images/profile.jpg`.
- The resume PDF is served from `public/assets/Devaraja-Rajan-Resume.pdf`.
- Update email, phone, and LinkedIn details in `src/data/site.js` when needed.
- Portfolio live and source links are managed in `src/data/site.js`.
- Featured project links, descriptions, and technology stacks are managed in `src/data/projects.js`.

Project links open in a new tab. The portrait and resume controls show helpful
fallbacks when their files are missing.

## Contact form

Create a Formspree form, then set `VITE_FORMSPREE_ENDPOINT` to its endpoint in
your local `.env` file and in Netlify's environment variables. Do not commit
`.env` or private credentials. If no endpoint is configured, the form validates
the fields and offers a prefilled `mailto:` draft instead; this does not claim
the message was sent.

## Netlify

Connect the repository to Netlify and use:

- Build command: `npm run build`
- Publish directory: `dist`

The included `netlify.toml` redirects unmatched routes to `index.html`.
## 🌐 Live Portfolio

🚀 **Explore the live portfolio:** [Devaraja Rajan — Developer Portfolio](https://devaraja-rajan-portfolio.netlify.app)

💻 **GitHub Repository:** [View Source Code](https://github.com/ursdevarajan11/My-Portfolio.git)

The portfolio showcases my technical skills, featured projects, professional background, and contact information.

### Tech Stack
- React.js
- Vite
- JavaScript
- CSS
- Netlify

### Features
- Responsive design
- Interactive project showcase
- Resume download
- Contact form
- Modern editorial theme


