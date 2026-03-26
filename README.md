# 🎓 EduPlatform LearnStack - Scrum Project (3 Weeks)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/AE0125/LearnStack?utm_source=oss&utm_medium=github&utm_campaign=AE0125%2FLearnStack&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
Eine moderne Lernplattform für Schüler, Dozenten und Admins.

## 🚀 Quick Start
1. **Repository klonen:** `git clone ...`
2. **Environment:** `cp .env.example .env.local`
3. **Docker starten:** `docker-compose up -d` (Startet Postgres & Keycloak)
4. **Abhängigkeiten:** `bun install`
5. **Entwicklung:** `bun run dev`

## 🛠 Tech Stack
- **Frontend/Backend:** Next.js 
- **Auth:** Auth & Authentik (inkl. 2FA)
- **Styling:** TailwindCSS
- **DB:** PostgreSQL


## 📂 Repo-Struktur (Vorschlag)
```
├── .github/workflows/  # CI/CD (Optional)
├── docker-compose.yml  # PostgreSQL & Keycloak Setup
├── prisma/             # Datenbank-Schema (empfohlen für Postgres + Next.js)
├── public/             # Statische Assets (Icons, Fonts)
├── src/
│   ├── app/            # Next.js App Router (Pages & API Routes)
│   ├── components/     # Wiederverwendbare UI-Komponenten (Atoms, Molecules)
│   ├── hooks/          # Custom React Hooks
│   ├── lib/            # Shared Logic (Auth-Config, DB-Client)
│   ├── services/       # Business Logic (z.B. Dateiverwaltung)
│   └── types/          # TypeScript Definitionen
├── README.md
└── tailwind.config.js
```

Namenskonventionen: 
Präfix | Beschreibung | Beispiel
-- | -- | --
feat/ | Neue Funktionen oder Erweiterungen | feat/issue-ID-titel
fix/ | Fehlerbehebungen (Bugfixes) | fix/issue-ID-titel
docs/ | Dokumentationsänderungen | docs/update-readme
refactor/ | Code-Optimierung ohne neue Funktionen | refactor/cleanup-api

## 📅 Projekt-Plan
- **Woche 1:** Setup & Auth (Epic 1)
- **Woche 2:** Kurse & Permissions (Epic 2 & 4)
- **Woche 3:** Kalender & Polishing (Epic 3)


Goto directory docker/
```bash
cd docker
docker compose up -d
```

Im browser http://localhost:9000/if/flow/initial-setup/
Application erstellen
clientid und secret in die .env übertragen

Redirect URL
http://localhost:3000/api/auth/callback/authentik