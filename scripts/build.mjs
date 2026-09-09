import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const origin = 'https://ximenaaguirrerdz-ctrl.github.io';
const github = 'https://github.com/ximenaaguirrerdz-ctrl';
const linkedin = 'https://www.linkedin.com/in/ximena-aguirre-rodr%C3%ADguez-/';

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
          ${external(linkedin, 'LinkedIn')}
          ${external(github, 'GitHub')}
          <a href="/proof/">Evidence notes</a>
        </div>
        <span class="mono small">Europe + Latin America</span>
      </div>
      <p class="footer-note">Clear on the inside. Credible on the outside. Useful in the market.</p>
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
    jobTitle: 'Senior 360° Communications, PR & Field Marketing Leader',
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

function metricCard({ company, domain, title, delta, rows, context, contribution, note }) {
  const chartLabel = rows.map(([label, display]) => `${label}: ${display}`).join('; ');
  return `<figure class="metric-card" data-reveal>
    <div class="metric-topline"><span>${company} · ${domain}</span><strong>${delta}</strong></div>
    <h3>${title}</h3>
    <div class="bar-chart" role="img" aria-label="${chartLabel}">
      ${rows.map(([label, display, width]) => `<div class="bar-row"><span>${label}</span><div class="bar-track"><i style="--bar:${width}"></i></div><b>${display}</b></div>`).join('')}
    </div>
    <figcaption><p>${context}</p><p><span>My contribution</span>${contribution}</p>${note ? `<small>${note}</small>` : ''}</figcaption>
  </figure>`;
}

function evidenceImage({ src, width, height, alt, label, caption, className = '' }) {
  return `<figure class="evidence-image ${className}">
    <a class="evidence-link" href="${src}" target="_blank" aria-label="Open this portfolio image at full size"><img src="${src}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async"></a>
    <figcaption><span>${label}</span>${caption}</figcaption>
  </figure>`;
}

function videoCard({ id, title, meta }) {
  return `<a class="video-card" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer" data-kind="video">
    <span class="video-poster"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" width="480" height="360" alt="Video thumbnail: ${title}" loading="lazy" decoding="async"><i aria-hidden="true">Play</i></span>
    <span class="video-copy"><small>${meta}</small><strong>${title}</strong><span>Watch on YouTube ↗</span></span>
  </a>`;
}

const impactMetrics = [
  {
    company: 'Belvo', domain: 'External communications', title: 'Quarterly media mentions', delta: '+121%',
    rows: [['Q1 2024', '19', '45%'], ['Q4 2025', '42', '100%']],
    context: 'A Mexico PR programme measured from the first quarter of 2024 to the fourth quarter of 2025.',
    contribution: 'One narrative across product news, customer proof, spokespeople and a steadier newsroom cadence.'
  },
  {
    company: 'Belvo', domain: 'Integrated marketing', title: 'Marketing-qualified leads', delta: '1,729',
    rows: [['2024', 'Index 100', '43.5%'], ['2025', 'Index 230', '100%']],
    context: '1,729 MQLs recorded in 2025—129.6% above the previous year across the integrated Mexico programme.',
    contribution: 'Campaign and field planning, message consistency, commercial alignment and follow-up discipline.',
    note: 'Indexed view: 2024 = 100. The result is not attributed to PR alone.'
  },
  {
    company: 'Belvo', domain: 'Field marketing', title: 'Event-sourced ACV', delta: 'US$722.9K',
    rows: [['2023', 'Index 100', '21.6%'], ['2024', 'Index 462', '100%']],
    context: 'Annual contract value attached to opportunities sourced through event touchpoints; +362% year over year.',
    contribution: 'Account selection, event thesis, Sales SLA, rapid follow-up and opportunity attribution.',
    note: 'Indexed view: 2023 = 100. Account-level data remains confidential.'
  },
  {
    company: 'Zendesk', domain: 'Regional PR', title: 'Regional media exposure', delta: '+78%',
    rows: [['Baseline', 'Index 100', '56%'], ['Programme', 'Index 178', '100%']],
    context: 'Documented six-month uplift within the 2020–2022 regional PR programme spanning six Latin American markets and the Caribbean.',
    contribution: 'A common message spine, localized proof, coordinated agencies and market-ready spokespeople.',
    note: 'Indexed view. The underlying media report is confidential.'
  }
];

