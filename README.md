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
- Add the resume PDF at `public/assets/DEVA.pdf`.
- The provided resume PDF is served from `public/assets/DEVA.pdf`.
- Update email, phone, and LinkedIn details in `src/data/site.js` when needed.
- Add verified GitHub and demo URLs to each project in `src/data/projects.js`.
- Confirm the Theft Alert System technology stack in `src/data/projects.js`.

The project-link controls remain disabled until a URL is supplied. The portrait
and resume controls show helpful fallbacks when their files are missing.

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
