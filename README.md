# Saif portfolio

This ZIP contains the React/Vite portfolio. The home page shows four selected real projects with an **Explore All Projects** link. The full `/work` page shows 16 projects grouped into AI & ML, Full Stack, Web Experiences, Dashboards, and Concept Studies. Both pages use animated visual stages and clickable project detail dialogs.

## Run locally

```sh
npm ci
npm run dev
npm run lint
npm run build
```

Deploy through your usual GitHub → Vercel workflow after reviewing the changes. `vercel.json` rewrites `/work` to the React app so its URL also works when opened or refreshed directly. The ZIP contains source files and assets; it excludes `node_modules`, generated `dist`, and `.git`.

## Edit the portfolio

- `src/App.jsx`: home hero, four featured projects, about, experience and contact.
- `src/ProjectsPage.jsx`: grouped full project page, field and technology filters, modal details.
- `src/content/projects.js`: the twelve existing real projects, descriptions, tech stacks, screenshots, and demo links.
- `src/content/concepts.js` and `src/components/portfolio/ConceptProjects.jsx`: four visual concept studies from the original design.
- `src/components/portfolio/ProjectCard.jsx` and `src/portfolio.css`: designed screenshot stages, responsiveness and interaction styles. Project cards animate position/scale on scroll and remain fully visible.
- `public/projects/*.webp`: original screenshots and three `*-poster.webp` stills extracted from supplied videos. The LangChain chatbot has no image or video in the original ZIP, so its card uses editable CSS artwork.
- `public/portfolioImg3.png`: hero portrait. Change its path and alt text in `src/App.jsx` if replaced.
- `src/content/site.js`: email and social links. The contact form uses the existing FormSubmit AJAX endpoint, which must be configured for that email.

The additional `CHANGE_REQUEST_PROMPT.md` states the complete redesign request in one reusable prompt.