const home = layout({
  title: 'Ximena Aguirre — 360° Communications, PR & Field Marketing',
  description: 'Senior communications leader working across internal communications, external communications, PR and field marketing in Europe and Latin America.',
  path: '/',
  schema: true,
  body: `
  <section class="section hero hero-v2">
    <div class="site-shell hero-story">
      <div class="hero-copy">
        <p class="eyebrow">360° communications · Europe + Latin America</p>
        <h1>One company.<br>Many audiences.<br><span class="signal">One clear story.</span></h1>
        <p class="lede">I lead communications from the inside out: aligning teams, earning external attention and turning the narrative into market moments that move business.</p>
        <p class="hero-plain">Internal communications. External communications and PR. Field marketing and GTM. I treat them as one job—not three disconnected channels.</p>
        <div class="hero-actions">
          <a class="button button-solid" href="/case-studies/">See how I work</a>
          <a class="button" href="/recruiter/">90-second view</a>
        </div>
      </div>
      <div class="hero-collage" aria-label="Selected portfolio evidence">
        ${evidenceImage({src:'/assets/media/wework-anniversary-field-event.webp', width:'1050', height:'1400', alt:'WeWork Mexico anniversary event stage', label:'Field', caption:'A live brand moment.'})}
        ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper coverage of a Belvo and Clip open-finance partnership', label:'PR', caption:'A complex partnership made legible.'})}
        <div class="collage-note"><strong>Senior + hands-on</strong><span>Set the narrative. Write the message. Prepare the spokesperson. Run the room. Read the result.</span></div>
      </div>
    </div>
  </section>

  <section class="section section-light" aria-labelledby="range-title">
    <div class="site-shell">
      <div class="section-heading"><p class="eyebrow">What I actually do</p><h2 id="range-title">Three lenses.<br>One communications job.</h2><p>I help companies stay coherent across the audiences that matter most.</p></div>
      <div class="range-grid" data-reveal>
        <article class="range-card range-inside"><span>01 / Inside</span><h3>Internal communications</h3><p>Leadership messages, change, channels, all-hands and employee engagement.</p><b>Make the strategy usable.</b></article>
        <article class="range-card range-outside"><span>02 / Outside</span><h3>External communications + PR</h3><p>Corporate narrative, media relations, reputation, executive visibility and thought leadership.</p><b>Make the company credible.</b></article>
        <article class="range-card range-market"><span>03 / In the market</span><h3>Field marketing + GTM</h3><p>Launches, events, customer proof, Sales alignment, follow-up and measurement.</p><b>Make attention move.</b></article>
      </div>
      <div class="operator-line"><span>STRATEGY</span><i></i><span>WRITING</span><i></i><span>EXECUTION</span><i></i><span>MEASUREMENT</span></div>
    </div>
  </section>

  <section class="section impact-section" aria-labelledby="impact-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">Results, with the missing context</p><h2 id="impact-title">What moved—and what the number measures.</h2></div><p>Four portfolio records. Each names the period, denominator and work around it. No dashboard theatre.</p></div>
      <div class="metric-grid">${impactMetrics.map(metricCard).join('')}</div>
      <p class="evidence-line">Figures come from documented portfolio records. Public work is linked; underlying CRM and media reports stay private. <a href="/proof/">Method and evidence notes →</a></p>
    </div>
  </section>

  <section class="section section-dark">
    <div class="site-shell story-arc">
      <div class="section-heading"><p class="eyebrow">The through-line</p><h2>Different jobs.<br>The same craft.</h2></div>
      <div class="arc-grid" data-reveal>
        <article><span>Zendesk</span><h3>Localize a global story.</h3><p>Regional PR across six markets and the Caribbean.</p><a href="/case-studies/#zendesk">External comms →</a></article>
        <article><span>WeWork</span><h3>Build clarity on the inside.</h3><p>A regional communications rhythm for 2,000+ colleagues.</p><a href="/case-studies/#wework">Internal comms →</a></article>
        <article><span>100 Ladrillos</span><h3>Earn trust before attention.</h3><p>PR, executive positioning, investor moments and issue readiness.</p><a href="/case-studies/#ladrillos">PR + events →</a></article>
        <article><span>Belvo</span><h3>Connect narrative to market movement.</h3><p>Product stories, customer proof, field programmes and pipeline.</p><a href="/case-studies/#belvo">Integrated leadership →</a></article>
      </div>
    </div>
  </section>

  <section class="section visual-proof-section">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">The work in public</p><h2>Coverage, content and rooms.</h2></div><p>Published work is labeled by role: authored, ghostwritten, editorial strategy, spokesperson preparation or media relations.</p></div>
      <div class="evidence-wall" data-reveal>
        ${evidenceImage({src:'/assets/media/wework-alvaro-villar-tv.webp', width:'1280', height:'719', alt:'Álvaro Villar, CEO of WeWork Mexico, in a television interview on ADN40', label:'Media relations', caption:'Executive visibility · WeWork', className:'evidence-wide'})}
        ${evidenceImage({src:'/assets/media/belvo-jpmorgan-press.webp', width:'1010', height:'1280', alt:'Print article about Belvo and J.P. Morgan', label:'External communications', caption:'Partnership narrative · Belvo'})}
        ${evidenceImage({src:'/assets/media/expok-toks-bylined-column.webp', width:'1125', height:'1242', alt:'Newspaper page with a corporate responsibility guest column and Toks coverage', label:'Editorial + PR', caption:'Executive voice and earned coverage · Expok'})}
      </div>
      <div class="hero-actions"><a class="button button-solid" href="/writing/">Open writing + media</a><a class="button" href="/work/">Browse the work</a></div>
    </div>
  </section>

  <section class="section section-blue">
    <div class="site-shell split split-even">
      <div><p class="eyebrow">Proof of work</p><blockquote class="quote">The strategy is only useful if another team can run it.<cite>Four open, practical systems</cite></blockquote></div>
      <div><p class="lede">Field-to-pipeline operations. Newsworthy PR. Complex B2B launches. Responsible AI-assisted communications.</p><div class="hero-actions"><a class="button" href="/playbooks/">Open the playbooks</a><a class="button" href="${github}">View GitHub</a></div></div>
    </div>
  </section>`
});

