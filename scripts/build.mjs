import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const origin = 'https://ximenaaguirrerdz-ctrl.github.io';
const github = 'https://github.com/ximenaaguirrerdz-ctrl';
const linkedin = 'https://www.linkedin.com/in/ximena-aguirre-rodr%C3%ADguez-/';
const belvoAuthor = 'https://belvo.com/es/author/ximena-aguirre/';

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
      <a class="brand" href="/" aria-label="Ximena Aguirre: home">
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
      <p class="footer-note">Based in Madrid. Working across Europe and Latin America.</p>
      <p class="small muted">© <span data-year>2026</span> Ximena Aguirre. Built as a fast, accessible static site.</p>
    </div>
  </footer>`;
}

function personData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${origin}/#ximena-aguirre`,
    name: 'Ximena Aguirre Rodríguez',
    alternateName: 'Ximena Aguirre',
    url: origin,
    image: `${origin}/assets/media/ximena-aguirre-portrait.webp`,
    jobTitle: 'Senior Communications & Marketing Manager',
    description: 'Madrid-based Senior Communications & Marketing Manager with 10 years across corporate and internal communications, PR and media relations, Product Marketing, GTM, executive communications and Field Marketing for B2B technology and fintech across Europe and Latin America.',
    sameAs: [linkedin, github, belvoAuthor],
    homeLocation: { '@type': 'Place', name: 'Madrid, Spain' },
    knowsLanguage: ['Spanish', 'English'],
    knowsAbout: ['B2B technology marketing', 'B2B SaaS', 'Fintech marketing', 'Open finance and payments', 'Corporate communications', 'Internal communications', 'Employee communications', 'Leadership communications', 'Change communications', 'External communications', 'Public relations', 'Media relations', 'Reputation management', 'Crisis communications', 'Issues management', 'Security and compliance communications', 'Product marketing', 'Product positioning and messaging', 'Go-to-market strategy', 'Product launches', 'Field marketing', 'Event strategy', 'Integrated campaigns', 'Partner marketing', 'Demand generation', 'Lead generation', 'CRM and lifecycle marketing', 'Sales alignment', 'Sales enablement', 'Customer marketing', 'Marketing measurement', 'Pipeline attribution', 'Audience and market insights', 'SEO-informed content strategy', 'Thought leadership', 'Executive communications', 'Stakeholder management', 'Cross-functional leadership', 'Multi-market localization', 'AI-enabled content operations', 'Europe and Latin America']
  };
}

