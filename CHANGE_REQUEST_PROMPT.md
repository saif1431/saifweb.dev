# Combined implementation prompt

I have a React/Vite developer portfolio built with GSAP. Update my existing codebase while preserving its project data, images, contact details, accessibility, and responsive design.

1. Fix project scroll behavior. As I scroll down or back up, project images and entire project cards must remain visible. Animate their position, scale, depth, and decorative elements on entry, but do not use opacity, `visibility: hidden`, `autoAlpha: 0`, or filter transitions that make project imagery disappear during scrolling. Respect `prefers-reduced-motion`. Verify card visibility while scrolling in both directions on desktop and mobile.

2. Keep only four selected projects on the home page: Stock Analyzer, PakJobLive, Graph & Charts Dashboard, and The Huddle. Use the established large, animated project-card design and a prominent “Explore All Projects” button. Move the complete project collection to a dedicated `/work` route. Make the route load correctly after a direct browser refresh on Vercel.

3. Make the `/work` page feel like a fully designed editorial portfolio page, with a strong animated hero, clear type, polished navigation, project image stages, responsive layout, and an ending contact call to action. Group all 16 projects by field: AI & ML, Full Stack, Web Experiences, Dashboards, and Concept Studies. Keep the twelve real projects and four labeled concepts; use the existing project screenshots or video-derived posters, and keep the same detail-dialog interaction. Add field and technology filters with accurate counts and an empty state. Include accessible keyboard controls and working return navigation.

Deliver the complete updated source as a clean ZIP without `node_modules`, `dist`, or `.git`. Run the build and lint commands and check the key interactions, project visibility during scroll, direct `/work` loading, and desktop/mobile overflow. Do not push or deploy the changes without my approval.
