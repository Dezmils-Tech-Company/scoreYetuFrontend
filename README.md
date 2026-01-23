# Regional High School Games — Digital Ecosystem

A community-powered, mobile-first platform that turns fragmented, under-documented school sports in Siaya County & Kisumu City into a visible, celebrated and economically sustainable talent pipeline.

This repository contains the frontend (Vite + React PWA) and backend (MERN — Node/Express + MongoDB) starter code, design notes and operational guidance to run a pilot for school sports coverage, contributor submissions, athlete profiles, results publishing and sponsor integrations.

---

## Table of contents

- [Vision](#vision)  
- [Project summary](#project-summary)  
- [Tech stack](#tech-stack)  
- [Repository layout](#repository-layout)  
- [Getting started (local dev)](#getting-started-local-dev)  
  - [Prerequisites](#prerequisites)  
  - [Frontend (Vite + React) quick start](#frontend-vite--react-quick-start)  
  - [Backend (Express + MongoDB) quick start](#backend-express--mongodb-quick-start)  
- [Environment variables (.env example)](#environment-variables-env-example)  
- [Data model (high level)](#data-model-high-level)  
- [API surface (examples)](#api-surface-examples)  
- [Recommended deployment & infra](#recommended-deployment--infra)  
- [Privacy & minors — important notes](#privacy--minors---important-notes)  
- [Contributing](#contributing)  
- [Contact](#contact)  
- [License](#license)

---

## Vision

Make local scholastic sport visible and durable: capture match results, athlete journeys, photos, and community stories; enable scouts, sponsors and diaspora to find and support talent; and create a long-term digital legacy for schools and athletes.

---

## Project summary

Core functionality:
- Public browse/search for schools, teams, athletes and event results.
- School & athlete pages (digital trophy case).
- Contributor submission flow: match report + photos (PWA + offline queue).
- Admin moderation queue (approve / reject / edit).
- Structured results ingestion for scouting & statistics.
- Guardian consent capture & takedown workflow for minors.
- Sponsor integration and simple payments (MPesa).

Design principles:
- Mobile-first, low-bandwidth friendly (image resizing, sparse payloads).
- Offline-tolerant contributor flow (PWA).
- Community-driven coverage with lightweight verification.

---

## Tech stack

Frontend
- Vite + React
- Tailwind CSS
- React Query (or SWR) for data fetching/caching
- vite-plugin-pwa or Workbox for PWA/offline queue
- Swiper (client-only) for carousels

Backend
- Node.js + Express
- MongoDB (Atlas) + Mongoose
- Redis (optional) for queues & caching
- Multer / direct signed uploads (S3 / Cloudinary)
- BullMQ or Bee-Queue for background jobs

Search & Media
- Meilisearch for fast search
- Cloudinary or S3 + CDN + on-the-fly resizing

Notifications & Payments
- Twilio / local SMS provider for OTP
- MPesa (Daraja) for payment integration
- SendGrid / Mailgun for email

Hosting & infra
- Frontend: Vercel / Netlify / Cloudflare Pages
- Backend: Render / Fly / DigitalOcean / Docker
- DB: MongoDB Atlas
- Storage: S3 or Cloudinary
- CDN: Cloudflare

---

## Repository layout

(This is a recommended single-repo layout. Adjust if you use mono-repos or separate repos.)

- /frontend — Vite + React app (PWA)
  - /src
    - /components
    - /pages
    - /services (api clients)
    - /hooks
    - /styles
- /backend — Express API
  - /src
    - /models (Mongoose schemas)
    - /controllers
    - /routes
    - /jobs (queue processors)
    - /services (uploads, payments, sms)
    - app.js / server.js
- /ops — docker-compose, infra scripts, environment templates
- README.md (this file)

---

## Getting started (local dev)

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB Atlas (or local MongoDB)
- (Optional) Redis for job queues
- (Optional) Cloudinary or S3 account for media

### Frontend (Vite + React) quick start
1. Change to frontend folder and install:
   ```bash
   cd frontend
   npm install
   ```
2. Create a local env file (see [Env example](#environment-variables-env-example)).
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

Key scripts (frontend package.json):
- dev: start Vite dev server
- build: build production assets
- preview: serve production build locally
- lint / format (if configured)

### Backend (Express + MongoDB) quick start
1. Change to backend folder and install:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` (see example below).
3. Start development server:
   ```bash
   npm run dev
   ```
   (dev should use nodemon or ts-node-dev)
4. Production:
   ```bash
   npm run start
   ```

Key scripts (backend package.json):
- dev: start server with nodemon
- start: run node server.js
- migrate / seed: optional DB scripts

---

## Environment variables (.env example)

Example variables used by both apps (populate with your values):

Frontend (.env.local)
```
VITE_API_URL=http://localhost:4000
VITE_MEILISEARCH_HOST=http://127.0.0.1:7700
VITE_MEILISEARCH_KEY=public-key
VITE_APP_NAME="Regional High School Games"
```

Backend (.env)
```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/regional-games?retryWrites=true&w=majority
JWT_SECRET=replace-with-secure-random
S3_BUCKET=...
S3_KEY=...
S3_SECRET=...
CLOUDINARY_URL=...
TWILIO_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM=+2547xxxxxxx
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=masterKey
REDIS_URL=redis://localhost:6379
```

Security note: Never commit secrets to Git. Use CI/CD secrets management or environment variables in your hosting provider.

---

## Data model (high level)

Main collections (MongoDB):
- users: { _id, name, email, phone, role, schoolId, verified, createdAt }
- schools: { _id, name, county, city, contact, logoUrl, verified }
- teams: { _id, schoolId, name, ageGroup, gender }
- athletes: { _id, name, dob, schoolId, teamId, position, bio, photos[] }
- guardians: { _id, name, phone, email, relationship, consent: {status, date} }
- events: { _id, name, type, startAt, endAt, venue, organiserId }
- fixtures: { _id, eventId, teamA, teamB, scheduledAt, status, resultId }
- results: { _id, fixtureId, scoreA, scoreB, stats: {}, recordedBy, verifiedBy, verifiedAt }
- media: { _id, ownerType, ownerId, url, caption, photographer, consentFlag }
- contributions: { _id, type, payload, status, submittedBy, reviewedBy }

Keep schemas simple and optimize read patterns for public feeds (denormalize small summary fields where latency matters).

---

## API surface (examples)

Public & authenticated endpoints (examples):

Authentication
- POST /api/auth/otp/request — request OTP for phone login
- POST /api/auth/otp/verify — verify OTP and return JWT

Users / Profiles
- GET /api/users/:id
- PATCH /api/users/:id

Schools & Teams
- GET /api/schools
- GET /api/schools/:id
- POST /api/schools/:id/teams (auth: school-rep)

Events & Fixtures
- POST /api/events
- GET /api/events/:id
- POST /api/events/:id/fixtures
- GET /api/fixtures/:id

Results
- POST /api/fixtures/:id/result — structured result submission
- GET /api/results/:id

Contributions & Media
- POST /api/contributions — submit match report + metadata
- POST /api/uploads/sign — sign upload (S3/Cloudinary) or receive direct upload callback
- GET /api/moderation/pending
- POST /api/moderation/:id/approve
- POST /api/moderation/:id/reject

Search
- GET /api/search?q=... (facade to Meilisearch)

Admin
- GET /api/admin/stats
- POST /api/admin/seed (dev only)

Document an OpenAPI spec early and keep it in the repo to help frontend/backend teams.

---

## Recommended deployment & infra

- Frontend: Vercel / Netlify — deploy Vite build as static site, enable PWA headers.
- Backend: Docker container on Render / Fly / DigitalOcean; autoscale workers separately for jobs.
- Database: MongoDB Atlas (use project IP allowlist & backups).
- Storage: Cloudinary (recommended) or S3 + Lambda for image resizing.
- Search: Meilisearch (managed or small VPS).
- Redis: Managed Redis for job queue and rate-limiting.
- CDN: Cloudflare in front of storage for caching & image resizing.
- CI/CD: Run lint, tests, build and deploy steps in GitHub Actions / GitLab CI.

---

## Privacy & minors — important notes

This platform will process data about minors. Make sure to:
- Capture explicit guardian consent for any personally identifiable data or media for participants under 18.
- Store consent records (who consented, when, what was consented to).
- Default to NOT publishing identifiable photos/videos of minors unless consent exists.
- Provide an easy takedown request route with admin SLA (e.g., 48 hours response).
- Minimize data collection: collect only necessary fields.
- Use TLS at all times and protect service-role keys & DB credentials.
- Consult local counsel for compliance with Kenyan data protection law and regulations.

---

## Contributing

We welcome contributors.
- Open an issue for features or bugs.
- Fork the repo, create a feature branch, and submit a PR to `develop`.
- Follow code style (Prettier + ESLint + Tailwind conventions).
- Add tests for business logic where applicable.
- For major changes (auth, data model), discuss on an issue first.

Suggested first tasks for contributors:
- Implement contributor match-report form (frontend + API).
- Implement media upload flow (signed upload + webhook).
- Add guardian consent capture & display.
- Build admin moderation UI (approve/reject pipeline).

---

## Contact

Maintainer / Project lead: Dezmils-Tech-Company  
Support: support@dezmilstech-company.com

---

## License

This project is provided under the MIT License. See LICENSE file for details.
#   s c o r e Y e t u F r o n t e n d  
 #   s c o r e Y e t u F r o n t e n d  
 