function schemaMarkup(schema, canonical) {
  const person = personData();
  if (schema === 'profile') {
    const { '@context': context, ...mainEntity } = person;
    return JSON.stringify({
      '@context': context,
      '@type': 'ProfilePage',
      '@id': `${canonical}#profile`,
      url: canonical,
      mainEntity
    });
  }
  return JSON.stringify(person);
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
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#f2efe7">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Ximena Aguirre">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${origin}/assets/media/ximena-aguirre-portrait.webp">
  <meta property="og:image:alt" content="Ximena Aguirre, Senior Communications and Marketing Manager in Madrid">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${origin}/assets/media/ximena-aguirre-portrait.webp">
  ${schema ? `<script type="application/ld+json">${schemaMarkup(schema, canonical)}</script>` : ''}
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

function evidenceImage({ src, width, height, alt, label, caption, className = '', loading = 'lazy' }) {
  return `<figure class="evidence-image ${className}">
    <a class="evidence-link" href="${src}" target="_blank" aria-label="Open this portfolio image at full size"><img src="${src}" width="${width}" height="${height}" alt="${alt}" loading="${loading}" decoding="async"${loading === 'eager' ? ' fetchpriority="high"' : ''}></a>
    <figcaption><span>${label}</span>${caption}</figcaption>
  </figure>`;
}

function videoCard({ id, title, meta }) {
  const brand = meta.split(' · ')[0];
  return `<a class="video-card" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer" data-kind="video">
    <span class="video-poster" aria-hidden="true"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" width="480" height="360" alt="" loading="lazy" decoding="async"><b>${brand}</b><i>Play ↗</i></span>
    <span class="video-copy"><small>${meta}</small><strong>${title}</strong><span>Watch on YouTube ↗</span></span>
  </a>`;
}

function voiceCard({ company, people, contribution, proof, links }) {
  return `<article class="voice-card">
    <header><span>${company}</span><h3>${people}</h3></header>
    <p>${contribution}</p>
    <strong>${proof}</strong>
    <div class="voice-links">${links.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}</div>
  </article>`;
}

function leadForm(source = 'contact') {
  const formUrl = `https://tally.so/embed/obPWZP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&utm_source=portfolio&utm_medium=website&utm_campaign=portfolio_contact&utm_content=${encodeURIComponent(source)}&page=${encodeURIComponent(source)}`;
  return `<div class="tally-form" data-reveal>
    <div class="tally-form-head"><span>A short note is enough</span><strong>Start the conversation.</strong></div>
    <iframe data-tally-src="${formUrl}" loading="lazy" width="100%" height="620" frameborder="0" marginheight="0" marginwidth="0" title="Contact Ximena Aguirre"></iframe>
    <p class="form-fallback">If the form does not load, <a href="https://tally.so/r/obPWZP" target="_blank" rel="noopener noreferrer">open it in a new tab ↗</a>.</p>
    <p class="form-privacy">Your message goes directly to Ximena through Tally. No newsletter and no automatic sales sequence.</p>
    <script async src="https://tally.so/widgets/embed.js"></script>
  </div>`;
}

const careerItems = [
  {
    date: 'Mar 2024 to 2026',
    company: 'Belvo',
    role: 'Marketing & Communications Manager, Mexico',
    story: 'I connected communications, Product Marketing, field, CRM and data for a regulated B2B fintech, working with teams in Mexico, Spain and Colombia.',
    proof: '12+ launches, 17 customer stories, 1,729 MQLs in 2025 and US$722.9K in event-sourced ACV in 2024.'
  },
  {
    date: '2024 to 2025',
    company: 'Independent / ThinkY',
    role: 'Marketing & Communications Strategist',
    story: 'I built the communications proposal and co-led a PR system that repositioned a creator-marketing agency around strategic thinking, market data and business relevance—not awards alone.',
    proof: '41 placements, 28 in Tier 1 media, 76.7M reported reach and MXN 5.5M in modelled PR value.'
  },
  {
    date: 'Feb 2023 to Mar 2024',
    company: '100 Ladrillos',
    role: 'PR & Events Manager',
    story: 'I made a new investment model easier to understand through founder positioning, investor communications, events, KOL work and issue readiness.',
    proof: '55+ media appearances in 13 months and 14 items still visible in the public press archive.'
  },
  {
    date: 'Aug 2022 to Feb 2023',
    company: 'WeWork',
    role: 'Internal Communications & Public Affairs Senior Lead',
    story: 'I built a clearer regional rhythm for leaders and more than 2,000 colleagues during a period of change.',
    proof: 'Channel architecture, newsletters, all-hands, leadership communication and fast-response coordination.'
  },
  {
    date: 'Apr 2020 to Aug 2022',
    company: 'Zendesk',
    role: 'PR & Communications Associate to Regional PR Lead',
    story: 'I learned how to keep one global idea coherent while giving six Latin American markets and the Caribbean their own reason to care.',
    proof: '+78% regional media exposure across the documented six-month period.'
  },
  {
    date: 'Mar 2019 to Apr 2020',
    company: 'Expok',
    role: 'Account Manager to Head of PR',
    story: 'I led CSR, ESG and education accounts, turning technical programmes into stories with a visible human consequence.',
    proof: 'Five client accounts and a three-person PR team.'
  },
  {
    date: 'Oct 2018 to Mar 2019',
    company: '3AM',
    role: 'Account Manager',
    story: 'I handled PR for three luxury fashion brands and learned to adapt global expectations to the reality of the Mexican market.',
    proof: 'Brand relaunches, events, media relations and creator relationships.'
  },
  {
    date: 'Jan to Oct 2018',
    company: 'COPRED',
    role: 'Communications Advisor',
    story: 'I worked close to public issues and learned to listen for what a statement means to the person living its consequences.',
    proof: 'TV and radio logistics and scripts, releases, statements and media monitoring.'
  },
  {
    date: 'Jan 2016 to Jan 2017',
    company: 'AIESEC',
    role: 'Director of Marketing & PR',
    story: 'I led my first team and discovered that curiosity, trust and a clear follow-up process could turn attention into participation.',
    proof: 'A 12-person team, 83% more leads year over year and Good Case of Practice recognition for lead generation.'
  }
];

function careerTimeline({ detailed = false } = {}) {
  return `<ol class="career-timeline" data-reveal>${careerItems.map((item) => `<li>
    <span class="career-dot" aria-hidden="true"></span>
    <time>${item.date}</time>
    <div class="career-role"><h3>${item.company}</h3><p>${item.role}</p></div>
    <div class="career-copy"><p>${item.story}</p>${detailed ? `<strong>${item.proof}</strong>` : ''}</div>
  </li>`).join('')}</ol>`;
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
    context: '1,729 MQLs recorded in 2025, 129.6% above the previous year across the integrated Mexico programme.',
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
  title: 'Ximena Aguirre | Communications & Marketing Manager',
  description: 'Madrid-based Senior Communications & Marketing Manager with 10 years across Corporate Communications, PR, Product Marketing, GTM and Field Marketing.',
  path: '/',
  schema: 'profile',
  body: `
  <section class="section story-hero" id="my-story" aria-labelledby="story-title">
    <div class="site-shell story-opening">
      <div class="story-intro story-intro-conversational">
        <p class="eyebrow">Ximena Aguirre · Madrid · B2B tech + fintech</p>
        <h1 id="story-title">You know when the product is good, the people are smart, plenty is happening—and somehow the story still isn’t clear?</h1>
        <p class="lede"><strong>That’s usually where I come in.</strong></p>
        <p class="hero-role">For the past 10 years, I’ve worked with Product, Sales, founders, leadership and market teams to figure out what matters, put it into words people can actually use, and make sure the idea survives once it leaves the meeting.</p>
        <p class="hero-detail">Sometimes that means positioning a product. Sometimes it means helping a leader say what they actually mean, making a global story work in a local market, or turning an event into something Sales can use the next morning.</p>
        <p class="hero-detail"><strong>The channel comes later.</strong></p>
        <div class="hero-actions">
          <a class="button button-solid" href="/work/">See my work</a>
          <a class="button" href="/recruiter/">The 90-second version</a>
        </div>
        <dl class="hero-facts"><div><dt>Experience</dt><dd>10 years</dd></div><div><dt>Practice</dt><dd>Comms · Product · Field</dd></div><div><dt>Markets</dt><dd>Europe + Latin America</dd></div></dl>
      </div>
      <figure class="hero-portrait story-portrait">
        <div class="portrait-frame"><img src="/assets/media/ximena-aguirre-portrait.webp" width="800" height="800" alt="Ximena Aguirre, Senior Communications and Marketing Manager based in Madrid" loading="eager" decoding="async" fetchpriority="high"></div>
        <figcaption><span>Madrid · Spanish + English</span><strong>B2B technology and fintech, across Europe and Latin America.</strong></figcaption>
      </figure>
    </div>
  </section>

  <section class="section" aria-labelledby="alignment-title">
    <div class="site-shell split split-even">
      <div><p class="eyebrow">What I notice</p><h2 id="alignment-title">A lot of my job is noticing what isn’t lining up yet.</h2></div>
      <div class="decision-copy"><p class="lede">The product says one thing. Sales hears another. Leadership has a bigger ambition. The market has its own questions.</p><p>None of them are necessarily wrong.</p><p><strong>My job is to find the version they can all move with.</strong></p><p>That usually means getting close to the product, asking more questions than expected, finding the real tension and making a few clear choices before anyone starts producing things.</p><p class="micro-statement">Then I stay.</p><p>Through the launch. The interview. The event. The internal conversation. The Sales follow-up. The numbers afterwards.</p><p><strong>Strategy is more useful when you’re still around to see what happened.</strong></p></div>
    </div>
  </section>

  <section class="section section-light" aria-labelledby="questions-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">The recurring questions</p><h2 id="questions-title">The problems look different. The questions underneath are surprisingly similar.</h2></div><p>Four questions have followed me across Communications, Product Marketing, regional work and Field Marketing.</p></div>
      <div class="problem-map problem-map-copy" data-reveal>
        <article><span>Product Marketing</span><strong>Is the product clear enough to choose?</strong><p>I work with Product and Sales to find the positioning, proof and language that make a complex offer easier to understand without making it less true.</p><small>Positioning · messaging · GTM · Sales enablement</small></article>
        <article><span>Corporate Communications</span><strong>Does anyone outside the company have a reason to care?</strong><p>I find the story that earns attention, then work with leaders, experts, media and partners to make it credible.</p><small>Reputation · executive visibility · media relations</small></article>
        <article><span>Regional marketing</span><strong>Will this make sense in another market?</strong><p>Usually, translation isn’t the problem. Context is. I keep the strategy and change the evidence, language, spokesperson, angle or moment.</p><small>Localization · multi-market communications · Europe + Latin America</small></article>
        <article><span>Field + lifecycle</span><strong>And then what?</strong><p>An event filled a room. A story got coverage. A launch got attention. Great. <em>What happened next?</em></p><p>That question pulled my work closer to CRM, Sales follow-up, lead quality, pipeline and measurement.</p><small>Field Marketing · CRM · Sales alignment · attribution</small></article>
      </div>
    </div>
  </section>

  <section class="section impact-section" aria-labelledby="impact-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">How I measure</p><h2 id="impact-title">I like knowing what happened next.</h2></div><p>Not every useful result belongs in the same column.</p></div>
      <div class="recruiter-results home-results" data-reveal>
        <div><strong>+129.6%</strong><span>MQLs YoY</span><small>Belvo Mexico · 2025 vs 2024 · integrated marketing</small></div>
        <div><strong>+38%</strong><span>Deals created</span><small>Belvo · Q4 2025 vs Q4 2024</small></div>
        <div><strong>US$722.9K</strong><span>Event-sourced ACV</span><small>Belvo · 2024 · +362% YoY</small></div>
        <div><strong>+121%</strong><span>Quarterly media mentions</span><small>Belvo Mexico · Q1 2024 to Q4 2025</small></div>
      </div>
      <p class="evidence-line"><strong>Different signals use different baselines.</strong> I do not force them into one claim, and I label my contribution to each programme. <a href="/proof/">See the definitions and evidence →</a></p>
    </div>
  </section>

  <section class="section section-blue" aria-labelledby="ai-title">
    <div class="site-shell ai-story">
      <div class="ai-copy"><p class="eyebrow">Applied AI + content operations</p><h2 id="ai-title">The model could write. Context was the hard part.</h2><p class="lede">Anyone can ask an LLM for a first draft. The harder question is: <strong>what should it know before it starts?</strong></p><p>At Belvo, I worked with engineering on an internal AI-assisted editorial system built around approved product knowledge, market context, brand voice and human review.</p><p>We used AI to make the first pass faster. <strong>Not to decide what was true.</strong></p></div>
      <div>
        <ol class="ai-flow" data-reveal><li><span>01</span><strong>Approved truth</strong><small>Product knowledge and source material</small></li><li><span>02</span><strong>Working context</strong><small>Voice, market and editorial rules</small></li><li><span>03</span><strong>LLM draft</strong><small>First passes and useful variants</small></li><li><span>04</span><strong>Human review</strong><small>Facts, claims, nuance and judgment</small></li><li><span>05</span><strong>Market-ready</strong><small>SEO, GEO and local adaptation</small></li></ol>
        <div class="tool-band"><span>Built with engineering</span><strong>LLMs · Cursor · GitHub</strong><span>My broader toolkit</span><strong>ChatGPT · Gemini · Claude · NotebookLM · Cursor</strong></div>
        <p class="small"><a href="/case-studies/#ai">Read the full AI case →</a></p>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="human-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">How I work</p><h2 id="human-title">A few things I’ve learned to trust.</h2></div><p>These are the habits behind the work.</p></div>
      <div class="human-grid" data-reveal>
        <article><span>How I learn</span><h3>If something sounds simple too quickly, I probably haven’t understood it yet.</h3><p>I ask Product again. I talk to Sales. I look at what customers are actually asking. I read the numbers. Then I simplify.</p><small>Curiosity · active listening · customer orientation · analytical thinking</small></article>
        <article><span>How I connect</span><h3>The interesting part is often between teams.</h3><p>What Product knows. What leadership wants. What Sales needs. What the customer hears. That gap is usually where the work is.</p><small>Systems thinking · cross-functional leadership · stakeholder influence</small></article>
        <article><span>How I write</span><h3>Good writing is mostly good thinking with fewer places to hide.</h3><p>I write launches, bylines, executive points of view, customer stories, messaging and internal communications. The sentence gets better when the idea does.</p><small>Creative thinking · writing · executive communications · thought leadership</small></article>
        <article><span>How I respond</span><h3>Calm is useful.</h3><p>Especially when something changed late, the answer isn’t complete yet or everyone suddenly needs something at once. Figure out what we know. What we don’t. What needs a decision now.</p><small>Resilience · flexibility · change communications · crisis communications</small></article>
        <article><span>How I use technology</span><h3>New tools are only interesting if they improve the work.</h3><p>I use AI, CRM, analytics, SEO and automation regularly. I’m curious about the technology; I’m more interested in what it lets the team do better.</p><small>AI · technological literacy · continuous learning</small></article>
      </div>
    </div>
  </section>

  <section class="section section-dark" aria-labelledby="voices-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">The voices I have helped carry</p><h2 id="voices-title">Executive communication starts with how the person thinks.</h2></div><p>I turn expertise into a point of view that can live in a column, an interview, a keynote, a podcast or a difficult internal message.</p></div>
      <div class="voice-ledger" data-reveal>
        <article><div><span>Belvo</span><h3>Federica Gregorini</h3></div><p>I shaped executive narratives across columns, interviews and live fintech content.</p><strong>5 Fast Company columns</strong><a href="https://fastcompany.mx/author/federica-gregorini/" target="_blank" rel="noopener noreferrer">Open archive ↗</a></article>
        <article><div><span>Zendesk</span><h3>Alex Barrera · Raúl Rodríguez · Dubra Valenzuela</h3></div><p>I developed regional storylines, executive copy and media moments for different markets and voices.</p><strong>30 Promesas + Forbes + a 4-part editorial series</strong><a href="/writing/#voices">See the evidence ↗</a></article>
        <article><div><span>100 Ladrillos</span><h3>Iván Carmona · Hugo Blum</h3></div><p>I helped make an unfamiliar investment model clear through founder narratives, media and investor moments.</p><strong>14 items in the public press archive</strong><a href="https://somos.100ladrillos.com/prensa/" target="_blank" rel="noopener noreferrer">Open archive ↗</a></article>
        <article><div><span>WeWork</span><h3>Álvaro Villar · Liliana Méndez</h3></div><p>I prepared leadership narratives for television, audio and internal channels across the region.</p><strong>TV + podcast + 2,000+ colleagues</strong><a href="/writing/#voices">See the evidence ↗</a></article>
        <article><div><span>ThinkY</span><h3>Maripi Lissarrague · Delfina Peralta Ramos</h3></div><p>I built the communications proposal and co-led founder positioning around creativity, technology, market data and the business thinking behind the work.</p><strong>41 placements · 28 Tier 1 · 76.7M reported reach</strong><a href="/case-studies/#thinky">Read the case ↗</a></article>
        <article><div><span>Expok</span><h3>Miguel Ángel Santinelli · Gustavo Pérez</h3></div><p>I translated social-impact expertise into columns, interviews and events grounded in a clear human consequence.</p><strong>CSR + human rights + institutional visibility</strong><a href="/writing/#voices">See the evidence ↗</a></article>
      </div>
    </div>
  </section>

  <section class="section visual-proof-section">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">My work in public</p><h2>Selected public work—and my role in it.</h2></div><p>I label every piece by my actual role: authored, ghostwritten, editorial strategy, spokesperson preparation, media relations or event work.</p></div>
      <div class="evidence-wall" data-reveal>
        ${evidenceImage({src:'/assets/media/tedx-universidad-panamericana-event.webp', width:'900', height:'1200', alt:'Speaker on a red-lit TEDx Universidad Panamericana stage', label:'Events', caption:'Speaker narrative, live production and editorial reuse · TEDx Universidad Panamericana'})}
        ${evidenceImage({src:'/assets/media/wework-alvaro-villar-tv.webp', width:'1280', height:'719', alt:'Álvaro Villar, CEO of WeWork Mexico, in a television interview on ADN40', label:'Media relations', caption:'I prepare executive visibility · WeWork', className:'evidence-wide'})}
        ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Print coverage of the Belvo and Clip open-finance partnership', label:'External communications', caption:'Technical partnership communications · Belvo', className:'evidence-wide'})}
        ${evidenceImage({src:'/assets/media/expok-toks-bylined-column.webp', width:'1125', height:'1242', alt:'Newspaper page with a corporate responsibility guest column and Toks coverage', label:'Editorial + PR', caption:'Executive voice and earned coverage · Expok'})}
      </div>
      <div class="hero-actions"><a class="button button-solid" href="/writing/">Open my writing + media</a><a class="button" href="/work/">See the full body of work</a></div>
    </div>
  </section>

  <section class="section section-light" aria-labelledby="home-contact-title">
    <div class="site-shell contact-layout">
      <div class="contact-copy"><p class="eyebrow">Let’s talk</p><h2 id="home-contact-title">Tell me what you’re trying to make happen.</h2><p class="lede">A role, a launch, a new market, a reputation problem, a team in change.</p><p><strong>A short note is enough. The unpolished version is fine.</strong></p><p>You can use the form or <a href="${linkedin}" target="_blank" rel="noopener noreferrer">find me on LinkedIn</a>.</p></div>
      ${leadForm('home')}
    </div>
  </section>`
});

