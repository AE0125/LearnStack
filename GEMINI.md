# Gemini KI Assistenz-Richtlinien (GEMINI.md)

Diese Datei enthält Richtlinien, Vorgaben und Best Practices für KI-Assistenten (wie Gemini/Antigravity), die an diesem Projekt arbeiten. Alle durch die KI generierten Codes, Analysen und Vorschläge müssen sich strikt an diese Regeln halten.

## 1. Projektkontext und Ziel
- **Projekt:** LearnStack 
- **Zweck:** Webanwendung für ein Lern-Dashboard.
- **Zielgruppe:** Studierende (Ansicht von Ressourcen) und Tutoren (Verwaltung von Ressourcen).

## 2. Technologie-Stack
- **Framework:** Next.js 16.1.6 (App Router, Server Components primär)
- **Sprache:** TypeScript (strikt)
- **Styling:** CSS / TailwindCSS (entsprechend Projekt-Setup) / Shadcn UI Preset-Code: aKZ48Iy
- **Paketmanager:** Bun
- **Database:** PostgreSQL mit Prisma ORM.
- **Auth:** Authentik (Identity Provider) integriert über NextAuth.js.
- **Validation:** Zod (für Schema-Validierung von Formularen und API-Inputs).
- **Testing:** Playwright (E2E-Tests).
- **Infrastruktur / Deployment:** Docker & Docker Compose
- **Linting & Formatierung:** ESLint & Prettier

## 3. Architektur & Dateistruktur
- **App Router (`app/`):** Konsequente Nutzung des App Routers. Trennung zwischen Server Components (Standard) und Client Components (`"use client"` nur wenn nötig, z.B. bei Hooks oder Event-Listenern).
- **`components/`:** Kapselung aller wiederverwendbaren UI-Elemente.
- **`lib/`**: Hilfsfunktionen, API-Clients und Datenbank-Verbindungen.
- **`hooks/`:** Selbst geschriebene React-Hooks für komplexe Logik.
- **`docker/`:** Beinhaltet Container-Konfigurationen und Scripts für lokale Entwicklung und Deployment.
- **`prisma/`:** Beinhaltet Prisma Schema und Migrationen.
- **`middleware.ts`:** Beinhaltet Middleware für Routen-Sperren.
- **`services/`:** Beinhaltet Services für die CRUD Operationen auf den Datenbanktabellen.


## 4. Coding-Richtlinien (Best Practices)
- **Dateibenennung:** Nutze `kebab-case` für reguläre Dateien (z.B. `user-profile.ts`); bewahre Next.js Konventionen (`page.tsx`, `layout.tsx`). React-Komponenten werden in `PascalCase` importiert.
- **TypeScript:** Verzicht auf `any`. Alle Props, API-Responses und States müssen sauber typisiert oder mit Interfaces versehen sein. Nutze unknown oder spezifische Interfaces. Nutze type für Props und interface für Datenmodelle.
- **Sprache:** Quellcode (Variablen, Funktionen, Kommentare, Commits) wird auf **Englisch** verfasst. **Deutsch** ist ausschließlich für Endbenutzer-Anzeigetexte im Frontend erlaubt.
- **Fehlerbehandlung:** Implementiere Try-Catch-Blöcke bei asynchronen Operationen. Nutze serverseitiges Error Handling (z.B. `error.tsx` in Next.js).
- **Sicherheit:** Schreibe keine Secrets plain in den Code; nutze `.env` Variablen. Achte auf Input-Validierung bei Server Actions und API-Routen.
- **RBAC (Role Based Access Control):** Gehe immer davon aus, dass ein User versucht, auf Ressourcen zuzugreifen, die ihm nicht gehören. Baue proaktiv "Ownership-Checks" ein (z.B. where: { id: courseId, ownerId: userId }).
- **Server Actions:** Nutze Server Actions für mutations (POST, PUT, DELETE) und komplexe Server-seitige Logik. Vermeide unnötige Client Components.
- **Permission-Layer:** Prüfe Berechtigungen immer auf Datenebene (Server-Side).
    Nutze die middleware.ts für grobe Routen-Sperren.
    Nutze Prisma-Middleware oder Service-Methoden für granulare "Kurs A vs. Kurs B" Zugriffskontrolle.
- **Data Fetching:** Bevorzuge Server Components für das Abrufen von Daten. Nutze kein useEffect für initiales Data Fetching, sofern nicht unvermeidbar.
- **TailwindCSS:** Verwende die Standard-Reihenfolge der Klassen (Prettier-Plugin-Sortierung). Nutze cn() Utility (clsx + tailwind-merge) für bedingte Klassen.
- **Mobile-First:** Berücksichtige mobile Ansichten bei der Entwicklung von UI-Komponenten.
- **Commits:** Verfasse Commit-Messages nach dem Conventional Commits Standard (z.B. feat(auth): add keycloak provider).
- **Dateien:** Eine Komponente pro Datei. Große Komponenten müssen in kleinere "Sub-Komponenten" im gleichen Ordner aufgeteilt werden.



## 5. Workflow-Regeln für die KI
- **Kontext prüfen:** Lies immer zuerst eingebundene Dateien wie `.env.example`, `package.json` oder relevante Komponenten, bevor du Änderungen durchführst.
- **Minimalinvasive Änderungen:** Modifiziere nur den betroffenen Bereich einer Datei (`replace_file_content` oder `multi_replace_file_content` nutzen), anstatt gesamte Dateien umzuschreiben, wenn nicht nötig.
- **Vollständiger Code:** Keine Platzhalter wie `// logic here` – liefere stets vollständigen und lauffähigen Code.
- **Formatierung:** Behalte den existierenden Code-Stil (Prettier/ESLint) bei.
- **Proaktivität:** Wenn eine angefragte Änderung den CI/CD Pipeline Build (GitHub Actions) beeinträchtigen könnte, warne den Nutzer und schlage Tests vor.
- **Planung vor Code:** Bevor du komplexen Code schreibst, erstelle eine kurze Schritt-für-Schritt-Liste (Pseudo-Code), wie du das Problem lösen willst.
- **Refactoring:** Wenn du siehst, dass bestehender Code gegen diese Richtlinien verstößt, schlage eine Korrektur vor, bevor du darauf aufbaust.
- **Dokumentation:** Kommentiere nur "das Warum", nicht "das Was". Der Code selbst sollte durch sprechende Namen (Clean Code) selbsterklärend sein.
- **Tests:** Generiere bei neuen Features automatisch einen passenden Playwright-Test-Entwurf (E2E).