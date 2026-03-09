# Ngā Piki me Ngā Heke

> *The Rises and the Falls* — an art and wellbeing research programme

A React single-page application with two views:

| Route | Description |
|-------|-------------|
| `/` | Participant brochure site + portal (wellbeing check-in, journal, artwork upload) |
| `/admin` | Researcher dashboard (overview, participant profiles, scores, reflections, gallery) |

---

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Install & run

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd nga-piki-me-nga-heke

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

- Participant site → `http://localhost:5173/`
- Admin dashboard → `http://localhost:5173/admin`

---

## Build for production

```bash
npm run build
```

Output goes to `dist/`. You can preview the production build with:

```bash
npm run preview
```

---

## Project structure

```
nga-piki-me-nga-heke/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json
├── .gitignore
└── src/
    ├── main.jsx            # App entry — React Router setup
    ├── index.css           # Global CSS reset
    ├── ParticipantApp.jsx  # Brochure site + participant portal
    └── AdminApp.jsx        # Researcher admin dashboard
```

---

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Recharts](https://recharts.org/) — charts in the admin dashboard

---

## Notes

- The admin dashboard currently uses **mock seed data** — no backend is connected.
- Participant portal submissions are held in React state only (not persisted between sessions).
- When ready to connect a backend, the natural next step is a Node/Express API with Google Drive integration for artwork storage.

---

*© 2026 Ngā Piki me Ngā Heke. Research prototype.*