const work = layout({
  title: 'Communications & Product Marketing Work | Ximena Aguirre',
  description: 'Evidence-led work across corporate and internal communications, PR, Product Marketing, GTM, Field Marketing, CRM and measurement in B2B tech and fintech.',
  path: '/work/',
  body: `${pageHero('Selected work', 'So, what does that look like at work?', 'Sometimes I’m helping Product find the language for something difficult to explain. Sometimes a founder needs a stronger point of view. Sometimes six markets need the same strategy and six different answers. Sometimes the event is full and the important question is what Sales does tomorrow.<br><br><strong>Here are a few of those problems—and what I did with them.</strong>', [['Cases', '8'], ['Markets', 'Europe + Latin America'], ['Across', 'Product · Sales · leadership'], ['Evidence', 'Public work + measured results']])}
  <section class="section"><div class="site-shell">
    <div class="card-grid">
      <article class="card card-wide"><div><div class="card-meta"><span>01 / Belvo</span><span>Fintech · Mexico</span></div><h3>A good product still needs a reason to matter.</h3><p>I worked across positioning, launches, customer proof, PR, Field Marketing, CRM and Sales to explain why a technical product mattered in the Mexican market.</p><p><strong>12+ launches · 17 customer stories · +129.6% MQLs YoY</strong></p></div><a href="/case-studies/#belvo">Belvo · Product Marketing + GTM case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>02 / ThinkY</span><span>Creator marketing · PR</span></div><h3>Repositioning ThinkY around strategic value</h3><p>I built the proposal and co-led a data-informed PR, reputation and thought-leadership programme.</p></div><a href="/case-studies/#thinky">ThinkY · PR + reputation case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>03 / 100 Ladrillos</span><span>Proptech · Mexico</span></div><h3>Trust gets harder when the product involves people’s money.</h3><p>The job was to make fractional real-estate investing understandable without pretending uncertainty did not exist.</p><p><strong>Founder positioning · investor communications · Tier 1 media · issues readiness</strong></p></div><a href="/case-studies/#ladrillos">100 Ladrillos · trust + PR case →</a></article>
      <article class="card"><div><div class="card-meta"><span>04 / WeWork</span><span>Internal · Latin America</span></div><h3>2,000 people shouldn’t hear company news through the grapevine.</h3><p>I built the internal communication rhythm, channels and leadership formats for a region going through change.</p><p><strong>2,000+ employees · newsletters · all-hands · leadership comms · crisis response</strong></p></div><a href="/case-studies/#wework">WeWork · internal communications case →</a></article>
      <article class="card"><div><div class="card-meta"><span>05 / Zendesk</span><span>B2B SaaS · Regional</span></div><h3>Same company. Six markets. Not the same story.</h3><p>The global narrative stayed. The reason to care changed. I led regional PR and executive visibility across six Latin American markets and the Caribbean.</p><p><strong>+78% regional exposure in six months</strong></p></div><a href="/case-studies/#zendesk">Zendesk · regional communications case →</a></article>
      <article class="card"><div><div class="card-meta"><span>06 / Expok</span><span>ESG · Agency</span></div><h3>Making social-impact expertise concrete and newsworthy</h3><p>I led multi-client PR, subject-matter storytelling, executive content and a three-person team.</p></div><a href="/case-studies/#expok">Expok · ESG communications case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>07 / Field system</span><span>Cross-company</span></div><h3>Connecting event strategy to CRM, Sales and pipeline</h3><p>I built a repeatable Field Marketing workflow around account intent, Sales alignment, CRM follow-up and pipeline attribution.</p></div><a href="/case-studies/#field">Field Marketing + pipeline case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>08 / Content Cosmos</span><span>Applied AI · editorial operations</span></div><h3>Building an AI-assisted editorial workflow with human controls</h3><p>Approved product knowledge, brand voice, LLM drafting, localization and human review in one working system.</p></div><a href="/case-studies/#ai">Applied AI + content operations case →</a></article>
    </div>
  </div></section>

  <section class="section section-blue" aria-labelledby="pmm-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Product Marketing + GTM</p><h2 id="pmm-title">I need to understand the product before I decide how to position it.</h2></div><p>I work from market and customer insight to positioning and messaging, GTM strategy, product and partnership launches, customer proof, Sales enablement and post-launch feedback.</p></div>
    <ol class="product-loop" data-reveal>
      <li><span>01</span><strong>Learn</strong><small>I listen to Product, customers, Sales and the market.</small></li>
      <li><span>02</span><strong>Position</strong><small>I define the audience, tension, promise and proof.</small></li>
      <li><span>03</span><strong>Launch</strong><small>I align message, content, leaders, channels and timing.</small></li>
      <li><span>04</span><strong>Enable</strong><small>I give Sales and partners useful stories and assets.</small></li>
      <li><span>05</span><strong>Listen again</strong><small>I use CRM, questions and performance data to improve.</small></li>
    </ol>
    <div class="pmm-proof"><div><strong>12+</strong><span>product, partnership and customer launches</span></div><div><strong>17</strong><span>customer stories built as market proof</span></div><div><strong>3</strong><span>markets coordinated across Mexico, Spain and Colombia</span></div></div>
    <p class="evidence-line"><strong>Technical range:</strong> open finance, payments, employment data, income verification and PCI DSS Level 1—made useful without turning accuracy, security or compliance into footnotes.</p>
  </div></section>

  <section class="section section-light" aria-labelledby="content-system-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Content and campaign architecture</p><h2 id="content-system-title">A strong point of view should work across more than one channel.</h2></div><p>The objective is not volume. It is to adapt one coherent argument to the audience, format, moment and decision.</p></div>
    <div class="workstream-grid" data-reveal>
      <article><span>01</span><h3>Find the argument.</h3><p>Message house · issues · launches</p></article>
      <article><span>02</span><h3>Build the evidence.</h3><p>Research · customer stories · reports</p></article>
      <article><span>03</span><h3>Carry the voice.</h3><p>Bylines · blogs · speeches · video</p></article>
      <article><span>04</span><h3>Earn the audience.</h3><p>PR · interviews · podcasts · KOLs</p></article>
      <article><span>05</span><h3>Create the moment.</h3><p>Events · webinars · field programmes</p></article>
      <article><span>06</span><h3>Build the handoff.</h3><p>CRM · nurture · Sales SLA · learning</p></article>
    </div>
  </div></section>

  <section class="section section-dark" aria-labelledby="crm-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">CRM + lifecycle · HubSpot + Salesforce</p><h2 id="crm-title">I design the journey around the handoff to Sales.</h2></div><p>I plan the invitation, registration, reminders, lead state, context-rich Sales handoff and post-event learning as one journey.</p></div>
    <ol class="crm-flow" data-reveal><li><span>01</span><b>Audience</b><small>I define account fit and intent.</small></li><li><span>02</span><b>Journey</b><small>I build invite, reminders and nurture.</small></li><li><span>03</span><b>Handoff</b><small>I set owner, context and a sub-24h action.</small></li><li><span>04</span><b>Movement</b><small>I track inquiry, opportunity and learning.</small></li></ol>
    <div class="number-notes number-notes-dark"><div><strong>1,729</strong><span>MQLs in 2025 · +129.6% YoY across the integrated Belvo programme</span></div><div><strong>330</strong><span>Contact Us submissions in Q4 2025 · +35.3% YoY</span></div><div><strong>69</strong><span>deals created in Q4 2025 · +38% YoY</span></div></div>
  </div></section>

  <section class="section" aria-labelledby="moments-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Field Marketing + events</p><h2 id="moments-title">I plan events as part of the commercial system.</h2></div><p>I work from audience and account fit to event strategy, partners and speakers, lead capture, CRM, Sales alignment, follow-up and attribution.</p></div>
    <div class="moment-layout">
      <div class="event-gallery" data-reveal>
        ${evidenceImage({src:'/assets/media/wework-anniversary-field-event.webp', width:'1050', height:'1400', alt:'WeWork anniversary event stage', label:'Owned event', caption:'I shaped a live brand moment · WeWork'})}
        ${evidenceImage({src:'/assets/media/tedx-universidad-panamericana-event.webp', width:'900', height:'1200', alt:'TEDx Universidad Panamericana stage', label:'Event archive', caption:'Speaker narrative, live production and editorial reuse.'})}
      </div>
      <div class="campaign-ledger" data-reveal>
        <article><span>100 Ladrillos · KOL</span><h3>Chicharito Hernández</h3><p>I helped position a high-recognition partnership within the company’s investment narrative.</p><div><a href="https://www.eleconomista.com.mx/el-empresario/Chicharito-Hernandez-se-estrena-como-inversionista-con-100-Ladrillos-20230403-0050.html" target="_blank" rel="noopener noreferrer">Press story ↗</a><a href="https://vt.tiktok.com/ZSqSaBoNp/" target="_blank" rel="noopener noreferrer">Campaign video ↗</a></div></article>
        <article><span>Zendesk · Expert/KOL</span><h3>Cecilia Hugony</h3><p>I coordinated expert and spokesperson content around a regional customer-experience narrative.</p><div><a href="https://www.youtube.com/playlist?list=PLidl0nsRAqfOR4aEhjK-gH3QSj77zBPNv" target="_blank" rel="noopener noreferrer">CXperiences playlist ↗</a></div></article>
        <article><span>3AM · Creator content</span><h3>Selected campaign posts</h3><p>I worked with social-native formats earlier in my career without treating social as the whole strategy.</p><div><a href="https://www.instagram.com/p/BwNb3KxFzB_/" target="_blank" rel="noopener noreferrer">Post 01 ↗</a><a href="https://www.instagram.com/p/BwHWGR7llFi/" target="_blank" rel="noopener noreferrer">Post 02 ↗</a><a href="https://www.instagram.com/p/BwGbb-WFsWG/" target="_blank" rel="noopener noreferrer">Post 03 ↗</a></div></article>
      </div>
    </div>
  </div></section>`
});