const work = layout({
  title: 'Work — Ximena Aguirre',
  description: 'Selected B2B marketing, communications, PR, field marketing and internal communications work across fintech, SaaS, proptech and ESG.',
  path: '/work/',
  body: `${pageHero('Work / 360° view', 'The brief changes. The job stays whole.', 'Inside the company, outside it and in the market: selected work across internal communications, PR, executive visibility, launches and field marketing.', [['Inside', 'Leadership · change · employees'], ['Outside', 'PR · reputation · media'], ['Market', 'Field · launches · pipeline'], ['Scope', 'Europe + Latin America']])}
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
  description: 'Seven case studies across internal communications, external communications, PR, field marketing and GTM, with results shown in context.',
  path: '/case-studies/',
  body: `${pageHero('Case studies / 360° communications', 'Seven assignments. One connected practice.', 'The format is deliberately simple: the mandate, what I saw, what I did and what changed. Strategy and execution sit together.', [['Inside', 'WeWork'], ['Outside', 'Zendesk · Expok'], ['Market', 'Belvo · 100 Ladrillos'], ['Systems', 'Field · AI']])}
  <nav class="case-jump site-shell" aria-label="Jump to a case study">
    <a href="#belvo">Belvo</a><a href="#ladrillos">100 Ladrillos</a><a href="#wework">WeWork</a><a href="#zendesk">Zendesk</a><a href="#expok">Expok</a><a href="#field">Field</a><a href="#ai">AI</a>
  </nav>
  <div class="site-shell">
    <article class="case-study" id="belvo">
      <aside class="case-side"><div class="case-number">01</div><div class="case-tags"><span class="tag">External comms</span><span class="tag">Field</span><span class="tag">GTM</span><span class="tag">Mexico</span></div></aside>
      <div class="case-body"><p class="eyebrow">Belvo · 2024—present</p><h2>Make open finance useful before trying to make it famous.</h2><p class="case-deck">I own the Mexico communications and marketing narrative across product launches, PR, customer stories, executive visibility and field programmes.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Give a regulated B2B fintech one coherent market story—and make it work for media, customers, prospects and Sales.</p></div><div><span>What I saw</span><p>“Open finance” was the category. Better credit decisions, verification and collection were the stories people could actually use.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Built the narrative around practical outcomes and customer evidence.</li><li>Connected product news, spokesperson work, field programmes and commercial follow-up.</li><li>Worked hands-on across Product, Sales, Customer Success, Partnerships, Data, leadership and agencies.</li></ul>
        ${metricCard(impactMetrics[0])}
        <div class="number-notes"><div><strong>1,729</strong><span>MQLs in 2025 · +129.6% YoY across the integrated Mexico programme</span></div><div><strong>US$722.9K</strong><span>event-sourced ACV in 2024 · +362% YoY</span></div><div><strong>12+</strong><span>launches supported across product, partnerships and customer proof</span></div></div>
        <div class="evidence-pair">
          ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper story about the Belvo and Clip open-finance partnership', label:'PR outcome', caption:'Partnership story in print.'})}
          ${evidenceImage({src:'/assets/media/belvo-jpmorgan-press.webp', width:'1010', height:'1280', alt:'Print coverage of financial solutions from Belvo and J.P. Morgan', label:'PR outcome', caption:'A technical proposition translated for a business audience.'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://belvo.com/es/author/ximena-aguirre/', 'Ximena’s Belvo author archive')}</li><li>${external('https://belvo.com/es/blog/belvo-payjoy-financiamiento-celulares-mexico-datos-empleo/', 'PayJoy + employment-data customer story')}</li><li>${external('https://belvo.com/es/blog/smart-fit-belvo-pagos-recurrentes-open-finance/', 'Smart Fit + recurring payments story')}</li><li>${external('https://belvo.com/es/blog/belvo-banco-azteca-verificaciones-ingresos-credito/', 'Banco Azteca + income-verification story')}</li></ul>
        <div class="reconstruction"><strong>Evidence note.</strong> Public links verify the visible work. Performance figures come from documented portfolio records; underlying dashboards remain confidential.</div>
      </div>
    </article>
    <article class="case-study" id="ladrillos">
      <aside class="case-side"><div class="case-number">02</div><div class="case-tags"><span class="tag">PR</span><span class="tag">Executive</span><span class="tag">Events</span><span class="tag">Proptech</span></div></aside>
      <div class="case-body"><p class="eyebrow">100 Ladrillos · 2023—2024</p><h2>Trust before attention.</h2><p class="case-deck">Fractional real-estate investing attracts curiosity and scrutiny at the same time. The communications job was to support growth without inflating certainty.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Build confidence around an unfamiliar investment model for an investor community of roughly 40,000 people.</p></div><div><span>What I saw</span><p>The mechanism had to become visible: how it works, who participates, where the limits are and what proof exists.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Shifted publicity from product claims toward education, evidence and credible external voices.</li><li>Led agency work, founder preparation, investor events and issue-response protocols.</li><li>Built news hooks around milestones that already mattered to the business.</li></ul>
        <div class="outcome outcome-context"><strong>8×+</strong><span>indexed visibility during the documented portfolio period.</span><p>The point was not volume alone: PR, executive positioning and investor moments operated as one trust programme.</p></div>
        <div class="video-feature-grid">
          ${videoCard({id:'UltD4toNKMM', title:'Iván Carmona — Construyendo el futuro con 100 Ladrillos', meta:'Founder visibility · PR + spokesperson preparation'})}
          ${videoCard({id:'dXUPVbkxzmk', title:'Ladrillowners: inversión inmobiliaria y gestión de riesgo', meta:'Owned event · content + experience strategy'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://www.eleconomista.com.mx/el-empresario/Chicharito-Hernandez-se-estrena-como-inversionista-con-100-Ladrillos-20230403-0050.html', 'El Economista — Chicharito joins as an investor')}</li><li>${external('https://lideresmexicanos.com/entrevistas/hugo-blum-e-ivan-carmona-100ladrillos', 'Líderes Mexicanos — founder interview')}</li><li>${external('https://100ladrillos.com/post/chicharito-se-une-a-100-ladrillos', '100 Ladrillos — company announcement')}</li></ul>
        <div class="reconstruction"><strong>Role:</strong> PR strategy, agency leadership, spokesperson preparation, campaign and event support. Ximena does not claim authorship of independent coverage.</div>
      </div>
    </article>
    <article class="case-study" id="wework">
      <aside class="case-side"><div class="case-number">03</div><div class="case-tags"><span class="tag">Internal comms</span><span class="tag">Change</span><span class="tag">Leadership</span></div></aside>
      <div class="case-body"><p class="eyebrow">WeWork · 2022—2023</p><h2>Internal communications is operating infrastructure.</h2><p class="case-deck">My six-month regional mandate was to make leadership communication more consistent, useful and responsive for more than 2,000 colleagues.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Create a reliable internal rhythm across leadership updates, newsletters, all-hands and messaging channels.</p></div><div><span>What I saw</span><p>During change, fragmented channels are not a style problem. They are an operational risk.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Mapped audience needs, channel roles and decision owners.</li><li>Built editorial cadences, leader kits and fast-response pathways for sensitive moments.</li><li>Used employee questions and feedback signals to close the loop.</li></ul>
        <div class="outcome outcome-context"><strong>2,000+</strong><span>colleagues served across the regional communications system.</span><p>The outcome was clearer ownership and a more predictable place to understand what changed, why it mattered and what came next.</p></div>
        <div class="evidence-wall case-evidence-wall">
          ${evidenceImage({src:'/assets/media/internal-comms-overview-reconstruction.webp', width:'1400', height:'991', alt:'Reconstructed monthly internal communications overview with results, community news and upcoming dates', label:'Reconstruction', caption:'A public-safe model of the internal communications rhythm.', className:'evidence-wide'})}
          ${evidenceImage({src:'/assets/media/wework-hybrid-work-press.webp', width:'771', height:'1280', alt:'Newspaper coverage of hybrid work research by WeWork and Michael Page', label:'External communications', caption:'Research translated into a regional press story.'})}
          ${evidenceImage({src:'/assets/media/wework-alvaro-villar-tv.webp', width:'1280', height:'719', alt:'Álvaro Villar speaking about flexible workspaces on ADN40', label:'Media relations', caption:'Executive visibility on television.', className:'evidence-wide'})}
        </div>
        <div class="reconstruction"><strong>Reconstruction.</strong> The framework reflects Ximena’s actual process. Original internal materials and incident details are intentionally not published.</div>
      </div>
    </article>
    <article class="case-study" id="zendesk">
      <aside class="case-side"><div class="case-number">04</div><div class="case-tags"><span class="tag">Regional PR</span><span class="tag">Localization</span><span class="tag">B2B SaaS</span></div></aside>
      <div class="case-body"><p class="eyebrow">Zendesk · 2020—2022</p><h2>Localization is not translation.</h2><p class="case-deck">A global customer-experience thesis only travels when every market sees its own tension, evidence and credible voice in it.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Coordinate PR across Mexico, Chile, Argentina, Peru, Colombia and the Caribbean without fragmenting the global story.</p></div><div><span>What I saw</span><p>Consistency belonged in the argument. Relevance belonged in the proof, examples, media angle and spokesperson.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Built a shared message spine and a market-by-market angle matrix.</li><li>Coordinated agencies, spokespeople, briefings, assets and launch timing.</li><li>Turned research into interviews, live conversations and sustained news hooks.</li></ul>
        ${metricCard(impactMetrics[3])}
        <div class="video-feature-grid">
          ${videoCard({id:'T6OFh2cCdiM', title:'El poder de poner al cliente en el centro del negocio', meta:'Regional PR · spokesperson programme'})}
          ${videoCard({id:'RwEnBmEaXS4', title:'The importance of CX implementation in Latin America', meta:'Regional PR · research amplification'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://prensariotila.com/zendesk-presento-tendencias-en-experiencia-al-cliente-2022/', 'Prensario — CX Trends 2022 launch')}</li><li>${external('https://www.itsitio.com/soluciones/zendesk-tendencias-y-retos-para-la-experiencia-al-cliente-2022/', 'ITSitio — regional CX trends')}</li><li>${external('https://impactotic.co/empresas/las-empresas-que-inviertan-en-experiencia-del-cliente-tendran-mayor-rendimiento-en-2022-segun-encuesta-de-zendesk/', 'Impacto TIC — CX investment story')}</li></ul>
        <div class="reconstruction"><strong>Role:</strong> regional PR strategy, localization, agency and spokesperson coordination, media relations. Independent articles are listed as earned-media outcomes, not bylines.</div>
      </div>
    </article>
    <article class="case-study" id="expok">
      <aside class="case-side"><div class="case-number">05</div><div class="case-tags"><span class="tag">Agency</span><span class="tag">CSR / ESG</span><span class="tag">Team lead</span></div></aside>
      <div class="case-body"><p class="eyebrow">Expok · 2019—2020</p><h2>Purpose is not a press angle.</h2><p class="case-deck">CSR programmes become credible stories through specific people, places, trade-offs and evidence—not through a longer list of activities.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Lead multiple accounts, each with different audiences, risks and approval cultures, without making the work formulaic.</p></div><div><span>What I saw</span><p>Local consequence was the bridge between a corporate programme and a story another person might care about.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Led a three-person PR team and accounts including Toks, Mabe, LTH, Cemex and Universidad Anáhuac.</li><li>Developed angles, media materials, executive copy and review standards.</li><li>Connected programme activity to larger sustainability and community narratives.</li></ul>
        <div class="evidence-wall case-evidence-wall">
          ${evidenceImage({src:'/assets/media/expok-toks-bylined-column.webp', width:'1125', height:'1242', alt:'Newspaper page with a guest column about corporate responsibility and a Toks story', label:'Editorial work', caption:'Executive voice alongside earned client coverage.', className:'evidence-wide'})}
          ${evidenceImage({src:'/assets/media/expok-sustainability-press-1.webp', width:'1008', height:'1280', alt:'El Economista feature about sustainable development and Mexico policy', label:'Media outcome', caption:'Sustainability expertise made newsworthy.'})}
          ${evidenceImage({src:'/assets/media/expok-lth-press.webp', width:'966', height:'1280', alt:'NotiSUR newspaper coverage of LTH community and environmental programmes', label:'Account PR', caption:'Local programme, local consequence.'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://www.expoknews.com/etiqueta/lth/', 'Expok archive — LTH coverage and releases')}</li><li>${external('https://www.expoknews.com/lth-llevo-las-eco-jornadas-a-celaya-ninas-y-ninos-aprenden-a-cuidar-el-planeta-en-la-escuela-primaria-constitucion-de-1857/', 'LTH Eco Jornadas — Celaya')}</li><li>${external('https://www.expoknews.com/programa-de-educacion-ambiental-de-lth-imparte-eco-jornada-en-el-parque-chipinque-de-monterrey/', 'LTH environmental education — Monterrey')}</li></ul>
        <div class="reconstruction"><strong>Role:</strong> account and PR leadership, story development, media materials and team quality. Archive items are evidence of the account work, not automatic authorship claims.</div>
      </div>
    </article>
    <article class="case-study" id="field">
      <aside class="case-side"><div class="case-number">06</div><div class="case-tags"><span class="tag">Field marketing</span><span class="tag">Sales alignment</span><span class="tag">Attribution</span></div></aside>
      <div class="case-body"><p class="eyebrow">Cross-company operating system</p><h2>The room is not the result.</h2><p class="case-deck">An event matters when the right people enter with a reason to talk—and leave inside a coordinated commercial motion.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Turn field marketing from a logistics calendar into an account, narrative and pipeline discipline.</p></div><div><span>What I saw</span><p>Scan counts were obscuring the real questions: whom did we move, what did we learn and what happens next?</p></div></div>
        <ol class="process-line"><li><span>01</span><b>Thesis</b><small>Audience + tension</small></li><li><span>02</span><b>Accounts</b><small>Owners + intent</small></li><li><span>03</span><b>Moment</b><small>Room + content</small></li><li><span>04</span><b>24h SLA</b><small>Context + action</small></li><li><span>05</span><b>Learning</b><small>Opportunity + decision</small></li></ol>
        ${metricCard(impactMetrics[2])}
        <p><a href="${github}/field-marketing-pipeline-system">Open the complete field-marketing pipeline system →</a></p>
        <div class="reconstruction"><strong>Framework.</strong> The public templates reconstruct the operating method with fictional examples. No attendee, account or opportunity data is included.</div>
      </div>
    </article>
    <article class="case-study" id="ai">
      <aside class="case-side"><div class="case-number">07</div><div class="case-tags"><span class="tag">AI workflows</span><span class="tag">Human review</span><span class="tag">Operations</span></div></aside>
      <div class="case-body"><p class="eyebrow">Practical AI for marketing + communications</p><h2>More leverage. Same accountability.</h2><p class="case-deck">I use AI for repetition, comparison and first passes. I keep humans responsible for evidence, voice and judgment.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Make research, drafting, repurposing and QA faster without turning the output generic—or unsafe.</p></div><div><span>What I saw</span><p>The advantage is not “using AI.” It is building a reliable path from source to draft to accountable review.</p></div></div>
        <h3>What I built</h3><ul class="compact-list"><li>Source and assumption separation before generation.</li><li>Reusable workflows for synthesis, variants, repurposing and first-pass QA.</li><li>Human gates for facts, claim strength, cultural relevance, legal sensitivity and voice.</li></ul>
        <div class="outcome outcome-context"><strong>Human judgment</strong><span>remains the final editorial and reputational control.</span><p>This is an operations capability—not a claim of machine-learning engineering.</p></div>
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
  ['Apr 2026', 'Plata + Belvo: employment data and direct debit', 'Launch communications', 'https://belvo.com/blog/belvo-plata-bank-employment-data-bank-direct-debit-mexico/'],
  ['Mar 2026', 'PayJoy: employment data in mobile-phone credit decisions', 'Customer story', 'https://belvo.com/es/blog/belvo-payjoy-financiamiento-celulares-mexico-datos-empleo/'],
  ['2025', 'Smart Fit: recurring payments through open finance', 'Customer story', 'https://belvo.com/es/blog/smart-fit-belvo-pagos-recurrentes-open-finance/'],
  ['2025', 'Banco Azteca: six million income verifications', 'Customer story', 'https://belvo.com/es/blog/belvo-banco-azteca-verificaciones-ingresos-credito/'],
  ['2025', 'The state of bank direct debit in Mexico', 'Report launch', 'https://belvo.com/es/blog/estado-de-la-domiciliacion-bancaria-en-mexico-2025-el-nuevo-reporte-de-belvo-2/'],
  ['2024', 'Belvo validates PCI DSS Level 1 in Mexico', 'Product + trust announcement', 'https://belvo.com/es/blog/blog-belvo-mexico-validacion-pci-dss-nivel-1/'],
  ['2024', 'An income estimator built from employment data', 'Product announcement', 'https://belvo.com/es/blog/belvo-estimador-ingresos-datos-de-empleo/']
];

const videoItems = [
  { id: 'WuxH75mD_Gk', title: 'Fintech Heroes: Kueski and the future of digital credit in Mexico', meta: 'Belvo · editorial strategy + production' },
  { id: 'A65iBtccVz0', title: 'From the FinTech Mexico Festival 2026: Federica Gregorini', meta: 'Belvo · executive visibility' },
  { id: 'UltD4toNKMM', title: 'Iván Carmona: building the future with 100 Ladrillos', meta: '100 Ladrillos · founder visibility' },
  { id: 'dXUPVbkxzmk', title: 'Ladrillowners: real-estate investment and risk management', meta: '100 Ladrillos · event + content strategy' },
  { id: 'V7SzXUTj49g', title: '“WeWork está mejor que nunca”: Álvaro Villar', meta: 'WeWork · media relations + spokesperson preparation' },
  { id: 'e3LUw5Fx3gQ', title: 'Clientes contentos en tiempos difíciles', meta: 'Zendesk · regional PR + spokesperson programme' },
  { id: 'T6OFh2cCdiM', title: 'El poder de poner al cliente en el centro del negocio', meta: 'Zendesk · regional PR + live conversation' },
  { id: 'VYVX4EXVJZM', title: 'Tendencias de CX 2021 with Eva García Luna', meta: 'Zendesk · research launch + spokesperson programme' },
  { id: 'hj1wHCOzI4M', title: 'Cómo pueden las empresas sobrevivir a la nueva realidad digital', meta: 'Zendesk · media relations + thought leadership' },
  { id: 'RwEnBmEaXS4', title: 'The importance of CX implementation in Latin America', meta: 'Zendesk · regional research amplification' },
  { id: 'x5-BBQ8_w5E', title: 'CX: Tendencias Customer Experience 2021', meta: 'Zendesk · research launch + media relations' },
  { id: 'fNVqQnnt6nc', title: 'Patrimonio al alcance de la mano, ladrillo a ladrillo', meta: '100 Ladrillos · media conversation' },
  { id: 'kS76xlaqWgQ', title: 'Ladrillowners Monterrey', meta: '100 Ladrillos · field event' },
  { id: 'XyDL3LGsQ3Q', title: 'Zendesk | Eva García Luna', meta: 'Zendesk · regional spokesperson visibility' },
  { id: '1slrrj0nlUk', title: 'La tecnología ayuda a humanizar la atención', meta: 'Zendesk · thought leadership' }
];

const writing = layout({
  title: 'Writing & Media — Ximena Aguirre',
  description: 'Authored work, executive ghostwriting, public relations outcomes, interviews and video work by senior communications leader Ximena Aguirre.',
  path: '/writing/',
  body: `${pageHero('Writing + media', 'The work leaves a paper trail.', 'Some pieces carry my byline. Some carry an executive’s. Some show up as coverage. The distinction matters—and it is labeled here.', [['Authored', 'My byline'], ['Ghostwritten', 'Executive voice'], ['Earned', 'PR outcome'], ['Format', 'Print · web · video · audio']])}

  <section class="section section-light"><div class="site-shell">
    <div class="writing-modes" data-reveal>
      <article><span>01</span><h3>Authored</h3><p>Signed work: product launches, customer stories and reports written for a specialist B2B audience.</p></article>
      <article><span>02</span><h3>Written for leaders</h3><p>Ghostwriting and editorial development in another person’s voice. The published byline remains theirs.</p></article>
      <article><span>03</span><h3>Earned</h3><p>Story development, media relations and spokesperson preparation. Coverage is an outcome, not an authorship claim.</p></article>
    </div>
  </div></section>

  <section class="section"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Selected authored work</p><h2>Complex products.<br>Plain language.</h2></div><p>Open finance, employment data, payments and trust—written without flattening the technical detail.</p></div>
    <div class="article-link-grid">${writingItems.map(([date, title, role, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer"><small>${date} · ${role}</small><strong>${title}</strong><span>Read ↗</span></a>`).join('')}</div>
    <p class="small muted">Byline status is verified through ${external('https://belvo.com/es/author/ximena-aguirre/', 'the Belvo author archive')}.</p>
  </div></section>

  <section class="section section-dark"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Written for leaders</p><h2>Thought leadership in someone else’s voice.</h2></div><p>Good ghostwriting should sound like the expert—not the communications person behind the draft.</p></div>
    <div class="byline-grid">
      <div class="byline-visual">${evidenceImage({src:'/assets/media/expok-toks-bylined-column.webp', width:'1125', height:'1242', alt:'Newspaper page featuring an executive guest column on corporate responsibility', label:'Executive voice', caption:'Ghostwriting and editorial development for subject-matter leaders.'})}</div>
      <div class="byline-links">
        <a href="https://www.eleconomista.es/economiahoy/opinion/noticias/10572655/05/20/Que-podemos-aprender-de-las-Pymes.html" target="_blank" rel="noopener noreferrer"><small>Executive byline · ghostwriting</small><strong>¿Qué podemos aprender de las PyMEs?</strong><span>El Economista ↗</span></a>
        <a href="https://publimark.cl/opinion/dubra-valenzuela-cuatro-tips-para-startups-y-pymes.html" target="_blank" rel="noopener noreferrer"><small>Executive byline · ghostwriting</small><strong>Cuatro tips para startups y pymes</strong><span>Publimark ↗</span></a>
        <a href="https://pymempresario.com/liderazgo-innovador-estrategia-de-supervivencia/" target="_blank" rel="noopener noreferrer"><small>Spokesperson narrative · editorial placement</small><strong>Liderazgo innovador, estrategia de supervivencia</strong><span>Pymempresario ↗</span></a>
      </div>
    </div>
  </div></section>

  <section class="section"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Coverage + clippings</p><h2>The story after it leaves the brief.</h2></div><p>Print and broadcast evidence from external communications, PR and executive-visibility work.</p></div>
    <div class="clipping-grid" data-reveal>
      ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper coverage of Belvo and Clip partnership', label:'Belvo · PR outcome', caption:'Open-finance partnership coverage.', className:'clipping-landscape'})}
      ${evidenceImage({src:'/assets/media/wework-hybrid-feature.webp', width:'762', height:'954', alt:'Magazine feature about hybrid work featuring WeWork Mexico CEO Álvaro Villar', label:'WeWork · media relations', caption:'Executive positioning around hybrid work.'})}
      ${evidenceImage({src:'/assets/media/wework-hybrid-work-press.webp', width:'771', height:'1280', alt:'Newspaper feature about WeWork and Michael Page hybrid-work research', label:'WeWork · research story', caption:'Regional data turned into a news hook.'})}
      ${evidenceImage({src:'/assets/media/expok-sustainability-press-1.webp', width:'1008', height:'1280', alt:'El Economista article about sustainable development', label:'Expok · story development', caption:'Expert narrative + media relations.'})}
      ${evidenceImage({src:'/assets/media/expok-lth-press.webp', width:'966', height:'1280', alt:'NotiSUR coverage of LTH social responsibility programmes', label:'Expok · account PR', caption:'Community impact in local media.'})}
    </div>
  </div></section>

  <section class="section section-blue"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Video + live media</p><h2>Preparing the voice—and the moment.</h2></div><p>Interviews, live conversations, event content and executive visibility across fintech, SaaS and workplace.</p></div>
    <div class="video-grid">${videoItems.map(videoCard).join('')}</div>
    <div class="audio-feature"><div><p class="eyebrow">Podcast</p><h3>View from the Top: leadership and the future of work</h3><p>Editorial and executive-visibility work around a leadership conversation with WeWork COO Liliana Méndez.</p></div><iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/17agLGCAI2yClM7tDUf90P?utm_source=generator" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify podcast episode"></iframe></div>
  </div></section>

  <section class="section-tight"><div class="site-shell"><p class="small muted">Role labels describe Ximena’s contribution to the communications work. Independent editorial decisions, presenter performance and third-party coverage remain attributable to their publishers and speakers.</p></div></section>`
});

const about = layout({
  title: 'About — Ximena Aguirre',
  description: 'Ximena Aguirre is a senior 360° communications leader spanning internal communications, external communications, PR and field marketing across Europe and Latin America.',
  path: '/about/',
  schema: true,
  body: `${pageHero('About', 'My range is the point.', 'I have worked on the inside of organizations, in the press room and in the field. That is why I understand communications as one connected business function.', [['Scope', 'Europe + Latin America'], ['Practice', 'Internal · External · Field'], ['Languages', 'Spanish · English'], ['Experience', '10 years']])}
  <section class="section"><div class="site-shell about-story"><div><p class="eyebrow">The short version</p><blockquote class="quote">What a company says has to work on the inside, hold up on the outside and survive contact with the market.</blockquote></div><div class="measure"><p class="lede">I did not become a 360° communications leader by collecting channels.</p><p>I learned each side of the job where it mattered. Public affairs and CSR taught me to look for evidence. Zendesk taught me how to localize a global story. WeWork put me inside the organization, building clarity for leaders and employees. At 100 Ladrillos and Belvo, I brought PR, launches, events, Sales alignment and commercial measurement into the same frame.</p><p>I am senior enough to set the direction and hands-on enough to write the message, prepare the spokesperson, brief the agency, run the room and question the report.</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><p class="eyebrow">How I work</p><div class="note-grid note-grid-three"><article class="note"><strong>Start with the reality.</strong><p>Understand the product, the people and the tension before choosing a channel.</p></article><article class="note"><strong>Make the story usable.</strong><p>A narrative must help leaders decide, teams act and audiences understand.</p></article><article class="note"><strong>Measure the movement.</strong><p>Coverage, participation and pipeline only matter when the denominator is clear.</p></article></div></div></section>
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
  description: 'Résumé of Ximena Aguirre: senior 360° communications leader across internal communications, external communications, PR, field marketing and GTM.',
  path: '/resume/',
  body: `${pageHero('Résumé', 'Senior 360° Communications, PR & Field Marketing Leader', 'One connected practice across employees, leaders, media, customers, events and commercial teams in Europe and Latin America.', [['Scope', 'Europe + Latin America'], ['Authorization', 'Spain · no sponsorship required'], ['Languages', 'Spanish · English'], ['Education', 'BA Communication']])}
  <section class="section-tight no-print"><div class="site-shell"><div class="hero-actions"><button class="button button-solid" type="button" data-print>Print / save as PDF</button><a class="button" href="${linkedin}" target="_blank" rel="noopener noreferrer">Request a copy on LinkedIn</a></div></div></section>
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Profile</p><h2>One connected communications function.</h2></div><div><p class="lede">Ten years across the full communications journey: aligning employees and leaders, shaping external narratives, earning media attention, preparing spokespeople, building field moments and connecting them to commercial follow-up.</p><p class="kicker-line"><strong>Core:</strong> Internal communications · Corporate and external communications · PR and media relations · Field marketing · Executive visibility · Product/GTM launches · Reputation · Measurement</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><p class="eyebrow">Experience</p><div class="timeline">
    <div class="timeline-item"><span class="timeline-date">Mar 2024—present</span><div><h3>Belvo</h3><p>Marketing & Communications Manager, Mexico</p></div><div><p>Own Mexico communications across PR, product/GTM launches, customer stories, executive visibility and field marketing; partner with Product, Sales, Customer Success, Partnerships, Data, Finance, leadership, agencies and regional teams.</p><p><strong>Selected proof:</strong> 12+ launches; 19→42 quarterly media mentions (+121%); 1,729 MQLs in 2025 (+129.6% YoY); US$722.9K event-sourced ACV in 2024 (+362% YoY).</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Feb 2023—Mar 2024</span><div><h3>100 Ladrillos</h3><p>PR & Events Manager</p></div><div><p>Led PR, events, investor communications, executive positioning, agency work and issue-response protocols for a proptech investment platform.</p><p><strong>Selected proof:</strong> 8×+ indexed visibility in the documented portfolio period.</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Aug 2022—Feb 2023</span><div><h3>WeWork</h3><p>Internal Communications & Public Affairs Senior Lead</p></div><div><p>Built a regional channel and editorial operating rhythm for 2,000+ colleagues; supported leaders and change moments with clear, coordinated communications.</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Apr 2020—Aug 2022</span><div><h3>Zendesk</h3><p>PR & Communications Associate → Regional PR Lead</p></div><div><p>Led regional PR localization, agencies, spokespeople and research launches across Mexico, Chile, Argentina, Peru, Colombia and the Caribbean.</p><p><strong>Selected proof:</strong> +78% regional media exposure.</p></div></div>
    <div class="timeline-item"><span class="timeline-date">Mar 2019—Apr 2020</span><div><h3>Expok</h3><p>Account Manager → Head of PR</p></div><p>Led a three-person PR team and accounts across corporate responsibility, sustainability and education.</p></div>
    <div class="timeline-item"><span class="timeline-date">2016—2019</span><div><h3>3AM · COPRED · AIESEC</h3><p>Account management · Communications advisor · Marketing & PR leadership</p></div><p>Built the foundation across agency, public-sector and nonprofit work; led a 12-person AIESEC team and increased leads by 83%.</p></div>
  </div></div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Tools</p><h2>Fluent enough to make the system run.</h2></div><div><p><strong>CRM + measurement:</strong> HubSpot, Salesforce, Tableau, Power BI</p><p><strong>Content + collaboration:</strong> WordPress, Notion, Figma, Jira, Asana</p><p><strong>Media + research:</strong> Meltwater, Cision/Gorkana, SEMrush</p><p><strong>Events:</strong> Eventbrite, Luma, StreamYard</p><p><strong>AI-assisted work:</strong> ChatGPT, Gemini, NotebookLM, Claude, Cursor—with human review.</p></div></div></section>
  <section class="section-tight"><div class="site-shell"><p class="small"><strong>Education:</strong> BA in Communication, Universidad Panamericana, 2014—2018. · <strong>Contact:</strong> ${external(linkedin, 'LinkedIn')} · ${external(github, 'GitHub')}</p><p class="small muted">Performance figures are portfolio records. Confidential dashboards, direct personal contact details, private company materials and former work contact details are not published.</p></div></section>`
});

const recruiter = layout({
  title: '90-Second Recruiter View — Ximena Aguirre',
  description: 'A concise recruiter view of Ximena Aguirre’s 360° communications experience, results, flagship work, tools, languages and availability.',
  path: '/recruiter/',
  body: `${pageHero('90-second recruiter view', 'A 360° communications leader—not a collection of channels.', 'Ximena works across internal communications, external communications, PR and field marketing. She sets the narrative, aligns the people around it and stays close enough to the work to execute and measure it.', [['Experience', '10 years'], ['Markets', 'Europe + Latin America'], ['Languages', 'Spanish · English'], ['Work status', 'Authorized in Spain']])}
  <section class="section-tight"><div class="site-shell"><p class="eyebrow">Results in one line</p><div class="recruiter-results"><div><strong>19 → 42</strong><span>quarterly media mentions</span><small>Belvo Mexico · Q1 2024 to Q4 2025</small></div><div><strong>1,729</strong><span>MQLs in 2025</span><small>Belvo Mexico · +129.6% YoY</small></div><div><strong>US$722.9K</strong><span>event-sourced ACV</span><small>Belvo · 2024 · +362% YoY</small></div><div><strong>+78%</strong><span>regional media exposure</span><small>Zendesk · six-month regional period</small></div><div><strong>2,000+</strong><span>colleagues served</span><small>WeWork · internal communications</small></div></div></div></section>
  <section class="section"><div class="site-shell split"><div class="sticky-label"><p class="eyebrow">Best evidence</p><h2>Three cases to open first.</h2></div><div class="case-list"><a class="case-row" href="/case-studies/#belvo"><span class="case-index">01</span><div><h3>Belvo</h3><p>Integrated Mexico narrative, launches, customer proof and field pipeline.</p></div><p>Best for: B2B fintech · GTM · Comms leadership</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#zendesk"><span class="case-index">02</span><div><h3>Zendesk</h3><p>A multi-market PR localization engine.</p></div><p>Best for: regional roles · SaaS · external comms</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#field"><span class="case-index">03</span><div><h3>Field system</h3><p>Event thesis through opportunity measurement.</p></div><p>Best for: field marketing · sales alignment · pipeline</p><span class="case-arrow">↗</span></a></div></div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">Role fit</p><h2>Where the profile is strongest.</h2></div><div><p class="lede">Senior / Lead / Manager roles that need one person to connect corporate and internal communications, regional PR, executive visibility, field marketing and launches.</p><p><strong>Particularly credible in:</strong> complex B2B products, multi-market work, cross-functional leadership, reputation, events tied to commercial outcomes and responsible AI-assisted operations.</p><p><strong>Not positioned as:</strong> a pure growth marketer, social-first creator, performance-media specialist or software engineer.</p></div></div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Practical</p><h2>Ready for the conversation.</h2></div><div><p><strong>Work authorization:</strong> Spain; no sponsorship required</p><p><strong>Languages:</strong> Spanish (native), English (C2)</p><p><strong>Tools:</strong> HubSpot, Salesforce, WordPress, Notion, Figma, Meltwater/Cision, Tableau/Power BI, ChatGPT, Gemini, NotebookLM, Claude, Cursor.</p><div class="hero-actions"><a class="button button-solid" href="/resume/">Open résumé</a><a class="button" href="${linkedin}" target="_blank" rel="noopener noreferrer">Contact on LinkedIn</a></div></div></div></section>`
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
    <details><summary>+78% regional exposure</summary><div>Zendesk portfolio record for a documented six-month period within the 2020—2022 regional PR remit. Public coverage examples demonstrate the program; the underlying media report remains private.</div></details>
  </div></div></section>
  <section class="section section-light"><div class="site-shell split split-even"><div><p class="eyebrow">Three evidence classes</p><h2>A label for every claim.</h2></div><div><p><strong>Public record:</strong> bylines, author archives, company announcements and third-party coverage available at a stable URL.</p><p><strong>Performance record:</strong> figures documented in Ximena’s résumé and portfolio, checked for internal consistency but not linked to confidential dashboards.</p><p><strong>Reconstruction:</strong> a clean demonstration of the actual process, using fictional or generalized inputs instead of company material.</p></div></div></section>
  <section class="section"><div class="site-shell"><p class="eyebrow">Intentionally withheld</p><div class="note-grid"><div class="note"><strong>Personal data</strong><p>Phone number, home address and former work contact details.</p></div><div class="note"><strong>Company data</strong><p>CRM exports, account lists, budgets, attendee details and internal dashboards.</p></div><div class="note"><strong>Sensitive context</strong><p>Incident specifics, confidential launch material and internal communications artifacts.</p></div></div></div></section>`
});

const contact = layout({
  title: 'Contact — Ximena Aguirre',
  description: 'Contact Ximena Aguirre for senior B2B marketing, communications, PR, field marketing and regional leadership opportunities.',
  path: '/contact/',
  body: `<section class="section contact-hero"><div class="site-shell"><p class="eyebrow">Contact</p><h1>Need one story to work for more than one audience?</h1><p class="lede">The best place to start a professional conversation is LinkedIn.</p><div class="hero-actions"><a class="button button-solid" href="${linkedin}" target="_blank" rel="noopener noreferrer">Contact on LinkedIn</a><a class="button" href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a></div><p class="small muted">Authorized to work in Spain · Open to senior international Communications, PR and Field Marketing opportunities.</p></div></section>`
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
