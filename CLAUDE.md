# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ADA Women 3.0 is a job-matching platform for women in tech. It's a full-stack app with a Django REST Framework backend and a React frontend, bundled with Webpack.

## Development Commands

Run both servers simultaneously in separate terminals:

```bash
# Terminal 1 — Django API (port 4000)
npm run serve:backend

# Terminal 2 — React dev server (port 8000, proxies /api to port 4000)
npm run serve:frontend
```

Other commands:
```bash
npm run build       # Production Webpack bundle → frontend/dist/bundle.js
npm run seed        # Load fixture data: python manage.py loaddata ada/fixtures.json
```

Python environment is managed via Pipfile (Python 3.7). Use `pipenv shell` to activate.

## Architecture

### Backend (Django)
- **`ada/`** — Core app: models (`Applicant`, `Company`, `Offer`), serializers, and views
- **`jwt_auth/`** — Custom JWT auth: `RegisterView`, `LoginView`, and `JWTAuthentication` class
- **`project/settings.py`** — Django config; uses PostgreSQL in production, SQLite locally

**API pattern:** RESTful endpoints at `/api/*`. CSRF is disabled (API-only backend). Auth uses `Authorization: Bearer <token>` header checked by `JWTAuthentication` in `jwt_auth/authentication.py`.

**Models:**
- `Applicant` — OneToOne with User; stores roles (Frontend, Backend, etc.) and skills as comma-separated or array fields
- `Company` — OneToOne with User; stores industry, employee counts, women achievement data
- `Offer` — ForeignKey to Company; ManyToMany to Applicant via `applications_received`

### Frontend (React)
- **Entry point:** `frontend/src/app.js` — HashRouter with all routes
- **`frontend/src/components/pages/`** — Full-page views (`OfferIndex`, `CompanyIndex`, `UserIndex`, `About`, `Home`)
- **`frontend/src/components/auth/`** — `Login`, `Register`, `UserRegister`, `CompanyRegister`
- **`frontend/src/components/cards/`** — `User`, `Company`, `Offer` card components
- **`frontend/src/lib/Auth.js`** — Auth helpers: stores JWT + userId in localStorage; `Auth.isAuthenticated()` checks token expiry

**Styling:** Bulma CSS framework + SCSS. Global styles in `frontend/src/style.scss`.

**Key libraries:** axios (HTTP), react-select, react-modal, react-toastify, filestack-react (file upload), mapbox-gl.

### Webpack Proxy
The dev server (port 8000) proxies all `/api` requests to `http://localhost:4000`, so the frontend always calls `/api/...` without worrying about CORS in development.

## Key Patterns

- Index pages (`OfferIndex`, `CompanyIndex`, `UserIndex`) use a side-by-side list/detail layout — selecting an item from the list shows its detail panel on the right without navigating away
- Registration flow: `Register.js` lets the user choose applicant or company type, then routes to the appropriate registration form
- Owner-only mutations: PUT/DELETE endpoints check that the requesting user owns the resource before allowing changes