const caseStudies = layout({
  title: 'B2B Communications & Marketing Case Studies | Ximena Aguirre',
  description: 'Eight evidence-led case studies across corporate communications, PR, Product Marketing, GTM, internal communications, Field Marketing, CRM and applied AI.',
  path: '/case-studies/',
  body: `${pageHero('Case studies / evidence in context', 'Eight cases that show the decisions behind the work.', 'Each case sets out the problem, constraints, choices, contribution and result. Team outcomes stay attributed to the team; uncertainty stays visible.', [['Inside', 'WeWork'], ['Outside', 'Zendesk · ThinkY · Expok'], ['Market', 'Belvo · 100 Ladrillos'], ['Systems', 'Field · applied AI']])}
  <nav class="case-jump site-shell" aria-label="Jump to a case study">
    <a href="#belvo">Belvo</a><a href="#thinky">ThinkY</a><a href="#ladrillos">100 Ladrillos</a><a href="#wework">WeWork</a><a href="#zendesk">Zendesk</a><a href="#expok">Expok</a><a href="#field">Field</a><a href="#ai">AI</a>
  </nav>
  <div class="site-shell">
    <article class="case-study" id="belvo">
      <aside class="case-side"><div class="case-number">01</div><div class="case-tags"><span class="tag">Product Marketing</span><span class="tag">External comms</span><span class="tag">Field</span><span class="tag">Mexico</span></div></aside>
      <div class="case-body"><p class="eyebrow">Belvo · 2024 to 2026</p><h2>A good product still needs a reason to matter.</h2><p class="case-deck">Open finance is technical. The market still needs a clear reason to care. I connected the Mexico narrative across product positioning, launches, PR, customer proof, executive visibility, field programmes, CRM and measurement.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Give a regulated B2B fintech one coherent market position, then make it useful for media, customers, prospects and Sales.</p></div><div><span>What I saw</span><p>“Open finance” was the category. Better credit decisions, verification and collection were the jobs people could recognize. The framing had to begin with those recognisable jobs.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>I translated product capabilities into audience segmentation, positioning, messages, launch narratives and Sales enablement.</li><li>I built customer evidence and connected launches, spokespeople, media relations, field programmes and lifecycle follow-up.</li><li>I worked hands-on across Product, Sales, Customer Success, Partnerships, Data, leadership and agencies, then used reporting to adjust the next move.</li></ul>
        ${metricCard(impactMetrics[0])}
        <div class="number-notes"><div><strong>1,729</strong><span>MQLs in 2025 · +129.6% YoY across the integrated Mexico programme</span></div><div><strong>US$722.9K</strong><span>event-sourced ACV in 2024 · +362% YoY</span></div><div><strong>12+</strong><span>launches supported across product, partnerships and customer proof</span></div></div>
        <h3>How the evidence changed the plan</h3>
        <div class="insight-ledger" data-reveal>
          <article><span>High-intent behaviour</span><strong>Forms were doing real commercial work.</strong><p>More than half of inbound closed-won opportunities in the strategy review came through Contact Us and sign-up forms; product pages converted 300+ qualified leads in 2024. That made conversion paths and useful product content a priority, not a footer task.</p></article>
          <article><span>Q4 2025 · demand to revenue signal</span><strong>10,175 views → 330 submissions → 14 inbound wins</strong><p>Contact Us converted at 3.24%; submissions rose 35.3% YoY. Inbound closed-won deals reached 14, up 16.7%. Event-created ACV reached US$219.4K, up 113% YoY. Each number has its own denominator.</p></article>
          <article><span>Q1 2026 · market signal</span><strong>20 mentions · 45.2K LinkedIn impressions · 13 event leads</strong><p>Thirty-six percent of coverage was Tier 1 and Belvo appeared in two industry reports. Page views rose 19.6%, unique visitors 13.6%, comments 104.5% and shares 127.8%. Two hosted events and FinTech México formed the reported field programme.</p></article>
        </div>
        <div class="team-context"><strong>Team context, not a solo claim.</strong><p>The wider 2024 marketing programme associated marketing-led initiatives with US$1.6M in new ARR; inbound and events represented 60% of closed-won deal count. I use that context to show the system I worked inside, not to claim every dollar.</p></div>
        <div class="evidence-pair">
          ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper story about the Belvo and Clip open-finance partnership', label:'PR outcome', caption:'Partnership story in print.'})}
          ${evidenceImage({src:'/assets/media/belvo-jpmorgan-press.webp', width:'1010', height:'1280', alt:'Print coverage of financial solutions from Belvo and J.P. Morgan', label:'PR outcome', caption:'A technical proposition translated for a business audience.'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://belvo.com/es/author/ximena-aguirre/', 'My Belvo author archive')}</li><li>${external('https://fastcompany.mx/author/federica-gregorini/', 'Federica Gregorini: Fast Company columns')}</li><li>${external('https://belvo.com/es/blog/belvo-payjoy-financiamiento-celulares-mexico-datos-empleo/', 'PayJoy + employment-data customer story')}</li><li>${external('https://belvo.com/es/blog/smart-fit-belvo-pagos-recurrentes-open-finance/', 'Smart Fit + recurring payments story')}</li><li>${external('https://belvo.com/es/blog/belvo-banco-azteca-verificaciones-ingresos-credito/', 'Banco Azteca + income-verification story')}</li><li>${external('https://www.youtube.com/playlist?list=PLBp3o9hAmq8taGzI6hOop8VhGpL8SUrHF', 'Fintech Heroes: video playlist')}</li></ul>
        <div class="reconstruction"><strong>Evidence note.</strong> Public links verify visible work. Performance figures come from dated marketing plans and dashboard exports. Programme outcomes were shared across teams; underlying CRM records, budgets and account data remain confidential.</div>
      </div>
    </article>
    <article class="case-study" id="thinky">
      <aside class="case-side"><div class="case-number">02</div><div class="case-tags"><span class="tag">PR strategy</span><span class="tag">Thought leadership</span><span class="tag">Creator economy</span><span class="tag">Measurement</span></div></aside>
      <div class="case-body"><p class="eyebrow">ThinkY · 2024 to 2025</p><h2>Repositioning ThinkY around strategic value</h2><p class="case-deck">I built the communications proposal and co-led a PR system designed to position a creator-marketing agency as a strategic, data-informed business partner—not only the team behind a winning campaign.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Turn campaign work, founder expertise and fast-moving creator-market signals into a credible, repeatable point of view for business and marketing media.</p></div><div><span>What I saw</span><p>Award news could open the door, but authority needed a source of truth: useful analysis, proof, expert voices and a rhythm that did not depend on client announcements.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>I developed the communications proposal, narrative territories, editorial cadence, spokesperson roles and measurement framework.</li><li>I co-led stories around TikTok Ad Awards, UGC versus advocacy, Netflix and creator-market trends, then adapted the argument for interviews, bylines and LinkedIn.</li><li>I used monthly reporting to identify the subjects and formats earning quality attention, then adjusted ownership, timing and the press cadence.</li></ul>
        <div class="outcome outcome-context"><strong>41</strong><span>placements in the documented programme recap.</span><p>The work built a more strategic public narrative around creativity, technology, data and business outcomes.</p></div>
        <div class="number-notes"><div><strong>28</strong><span>placements in Tier 1 media · almost 70% of the total</span></div><div><strong>76.7M</strong><span>reported reach across the programme recap</span></div><div><strong>MXN 5.5M</strong><span>modelled PR value · a media-equivalency estimate, not revenue</span></div></div>
        <h3>What the reporting taught us</h3>
        <div class="insight-ledger" data-reveal>
          <article><span>13-month record · Feb 2024 to Mar 2025</span><strong>40 hits · 3.07 per month · 102% of KPI</strong><p>68.3% of placements were Tier 1 and sentiment was reported as 100% positive. Awards and market analysis consistently produced the strongest interest.</p></article>
          <article><span>March campaign snapshot</span><strong>One timely story → 3 Tier 1 hits</strong><p>A TikTok Awards angle linked to Netflix produced 1,022,988 reported impressions and US$29,900 in modelled PR value. Timing and a specific proof point did more work than generic agency news.</p></article>
          <article><span>November snapshot</span><strong>8 hits · 75% Tier 1 · 38.6M impressions</strong><p>The report recorded 100% positive sentiment and US$100,998 in modelled PR value. Three internal LinkedIn sessions helped the team carry the narrative beyond earned media.</p></article>
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://www.youtube.com/watch?v=LyVIk0WbSZo', 'ThinkY founders: strategy, creativity and technology')}</li><li>${external('https://roastbrief.com.mx/2025/02/como-thinky-brillo-en-los-tiktok-ad-awards-una-entrevista-con-maripi-lissarrague/', 'Roastbrief: Maripi Lissarrague and the TikTok Ad Awards')}</li><li>${external('https://www.youtube.com/watch?v=TrwQLhySimU', 'Founder interview: campaign thinking and results')}</li></ul>
        <div class="reconstruction"><strong>Attribution note.</strong> I authored the proposal and co-led strategy and execution with ThinkY’s team. Reach and PR value are reporting-model estimates, not audited revenue; I do not claim independent editorial decisions as my authorship.</div>
      </div>
    </article>
    <article class="case-study" id="ladrillos">
      <aside class="case-side"><div class="case-number">03</div><div class="case-tags"><span class="tag">PR</span><span class="tag">Executive</span><span class="tag">Events</span><span class="tag">Proptech</span></div></aside>
      <div class="case-body"><p class="eyebrow">100 Ladrillos · 2023 to 2024</p><h2>Trust gets harder when the product involves people’s money.</h2><p class="case-deck">Fractional real-estate investing attracts curiosity and scrutiny at the same time. The job was to support growth without inflating certainty.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Build confidence around an unfamiliar investment model for an investor community of roughly 40,000 people.</p></div><div><span>What I saw</span><p>The mechanism had to become visible: how it works, who participates, where the limits are and what proof exists.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Shifted publicity from product claims toward education, evidence and credible external voices.</li><li>Led agency work, founder preparation, investor events and issue-response protocols.</li><li>Built news hooks around milestones that already mattered to the business.</li></ul>
        <div class="outcome outcome-context"><strong>55+</strong><span>media appearances across my 13-month programme.</span><p>I use the count with its period because volume only means something when the reader knows what was counted and for how long.</p></div>
        <div class="number-notes"><div><strong>14</strong><span>items still visible in the company’s public press archive</span></div><div><strong>2</strong><span>founder voices positioned across business and investment media</span></div><div><strong>40K</strong><span>approximate investor community I communicated with</span></div></div>
        <div class="video-feature-grid">
          ${videoCard({id:'UltD4toNKMM', title:'Iván Carmona: Construyendo el futuro con 100 Ladrillos', meta:'Founder visibility · PR + spokesperson preparation'})}
          ${videoCard({id:'dXUPVbkxzmk', title:'Ladrillowners: inversión inmobiliaria y gestión de riesgo', meta:'Owned event · content + experience strategy'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://somos.100ladrillos.com/prensa/', '100 Ladrillos: public press archive')}</li><li>${external('https://www.eleconomista.com.mx/el-empresario/Chicharito-Hernandez-se-estrena-como-inversionista-con-100-Ladrillos-20230403-0050.html', 'El Economista: Chicharito joins as an investor')}</li><li>${external('https://vt.tiktok.com/ZSqSaBoNp/', 'Chicharito campaign video')}</li><li>${external('https://lideresmexicanos.com/entrevistas/hugo-blum-e-ivan-carmona-100ladrillos', 'Líderes Mexicanos: Hugo Blum + Iván Carmona')}</li><li>${external('https://businessinsider.mx/como-ganar-juego-inversiones-inmobiliarias-opinion/', 'Business Insider: executive byline')}</li><li>${external('https://100ladrillos.com/post/chicharito-se-une-a-100-ladrillos', '100 Ladrillos: company announcement')}</li></ul>
        <div class="reconstruction"><strong>My role:</strong> I led PR strategy, agency work, spokesperson preparation, campaign support and investor events. I do not claim authorship of independent coverage.</div>
      </div>
    </article>
    <article class="case-study" id="wework">
      <aside class="case-side"><div class="case-number">04</div><div class="case-tags"><span class="tag">Internal comms</span><span class="tag">Change</span><span class="tag">Leadership</span></div></aside>
      <div class="case-body"><p class="eyebrow">WeWork · 2022 to 2023</p><h2>2,000 people shouldn’t hear company news through the grapevine.</h2><p class="case-deck">My six-month regional mandate was to make leadership communication more consistent, useful and responsive for more than 2,000 colleagues.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Create a reliable internal rhythm across leadership updates, newsletters, all-hands and messaging channels.</p></div><div><span>What I saw</span><p>During change, fragmented channels are not a style problem. They are an operational risk.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Mapped audience needs, channel roles and decision owners.</li><li>Built editorial cadences, leader kits and fast-response pathways for sensitive moments.</li><li>Used employee questions and feedback signals to close the loop.</li></ul>
        <div class="outcome outcome-context"><strong>2,000+</strong><span>colleagues served across the regional communications system.</span><p>The outcome was clearer ownership and a more predictable place to understand what changed, why it mattered and what came next.</p></div>
        <div class="evidence-wall case-evidence-wall">
          ${evidenceImage({src:'/assets/media/internal-comms-overview-reconstruction.webp', width:'1400', height:'991', alt:'Reconstructed monthly internal communications overview with results, community news and upcoming dates', label:'Reconstruction', caption:'A public-safe model of the internal communications rhythm.', className:'evidence-wide'})}
          ${evidenceImage({src:'/assets/media/wework-hybrid-work-press.webp', width:'771', height:'1280', alt:'Newspaper coverage of hybrid work research by WeWork and Michael Page', label:'External communications', caption:'Research translated into a regional press story.'})}
          ${evidenceImage({src:'/assets/media/wework-alvaro-villar-tv.webp', width:'1280', height:'719', alt:'Álvaro Villar speaking about flexible workspaces on ADN40', label:'Media relations', caption:'Executive visibility on television.', className:'evidence-wide'})}
        </div>
        <div class="reconstruction"><strong>Reconstruction.</strong> This framework reflects my actual process. I intentionally keep original internal materials and incident details private.</div>
      </div>
    </article>
    <article class="case-study" id="zendesk">
      <aside class="case-side"><div class="case-number">05</div><div class="case-tags"><span class="tag">Regional PR</span><span class="tag">Localization</span><span class="tag">B2B SaaS</span></div></aside>
      <div class="case-body"><p class="eyebrow">Zendesk · 2020 to 2022</p><h2>Same company. Six markets. Not the same story.</h2><p class="case-deck">A global customer-experience thesis only works when every market sees its own tension, evidence and credible voice in it.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Coordinate PR across Mexico, Chile, Argentina, Peru, Colombia and the Caribbean without fragmenting the global position.</p></div><div><span>What I saw</span><p>Consistency belonged in the argument. Relevance belonged in the proof, examples, media angle and spokesperson.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Built a shared message spine and a market-by-market angle matrix.</li><li>Coordinated agencies, spokespeople, briefings, assets and launch timing.</li><li>Turned research into interviews, live conversations and sustained news hooks.</li></ul>
        ${metricCard(impactMetrics[3])}
        <div class="video-feature-grid">
          ${videoCard({id:'T6OFh2cCdiM', title:'El poder de poner al cliente en el centro del negocio', meta:'Regional PR · spokesperson programme'})}
          ${videoCard({id:'RwEnBmEaXS4', title:'The importance of CX implementation in Latin America', meta:'Regional PR · research amplification'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://expansion.mx/tecnologia/2020/10/16/alex-barrera-el-capitan-de-zendesk-en-america-latina', 'Expansión: Alex Barrera, 30 Promesas')}</li><li>${external('https://forbes.com.mx/la-importancia-de-la-implementacion-de-cx-en-las-empresas-de-latinoamerica-forbes-tech-future/', 'Forbes Future Talk: Alex Barrera')}</li><li>${external('https://forbes.com.mx/ad-experiencia-clientes-empleados-clave-exito-empresas/', 'Forbes: Raúl Rodríguez')}</li><li>${external('https://expansion.mx/empresas/2021/12/20/mejorar-la-experiencia-de-cliente-es-la-ventaja-competitiva-crucial', 'Expansión: Raúl Rodríguez')}</li><li>${external('https://www.eleconomista.es/economiahoy/opinion/noticias/10572655/05/20/Que-podemos-aprender-de-las-Pymes.html', 'El Economista: Dubra Valenzuela byline')}</li><li>${external('https://www.youtube.com/playlist?list=PLidl0nsRAqfOR4aEhjK-gH3QSj77zBPNv', 'Cecilia Hugony: CXperiences playlist')}</li></ul>
        <div class="reconstruction"><strong>My role:</strong> I led regional PR strategy, localization, agency coordination, spokesperson preparation and media relations. I list independent stories as earned outcomes, not as my bylines.</div>
      </div>
    </article>
    <article class="case-study" id="expok">
      <aside class="case-side"><div class="case-number">06</div><div class="case-tags"><span class="tag">Agency</span><span class="tag">CSR / ESG</span><span class="tag">Team lead</span></div></aside>
      <div class="case-body"><p class="eyebrow">Expok · 2019 to 2020</p><h2>Making social-impact programmes concrete and newsworthy</h2><p class="case-deck">CSR programmes become credible stories through specific people, places, trade-offs and evidence, not through a longer list of activities.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Lead multiple accounts, each with different audiences, risks and approval cultures, without making the work formulaic.</p></div><div><span>What I saw</span><p>Local consequence was the bridge between a corporate programme and a story another person might care about.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>Led a three-person PR team and accounts including Toks, Mabe, LTH, Cemex and Universidad Anáhuac.</li><li>Developed angles, media materials, executive copy and review standards.</li><li>Connected programme activity to larger sustainability and community narratives.</li></ul>
        <div class="evidence-wall case-evidence-wall">
          ${evidenceImage({src:'/assets/media/expok-toks-bylined-column.webp', width:'1125', height:'1242', alt:'Newspaper page with a guest column about corporate responsibility and a Toks story', label:'Editorial work', caption:'Executive voice alongside earned client coverage.', className:'evidence-wide'})}
          ${evidenceImage({src:'/assets/media/expok-sustainability-press-1.webp', width:'1008', height:'1280', alt:'El Economista feature about sustainable development and Mexico policy', label:'Media outcome', caption:'Sustainability expertise made newsworthy.'})}
          ${evidenceImage({src:'/assets/media/expok-lth-press.webp', width:'966', height:'1280', alt:'NotiSUR newspaper coverage of LTH community and environmental programmes', label:'Account PR', caption:'Local programme, local consequence.'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://mexico.iom.int/es/news/reconocen-la-oim-mexico-por-su-labor-social-en-la-migracion-con-el-premio-clares-2018', 'IOM Mexico: Premio CLARES')}</li><li>${external('https://conexionmigrante.com/2019-/09-/11/situacion-migratoria-se-debe-a-la-falta-de-respeto-a-los-derechos-humanos-miguel-angel-santinelli/', 'Conexión Migrante: migration and human rights')}</li><li>${external('https://oem.com.mx/elheraldodechihuahua/local/miguel-angel-santinelli-ramo-habla-sobre-la-generacion-c-14628673', 'El Heraldo de Chihuahua: Generación C')}</li><li>${external('https://presenterse.com/facultad-de-responsabilidad-social-de-la-anahuac-y-cmic-promoveran-edificaciones-mas-responsables/', 'Presenterse: Anáhuac + CMIC')}</li><li>${external('https://www.expoknews.com/etiqueta/lth/', 'Expok archive: LTH coverage and releases')}</li></ul>
        <div class="reconstruction"><strong>My role:</strong> I led accounts, PR strategy, story development, media materials and team quality. I use archive items as evidence of account work, not as automatic authorship claims.</div>
      </div>
    </article>
    <article class="case-study" id="field">
      <aside class="case-side"><div class="case-number">07</div><div class="case-tags"><span class="tag">Field marketing</span><span class="tag">Sales alignment</span><span class="tag">Attribution</span></div></aside>
      <div class="case-body"><p class="eyebrow">Cross-company operating system</p><h2>From event selection to Sales follow-up and pipeline attribution</h2><p class="case-deck">An event matters when the right people enter with a reason to talk and leave inside a coordinated commercial motion.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Turn field marketing from a logistics calendar into an account, narrative and pipeline discipline.</p></div><div><span>What I saw</span><p>Scan counts were obscuring the real questions: whom did we reach, what did we learn and did any account move?</p></div></div>
        <ol class="process-line"><li><span>01</span><b>Thesis</b><small>Audience + tension</small></li><li><span>02</span><b>Accounts</b><small>Owners + intent</small></li><li><span>03</span><b>Moment</b><small>Room + content</small></li><li><span>04</span><b>24h SLA</b><small>Context + action</small></li><li><span>05</span><b>Learning</b><small>Opportunity + decision</small></li></ol>
        ${metricCard(impactMetrics[2])}
        <p><a href="${github}/field-marketing-pipeline-system">Open the complete field-marketing pipeline system →</a></p>
        <div class="reconstruction"><strong>Framework.</strong> The public templates reconstruct the operating method with fictional examples. No attendee, account or opportunity data is included.</div>
      </div>
    </article>
    <article class="case-study" id="ai">
      <aside class="case-side"><div class="case-number">08</div><div class="case-tags"><span class="tag">LLMs</span><span class="tag">Content operations</span><span class="tag">Human review</span></div></aside>
      <div class="case-body"><p class="eyebrow">Content Cosmos · Belvo</p><h2>An AI-assisted editorial workflow built around approved knowledge</h2><p class="case-deck">I wanted a faster way to create useful content without losing the product truth, the market nuance or the voice behind it.</p>
        <div class="case-brief"><div><span>What I built</span><p>I worked with engineering on an internal AI-enabled editorial workflow using LLMs, Cursor and GitHub.</p></div><div><span>What made it useful</span><p>I structured approved product knowledge, brand voice, market context and editorial standards before generation began.</p></div></div>
        <ol class="ai-case-flow"><li><span>01</span><strong>I selected the sources.</strong><p>Product knowledge and approved material came before prompts.</p></li><li><span>02</span><strong>I shaped the context.</strong><p>I encoded audience, voice, market and editorial rules.</p></li><li><span>03</span><strong>I designed the outputs.</strong><p>The system created first drafts, variants and faster multi-market localisation for SEO and GEO-informed content.</p></li><li><span>04</span><strong>I kept people accountable.</strong><p>Humans reviewed facts, claims, cultural nuance, legal sensitivity and final voice.</p></li></ol>
        <div class="tool-band tool-band-light"><span>Core build</span><strong>LLMs · Cursor · GitHub</strong><span>AI tools I use</span><strong>ChatGPT · Gemini · Claude · NotebookLM · Cursor</strong></div>
        <div class="outcome outcome-context"><strong>Faster first passes</strong><span>with the source, voice and review path built into the workflow.</span><p>I designed the content operation and its safeguards. I do not present myself as a machine-learning engineer.</p></div>
        <p><a href="${github}/ai-for-marketing-comms">Open my public AI workflow library →</a></p>
        <div class="reconstruction"><strong>Evidence note.</strong> I describe the real operating logic without publishing internal product knowledge, prompts or company material.</div>
      </div>
    </article>
  </div>`
});

