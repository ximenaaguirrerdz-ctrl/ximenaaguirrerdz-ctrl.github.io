# Ximena Aguirre — portfolio

> Ten years later, I work across Communications, Product Marketing and Field Marketing for complex B2B technology and fintech.

An editorial, evidence-led portfolio for a Madrid-based Senior Communications & Marketing Manager working across corporate and internal communications, PR, Product Marketing, GTM, Field Marketing, CRM, measurement and applied AI.

**Live site:** [ximenaaguirrerdz-ctrl.github.io](https://ximenaaguirrerdz-ctrl.github.io/)

## What is here

- `/` — story-first positioning, problem map and evidence
- `/work/` — selected work across the company, product, market and commercial impact
- `/case-studies/` — eight contextual case studies, including Belvo and ThinkY
- `/playbooks/` — open marketing and communications systems
- `/writing/` — public work with explicit role and attribution labels
- `/about/` — biography, working principles and career trajectory
- `/resume/` — search- and ATS-friendly résumé with print-to-PDF support
- `/recruiter/` — concise 90-second recruiter view
- `/proof/` — metric definitions, source boundaries and confidentiality notes
- `/contact/` — a live Tally form with CAPTCHA and a direct LinkedIn route

## Evidence policy

Every performance claim is presented with a period, denominator or evidence note. Team outcomes are labelled as team outcomes; modelled PR value is not presented as revenue. Public links verify visible work, while CRM exports, dashboards, budgets, account lists, attendee data and personal contact details stay private.

## Search and accessibility

Every page has one clear H1, a unique title and description, a canonical URL and social-preview metadata. The profile pages include `ProfilePage` and `Person` structured data; `robots.txt` permits standard search crawlers and explicitly names OpenAI’s search crawler. Copy uses recruiter language only where the work supports it.

## Local use

```bash
npm run build
npm run check
npm run serve
```

Open `http://localhost:4173`. The source of truth is `scripts/build.mjs`; the build writes the HTML files that GitHub Pages serves directly. No framework or client-side application runtime is required.
