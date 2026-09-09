import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const origin = 'https://ximenaaguirrerdz-ctrl.github.io';
const github = 'https://github.com/ximenaaguirrerdz-ctrl';
const linkedin = 'https://www.linkedin.com/in/ximena-aguirre-rodr%C3%ADguez-/';
const email = 'ximena.aguirre.rdz@gmail.com';

const navItems = [
  ['Work', '/work/'],
  ['Cases', '/case-studies/'],
  ['Playbooks', '/playbooks/'],
  ['Writing', '/writing/'],
  ['About', '/about/'],
  ['Résumé', '/resume/'],
  ['Contact', '/contact/']
];

const external = (href, label) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="site-shell header-inner">
      <a class="brand" href="/" aria-label="Ximena Aguirre — home">
        <span class="brand-mark" aria-hidden="true">XA</span><span class="brand-name">Ximena Aguirre</span>
      </a>
      <button class="menu-button" type="button" data-menu-button aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" data-nav data-open="false" aria-label="Primary navigation">
        ${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
        <a class="nav-feature" href="/recruiter/">90-sec view</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="site-shell">
      <div class="footer-grid">
        <div class="footer-links">
          <a href="mailto:${email}">Email</a>
          ${external(linkedin, 'LinkedIn')}
          ${external(github, 'GitHub')}
          <a href="/proof/">Evidence notes</a>
        </div>
        <span class="mono small">Madrid · Europe + LatAm</span>
      </div>
      <p class="footer-note">Find the story. Build the system. Make it travel.</p>
      <p class="small muted">© <span data-year>2026</span> Ximena Aguirre. Built as a fast, accessible static site.</p>
    </div>
  </footer>`;
}

function personSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ximena Aguirre',
    url: origin,
    email: `mailto:${email}`,
    jobTitle: 'Senior B2B Marketing & Communications Manager',
    homeLocation: { '@type': 'Place', name: 'Madrid, Spain' },
    sameAs: [linkedin, github],
    knowsAbout: ['B2B marketing', 'Corporate communications', 'Public relations', 'Field marketing', 'Go-to-market strategy', 'Executive communications', 'Multi-market communications']
  });
}

function layout({ title, description, path = '/', body, schema = false }) {
  const canonical = `${origin}${path}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="Ximena Aguirre">
  <meta name="theme-color" content="#f2efe7">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Ximena Aguirre">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  ${schema ? `<script type="application/ld+json">${personSchema()}</script>` : ''}
</head>
<body>
  ${header()}
  <main id="main">${body}</main>
  ${footer()}
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function pageHero(eyebrow, title, lede, meta = []) {
  return `<section class="page-hero">
    <div class="site-shell">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p class="lede">${lede}</p>
      ${meta.length ? `<dl class="page-meta">${meta.map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join('')}</dl>` : ''}
    </div>
  </section>`;
}

const home = layout({
  title: 'Ximena Aguirre — Senior B2B Marketing & Communications',
  description: 'Senior B2B marketing and communications leader connecting narrative, PR, field marketing and GTM to measurable business impact across Europe and Latin America.',
  path: '/',
  schema: true,
  body: `
  <section class="section hero">
    <div class="site-shell hero-grid">
      <div>
        <p class="eyebrow">Senior B2B Marketing & Communications · Madrid</p>
        <h1>I find the <span class="signal">story.</span> Then I build the system that makes it travel.</h1>
        <p class="lede">I turn complex products and business priorities into clear market narratives—then carry them through launches, leaders, rooms, channels and revenue.</p>
        <div class="hero-actions">
          <a class="button button-solid" href="/case-studies/">Read the cases</a>
          <a class="button" href="/recruiter/">90-second view</a>
        </div>
      </div>
      <aside class="hero-side" aria-label="At a glance">
        <p class="eyebrow">Field note 01</p>
        <p><strong>Not a channel specialist.</strong><br>A narrative-and-market operator who can set the strategy, align the room and still ship the work.</p>
        <p class="small mono">PR / FIELD / GTM / EXEC COMMS / AI-ASSISTED SYSTEMS</p>
      </aside>
    </div>
  </section>
  <section class="section-tight" aria-labelledby="proof-title">
    <div class="site-shell">
      <p class="eyebrow" id="proof-title">Selected proof</p>
      <div class="proof-grid" data-reveal>
        <div class="proof-item"><span class="proof-value">10</span><span class="proof-label">years across communications + marketing</span></div>
        <div class="proof-item"><span class="proof-value">EU<br>+ LatAm</span><span class="proof-label">multi-market operating scope</span></div>
        <div class="proof-item"><span class="proof-value">+121%</span><span class="proof-label">media mentions</span></div>
        <div class="proof-item"><span class="proof-value">+129.6%</span><span class="proof-label">YoY MQLs</span></div>
        <div class="proof-item"><span class="proof-value">+362%</span><span class="proof-label">event-sourced ACV</span></div>
        <div class="proof-item"><span class="proof-value">+78%</span><span class="proof-label">regional exposure</span></div>
        <div class="proof-note">Performance figures are drawn from Ximena’s documented portfolio records; public links support the work, while confidential source data stays private. <a href="/proof/">Read the evidence notes →</a></div>
      </div>
    </div>
  </section>
  <section class="section section-dark">
    <div class="site-shell split">
      <div class="sticky-label"><p class="eyebrow">The through-line</p><h2>One story.<br>Four moves.</h2></div>
      <div class="system-grid" data-reveal>
        <article class="system-step"><span>01 / Signal</span><strong>Find</strong><p>Read the market, the product, the audience and the tension worth naming.</p></article>
        <article class="system-step"><span>02 / Narrative</span><strong>Frame</strong><p>Make the complex clear, credible and useful—without sanding off the point of view.</p></article>
        <article class="system-step"><span>03 / Moment</span><strong>Stage</strong><p>Choose the launch, room, leader, story or experience that gives the idea energy.</p></article>
        <article class="system-step"><span>04 / Movement</span><strong>Prove</strong><p>Connect attention to follow-up, adoption, pipeline, trust and learning.</p></article>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="site-shell split">
      <div class="sticky-label"><p class="eyebrow">Selected work</p><h2>Strategy with fingerprints on it.</h2></div>
      <div class="case-list" data-reveal>
        <a class="case-row" href="/case-studies/#belvo"><span class="case-index">01</span><div><h3>Belvo</h3><p>Open finance narrative, customer proof, launches and field programs in Mexico.</p></div><p>19 → 42 quarterly media mentions; 1,729 MQLs in 2025; US$722.9K event-sourced ACV.</p><span class="case-arrow">↗</span></a>
        <a class="case-row" href="/case-studies/#zendesk"><span class="case-index">02</span><div><h3>Zendesk</h3><p>A regional PR engine for global customer-experience research.</p></div><p>Global narrative, local proof and coordinated spokespeople across Latin America and the Caribbean.</p><span class="case-arrow">↗</span></a>
        <a class="case-row" href="/case-studies/#field"><span class="case-index">03</span><div><h3>Field marketing</h3><p>Turning the room into a measurable revenue system.</p></div><p>Event thesis, account plan, sales SLA, rapid follow-up and pipeline attribution.</p><span class="case-arrow">↗</span></a>
      </div>
    </div>
  </section>
  <section class="section section-blue">
    <div class="site-shell split split-even">
      <div><p class="eyebrow">Proof of work</p><blockquote class="quote">Open-source marketing IP, built for people who need to use it on Monday.<cite>Four practical systems · zero theatre</cite></blockquote></div>
      <div>
        <p class="lede">Event-to-pipeline operations. Newsworthy PR. Complex B2B launches. Responsible AI-assisted workflows.</p>
        <div class="hero-actions"><a class="button" href="/playbooks/">Open the playbooks</a><a class="button" href="${github}">View GitHub</a></div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="site-shell split split-even">
      <div><p class="eyebrow">Public record</p><h2>Bylines, launches and earned attention.</h2></div>
      <div><p class="lede">The work is labeled by role: authored, editorial strategy, launch communications or media relations. Proximity is not authorship.</p><p>${external('https://belvo.com/es/author/ximena-aguirre/', 'Browse Ximena’s Belvo author archive ↗')}</p><p><a href="/writing/">Open the full writing + media library →</a></p></div>
    </div>
  </section>`
});

const work = layout({
  title: 'Work — Ximena Aguirre',
  description: 'Selected B2B marketing, communications, PR, field marketing and internal communications work across fintech, SaaS, proptech and ESG.',
  path: '/work/',
  body: `${pageHero('Work / portfolio map', 'Different contexts. One operating idea.', 'Find the story. Build the narrative. Create the moment. Connect it to business impact.', [['Range', 'PR · Field · GTM · Internal'], ['Markets', 'Europe + Latin America'], ['Contexts', 'Fintech · SaaS · Proptech · ESG'], ['View', 'Seven flagship cases']])}
  <section class="section"><div class="site-shell">
    <div class="card-grid">
      <article class="card card-wide"><div><div class="card-meta"><span>01 / Belvo</span><span>Fintech · Mexico</span></div><h3>Making open finance useful, credible and visible.</h3><p>Integrated communications, launches, customer proof, field marketing and measurement.</p></div><a href="/case-studies/#belvo">Read case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>02 / 100 Ladrillos</span><span>Proptech · Mexico</span></div><h3>Building trust around a new investment model.</h3><p>PR, executive positioning, investor moments and issue readiness.</p></div><a href="/case-studies/#ladrillos">Read case →</a></article>
      <article class="card"><div><div class="card-meta"><span>03 / WeWork</span><span>Internal · LatAm</span></div><h3>Communications infrastructure for 2,000+ people.</h3><p>Channel architecture, leadership rhythm and change communications.</p></div><a href="/case-studies/#wework">Read case →</a></article>
      <article class="card"><div><div class="card-meta"><span>04 / Zendesk</span><span>SaaS · Regional</span></div><h3>One global thesis. Many local reasons to care.</h3><p>Regional PR localization across six markets and the Caribbean.</p></div><a href="/case-studies/#zendesk">Read case →</a></article>
      <article class="card"><div><div class="card-meta"><span>05 / Expok</span><span>ESG · Agency</span></div><h3>Turning impact programs into stories that travel.</h3><p>Multi-client PR, media development and a three-person team.</p></div><a href="/case-studies/#expok">Read case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>06 / Field system</span><span>Cross-company</span></div><h3>From conference badge to qualified commercial movement.</h3><p>A repeatable field-marketing workflow built around account intent, sales alignment and attribution.</p></div><a href="/case-studies/#field">Read case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>07 / AI systems</span><span>Practical operations</span></div><h3>Use machines for leverage. Keep humans on judgment.</h3><p>Research, drafting, repurposing and QA workflows with explicit review gates.</p></div><a href="/case-studies/#ai">Read case →</a></article>
    </div>
  </div></section>`
});

const caseStudies = layout({
  title: 'Case Studies — Ximena Aguirre',
  description: 'Seven case studies showing how Ximena Aguirre finds the story, builds the system and connects communications and field marketing to business impact.',
  path: '/case-studies/',
  body: `${pageHero('Case studies', 'The work behind the headline.', 'Seven cases, each framed around the problem, insight, decision, execution and outcome. Confidential detail is withheld; reconstructions are clearly labeled.', [['Format', 'Problem → outcome'], ['Evidence', 'Public + portfolio record'], ['Confidentiality', 'Sanitized by design'], ['Role', 'Explicit on every case']])}
  <div class="site-shell">
    <article class="case-study" id="belvo">
      <aside class="case-side"><div class="case-number">01</div><div class="case-tags"><span class="tag">External comms</span><span class="tag">Field</span><span class="tag">GTM</span><span class="tag">Mexico</span></div></aside>
      <div class="case-body"><p class="eyebrow">Belvo · 2024—present</p><h2>From open-finance complexity to market momentum.</h2><p>Belvo operates in a category that demands both technical credibility and human clarity. The job was not simply to generate coverage; it was to make product value legible to media, customers, prospects and internal commercial teams.</p>
        <h3>Problem</h3><p>Multiple product announcements, proof points and market moments risked becoming isolated outputs. A regulated B2B fintech needed one coherent Mexico narrative and a system that could travel across PR, customer stories, executive visibility, field programs and sales follow-up.</p>
        <h3>Insight</h3><p>The strongest story was not “open finance” in the abstract. It was what better data and payment infrastructure let real businesses decide, verify and collect more reliably.</p>
        <h3>Decision + execution</h3><ul><li>Built a market narrative around practical outcomes, supported by customer evidence.</li><li>Connected launch calendars, founder and spokesperson messaging, newsroom cadence, events and commercial follow-up.</li><li>Worked across Product, Sales, Customer Success, Partnerships, Data, Finance, leadership, agencies and regional teams.</li><li>Used CRM and reporting discipline to read communications and field work as one market system.</li></ul>
        <div class="outcome"><strong>19 → 42</strong>quarterly media mentions from Q1 2024 to Q4 2025 (+121%), alongside 1,729 MQLs in 2025 and US$722.9K in event-sourced ACV in 2024.</div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://belvo.com/es/author/ximena-aguirre/', 'Ximena’s Belvo author archive')}</li><li>${external('https://belvo.com/es/blog/belvo-payjoy-financiamiento-celulares-mexico-datos-empleo/', 'PayJoy + employment-data customer story')}</li><li>${external('https://belvo.com/es/blog/smart-fit-belvo-pagos-recurrentes-open-finance/', 'Smart Fit + recurring payments story')}</li><li>${external('https://belvo.com/es/blog/belvo-banco-azteca-verificaciones-ingresos-credito/', 'Banco Azteca + income-verification story')}</li></ul>
        <div class="reconstruction"><strong>Evidence note.</strong> Public links verify authorship and the visible body of work. Performance figures come from Ximena’s documented portfolio records; underlying company dashboards remain confidential.</div>
      </div>
    </article>
    <article class="case-study" id="ladrillos">
      <aside class="case-side"><div class="case-number">02</div><div class="case-tags"><span class="tag">PR</span><span class="tag">Executive</span><span class="tag">Events</span><span class="tag">Proptech</span></div></aside>
      <div class="case-body"><p class="eyebrow">100 Ladrillos · 2023—2024</p><h2>Trust before attention.</h2><p>A fractional real-estate investment model needed more than reach. It needed language, spokespeople and moments that could help investors understand an unfamiliar proposition without inflating certainty.</p>
        <h3>Problem</h3><p>Novel financial models attract curiosity and scrutiny at the same time. Communications had to support growth while protecting credibility with an investor community of roughly 40,000.</p>
        <h3>Insight</h3><p>Trust grows when the story makes the mechanism visible: who participates, how it works, where the limits are and what proof exists.</p>
        <h3>Decision + execution</h3><ul><li>Shifted from product-first publicity to education, third-party relevance and human proof.</li><li>Combined agency direction, executive preparation, investor-facing events and issue-response protocols.</li><li>Created news hooks around business milestones and credible external voices.</li></ul>
        <div class="outcome"><strong>8×+</strong>indexed visibility in the documented portfolio period, with PR, events and investor communications operating as one trust system.</div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://www.eleconomista.com.mx/el-empresario/Chicharito-Hernandez-se-estrena-como-inversionista-con-100-Ladrillos-20230403-0050.html', 'El Economista — Chicharito joins as an investor')}</li><li>${external('https://lideresmexicanos.com/entrevistas/hugo-blum-e-ivan-carmona-100ladrillos', 'Líderes Mexicanos — founder interview')}</li><li>${external('https://100ladrillos.com/post/chicharito-se-une-a-100-ladrillos', '100 Ladrillos — company announcement')}</li></ul>
        <div class="reconstruction"><strong>Role:</strong> PR strategy, agency leadership, spokesperson preparation, campaign and event support. Ximena does not claim authorship of independent coverage.</div>
      </div>
    </article>
    <article class="case-study" id="wework">
      <aside class="case-side"><div class="case-number">03</div><div class="case-tags"><span class="tag">Internal comms</span><span class="tag">Change</span><span class="tag">Leadership</span></div></aside>
      <div class="case-body"><p class="eyebrow">WeWork · 2022—2023</p><h2>A communications rhythm for people navigating change.</h2><p>A six-month regional mandate: make leadership communication more consistent, useful and responsive for more than 2,000 colleagues.</p>
        <h3>Problem</h3><p>Distributed teams were receiving information across channels with different owners, cadences and levels of context. During change, that fragmentation becomes operational risk.</p>
        <h3>Insight</h3><p>Internal communications is infrastructure. People need a predictable place to learn what changed, why it matters, what to do and where to ask.</p>
        <h3>Decision + execution</h3><ul><li>Mapped audience needs, channel roles and decision owners.</li><li>Established an editorial rhythm across leadership updates, newsletters, all-hands and messaging channels.</li><li>Built leader kits and fast-response pathways for sensitive moments.</li><li>Closed the loop through employee questions and feedback signals.</li></ul>
        <div class="outcome"><strong>2,000+</strong>colleagues served by a clearer regional internal-communications operating system.</div>
        <div class="reconstruction"><strong>Reconstruction.</strong> The framework reflects Ximena’s actual process. Original internal materials and incident details are intentionally not published.</div>
      </div>
    </article>
    <article class="case-study" id="zendesk">
      <aside class="case-side"><div class="case-number">04</div><div class="case-tags"><span class="tag">Regional PR</span><span class="tag">Localization</span><span class="tag">B2B SaaS</span></div></aside>
      <div class="case-body"><p class="eyebrow">Zendesk · 2020—2022</p><h2>One global thesis. Many local reasons to care.</h2><p>Global customer-experience research could earn regional attention only if each market saw its own tension, evidence and spokesperson in the story.</p>
        <h3>Problem</h3><p>A global report needed coordinated launches across Mexico, Chile, Argentina, Peru, Colombia and the Caribbean—without reducing localization to translation.</p>
        <h3>Insight</h3><p>Consistency lives in the central argument. Relevance lives in the local proof, media angle, examples and people carrying it.</p>
        <h3>Decision + execution</h3><ul><li>Created a shared message spine and localized angle matrix.</li><li>Coordinated agencies, spokespeople, media briefings, assets and timing across markets.</li><li>Turned research into interviews, launch moments and sustained news hooks.</li><li>Moved from PR associate to regional PR lead.</li></ul>
        <div class="outcome"><strong>+78%</strong>regional media exposure in the documented portfolio period.</div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://prensariotila.com/zendesk-presento-tendencias-en-experiencia-al-cliente-2022/', 'Prensario — CX Trends 2022 launch')}</li><li>${external('https://www.itsitio.com/soluciones/zendesk-tendencias-y-retos-para-la-experiencia-al-cliente-2022/', 'ITSitio — regional CX trends')}</li><li>${external('https://impactotic.co/empresas/las-empresas-que-inviertan-en-experiencia-del-cliente-tendran-mayor-rendimiento-en-2022-segun-encuesta-de-zendesk/', 'Impacto TIC — CX investment story')}</li></ul>
        <div class="reconstruction"><strong>Role:</strong> regional PR strategy, localization, agency and spokesperson coordination, media relations. Independent articles are listed as earned-media outcomes, not bylines.</div>
      </div>
    </article>
    <article class="case-study" id="expok">
      <aside class="case-side"><div class="case-number">05</div><div class="case-tags"><span class="tag">Agency</span><span class="tag">CSR / ESG</span><span class="tag">Team lead</span></div></aside>
      <div class="case-body"><p class="eyebrow">Expok · 2019—2020</p><h2>Impact stories with a reason to be news.</h2><p>CSR and sustainability programs often arrive as lists of activities. The communications work is to find the human tension, evidence and local consequence that make them matter beyond the organization.</p>
        <h3>Problem</h3><p>Multiple accounts—with different audiences, risk profiles and approval cultures—needed consistent quality without becoming formulaic.</p>
        <h3>Insight</h3><p>Purpose is not a message category. It becomes credible through specific people, places, trade-offs and proof.</p>
        <h3>Decision + execution</h3><ul><li>Led a three-person PR team and managed accounts including Toks, Mabe, LTH, Cemex and Universidad Anáhuac.</li><li>Developed story angles, media materials, account rhythm and review standards.</li><li>Connected local program activity to broader sustainability and community narratives.</li></ul>
        <div class="outcome"><strong>3-person team</strong>moving from account delivery to repeatable editorial judgment across a multi-client portfolio.</div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://www.expoknews.com/etiqueta/lth/', 'Expok archive — LTH coverage and releases')}</li><li>${external('https://www.expoknews.com/lth-llevo-las-eco-jornadas-a-celaya-ninas-y-ninos-aprenden-a-cuidar-el-planeta-en-la-escuela-primaria-constitucion-de-1857/', 'LTH Eco Jornadas — Celaya')}</li><li>${external('https://www.expoknews.com/programa-de-educacion-ambiental-de-lth-imparte-eco-jornada-en-el-parque-chipinque-de-monterrey/', 'LTH environmental education — Monterrey')}</li></ul>
        <div class="reconstruction"><strong>Role:</strong> account and PR leadership, story development, media materials and team quality. Archive items are evidence of the account work, not automatic authorship claims.</div>
      </div>
    </article>
    <article class="case-study" id="field">
      <aside class="case-side"><div class="case-number">06</div><div class="case-tags"><span class="tag">Field marketing</span><span class="tag">Sales alignment</span><span class="tag">Attribution</span></div></aside>
      <div class="case-body"><p class="eyebrow">Cross-company operating system</p><h2>The room is not the result.</h2><p>Events create value when the right people enter with a reason to talk—and leave inside a coordinated commercial motion.</p>
        <h3>Problem</h3><p>Event teams often optimize for logistics and scan counts. Sales teams receive context late. Follow-up becomes generic. Attribution arrives after the learning is gone.</p>
        <h3>Insight</h3><p>A high-performing event begins as an account and narrative decision, not a venue decision.</p>
        <h3>Decision + execution</h3><ol><li><strong>Thesis:</strong> define audience, market tension, commercial job and disqualifiers.</li><li><strong>Account plan:</strong> align target accounts, relationship owners and next-best actions.</li><li><strong>Moment:</strong> design the room, content and conversation prompts around that thesis.</li><li><strong>SLA:</strong> capture context and route follow-up within 24 hours.</li><li><strong>Learning:</strong> report meetings, opportunities, sourced/influenced pipeline and decisions—not vanity totals.</li></ol>
        <div class="outcome"><strong>US$722.9K</strong>event-sourced ACV in 2024, representing +362% versus 2023 in Ximena’s documented Belvo record.</div>
        <p><a href="${github}/field-marketing-pipeline-system">Open the complete field-marketing pipeline system →</a></p>
        <div class="reconstruction"><strong>Framework.</strong> The public templates reconstruct the operating method with fictional examples. No attendee, account or opportunity data is included.</div>
      </div>
    </article>
    <article class="case-study" id="ai">
      <aside class="case-side"><div class="case-number">07</div><div class="case-tags"><span class="tag">AI workflows</span><span class="tag">Human review</span><span class="tag">Operations</span></div></aside>
      <div class="case-body"><p class="eyebrow">Practical AI for marketing + communications</p><h2>More leverage. Same accountability.</h2><p>AI is most useful when the workflow is specific, the inputs are safe and a named human remains responsible for truth, voice and judgment.</p>
        <h3>Problem</h3><p>Generic prompting produces generic copy—and can quietly introduce factual, privacy and brand risk.</p>
        <h3>Insight</h3><p>The advantage is not “using AI.” It is designing a repeatable path from evidence to draft to review, with clear stop conditions.</p>
        <h3>Decision + execution</h3><ul><li>Use AI for synthesis, variants, repurposing, structured research and first-pass QA.</li><li>Separate source material, assumptions and generated language.</li><li>Add human gates for factual accuracy, claim strength, cultural relevance, legal sensitivity and distinctive voice.</li><li>Prototype lightweight handoffs across drafting, collaboration and publishing tools.</li></ul>
        <div class="outcome"><strong>Human judgment</strong>stays at the center; the machine handles repetition, comparison and acceleration.</div>
        <p><a href="${github}/ai-for-marketing-comms">Open the responsible workflow library →</a></p>
        <div class="reconstruction"><strong>Limit.</strong> This is an operations capability, not a claim of machine-learning engineering. Examples use public or fictional inputs.</div>
      </div>
    </article>
  </div>`
});

const playbooks = layout({
  title: 'Playbooks & Systems — Ximena Aguirre',
  description: 'Open-source marketing and communications systems for field marketing, PR storytelling, B2B launches and responsible AI-assisted work.',
  path: '/playbooks/',
  body: `${pageHero('Proof of work', 'Useful on Monday.', 'Four open systems designed for marketers, communications leaders and cross-functional teams. Each includes a workflow, templates, a worked example and honest limits.', [['License', 'Open, with attribution'], ['Format', 'Markdown + editable templates'], ['Audience', 'Non-technical teams'], ['Principle', 'Judgment before tooling']])}
  <section class="section"><div class="site-shell">
    <article class="artifact"><div><span class="artifact-label">01 / Field marketing</span><h3>Field Marketing Pipeline System</h3></div><div><p>Move from event selection to account intent, sales alignment, sub-24-hour follow-up and opportunity measurement.</p><div class="artifact-links"><a href="${github}/field-marketing-pipeline-system">Open repository ↗</a><a href="/case-studies/#field">Read the case</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">02 / PR</span><h3>PR Storytelling System</h3></div><div><p>Turn company news into a credible external angle using a story-gap canvas, newsworthiness score and spokesperson brief.</p><div class="artifact-links"><a href="${github}/pr-storytelling-system">Open repository ↗</a><a href="/case-studies/#belvo">See it in context</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">03 / GTM</span><h3>Communications Launch Kit</h3></div><div><p>Align message, proof, audiences, spokespeople, timing and measurement for a complex B2B launch.</p><div class="artifact-links"><a href="${github}/communications-launch-kit">Open repository ↗</a><a href="/case-studies/#zendesk">See regional execution</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">04 / AI operations</span><h3>AI for Marketing & Communications</h3></div><div><p>Research, synthesis, drafting, repurposing and QA workflows built around source hygiene and human review.</p><div class="artifact-links"><a href="${github}/ai-for-marketing-comms">Open repository ↗</a><a href="/case-studies/#ai">Read the operating stance</a></div></div></article>
  </div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">How to read them</p><h2>Framework, not theatre.</h2></div><div><p class="lede">Each repository starts with the decision to make—not the software to use. The examples are deliberately clean and fictional where real material is confidential.</p><p><a href="/proof/">Read the evidence and reconstruction policy →</a></p></div></div></section>`
});

const writingItems = [
  ['authored', 'Apr 2026', 'Plata + Belvo: employment data and direct debit', 'Authored · launch communications', 'https://belvo.com/blog/belvo-plata-bank-employment-data-bank-direct-debit-mexico/'],
  ['authored', 'Mar 2026', 'PayJoy: employment data in mobile-phone credit decisions', 'Authored · customer story', 'https://belvo.com/es/blog/belvo-payjoy-financiamiento-celulares-mexico-datos-empleo/'],
  ['authored', '2025', 'Smart Fit: recurring payments through open finance', 'Authored · customer story', 'https://belvo.com/es/blog/smart-fit-belvo-pagos-recurrentes-open-finance/'],
  ['authored', '2025', 'Banco Azteca: six million income verifications', 'Authored · customer story', 'https://belvo.com/es/blog/belvo-banco-azteca-verificaciones-ingresos-credito/'],
  ['authored', '2025', 'The state of bank direct debit in Mexico', 'Authored · report launch', 'https://belvo.com/es/blog/estado-de-la-domiciliacion-bancaria-en-mexico-2025-el-nuevo-reporte-de-belvo-2/'],
  ['authored', '2024', 'Belvo validates PCI DSS Level 1 in Mexico', 'Authored · product / trust announcement', 'https://belvo.com/es/blog/blog-belvo-mexico-validacion-pci-dss-nivel-1/'],
  ['authored', '2024', 'An income estimator built from employment data', 'Authored · product announcement', 'https://belvo.com/es/blog/belvo-estimador-ingresos-datos-de-empleo/'],
  ['media', '2023', 'Chicharito joins 100 Ladrillos as an investor', 'PR strategy · media relations', 'https://www.eleconomista.com.mx/el-empresario/Chicharito-Hernandez-se-estrena-como-inversionista-con-100-Ladrillos-20230403-0050.html'],
  ['media', '2022', 'Zendesk presents CX Trends 2022', 'Regional PR · launch coordination', 'https://prensariotila.com/zendesk-presento-tendencias-en-experiencia-al-cliente-2022/'],
  ['media', '2022', 'The companies taking CX one step further', 'Regional PR · case-story amplification', 'https://contactcenterhub.es/casos-exito-empresas-paso-mas-cx-gracias-zendesk-2022-04-39175/'],
  ['media', '2021', 'CX maturity and business revenue', 'Regional PR · media relations', 'https://emprefinanzas.com.mx/2021/10/14/estudio-de-zendesk-muestra-que-la-madurez-en-experiencia-del-cliente-beneficia-los-ingresos-de-los-negocios/'],
  ['esg', '2019', 'LTH Eco Jornadas in Celaya', 'Account PR · story development', 'https://www.expoknews.com/lth-llevo-las-eco-jornadas-a-celaya-ninas-y-ninos-aprenden-a-cuidar-el-planeta-en-la-escuela-primaria-constitucion-de-1857/']
];

const writing = layout({
  title: 'Writing & Media — Ximena Aguirre',
  description: 'Verified bylines, customer stories, announcements and earned-media outcomes, labeled clearly by Ximena Aguirre’s role.',
  path: '/writing/',
  body: `${pageHero('Writing + media', 'A public record, with roles attached.', 'Authorship, editorial work and earned-media outcomes are different things. This library says which is which.', [['Labels', 'Authored · PR · Editorial'], ['Rule', 'No implied authorship'], ['Primary archive', 'Belvo author page'], ['Period', '2019—2026']])}
  <section class="section"><div class="site-shell">
    <div class="filter-bar no-print" aria-label="Filter work"><button class="filter-button" type="button" data-filter="all" aria-pressed="true">All</button><button class="filter-button" type="button" data-filter="authored" aria-pressed="false">Authored</button><button class="filter-button" type="button" data-filter="media" aria-pressed="false">Media relations</button><button class="filter-button" type="button" data-filter="esg" aria-pressed="false">ESG / CSR</button></div>
    <div class="case-list">${writingItems.map(([kind, date, title, role, href], i) => `<a class="case-row" data-kind="${kind}" href="${href}" target="_blank" rel="noopener noreferrer"><span class="case-index">${String(i + 1).padStart(2, '0')}</span><div><h3>${title}</h3><p>${role}</p></div><p>${date}</p><span class="case-arrow">↗</span></a>`).join('')}</div>
    <p class="small muted">For Belvo, public byline status is verified through ${external('https://belvo.com/es/author/ximena-aguirre/', 'the author archive')}. Independent coverage is presented as a communications outcome, never as authored work.</p>
  </div></section>`
});

const about = layout({
  title: 'About — Ximena Aguirre',
  description: 'About Ximena Aguirre, a Madrid-based senior B2B marketing and communications leader with experience across Europe and Latin America.',
  path: '/about/',
  schema: true,
  body: `${pageHero('About', 'A strategist who still likes the workbench.', 'I have spent ten years translating complexity—products, research, change, risk and ambition—into narratives people can understand and systems teams can actually run.', [['Based', 'Madrid, Spain'], ['Scope', 'Europe + Latin America'], ['Languages', 'Spanish · English'], ['Work status', 'Authorized in Spain']])}
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">80-word bio</p><blockquote class="quote">I work where story, system and commercial reality meet.</blockquote></div><div class="measure"><p class="lede">Ximena Aguirre is a senior B2B marketing and communications leader with experience across fintech, SaaS, proptech, workplace and ESG. She has led external and internal communications, regional PR, product launches, field programs, executive visibility and cross-functional GTM work across Latin America and Europe.</p><p>Her edge is connective: she finds the market tension, builds the narrative, creates the moment and designs the operating rhythm that helps the idea move—from newsroom to room, and from room to pipeline.</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><p class="eyebrow">Operating principles</p><div class="note-grid"><article class="note"><strong>Clarity is a strategic choice.</strong><p>Complexity is real. Confusion is optional.</p></article><article class="note"><strong>The room is a channel.</strong><p>Events work when narrative, audience and follow-up are designed together.</p></article><article class="note"><strong>Evidence earns range.</strong><p>A strong story travels farther when proof and local relevance are built in.</p></article><article class="note"><strong>Systems protect quality.</strong><p>Templates should carry judgment, not replace it.</p></article><article class="note"><strong>AI needs an editor.</strong><p>Acceleration is useful. Accountability stays human.</p></article><article class="note"><strong>Metrics need meaning.</strong><p>Coverage, MQLs and pipeline matter when they inform the next decision.</p></article></div></div></section>
  <section class="section"><div class="site-shell split"><div class="sticky-label"><p class="eyebrow">Trajectory</p><h2>Built across contexts.</h2></div><div class="timeline">
    <div class="timeline-item"><span class="timeline-date">2024—present</span><div><h3>Belvo</h3><p>Marketing & Communications Manager, Mexico</p></div><p>Integrated external communications, GTM launches, customer stories, executive visibility, field marketing and measurement in regulated B2B fintech.</p></div>
    <div class="timeline-item"><span class="timeline-date">2023—2024</span><div><h3>100 Ladrillos</h3><p>PR & Events Manager</p></div><p>PR, investor communications, executive positioning, events, agency leadership and issue readiness.</p></div>
    <div class="timeline-item"><span class="timeline-date">2022—2023</span><div><h3>WeWork</h3><p>Internal Communications & Public Affairs Senior Lead</p></div><p>Regional internal communications and change infrastructure for 2,000+ colleagues.</p></div>
    <div class="timeline-item"><span class="timeline-date">2020—2022</span><div><h3>Zendesk</h3><p>PR & Communications Associate → Regional PR Lead</p></div><p>Regional PR, research launches, localization and spokesperson programs across Latin America and the Caribbean.</p></div>
    <div class="timeline-item"><span class="timeline-date">2016—2020</span><div><h3>Foundation</h3><p>Expok · 3AM · COPRED · AIESEC</p></div><p>Agency PR, CSR/ESG storytelling, public-sector communications, account leadership and early team management.</p></div>
  </div></div></section>`
});

const resume = layout({
  title: 'Résumé — Ximena Aguirre',
  description: 'Résumé of Ximena Aguirre: Senior B2B Marketing & Communications Manager across PR, field marketing, GTM, internal communications and regional markets.',
  path: '/resume/',
  body: `${pageHero('Résumé', 'Senior B2B Marketing & Communications Manager', 'Integrated campaigns, regional PR, field marketing, launches, executive communications and measurable business impact across Europe and Latin America.', [['Location', 'Madrid, Spain'], ['Authorization', 'Spain · no sponsorship required'], ['Languages', 'Spanish · English'], ['Education', 'BA Communication']])}
  <section class="section-tight no-print"><div class="site-shell"><div class="hero-actions"><button class="button button-solid" type="button" data-print>Print / save as PDF</button><a class="button" href="mailto:${email}">Request a copy</a></div></div></section>
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Profile</p><h2>Strategy with hands-on range.</h2></div><div><p class="lede">Senior B2B marketing and communications leader with 10 years of experience translating complex products and business priorities into integrated market programs. Track record across PR, field marketing, product and GTM launches, customer stories, executive visibility, internal communications and multi-market localization.</p><p class="kicker-line"><strong>Core:</strong> Integrated campaigns · External communications · Field marketing · Media relations · Regional marketing · Product launches · Stakeholder management · Sales alignment · Measurement</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><p class="eyebrow">Experience</p><div class="timeline">
    <div class="timeline-item"><span class="timeline-date">Mar 2024—present</span><div><h3>Belvo</h3><p>Marketing & Communications Manager, Mexico</p></div><div><p>Own Mexico communications across PR, product/GTM launches, customer stories, executive visibility and field marketing; partner with Product, Sales, Customer Success, Partnerships, Data, Finance, leadership, agencies and regional teams.</p><p><strong>Selected proof:</strong> 12+ launches; 19→42 quarterly media mentions (+121%); 1,729 MQLs in 2025 (+129.6% YoY); US$722.9K event-sourced ACV in 2024 (+362% YoY).</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Feb 2023—Mar 2024</span><div><h3>100 Ladrillos</h3><p>PR & Events Manager</p></div><div><p>Led PR, events, investor communications, executive positioning, agency work and issue-response protocols for a proptech investment platform.</p><p><strong>Selected proof:</strong> 8×+ indexed visibility in the documented portfolio period.</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Aug 2022—Feb 2023</span><div><h3>WeWork</h3><p>Internal Communications & Public Affairs Senior Lead</p></div><div><p>Built a regional channel and editorial operating rhythm for 2,000+ colleagues; supported leaders and change moments with clear, coordinated communications.</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Apr 2020—Aug 2022</span><div><h3>Zendesk</h3><p>PR & Communications Associate → Regional PR Lead</p></div><div><p>Led regional PR localization, agencies, spokespeople and research launches across Mexico, Chile, Argentina, Peru, Colombia and the Caribbean.</p><p><strong>Selected proof:</strong> +78% regional media exposure.</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Mar 2019—Apr 2020</span><div><h3>Expok</h3><p>Account Manager → Head of PR</p></div><p>Led a three-person PR team and accounts across corporate responsibility, sustainability and education.</p></div>
    <div class="timeline-item"><span class="timeline-date">2016—2019</span><div><h3>3AM · COPRED · AIESEC</h3><p>Account management · Communications advisor · Marketing & PR leadership</p></div><p>Built the foundation across agency, public-sector and nonprofit work; led a 12-person AIESEC team and increased leads by 83%.</p></div>
  </div></div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Tools</p><h2>Fluent enough to make the system run.</h2></div><div><p><strong>CRM + measurement:</strong> HubSpot, Salesforce, Tableau, Power BI</p><p><strong>Content + collaboration:</strong> WordPress, Notion, Figma, Jira, Asana</p><p><strong>Media + research:</strong> Meltwater, Cision/Gorkana, SEMrush</p><p><strong>Events:</strong> Eventbrite, Luma, StreamYard</p><p><strong>AI-assisted work:</strong> ChatGPT, Gemini, NotebookLM, Claude, Cursor—with human review.</p></div></div></section>
  <section class="section-tight"><div class="site-shell"><p class="small"><strong>Education:</strong> BA in Communication, Universidad Panamericana, 2014—2018. · <strong>Contact:</strong> <a href="mailto:${email}">${email}</a> · ${external(linkedin, 'LinkedIn')} · ${external(github, 'GitHub')}</p><p class="small muted">Performance figures are portfolio records. Confidential dashboards, personal phone number, private company materials and former work contact details are not published.</p></div></section>`
});

const recruiter = layout({
  title: '90-Second Recruiter View — Ximena Aguirre',
  description: 'A concise recruiter view of Ximena Aguirre’s positioning, experience, business results, flagship work, tools, languages and availability.',
  path: '/recruiter/',
  body: `${pageHero('90-second recruiter view', 'Senior enough to set the strategy. Hands-on enough to ship it.', 'Ximena is a Madrid-based B2B marketing and communications leader who connects narrative, PR, field marketing and GTM to measurable market and pipeline impact.', [['Experience', '10 years'], ['Markets', 'Europe + Latin America'], ['Languages', 'Spanish · English'], ['Work status', 'Authorized in Spain']])}
  <section class="section-tight"><div class="site-shell"><div class="proof-grid"><div class="proof-item"><span class="proof-value">+121%</span><span class="proof-label">media mentions</span></div><div class="proof-item"><span class="proof-value">+129.6%</span><span class="proof-label">YoY MQLs</span></div><div class="proof-item"><span class="proof-value">+362%</span><span class="proof-label">event ACV</span></div><div class="proof-item"><span class="proof-value">+78%</span><span class="proof-label">regional exposure</span></div><div class="proof-item"><span class="proof-value">12+</span><span class="proof-label">Belvo launches</span></div><div class="proof-item"><span class="proof-value">2K+</span><span class="proof-label">employees served</span></div></div></div></section>
  <section class="section"><div class="site-shell split"><div class="sticky-label"><p class="eyebrow">Best evidence</p><h2>Three cases to open first.</h2></div><div class="case-list"><a class="case-row" href="/case-studies/#belvo"><span class="case-index">01</span><div><h3>Belvo</h3><p>Integrated Mexico narrative, launches, customer proof and field pipeline.</p></div><p>Best for: B2B fintech · GTM · Comms leadership</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#zendesk"><span class="case-index">02</span><div><h3>Zendesk</h3><p>A multi-market PR localization engine.</p></div><p>Best for: regional roles · SaaS · external comms</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#field"><span class="case-index">03</span><div><h3>Field system</h3><p>Event thesis through opportunity measurement.</p></div><p>Best for: field marketing · sales alignment · pipeline</p><span class="case-arrow">↗</span></a></div></div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">Role fit</p><h2>Where the profile is strongest.</h2></div><div><p class="lede">Senior / Lead / Manager roles spanning integrated B2B marketing, external or corporate communications, regional PR, field marketing and launch communications.</p><p><strong>Particularly credible in:</strong> complex B2B products, multi-market work, cross-functional leadership, executive narratives, events tied to commercial outcomes and responsible AI-assisted operations.</p><p><strong>Not positioned as:</strong> a pure growth marketer, social-first creator, performance-media specialist or software engineer.</p></div></div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Practical</p><h2>Ready for the conversation.</h2></div><div><p><strong>Location:</strong> Madrid, Spain</p><p><strong>Work authorization:</strong> Spain; no sponsorship required</p><p><strong>Languages:</strong> Spanish (native), English (professional)</p><p><strong>Tools:</strong> HubSpot, Salesforce, WordPress, Notion, Figma, Meltwater/Cision, Tableau/Power BI, ChatGPT, Gemini, NotebookLM, Claude, Cursor.</p><div class="hero-actions"><a class="button button-solid" href="/resume/">Open résumé</a><a class="button" href="mailto:${email}">Email Ximena</a><a class="button" href="${linkedin}">LinkedIn</a></div></div></div></section>`
});

const proof = layout({
  title: 'Evidence Notes — Ximena Aguirre',
  description: 'Evidence, attribution and confidentiality notes for metrics, case studies, public links and reconstructed frameworks in Ximena Aguirre’s portfolio.',
  path: '/proof/',
  body: `${pageHero('Evidence notes', 'Specific, sourced, honest about limits.', 'This page explains what is publicly verifiable, what comes from documented performance records and what has been reconstructed to protect confidential information.', [['Public evidence', 'Linked primary pages'], ['Metrics', 'Portfolio records'], ['Frameworks', 'Clearly reconstructed'], ['Policy', 'No private source data']])}
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Metric register</p><h2>What each number means.</h2></div><div>
    <details open><summary>10 years</summary><div>Calculated from Ximena’s career start in marketing leadership in January 2016 through 2026. Rounded down to a whole year.</div></details>
    <details><summary>Europe + Latin America</summary><div>Direct professional scope includes Mexico, Chile, Colombia, Argentina, Peru, the Caribbean and Costa Rica; current base and cross-regional work connect the profile to Spain and broader European teams.</div></details>
    <details><summary>+121% media mentions</summary><div>Belvo portfolio record: 19 quarterly mentions in Q1 2024 versus 42 in Q4 2025. Arithmetic: (42−19)÷19 = 121.05%, rounded to 121%.</div></details>
    <details><summary>+129.6% YoY MQLs</summary><div>Belvo portfolio record for 2025 versus 2024; 1,729 MQLs recorded in 2025. The site does not publish underlying CRM exports.</div></details>
    <details><summary>+362% event-sourced ACV</summary><div>Belvo portfolio record for 2024 versus 2023; US$722.9K event-sourced ACV recorded in 2024. Account and opportunity data remain private.</div></details>
    <details><summary>+78% regional exposure</summary><div>Zendesk portfolio record for the 2020—2022 regional PR period. Public coverage examples demonstrate the program; the underlying media report remains private.</div></details>
  </div></div></section>
  <section class="section section-light"><div class="site-shell split split-even"><div><p class="eyebrow">Three evidence classes</p><h2>A label for every claim.</h2></div><div><p><strong>Public record:</strong> bylines, author archives, company announcements and third-party coverage available at a stable URL.</p><p><strong>Performance record:</strong> figures documented in Ximena’s résumé and portfolio, checked for internal consistency but not linked to confidential dashboards.</p><p><strong>Reconstruction:</strong> a clean demonstration of the actual process, using fictional or generalized inputs instead of company material.</p></div></div></section>
  <section class="section"><div class="site-shell"><p class="eyebrow">Intentionally withheld</p><div class="note-grid"><div class="note"><strong>Personal data</strong><p>Phone number, home address and former work contact details.</p></div><div class="note"><strong>Company data</strong><p>CRM exports, account lists, budgets, attendee details and internal dashboards.</p></div><div class="note"><strong>Sensitive context</strong><p>Incident specifics, confidential launch material and internal communications artifacts.</p></div></div></div></section>`
});

const contact = layout({
  title: 'Contact — Ximena Aguirre',
  description: 'Contact Ximena Aguirre for senior B2B marketing, communications, PR, field marketing and regional leadership opportunities.',
  path: '/contact/',
  body: `<section class="section contact-hero"><div class="site-shell"><p class="eyebrow">Contact</p><h1>Have a complex story that needs to move?</h1><a class="email-link" href="mailto:${email}">${email}</a><div class="hero-actions"><a class="button" href="${linkedin}">LinkedIn</a><a class="button" href="${github}">GitHub</a></div><p class="small muted">Based in Madrid · Authorized to work in Spain · Open to senior international Marketing & Communications opportunities.</p></div></section>`
});

const notFound = layout({
  title: 'Page not found — Ximena Aguirre',
  description: 'The page you requested could not be found.',
  path: '/404.html',
  body: `<section class="section contact-hero"><div class="site-shell"><p class="eyebrow">404 / missing page</p><h1>This story took a wrong turn.</h1><p class="lede">The useful routes are still here.</p><div class="hero-actions"><a class="button button-solid" href="/">Go home</a><a class="button" href="/work/">See the work</a></div></div></section>`
});

const pages = new Map([
  ['index.html', home],
  ['work/index.html', work],
  ['case-studies/index.html', caseStudies],
  ['playbooks/index.html', playbooks],
  ['writing/index.html', writing],
  ['about/index.html', about],
  ['resume/index.html', resume],
  ['recruiter/index.html', recruiter],
  ['proof/index.html', proof],
  ['contact/index.html', contact],
  ['404.html', notFound]
]);

for (const [file, contents] of pages) {
  const target = join(root, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, 'utf8');
}

const sitemapPaths = ['/', '/work/', '/case-studies/', '/playbooks/', '/writing/', '/about/', '/resume/', '/recruiter/', '/proof/', '/contact/'];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');

console.log(`Built ${pages.size} HTML pages plus sitemap and robots.txt.`);