const playbooks = layout({
  title: 'B2B Marketing & Communications Playbooks | Ximena Aguirre',
  description: 'Practical systems for Field Marketing pipeline, PR storytelling, B2B GTM launches and responsible AI-assisted communications.',
  path: '/playbooks/',
  body: `${pageHero('Open working systems', 'Some problems show up more than once.', 'So I stopped solving them from scratch. These are four systems I built around work I kept doing: launching complex things, finding a real PR story, turning events into commercial follow-up and using AI without lowering the editorial bar.<br><br><strong>Take whatever is useful.</strong>', [['License', 'Open, with attribution'], ['Format', 'Markdown + editable templates'], ['Audience', 'Non-technical teams'], ['Principle', 'Judgment before tooling']])}
  <section class="section"><div class="site-shell">
    <article class="artifact"><div><span class="artifact-label">01 / Field marketing</span><h3>Field Marketing Pipeline System</h3></div><div><p>Move from event selection to account intent, sales alignment, sub-24-hour follow-up and opportunity measurement.</p><div class="artifact-links"><a href="${github}/field-marketing-pipeline-system">Open repository ↗</a><a href="/case-studies/#field">Read the case</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">02 / PR</span><h3>PR Storytelling System</h3></div><div><p>Turn company news into a credible external angle using a story-gap canvas, newsworthiness score and spokesperson preparation guide.</p><div class="artifact-links"><a href="${github}/pr-storytelling-system">Open repository ↗</a><a href="/case-studies/#belvo">See it in context</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">03 / GTM</span><h3>Communications Launch Kit</h3></div><div><p>Align message, proof, audiences, spokespeople, timing and measurement for a complex B2B launch.</p><div class="artifact-links"><a href="${github}/communications-launch-kit">Open repository ↗</a><a href="/case-studies/#zendesk">See regional execution</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">04 / AI operations</span><h3>AI for Marketing & Communications</h3></div><div><p>Research, synthesis, drafting, repurposing and QA workflows built around source hygiene and human review.</p><div class="artifact-links"><a href="${github}/ai-for-marketing-comms">Open repository ↗</a><a href="/case-studies/#ai">Read the operating stance</a></div></div></article>
  </div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">How to read them</p><h2>What these repositories show.</h2></div><div><p class="lede">Each repository starts with the decision, then shows the workflow, templates and review points. Examples are fictional where the real company material is confidential.</p><p><a href="/proof/">Read the evidence and reconstruction policy →</a></p></div></div></section>`
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

const voiceGroups = [
  {
    company: 'Belvo · executive voice',
    people: 'Federica Gregorini',
    contribution: 'I ghostwrote and edited points of view on open finance, payments, credit and collaboration, then carried the same voice into interviews and live content.',
    proof: '5 columns in Fast Company’s public author archive',
    links: [
      ['Fast Company archive', 'https://fastcompany.mx/author/federica-gregorini/'],
      ['Cuando el cobro se vuelve invisible', 'https://fastcompany.mx/2025/10/21/cuando-cobro-se-vuelve-invisible-plataformas-pago/'],
      ['Inclusión financiera + colaboración', 'https://fastcompany.mx/2025/05/27/no-podemos-hablar-de-inclusion-financiera-sin-hablar-de-colaboracion/'],
      ['3 claves para pagos en 2025', 'https://fastcompany.mx/2025/02/05/3-claves-exito-pagos-2025/'],
      ['El arte de fidelizar', 'https://fastcompany.mx/2024/12/06/mas-alla-del-descuento-el-arte-de-fidelizar-a-tus-clientes-en-esta-temporada-alta/'],
      ['Diversificar métodos de pago', 'https://fastcompany.mx/2024/10/29/valor-diversificar-metodos-pago-era-digital/'],
      ['Emprendedor archive', 'https://emprendedor.com/author/federica-gregorini/'],
      ['Mexico Business News archive', 'https://mexicobusiness.news/tag/federica-gregorini'],
      ['The Fintech Times interview', 'https://thefintechtimes.com/em-conversa-improving-business-payments-in-mexico-with-belvo/'],
      ['Fintech Heroes playlist', 'https://www.youtube.com/playlist?list=PLBp3o9hAmq8taGzI6hOop8VhGpL8SUrHF']
    ]
  },
  {
    company: '100 Ladrillos · founder voice',
    people: 'Iván Carmona · Hugo Blum',
    contribution: 'I developed and ghostwrote founder narratives that made fractional real-estate investing understandable without overselling certainty.',
    proof: '14 public items in the company press archive',
    links: [
      ['Public press archive', 'https://somos.100ladrillos.com/prensa/'],
      ['Líderes Mexicanos interview', 'https://lideresmexicanos.com/entrevistas/hugo-blum-e-ivan-carmona-100ladrillos'],
      ['Business Insider byline', 'https://businessinsider.mx/como-ganar-juego-inversiones-inmobiliarias-opinion/'],
      ['Oppenheimer interview', 'https://www.youtube.com/watch?v=a7ttDaiGD3U']
    ]
  },
  {
    company: 'WeWork · leadership voice',
    people: 'Álvaro Villar · Liliana Méndez',
    contribution: 'I prepared leadership narratives for external interviews, audio and internal channels, keeping the voice consistent for the market and for 2,000+ colleagues.',
    proof: 'TV + leadership podcast + regional internal communications',
    links: [
      ['Álvaro Villar interview', 'https://www.youtube.com/watch?v=V7SzXUTj49g'],
      ['Liliana Méndez podcast', 'https://open.spotify.com/episode/17agLGCAI2yClM7tDUf90P']
    ]
  },
  {
    company: 'Zendesk · regional executive voice',
    people: 'Alex Barrera · Raúl Rodríguez · Dubra Valenzuela',
    contribution: 'I built local storylines, executive copy and spokesperson moments around one regional customer-experience narrative.',
    proof: '30 Promesas + Forbes and Expansión appearances + a 4-part editorial series',
    links: [
      ['Alex · 30 Promesas', 'https://expansion.mx/tecnologia/2020/10/16/alex-barrera-el-capitan-de-zendesk-en-america-latina'],
      ['Alex · Forbes Future Talk', 'https://forbes.com.mx/la-importancia-de-la-implementacion-de-cx-en-las-empresas-de-latinoamerica-forbes-tech-future/'],
      ['Raúl · Forbes', 'https://forbes.com.mx/ad-experiencia-clientes-empleados-clave-exito-empresas/'],
      ['Raúl · Expansión', 'https://expansion.mx/empresas/2021/12/20/mejorar-la-experiencia-de-cliente-es-la-ventaja-competitiva-crucial'],
      ['Alex · CX byline', 'https://asociaciondec-mx.org/opinion-de-expertos/por-que-latam-esta-a-la-vanguardia-en-cx/183/'],
      ['Raúl · revenue byline', 'https://asociaciondec-mx.org/opinion-de-expertos/area-de-atencion-al-cliente-un-motor-de-ingresos/187/'],
      ['Dubra · El Economista', 'https://www.eleconomista.es/economiahoy/opinion/noticias/10572655/05/20/Que-podemos-aprender-de-las-Pymes.html'],
      ['Dubra · Publimark', 'https://publimark.cl/opinion/dubra-valenzuela-cuatro-tips-para-startups-y-pymes.html'],
      ['Dubra · editorial series', 'https://es.linkedin.com/pulse/qu%C3%A9-podemos-aprender-de-las-pymes-dubra-valenzuela']
    ]
  },
  {
    company: 'ThinkY · founder positioning',
    people: 'Maripi Lissarrague · Delfina Peralta Ramos',
    contribution: 'I built the communications proposal and co-led founder positioning around creativity, technology, market data and the thinking behind campaigns—not just the award headline.',
    proof: '41 placements · 28 Tier 1 · 76.7M reported reach in the documented programme recap',
    links: [
      ['Founder interview', 'https://www.youtube.com/watch?v=LyVIk0WbSZo'],
      ['Maripi · Roastbrief', 'https://roastbrief.com.mx/2025/02/como-thinky-brillo-en-los-tiktok-ad-awards-una-entrevista-con-maripi-lissarrague/'],
      ['Video interview', 'https://www.youtube.com/watch?v=TrwQLhySimU']
    ]
  },
  {
    company: 'Expok · CSR and social impact',
    people: 'Miguel Ángel Santinelli · Gustavo Pérez',
    contribution: 'I turned subject-matter expertise into bylines, interviews and institutional stories grounded in human rights, migration and responsible business.',
    proof: '5 client accounts + a three-person PR team + public institutional coverage',
    links: [
      ['IOM Mexico recognition', 'https://mexico.iom.int/es/news/reconocen-la-oim-mexico-por-su-labor-social-en-la-migracion-con-el-premio-clares-2018'],
      ['Migration and human rights', 'https://conexionmigrante.com/2019-/09-/11/situacion-migratoria-se-debe-a-la-falta-de-respeto-a-los-derechos-humanos-miguel-angel-santinelli/'],
      ['Generación C', 'https://oem.com.mx/elheraldodechihuahua/local/miguel-angel-santinelli-ramo-habla-sobre-la-generacion-c-14628673'],
      ['Anáhuac + CMIC', 'https://presenterse.com/facultad-de-responsabilidad-social-de-la-anahuac-y-cmic-promoveran-edificaciones-mas-responsables/'],
      ['Leadership and survival', 'https://pymempresario.com/liderazgo-innovador-estrategia-de-supervivencia/']
    ]
  }
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
  { id: '1slrrj0nlUk', title: 'La tecnología ayuda a humanizar la atención', meta: 'Zendesk · thought leadership' },
  { id: 'LCcloRYfat4', title: 'Datos alternativos para impulsar el acceso al crédito en México', meta: 'Belvo · research story + executive visibility' },
  { id: '4MEXKLd1brA', title: '100 Ladrillos: fondeo colectivo al alcance de tu mano', meta: '100 Ladrillos · founder visibility + media relations' },
  { id: 'a7ttDaiGD3U', title: '100 Ladrillos: real estate within everyone’s reach', meta: '100 Ladrillos · Oppenheimer interview' },
  { id: 'LyVIk0WbSZo', title: 'Maripi Lissarrague and Delfina Peralta Ramos in conversation', meta: 'ThinkY · founder positioning' },
  { id: 'TrwQLhySimU', title: 'Maripi Lissarrague on ThinkY’s four TikTok Ad Awards', meta: 'ThinkY · media positioning' }
];

const writing = layout({
  title: 'Executive Communications, Writing & Media | Ximena Aguirre',
  description: 'Authored B2B fintech writing, executive ghostwriting, thought leadership, PR outcomes, interviews and media work by Ximena Aguirre.',
  path: '/writing/',
  body: `${pageHero('Writing + media', 'Some of my best writing has someone else’s name on it.', 'I write under my own name. I write for executives. And sometimes I do the work behind an interview, podcast or conversation where no byline exists at all.<br><br><strong>The job is the same: understand what someone really means, then make it worth someone else’s attention.</strong>', [['Authored', 'My byline'], ['Executive', 'Their voice'], ['Earned', 'Media outcome'], ['Format', 'Print · web · video · audio']])}

  <section class="section-tight corpus-section"><div class="site-shell">
    <div class="corpus-intro"><div><p class="eyebrow">A public body of work</p><h2>Public work, counted conservatively.</h2></div><p>Forbes and Expansión do not publish article-level pageviews, so I do not manufacture an “average reach.” I use public archive counts here and keep performance metrics clearly labeled as portfolio records.</p></div>
    <div class="corpus-grid" data-reveal>
      <article><strong>7</strong><span>selected pieces with my Belvo byline</span><i style="--size:35%"></i></article>
      <article><strong>5</strong><span>Fast Company columns written for Federica Gregorini</span><i style="--size:25%"></i></article>
      <article><strong>14</strong><span>items visible in 100 Ladrillos’ public press archive</span><i style="--size:70%"></i></article>
      <article><strong>20</strong><span>selected videos and live appearances collected here</span><i style="--size:100%"></i></article>
    </div>
  </div></section>

  <section class="section section-light"><div class="site-shell">
    <div class="writing-modes" data-reveal>
      <article><span>01 / Authored</span><h3>Signed work.</h3><p>Product launches, customer stories, reports and SEO-informed content for specialist B2B audiences.</p></article>
      <article><span>02 / Executive</span><h3>Executive voice.</h3><p>Thought leadership, ghostwriting, speeches and spokesperson messaging that still sound like the person speaking.</p></article>
      <article><span>03 / Earned</span><h3>Earned media.</h3><p>Media angles, interview preparation and story development; the independent coverage remains the publisher’s.</p></article>
    </div>
  </div></section>

  <section class="section"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Work that carries my name</p><h2>Writing clearly about complex products.</h2></div><p>I write about open finance, employment data, payments and trust while keeping both the technical detail and the human reason to care.</p></div>
    <div class="article-link-grid">${writingItems.map(([date, title, role, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer"><small>${date} · ${role}</small><strong>${title}</strong><span>Read ↗</span></a>`).join('')}</div>
    <p class="small muted">I verify my signed work through ${external('https://belvo.com/es/author/ximena-aguirre/', 'my Belvo author archive')}.</p>
  </div></section>

  <section class="section section-dark" id="voices"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">The voices I write and position</p><h2>I disappear into the voice, not the thinking.</h2></div><p>I do the hard editorial work behind the byline: find the argument, test the claim, keep the expert’s cadence and make the point worth publishing.</p></div>
    <div class="voice-library" data-reveal>${voiceGroups.map(voiceCard).join('')}</div>
  </div></section>

  <section class="section"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Coverage + clippings</p><h2>The public record of the work.</h2></div><p>These print and broadcast records show where my external communications, PR and executive-visibility work appeared.</p></div>
    <div class="clipping-grid" data-reveal>
      ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper coverage of Belvo and Clip partnership', label:'Belvo · PR outcome', caption:'Open-finance partnership coverage.', className:'clipping-landscape'})}
      ${evidenceImage({src:'/assets/media/wework-hybrid-feature.webp', width:'762', height:'954', alt:'Magazine feature about hybrid work featuring WeWork Mexico CEO Álvaro Villar', label:'WeWork · media relations', caption:'Executive positioning around hybrid work.'})}
      ${evidenceImage({src:'/assets/media/wework-hybrid-work-press.webp', width:'771', height:'1280', alt:'Newspaper feature about WeWork and Michael Page hybrid-work research', label:'WeWork · research story', caption:'Regional data turned into a news hook.'})}
      ${evidenceImage({src:'/assets/media/expok-sustainability-press-1.webp', width:'1008', height:'1280', alt:'El Economista article about sustainable development', label:'Expok · story development', caption:'Expert narrative + media relations.'})}
      ${evidenceImage({src:'/assets/media/expok-lth-press.webp', width:'966', height:'1280', alt:'NotiSUR coverage of LTH social responsibility programmes', label:'Expok · account PR', caption:'Community impact in local media.'})}
    </div>
  </div></section>

  <section class="section section-blue"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">20 selected videos + live appearances</p><h2>Executive visibility across print, audio and video.</h2></div><p>I have worked across interviews, live conversations, event content and executive visibility in fintech, SaaS, proptech, workplace and creative industries.</p></div>
    <div class="video-grid">${videoItems.map(videoCard).join('')}</div>
    <div class="audio-feature"><div><p class="eyebrow">Podcast</p><h3>View from the Top: leadership and the future of work</h3><p>I supported the editorial framing and executive visibility around this conversation with WeWork COO Liliana Méndez.</p></div><iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/17agLGCAI2yClM7tDUf90P?utm_source=generator" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify podcast episode"></iframe></div>
  </div></section>

  <section class="section-tight"><div class="site-shell"><p class="small muted">I label my contribution to every piece. I do not claim independent editorial decisions, presenter performance or third-party coverage as my authorship.</p></div></section>`
});

const about = layout({
  title: 'About Ximena Aguirre | Communications & Marketing Manager',
  description: 'About Ximena Aguirre, a Madrid-based Senior Communications & Marketing Manager with 10 years across B2B technology, fintech, Europe and Latin America.',
  path: '/about/',
  schema: 'profile',
  body: `${pageHero('About Ximena', 'I’m the person who asks one more question.', 'You know when everyone in the room seems to understand something, so nobody wants to ask the obvious question?<br><br><strong>I usually ask it.</strong>', [['Base', 'Madrid, Spain'], ['Scope', 'Europe + Latin America'], ['Practice', 'Comms · Product · Field'], ['Experience', '10 years']])}
  <section class="section"><div class="site-shell about-story"><div><p class="eyebrow">The habit</p><blockquote class="quote">The obvious question tends to be where the useful part starts.</blockquote></div><div class="measure"><p class="lede">Not because I enjoy slowing things down. Usually the opposite.</p><div class="question-list"><p>Why does this matter now?</p><p>Why would the customer believe us?</p><p>What is Sales hearing that we aren’t?</p><p>Why did this work in Mexico and not somewhere else?</p><p>Is that actually what we mean?</p></div><p>That habit has taken me from public affairs and PR into SaaS, internal communications, proptech, fintech, Product Marketing, Field Marketing and AI-assisted work.</p><p>I didn’t set out to collect disciplines.</p><p class="micro-statement">I kept getting closer to the decision.</p></div></div></section>
  <section class="section section-light"><div class="site-shell about-story"><div><p class="eyebrow">Up close</p><h2>I like getting close to the thing.</h2></div><div class="measure"><p class="lede">I’m much better at communicating a product once I understand how it works. Better at writing for a leader once I know how they think. Better at planning an event once I know what Sales needs from the room.</p><p>So I get close.</p><p>To the product. The people. The market. The numbers.</p><p><strong>It usually makes the writing shorter.</strong></p></div></div></section>
  <section class="section"><div class="site-shell"><div class="section-heading section-heading-row"><div><p class="eyebrow">My timeline</p><h2>The experience behind the range.</h2></div><p>My background spans nonprofit, public sector, agency, SaaS, workplace, proptech, fintech and the creator economy. Each role added a different kind of judgment to the work I do now.</p></div>${careerTimeline()}</div></section>`
});

const resume = layout({
  title: 'Senior Communications & Marketing Résumé | Ximena Aguirre',
  description: 'Ximena Aguirre’s résumé: 10 years across corporate and internal communications, PR, Product Marketing, GTM, Field Marketing and CRM in B2B tech and fintech.',
  path: '/resume/',
  body: `${pageHero('Résumé', 'Senior Communications & Marketing Manager', 'Ten years across Corporate Communications, PR, Product Marketing, GTM, Field Marketing and Internal Communications for B2B technology and fintech in Europe and Latin America.', [['Scope', 'Europe + Latin America'], ['Authorization', 'Spain · no sponsorship required'], ['Languages', 'Spanish native · English C2'], ['Education', 'BA Communication']])}
  <section class="section-tight no-print"><div class="site-shell"><div class="hero-actions"><button class="button button-solid" type="button" data-print>Print / save as PDF</button><a class="button" href="${linkedin}" target="_blank" rel="noopener noreferrer">Request a copy on LinkedIn</a></div></div></section>
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Profile</p><h2>I lead communications and marketing work for complex B2B products, markets and company moments.</h2></div><div><p class="lede">My role is to diagnose the problem, make the strategic choices, align the right teams and build a programme that can be evaluated honestly.</p><p class="kicker-line"><strong>Expertise:</strong> Corporate Communications · External Communications · Internal and Employee Communications · Leadership and Change Communications · PR and Media Relations · Reputation, Crisis and Issues Management · Executive Communications and Thought Leadership · Product Positioning and Messaging · GTM Strategy and Launches · Customer Stories and Sales Enablement · Field Marketing · Partner Marketing · Integrated Campaigns · Event Strategy · CRM and Lifecycle · Demand and Lead Generation · Marketing Measurement and Pipeline Attribution · SEO-informed Content · Multi-market Localization · Security and Compliance Communications · Applied AI Editorial Workflows</p></div></div></section>
  <section class="section section-blue"><div class="site-shell split split-even"><div><p class="eyebrow">How I work</p><h2>How I think and operate.</h2></div><div><p><strong>Thinking:</strong> analytical, creative and systems thinking; audience empathy; active listening; customer and market orientation.</p><p><strong>Leadership:</strong> cross-functional leadership, stakeholder influence, executive partnership, people leadership and coaching.</p><p><strong>Operating:</strong> adaptability in change, crisis and ambiguity; fast category learning; technological fluency; responsible use of AI.</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><div class="section-heading section-heading-row"><div><p class="eyebrow">Experience</p><h2>Ten years across in-house, regional and agency roles.</h2></div><p>The sequence matters: team leadership, public responsibility, agency craft, regional PR, Internal Communications, product depth and commercial measurement.</p></div>${careerTimeline({ detailed: true })}</div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Tools + systems</p><h2>Tools I have used in the work.</h2></div><div><p><strong>CRM, demand + measurement:</strong> HubSpot, Salesforce, Google Ads, Tableau, Power BI</p><p><strong>Content + collaboration:</strong> WordPress, Notion, Figma, Jira, Asana</p><p><strong>Media, SEO + research:</strong> Meltwater, Cision/Gorkana, SEMrush</p><p><strong>Events:</strong> Eventbrite, Luma, StreamYard</p><p><strong>LLMs + AI workflows:</strong> ChatGPT, Gemini, Claude, NotebookLM, Cursor, GitHub</p><p class="kicker-line"><strong>Applied AI project:</strong> I worked with engineering to build Content Cosmos, an internal LLM-enabled editorial workflow grounded in approved product knowledge, brand voice, market context and human review.</p></div></div></section>
  <section class="section-tight"><div class="site-shell"><p class="small"><strong>Education:</strong> BA in Communication, Universidad Panamericana, 2014 to 2018. · <strong>Contact:</strong> ${external(linkedin, 'LinkedIn')} · ${external(github, 'GitHub')}</p><p class="small muted">I label performance figures as portfolio records and keep confidential dashboards, private company materials and former work contact details private.</p></div></section>`
});

const recruiter = layout({
  title: 'Senior Communications & Marketing Manager | Recruiter View',
  description: 'A 90-second recruiter view of Ximena Aguirre across Corporate Communications, PR, Product Marketing, GTM, Field Marketing and Internal Communications.',
  path: '/recruiter/',
  body: `${pageHero('Looking for the short version?', '10 years. B2B tech + fintech. Madrid. Europe + Latin America.', 'I work where Product, Sales, leadership and the market need to agree on what matters.<br><br>My background spans Corporate Communications, Product Marketing, GTM, Executive Communications, Internal Communications and Field Marketing—with enough commercial exposure to care about what happens after the attention.<br><br><strong>Senior enough to make the call. Close enough to the work to know whether it was the right one.</strong>', [['Experience', '10 years'], ['Markets', 'Europe + Latin America'], ['Languages', 'Spanish native · English C2'], ['Work status', 'Spain · no sponsorship']])}
  <section class="section-tight"><div class="site-shell"><p class="eyebrow">Results in one line</p><div class="recruiter-results"><div><strong>19 → 42</strong><span>quarterly media mentions</span><small>Belvo Mexico · Q1 2024 to Q4 2025</small></div><div><strong>1,729</strong><span>MQLs in 2025</span><small>Belvo Mexico · +129.6% YoY</small></div><div><strong>US$219.4K</strong><span>event-created ACV</span><small>Belvo · Q4 2025 · +113% YoY</small></div><div><strong>41 / 28</strong><span>placements / Tier 1</span><small>ThinkY · documented PR recap</small></div><div><strong>+78%</strong><span>regional media exposure</span><small>Zendesk · six-month regional period</small></div><div><strong>2,000+</strong><span>colleagues served</span><small>WeWork · internal communications</small></div></div></div></section>
  <section class="section"><div class="site-shell split"><div class="sticky-label"><p class="eyebrow">Best evidence</p><h2>Start with these four cases.</h2></div><div class="case-list"><a class="case-row" href="/case-studies/#belvo"><span class="case-index">01</span><div><h3>Belvo</h3><p>Integrated Mexico narrative, product launches, customer proof and field pipeline.</p></div><p>Best for: B2B fintech · GTM · Comms leadership</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#thinky"><span class="case-index">02</span><div><h3>ThinkY</h3><p>A data-informed PR and thought-leadership system for the creator economy.</p></div><p>Best for: reputation · agency narrative · measurement</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#zendesk"><span class="case-index">03</span><div><h3>Zendesk</h3><p>A multi-market PR localization engine.</p></div><p>Best for: regional roles · SaaS · external comms</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#wework"><span class="case-index">04</span><div><h3>WeWork</h3><p>Internal communications infrastructure for 2,000+ colleagues.</p></div><p>Best for: internal comms · change · leadership</p><span class="case-arrow">↗</span></a></div></div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">Role fit</p><h2>Roles I map naturally to.</h2></div><div><p class="lede">Senior Communications Manager · Communications & Marketing Manager · Corporate or External Communications Manager · PR Manager / Head of PR · Internal Communications Manager · Product Marketing Manager · Field Marketing Manager · Regional Marketing Manager.</p><p><strong>Best context:</strong> B2B technology, fintech, SaaS and other complex or high-trust categories; regional and multi-market teams across Europe and Latin America.</p><p><strong>What I bring:</strong> positioning and messaging, reputation and media relations, executive visibility, internal and change communications, GTM launches, customer proof, Sales enablement, integrated campaigns, pipeline-minded events, stakeholder management and cross-functional leadership.</p></div></div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Practical</p><h2>Location, languages and tools.</h2></div><div><p><strong>Work authorization:</strong> Spain; no sponsorship required</p><p><strong>Languages:</strong> Spanish (native), English (C2)</p><p><strong>Tools:</strong> HubSpot, Salesforce, WordPress, Notion, Figma, Meltwater/Cision, Tableau/Power BI, ChatGPT, Gemini, NotebookLM, Claude, Cursor.</p><div class="hero-actions"><a class="button button-solid" href="/resume/">Open résumé</a><a class="button" href="${linkedin}" target="_blank" rel="noopener noreferrer">Contact on LinkedIn</a></div></div></div></section>`
});

const proof = layout({
  title: 'Evidence Notes | Ximena Aguirre',
  description: 'Evidence, attribution and confidentiality notes for metrics, case studies, public links and reconstructed frameworks in Ximena Aguirre’s portfolio.',
  path: '/proof/',
  body: `${pageHero('Evidence notes', 'The evidence behind the claims.', 'Definitions, periods, attribution and source limits for every metric used in this portfolio.', [['Public evidence', 'Linked primary pages'], ['Metrics', 'Portfolio records'], ['Frameworks', 'Clearly reconstructed'], ['Policy', 'No private source data']])}
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Metric register</p><h2>Definitions, periods and attribution.</h2></div><div>
    <details open><summary>10 years</summary><div>I calculate this from my career start in marketing leadership in January 2016 through 2026, rounded down to a whole year.</div></details>
    <details><summary>Europe + Latin America</summary><div>Direct professional scope includes Mexico, Chile, Colombia, Argentina, Peru, the Caribbean and Costa Rica; current base and cross-regional work connect the profile to Spain and broader European teams.</div></details>
    <details><summary>Belvo · 19 → 42 quarterly media mentions (+121%)</summary><div>Mexico programme record: 19 quarterly mentions in Q1 2024 versus 42 in Q4 2025. Arithmetic: (42−19)÷19 = 121.05%, rounded to 121%.</div></details>
    <details><summary>Belvo · 1,729 MQLs in 2025 (+129.6% YoY)</summary><div>Annual programme record for 2025 versus 2024. This is an integrated marketing result across channels and teams, not a PR-only result. The underlying CRM export remains private.</div></details>
    <details><summary>Belvo · 330 Contact Us submissions in Q4 2025 (+35.3% YoY)</summary><div>The dated dashboard shows 10,175 Contact Us views, a 3.24% conversion rate and 330 submissions in Q4 2025. I treat this as a higher-intent signal and do not present it as a subset of the annual MQL figure.</div></details>
    <details><summary>Belvo · 69 deals created in Q4 2025 (+38% YoY)</summary><div>Quarterly dashboard record versus Q4 2024. The same reporting set records 14 inbound closed-won deals, up 16.7% YoY. Underlying Salesforce opportunity data remains private.</div></details>
    <details><summary>Belvo · US$219.4K event-created ACV in Q4 2025 (+113% YoY)</summary><div>The dashboard reports US$219,350 versus US$102,968 in Q4 2024, an increase of 113.03%. This is annual contract value attached to created opportunities, not booked cash or sole-person attribution.</div></details>
    <details><summary>Belvo · US$722.9K event-sourced ACV in 2024 (+362% YoY)</summary><div>Annual portfolio record for 2024 versus 2023. Account, attendee and opportunity data remain private.</div></details>
    <details><summary>Belvo · 2024 wider marketing context</summary><div>A dated plan records US$1.6M in new ARR associated with marketing-led initiatives, 60% of closed-won deal count from inbound and events, and 2,121 contacts from marketing channels. These are team and company context, not individual attribution.</div></details>
    <details><summary>Belvo · content and conversion evidence</summary><div>The strategy review states that more than half of inbound closed-won opportunities came through Contact Us and sign-up forms, and that product pages converted 300+ qualified leads in 2024. It also records a number-one Mexico ranking for “pago domiciliación bancaria” and number two for “domiciliación bancaria.” These are programme-level findings.</div></details>
    <details><summary>Belvo · Q1 2026 communications and field snapshot</summary><div>The recap records 20 PR mentions, 36% in Tier 1 media, inclusion in two industry reports, 45.2K LinkedIn impressions, 15.3K page views (+19.6%), 6.8K unique visitors (+13.6%), 738 reactions (+13.1%), 45 comments (+104.5%), 41 shares (+127.8%), 321 Google Business interactions (+16.7%), 237 direction requests (+14.5%), five blog posts, two hosted events and 13 leads across the reported field programme.</div></details>
    <details><summary>ThinkY · 41 placements, 28 Tier 1, 76.7M reach</summary><div>The documented programme recap labels 41 placements, 28 in Tier 1 media (almost 70%) and more than 76.7M in reported reach. I authored the proposal and co-led the programme with ThinkY’s team.</div></details>
    <details><summary>ThinkY · MXN 5.5M modelled PR value</summary><div>This is the reporting model’s media-equivalency estimate. It is not revenue, ARR, pipeline or independently audited economic impact.</div></details>
    <details><summary>ThinkY · 13-month and monthly snapshots</summary><div>A February 2024 to March 2025 report records 40 hits, 3.07 per month, 102% of KPI, 68.3% Tier 1 and 100% positive sentiment. A separate March snapshot records three Tier 1 hits and 1,022,988 impressions from one timely story. A November snapshot records eight hits, 75% Tier 1, 38,597,872 impressions and 100% positive sentiment. Different windows are kept separate.</div></details>
    <details><summary>+78% regional exposure</summary><div>Zendesk portfolio record for a documented six-month period within the 2020 to 2022 regional PR remit. Public coverage examples demonstrate the program; the underlying media report remains private.</div></details>
    <details><summary>Metrics intentionally not promoted</summary><div>One 2026 deck is titled as a Q1 recap while two acquisition slides label their 205 MQL and 32 inbound-deal figures as Q4. I do not use those numbers as headline claims because the period labels conflict. Q2 targets in the same plan are goals, not results.</div></details>
  </div></div></section>
  <section class="section section-light"><div class="site-shell split split-even"><div><p class="eyebrow">My three evidence classes</p><h2>Three kinds of evidence.</h2></div><div><p><strong>Public record:</strong> I link bylines, author archives, company announcements and third-party coverage at a stable URL.</p><p><strong>Performance record:</strong> I use figures documented in my résumé and portfolio, checked for internal consistency but not linked to confidential dashboards.</p><p><strong>Reconstruction:</strong> I demonstrate my actual process with fictional or generalized inputs instead of publishing company material.</p></div></div></section>
  <section class="section"><div class="site-shell"><p class="eyebrow">Intentionally withheld</p><div class="note-grid"><div class="note"><strong>Personal data</strong><p>Phone number, home address and former work contact details.</p></div><div class="note"><strong>Company data</strong><p>CRM exports, account lists, budgets, attendee details and internal dashboards.</p></div><div class="note"><strong>Sensitive context</strong><p>Incident specifics, confidential launch material and internal communications artifacts.</p></div></div></div></section>`
});

const contact = layout({
  title: 'Contact Ximena Aguirre | Communications & Marketing',
  description: 'Contact Ximena Aguirre in Madrid about senior Communications and Marketing roles, PR, Product Marketing, GTM, Field Marketing or selected projects.',
  path: '/contact/',
  body: `<section class="section contact-hero"><div class="site-shell contact-layout"><div class="contact-copy"><p class="eyebrow">Contact · Madrid</p><h1>Tell me what you’re trying to make happen.</h1><p class="lede">A role, a launch, a new market, a reputation problem, a team in change.</p><p><strong>A short note is enough. The unpolished version is fine.</strong></p><p class="contact-practical">Madrid · Authorized to work in Spain · Spanish + English</p><p>You can also <a href="${linkedin}" target="_blank" rel="noopener noreferrer">find me on LinkedIn</a>.</p></div>${leadForm('contact')}</div></section>`
});

const notFound = layout({
  title: 'Page not found | Ximena Aguirre',
  description: 'The page you requested could not be found.',
  path: '/404.html',
  body: `<section class="section contact-hero"><div class="site-shell"><p class="eyebrow">404 / missing page</p><h1>Page not found.</h1><p class="lede">Try one of these routes.</p><div class="hero-actions"><a class="button button-solid" href="/">Go home</a><a class="button" href="/work/">See the work</a></div></div></section>`
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
await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');

console.log(`Built ${pages.size} HTML pages plus sitemap and robots.txt.`);
