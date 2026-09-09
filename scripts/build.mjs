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
      <p class="footer-note">I make complicated things easier to understand, and easier to act on.</p>
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
    jobTitle: 'Senior Communications, Product Marketing, PR & Field Marketing Leader',
    sameAs: [linkedin, github],
    knowsAbout: ['B2B marketing', 'Corporate communications', 'Public relations', 'Product marketing', 'Field marketing', 'Demand generation', 'CRM and lifecycle marketing', 'Go-to-market strategy', 'Executive communications', 'AI-enabled content operations', 'Multi-market communications']
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

function leadForm() {
  return `<form class="lead-form" data-contact-form>
    <div class="form-grid">
      <label><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
      <label><span>Work email</span><input type="email" name="email" autocomplete="email" required></label>
      <label><span>Company</span><input type="text" name="company" autocomplete="organization"></label>
      <label><span>What should we talk about?</span><select name="reason" required><option value="" selected disabled>Choose one</option><option>Senior role</option><option>Consulting project</option><option>Speaking or media</option><option>Something else</option></select></label>
      <label class="form-full"><span>Tell me a little about it</span><textarea name="message" rows="5" required placeholder="What are you building, changing or trying to make clearer?"></textarea></label>
      <label class="form-honeypot" aria-hidden="true"><span>Leave this empty</span><input type="text" name="website" tabindex="-1" autocomplete="off"></label>
    </div>
    <div class="form-submit"><button class="button button-solid" type="submit">Open email draft</button><p>This prepares an email in your own mail app. Nothing is stored on this site.</p></div>
    <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  </form>`;
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
    role: 'Marketing & Communications Projects',
    story: 'I supported creator, influencer and communications projects linked to Netflix, Rexona and the TikTok Awards, as well as B2B content work.',
    proof: 'Creator mapping, briefs, approvals, activation, amplification and reporting.'
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
  title: 'Ximena Aguirre | Communications, Product Marketing, PR & Field',
  description: 'I connect communications, Product Marketing, PR, field, lifecycle and data across Europe and Latin America.',
  path: '/',
  schema: true,
  body: `
  <section class="section hero hero-v2">
    <div class="site-shell hero-story">
      <div class="hero-copy">
        <p class="eyebrow">Hi, I’m Ximena</p>
        <h1>I like finding out what makes people care.</h1>
        <p class="lede">I have always been the person who asks one more question. What is someone worried about? What are they trying to change? What would make a product, a decision or a story feel relevant to their day?</p>
        <p class="hero-plain">That curiosity became my work. I connect Communications, Product Marketing, PR, Field, CRM and content so complex ideas can make sense inside a company, earn trust outside it and help the business grow.</p>
        <p class="hero-note">I have spent ten years learning new industries and markets quickly. I start with people, product and context. The channel comes after.</p>
        <div class="hero-actions">
          <a class="button button-solid" href="#my-story">Read my story</a>
          <a class="button" href="/recruiter/">See the 90-sec view</a>
        </div>
        <dl class="hero-facts"><div><dt>Experience</dt><dd>10 years</dd></div><div><dt>Range</dt><dd>Comms + Product + Field</dd></div><div><dt>Markets</dt><dd>Europe + Latin America</dd></div></dl>
      </div>
      <figure class="hero-portrait">
        <div class="portrait-frame"><img src="/assets/media/ximena-aguirre-portrait.webp" width="800" height="800" alt="Portrait of Ximena Aguirre" loading="eager" decoding="async" fetchpriority="high"></div>
        <figcaption><span>Madrid, Spain</span><strong>I set the direction and stay close to the work.</strong></figcaption>
      </figure>
    </div>
  </section>

  <section class="section section-light" id="my-story" aria-labelledby="story-title">
    <div class="site-shell origin-story">
      <div class="origin-copy">
        <p class="eyebrow">How I got here</p>
        <h2 id="story-title">I did not plan a 360° profile. I kept following the work.</h2>
        <p class="lede">Every role added a missing piece. I learned to earn attention, build trust, make products understandable and give interest somewhere useful to go.</p>
      </div>
      <ol class="chapter-list" data-reveal>
        <li><span>2016</span><strong>I learned that attention needs a next step.</strong><p>At AIESEC, I led twelve people and helped increase leads by 83%. It was my first lesson in connecting a message to action.</p></li>
        <li><span>2018 to 2020</span><strong>I learned to look for the person behind the claim.</strong><p>COPRED, 3AM and Expok took me through public issues, fashion and social impact. Different worlds, same responsibility to understand the context before writing.</p></li>
        <li><span>2020 to 2023</span><strong>I learned how a story travels.</strong><p>Zendesk taught me to localize across six markets and the Caribbean. WeWork taught me that employees should never discover the company story last.</p></li>
        <li><span>2023 to 2026</span><strong>I moved closer to the product and the business.</strong><p>At 100 Ladrillos and Belvo, I connected positioning, launches, founder voice, events, CRM, Sales follow-up and pipeline.</p></li>
        <li><span>Now</span><strong>I keep the range, but I never lose the thread.</strong><p>I can move from a product brief to a byline, from a crisis room to a field event, or from an LLM workflow to a CRM report because I know what each part is there to do.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="range-title">
    <div class="site-shell venn-layout">
      <div>
        <p class="eyebrow">My 360° practice</p>
        <h2 id="range-title">I work where three disciplines meet.</h2>
        <p class="lede">I can enter through a message, a product or a market moment. I stay long enough to connect all three.</p>
        <div class="range-key">
          <p><strong>I listen.</strong> I learn what people, customers and teams are actually living.</p>
          <p><strong>I frame.</strong> I turn product truth and market tension into positioning, messages and proof.</p>
          <p><strong>I activate.</strong> I use PR, content, leaders, events, creators and CRM with a clear role for each.</p>
          <p><strong>I learn.</strong> I read response, lead quality, pipeline and feedback, then improve the next move.</p>
        </div>
      </div>
      <figure class="venn-figure" data-reveal>
        <svg class="venn-svg" viewBox="0 0 720 600" role="img" aria-labelledby="venn-title venn-desc">
          <title id="venn-title">My connected marketing practice</title>
          <desc id="venn-desc">Three overlapping circles represent Communications, Product Marketing, and Field and Lifecycle. Their shared center is a story people can understand and act on.</desc>
          <circle class="venn-comms" cx="250" cy="230" r="190"></circle>
          <circle class="venn-product" cx="470" cy="230" r="190"></circle>
          <circle class="venn-field" cx="360" cy="405" r="190"></circle>
          <text x="175" y="150" text-anchor="middle"><tspan>COMMUNICATIONS</tspan><tspan x="175" dy="26">PR · INTERNAL · VOICE</tspan></text>
          <text x="545" y="150" text-anchor="middle"><tspan>PRODUCT MARKETING</tspan><tspan x="545" dy="26">POSITIONING · GTM · PROOF</tspan></text>
          <text x="360" y="480" text-anchor="middle"><tspan>FIELD + LIFECYCLE</tspan><tspan x="360" dy="26">EVENTS · CRM · PIPELINE</tspan></text>
          <text class="venn-center" x="360" y="292" text-anchor="middle"><tspan>ONE USEFUL</tspan><tspan x="360" dy="34">STORY</tspan></text>
        </svg>
        <figcaption>I connect people, product and growth. That is what 360° means in my work.</figcaption>
      </figure>
    </div>
  </section>

  <section class="section impact-section" aria-labelledby="impact-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">Data + lead generation</p><h2 id="impact-title">I care about the story, and what happens because of it.</h2></div><p>I use data to decide where attention should go next, where a journey is leaking and what Sales needs to continue the conversation.</p></div>
      <div class="signal-board" data-reveal>
        <figure class="signal-chart"><header><span>Demand</span><strong>+129.6%</strong></header><h3>Marketing-qualified leads</h3><div class="paired-bars" role="img" aria-label="MQL index increased from 100 in 2024 to 230 in 2025"><div><span>2024</span><i><b style="--bar:43.5%"></b></i><em>Index 100</em></div><div><span>2025</span><i><b style="--bar:100%"></b></i><em>1,729 · Index 230</em></div></div><figcaption>I supported Belvo’s integrated Mexico programme across campaigns, content, field and follow-up.</figcaption></figure>
        <figure class="signal-chart"><header><span>Intent</span><strong>+35.3%</strong></header><h3>Contact Us submissions</h3><div class="paired-bars" role="img" aria-label="Contact Us index increased from 100 in the previous year to 135 in 2025"><div><span>Previous year</span><i><b style="--bar:73.9%"></b></i><em>Index 100</em></div><div><span>2025</span><i><b style="--bar:100%"></b></i><em>330 · Index 135</em></div></div><figcaption>I tracked higher-intent actions separately from broad campaign reach.</figcaption></figure>
        <figure class="signal-chart"><header><span>Pipeline</span><strong>+38%</strong></header><h3>Deals created</h3><div class="paired-bars" role="img" aria-label="Q4 deal index increased from 100 in 2024 to 138 in 2025"><div><span>Q4 2024</span><i><b style="--bar:72.5%"></b></i><em>Index 100</em></div><div><span>Q4 2025</span><i><b style="--bar:100%"></b></i><em>69 · Index 138</em></div></div><figcaption>I worked with Sales on context, ownership and follow-up, then read movement in CRM.</figcaption></figure>
        <figure class="signal-chart"><header><span>Revenue signal</span><strong>+362%</strong></header><h3>Event-sourced ACV</h3><div class="paired-bars" role="img" aria-label="Event-sourced ACV index increased from 100 in 2023 to 462 in 2024"><div><span>2023</span><i><b style="--bar:21.6%"></b></i><em>Index 100</em></div><div><span>2024</span><i><b style="--bar:100%"></b></i><em>US$722.9K · Index 462</em></div></div><figcaption>I connected event selection, account intent, Sales handoff and opportunity attribution.</figcaption></figure>
      </div>
      <p class="evidence-line">I compare each signal only with its own baseline. These are separate indicators, not stages of one invented funnel, and I do not attribute every result to communications alone. <a href="/proof/">See every denominator →</a></p>
    </div>
  </section>

  <section class="section section-blue" aria-labelledby="ai-title">
    <div class="site-shell ai-story">
      <div class="ai-copy"><p class="eyebrow">LLMs + content operations</p><h2 id="ai-title">I built an AI content system because speed was not the only problem.</h2><p class="lede">Good teams lose time every time they have to rebuild the same product context, voice and market knowledge from scratch.</p><p>At Belvo, I worked with engineering to create Content Cosmos, an internal editorial workflow that generated first drafts and content variants from approved product knowledge, brand voice, market context and editorial standards.</p><p>The models were already trained. My work was to give the system the right working context and a path people could trust. I kept source review, factual approval, cultural judgment and the final voice with humans.</p></div>
      <div>
        <ol class="ai-flow" data-reveal><li><span>01</span><strong>Approved truth</strong><small>Product knowledge and source material</small></li><li><span>02</span><strong>Working context</strong><small>Voice, market and editorial rules</small></li><li><span>03</span><strong>LLM draft</strong><small>First passes and useful variants</small></li><li><span>04</span><strong>Human review</strong><small>Facts, claims, nuance and judgment</small></li><li><span>05</span><strong>Market-ready</strong><small>SEO, GEO and local adaptation</small></li></ol>
        <div class="tool-band"><span>Built with engineering</span><strong>LLMs · Cursor · GitHub</strong><span>My broader toolkit</span><strong>ChatGPT · Gemini · Claude · NotebookLM · Cursor</strong></div>
        <p class="small"><a href="/case-studies/#ai">Read the full AI case →</a></p>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="human-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">How I show up</p><h2 id="human-title">The part of the work no tool can replace.</h2></div><p>I am curious by default. I ask simple questions without ego, listen for what is not being said and make it easier for people with different priorities to work together.</p></div>
      <div class="human-grid" data-reveal>
        <article><span>Listen</span><h3>I look for what moves people.</h3><p>I want to understand what they are living before I decide what they need to hear.</p></article>
        <article><span>Learn</span><h3>I get fluent fast.</h3><p>I have moved through fintech, SaaS, proptech, ESG, public affairs, fashion and the creator economy by learning the product and the market from the inside.</p></article>
        <article><span>Connect</span><h3>I bring different rooms together.</h3><p>I translate between Product, Sales, Data, leadership, agencies, media and customers without losing the point.</p></article>
        <article><span>Stay steady</span><h3>I am calm when the work gets difficult.</h3><p>I make the next decision visible, protect trust and keep people moving when the room is tense.</p></article>
        <article><span>Finish</span><h3>I care about the last mile.</h3><p>I can set the strategy, write the line, brief the person, run the moment and question the report.</p></article>
      </div>
    </div>
  </section>

  <section class="section section-dark" aria-labelledby="voices-title">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">The voices I have helped carry</p><h2 id="voices-title">I write for the person, not around them.</h2></div><p>I turn expertise into a point of view that can live in a column, an interview, a keynote, a podcast or a difficult internal message.</p></div>
      <div class="voice-ledger" data-reveal>
        <article><div><span>Belvo</span><h3>Federica Gregorini</h3></div><p>I shaped executive narratives across columns, interviews and live fintech content.</p><strong>5 Fast Company columns</strong><a href="https://fastcompany.mx/author/federica-gregorini/" target="_blank" rel="noopener noreferrer">Open archive ↗</a></article>
        <article><div><span>Zendesk</span><h3>Alex Barrera · Raúl Rodríguez · Dubra Valenzuela</h3></div><p>I developed regional storylines, executive copy and media moments for different markets and voices.</p><strong>30 Promesas + Forbes + a 4-part editorial series</strong><a href="/writing/#voices">See the evidence ↗</a></article>
        <article><div><span>100 Ladrillos</span><h3>Iván Carmona · Hugo Blum</h3></div><p>I helped make an unfamiliar investment model clear through founder narratives, media and investor moments.</p><strong>14 items in the public press archive</strong><a href="https://somos.100ladrillos.com/prensa/" target="_blank" rel="noopener noreferrer">Open archive ↗</a></article>
        <article><div><span>WeWork</span><h3>Álvaro Villar · Liliana Méndez</h3></div><p>I prepared leadership stories to work on television, in audio and with employees across the region.</p><strong>TV + podcast + 2,000+ colleagues</strong><a href="/writing/#voices">See the evidence ↗</a></article>
        <article><div><span>ThinkY</span><h3>Maripi Lissarrague · Delfina Peralta Ramos</h3></div><p>I supported founder positioning around creativity, technology and the work behind award-winning campaigns.</p><strong>Founder interviews + TikTok Ad Awards story</strong><a href="/writing/#voices">See the evidence ↗</a></article>
        <article><div><span>Expok</span><h3>Miguel Ángel Santinelli · Gustavo Pérez</h3></div><p>I translated social-impact expertise into columns, interviews, events and stories with a human consequence.</p><strong>CSR + human rights + institutional visibility</strong><a href="/writing/#voices">See the evidence ↗</a></article>
      </div>
    </div>
  </section>

  <section class="section visual-proof-section">
    <div class="site-shell">
      <div class="section-heading section-heading-row"><div><p class="eyebrow">My work in public</p><h2>I write. I brief. I produce. I follow through.</h2></div><p>I label every piece by my actual role: authored, ghostwritten, editorial strategy, spokesperson preparation, media relations or event work.</p></div>
      <div class="evidence-wall" data-reveal>
        ${evidenceImage({src:'/assets/media/tedx-universidad-panamericana-event.webp', width:'900', height:'1200', alt:'Speaker on a red-lit TEDx Universidad Panamericana stage', label:'Events', caption:'I work the story behind the room · TEDx Universidad Panamericana'})}
        ${evidenceImage({src:'/assets/media/wework-alvaro-villar-tv.webp', width:'1280', height:'719', alt:'Álvaro Villar, CEO of WeWork Mexico, in a television interview on ADN40', label:'Media relations', caption:'I prepare executive visibility · WeWork', className:'evidence-wide'})}
        ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Print coverage of the Belvo and Clip open-finance partnership', label:'External communications', caption:'I turn technical partnerships into useful stories · Belvo', className:'evidence-wide'})}
        ${evidenceImage({src:'/assets/media/expok-toks-bylined-column.webp', width:'1125', height:'1242', alt:'Newspaper page with a corporate responsibility guest column and Toks coverage', label:'Editorial + PR', caption:'I develop executive voice and earned stories · Expok'})}
      </div>
      <div class="hero-actions"><a class="button button-solid" href="/writing/">Open my writing + media</a><a class="button" href="/work/">See my 360° work</a></div>
    </div>
  </section>

  <section class="section section-light" aria-labelledby="home-contact-title">
    <div class="site-shell contact-layout">
      <div class="contact-copy"><p class="eyebrow">Let’s talk</p><h2 id="home-contact-title">Tell me what you are trying to make clearer.</h2><p class="lede">If you are building a team, launching a product, entering a market or trying to connect communications with growth, I would love to hear the real version of the problem.</p><p>You can start here or <a href="${linkedin}" target="_blank" rel="noopener noreferrer">find me on LinkedIn</a>.</p></div>
      ${leadForm()}
    </div>
  </section>`
});

const work = layout({
  title: 'Work | Ximena Aguirre',
  description: 'My work across communications, Product Marketing, PR, field, lifecycle and data in fintech, SaaS, proptech and ESG.',
  path: '/work/',
  body: `${pageHero('My work / 360° view', 'I follow the work across the whole business.', 'I move between the product, the company, the press room and the market because that is how the work happens in real life. I find the connection and build around it.', [['Inside', 'Leadership · change · employees'], ['Outside', 'PR · reputation · media'], ['Product', 'Positioning · GTM · proof'], ['Growth', 'Field · CRM · pipeline']])}
  <section class="section"><div class="site-shell">
    <div class="card-grid">
      <article class="card card-wide"><div><div class="card-meta"><span>01 / Belvo</span><span>Fintech · Mexico</span></div><h3>I made open finance useful, credible and visible.</h3><p>I connected Product Marketing, launches, customer proof, PR, field, CRM and measurement.</p></div><a href="/case-studies/#belvo">Read my case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>02 / 100 Ladrillos</span><span>Proptech · Mexico</span></div><h3>I built trust around a new investment model.</h3><p>I combined PR, founder positioning, investor moments, KOLs and issue readiness.</p></div><a href="/case-studies/#ladrillos">Read my case →</a></article>
      <article class="card"><div><div class="card-meta"><span>03 / WeWork</span><span>Internal · LatAm</span></div><h3>I built communications infrastructure for 2,000+ people.</h3><p>I created the channel architecture, leadership rhythm and change communications.</p></div><a href="/case-studies/#wework">Read my case →</a></article>
      <article class="card"><div><div class="card-meta"><span>04 / Zendesk</span><span>SaaS · Regional</span></div><h3>I gave one global thesis many local reasons to matter.</h3><p>I localized regional PR across six markets and the Caribbean.</p></div><a href="/case-studies/#zendesk">Read my case →</a></article>
      <article class="card"><div><div class="card-meta"><span>05 / Expok</span><span>ESG · Agency</span></div><h3>I turned impact programmes into stories people could see.</h3><p>I led multi-client PR, executive content and a three-person team.</p></div><a href="/case-studies/#expok">Read my case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>06 / Field system</span><span>Cross-company</span></div><h3>I moved beyond the badge scan.</h3><p>I built a repeatable field workflow around account intent, Sales alignment, CRM and attribution.</p></div><a href="/case-studies/#field">Read my case →</a></article>
      <article class="card card-wide"><div><div class="card-meta"><span>07 / Content Cosmos</span><span>AI · LLM operations</span></div><h3>I built an AI-enabled content workflow with engineering.</h3><p>I connected approved knowledge, brand voice, LLM drafting and human review for faster multi-market content.</p></div><a href="/case-studies/#ai">Read my case →</a></article>
    </div>
  </div></section>

  <section class="section section-blue" aria-labelledby="pmm-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Product Marketing</p><h2 id="pmm-title">I help a product find its clearest reason to matter.</h2></div><p>I have done this inside broader marketing and communications roles. I work from product truth to positioning, launch, proof, Sales enablement and market feedback.</p></div>
    <ol class="product-loop" data-reveal>
      <li><span>01</span><strong>Learn</strong><small>I listen to Product, customers, Sales and the market.</small></li>
      <li><span>02</span><strong>Position</strong><small>I define the audience, tension, promise and proof.</small></li>
      <li><span>03</span><strong>Launch</strong><small>I align message, content, leaders, channels and timing.</small></li>
      <li><span>04</span><strong>Enable</strong><small>I give Sales and partners useful stories and assets.</small></li>
      <li><span>05</span><strong>Listen again</strong><small>I use CRM, questions and performance data to improve.</small></li>
    </ol>
    <div class="pmm-proof"><div><strong>12+</strong><span>product, partnership and customer launches</span></div><div><strong>17</strong><span>customer stories built as market proof</span></div><div><strong>3</strong><span>markets coordinated across Mexico, Spain and Colombia</span></div></div>
  </div></section>

  <section class="section section-light" aria-labelledby="content-system-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">My 360° content system</p><h2 id="content-system-title">I make one useful idea travel.</h2></div><p>I do not create more content for the sake of volume. I give one point of view the right format, audience, moment and next action.</p></div>
    <div class="workstream-grid" data-reveal>
      <article><span>01</span><h3>I frame the narrative.</h3><p>Message house · issues · launches</p></article>
      <article><span>02</span><h3>I build the evidence.</h3><p>Research · customer stories · reports</p></article>
      <article><span>03</span><h3>I carry the voice.</h3><p>Bylines · blogs · speeches · video</p></article>
      <article><span>04</span><h3>I earn the audience.</h3><p>PR · interviews · podcasts · KOLs</p></article>
      <article><span>05</span><h3>I create the moment.</h3><p>Events · webinars · field programmes</p></article>
      <article><span>06</span><h3>I design what happens next.</h3><p>CRM · nurture · Sales SLA · learning</p></article>
    </div>
  </div></section>

  <section class="section section-dark" aria-labelledby="crm-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">CRM + lifecycle · HubSpot + Salesforce</p><h2 id="crm-title">I give attention somewhere useful to go.</h2></div><p>I plan the invitation, registration, reminders, lead state, context-rich Sales handoff and post-event learning as one journey.</p></div>
    <ol class="crm-flow" data-reveal><li><span>01</span><b>Audience</b><small>I define account fit and intent.</small></li><li><span>02</span><b>Journey</b><small>I build invite, reminders and nurture.</small></li><li><span>03</span><b>Handoff</b><small>I set owner, context and a sub-24h action.</small></li><li><span>04</span><b>Movement</b><small>I track inquiry, opportunity and learning.</small></li></ol>
    <div class="number-notes number-notes-dark"><div><strong>1,729</strong><span>MQLs in 2025 · +129.6% YoY across my integrated Belvo programme</span></div><div><strong>330</strong><span>Contact Us inquiries in 2025 · +35.3% YoY</span></div><div><strong>69</strong><span>Q4 deals in 2025 · +38% YoY</span></div></div>
  </div></section>

  <section class="section" aria-labelledby="moments-title"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Events + KOLs + creators</p><h2 id="moments-title">I build the room and choose who belongs in it.</h2></div><p>I work across event thesis, speaker and expert relationships, creator partnerships, production, content capture and follow-up.</p></div>
    <div class="moment-layout">
      <div class="event-gallery" data-reveal>
        ${evidenceImage({src:'/assets/media/wework-anniversary-field-event.webp', width:'1050', height:'1400', alt:'WeWork anniversary event stage', label:'Owned event', caption:'I shaped a live brand moment · WeWork'})}
        ${evidenceImage({src:'/assets/media/tedx-universidad-panamericana-event.webp', width:'900', height:'1200', alt:'TEDx Universidad Panamericana stage', label:'Event archive', caption:'I work from the story and speaker to the room and its afterlife.'})}
      </div>
      <div class="campaign-ledger" data-reveal>
        <article><span>100 Ladrillos · KOL</span><h3>Chicharito Hernández</h3><p>I helped connect a high-recognition partner story to the company’s investment narrative.</p><div><a href="https://www.eleconomista.com.mx/el-empresario/Chicharito-Hernandez-se-estrena-como-inversionista-con-100-Ladrillos-20230403-0050.html" target="_blank" rel="noopener noreferrer">Press story ↗</a><a href="https://vt.tiktok.com/ZSqSaBoNp/" target="_blank" rel="noopener noreferrer">Campaign video ↗</a></div></article>
        <article><span>Zendesk · Expert/KOL</span><h3>Cecilia Hugony</h3><p>I coordinated expert and spokesperson content around a regional customer-experience narrative.</p><div><a href="https://www.youtube.com/playlist?list=PLidl0nsRAqfOR4aEhjK-gH3QSj77zBPNv" target="_blank" rel="noopener noreferrer">CXperiences playlist ↗</a></div></article>
        <article><span>3AM · Creator content</span><h3>Selected campaign posts</h3><p>I worked with social-native formats earlier in my career without treating social as the whole strategy.</p><div><a href="https://www.instagram.com/p/BwNb3KxFzB_/" target="_blank" rel="noopener noreferrer">Post 01 ↗</a><a href="https://www.instagram.com/p/BwHWGR7llFi/" target="_blank" rel="noopener noreferrer">Post 02 ↗</a><a href="https://www.instagram.com/p/BwGbb-WFsWG/" target="_blank" rel="noopener noreferrer">Post 03 ↗</a></div></article>
      </div>
    </div>
  </div></section>`
});

const caseStudies = layout({
  title: 'Case Studies | Ximena Aguirre',
  description: 'Seven case studies across internal communications, external communications, PR, field marketing and GTM, with results shown in context.',
  path: '/case-studies/',
  body: `${pageHero('Case studies / 360° communications', 'Seven assignments. One connected practice.', 'The format is deliberately simple: the mandate, what I saw, what I did and what changed. Strategy and execution sit together.', [['Inside', 'WeWork'], ['Outside', 'Zendesk · Expok'], ['Market', 'Belvo · 100 Ladrillos'], ['Systems', 'Field · AI']])}
  <nav class="case-jump site-shell" aria-label="Jump to a case study">
    <a href="#belvo">Belvo</a><a href="#ladrillos">100 Ladrillos</a><a href="#wework">WeWork</a><a href="#zendesk">Zendesk</a><a href="#expok">Expok</a><a href="#field">Field</a><a href="#ai">AI</a>
  </nav>
  <div class="site-shell">
    <article class="case-study" id="belvo">
      <aside class="case-side"><div class="case-number">01</div><div class="case-tags"><span class="tag">Product Marketing</span><span class="tag">External comms</span><span class="tag">Field</span><span class="tag">Mexico</span></div></aside>
      <div class="case-body"><p class="eyebrow">Belvo · 2024 to 2026</p><h2>Make open finance useful before trying to make it famous.</h2><p class="case-deck">I owned the Mexico communications and marketing narrative across product launches, PR, customer stories, executive visibility and field programmes.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Give a regulated B2B fintech one coherent market story, then make it work for media, customers, prospects and Sales.</p></div><div><span>What I saw</span><p>“Open finance” was the category. Better credit decisions, verification and collection were the stories people could actually use.</p></div></div>
        <h3>What I did</h3><ul class="compact-list"><li>I turned product capabilities into positioning, audience-specific messages and useful launch stories.</li><li>I built customer proof and connected launches, spokespeople, field programmes and commercial follow-up.</li><li>I worked hands-on across Product, Sales, Customer Success, Partnerships, Data, leadership and agencies.</li></ul>
        ${metricCard(impactMetrics[0])}
        <div class="number-notes"><div><strong>1,729</strong><span>MQLs in 2025 · +129.6% YoY across the integrated Mexico programme</span></div><div><strong>US$722.9K</strong><span>event-sourced ACV in 2024 · +362% YoY</span></div><div><strong>12+</strong><span>launches supported across product, partnerships and customer proof</span></div></div>
        <div class="evidence-pair">
          ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper story about the Belvo and Clip open-finance partnership', label:'PR outcome', caption:'Partnership story in print.'})}
          ${evidenceImage({src:'/assets/media/belvo-jpmorgan-press.webp', width:'1010', height:'1280', alt:'Print coverage of financial solutions from Belvo and J.P. Morgan', label:'PR outcome', caption:'A technical proposition translated for a business audience.'})}
        </div>
        <h3>Public evidence</h3><ul class="source-list"><li>${external('https://belvo.com/es/author/ximena-aguirre/', 'My Belvo author archive')}</li><li>${external('https://fastcompany.mx/author/federica-gregorini/', 'Federica Gregorini: Fast Company columns')}</li><li>${external('https://belvo.com/es/blog/belvo-payjoy-financiamiento-celulares-mexico-datos-empleo/', 'PayJoy + employment-data customer story')}</li><li>${external('https://belvo.com/es/blog/smart-fit-belvo-pagos-recurrentes-open-finance/', 'Smart Fit + recurring payments story')}</li><li>${external('https://belvo.com/es/blog/belvo-banco-azteca-verificaciones-ingresos-credito/', 'Banco Azteca + income-verification story')}</li><li>${external('https://www.youtube.com/playlist?list=PLBp3o9hAmq8taGzI6hOop8VhGpL8SUrHF', 'Fintech Heroes: video playlist')}</li></ul>
        <div class="reconstruction"><strong>Evidence note.</strong> Public links verify the visible work. Performance figures come from documented portfolio records; underlying dashboards remain confidential.</div>
      </div>
    </article>
    <article class="case-study" id="ladrillos">
      <aside class="case-side"><div class="case-number">02</div><div class="case-tags"><span class="tag">PR</span><span class="tag">Executive</span><span class="tag">Events</span><span class="tag">Proptech</span></div></aside>
      <div class="case-body"><p class="eyebrow">100 Ladrillos · 2023 to 2024</p><h2>Trust before attention.</h2><p class="case-deck">Fractional real-estate investing attracts curiosity and scrutiny at the same time. The communications job was to support growth without inflating certainty.</p>
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
      <aside class="case-side"><div class="case-number">03</div><div class="case-tags"><span class="tag">Internal comms</span><span class="tag">Change</span><span class="tag">Leadership</span></div></aside>
      <div class="case-body"><p class="eyebrow">WeWork · 2022 to 2023</p><h2>Internal communications is operating infrastructure.</h2><p class="case-deck">My six-month regional mandate was to make leadership communication more consistent, useful and responsive for more than 2,000 colleagues.</p>
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
      <aside class="case-side"><div class="case-number">04</div><div class="case-tags"><span class="tag">Regional PR</span><span class="tag">Localization</span><span class="tag">B2B SaaS</span></div></aside>
      <div class="case-body"><p class="eyebrow">Zendesk · 2020 to 2022</p><h2>Localization is not translation.</h2><p class="case-deck">A global customer-experience thesis only travels when every market sees its own tension, evidence and credible voice in it.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Coordinate PR across Mexico, Chile, Argentina, Peru, Colombia and the Caribbean without fragmenting the global story.</p></div><div><span>What I saw</span><p>Consistency belonged in the argument. Relevance belonged in the proof, examples, media angle and spokesperson.</p></div></div>
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
      <aside class="case-side"><div class="case-number">05</div><div class="case-tags"><span class="tag">Agency</span><span class="tag">CSR / ESG</span><span class="tag">Team lead</span></div></aside>
      <div class="case-body"><p class="eyebrow">Expok · 2019 to 2020</p><h2>Purpose is not a press angle.</h2><p class="case-deck">CSR programmes become credible stories through specific people, places, trade-offs and evidence, not through a longer list of activities.</p>
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
      <aside class="case-side"><div class="case-number">06</div><div class="case-tags"><span class="tag">Field marketing</span><span class="tag">Sales alignment</span><span class="tag">Attribution</span></div></aside>
      <div class="case-body"><p class="eyebrow">Cross-company operating system</p><h2>The room is not the result.</h2><p class="case-deck">An event matters when the right people enter with a reason to talk and leave inside a coordinated commercial motion.</p>
        <div class="case-brief"><div><span>Mandate</span><p>Turn field marketing from a logistics calendar into an account, narrative and pipeline discipline.</p></div><div><span>What I saw</span><p>Scan counts were obscuring the real questions: whom did we move, what did we learn and what happens next?</p></div></div>
        <ol class="process-line"><li><span>01</span><b>Thesis</b><small>Audience + tension</small></li><li><span>02</span><b>Accounts</b><small>Owners + intent</small></li><li><span>03</span><b>Moment</b><small>Room + content</small></li><li><span>04</span><b>24h SLA</b><small>Context + action</small></li><li><span>05</span><b>Learning</b><small>Opportunity + decision</small></li></ol>
        ${metricCard(impactMetrics[2])}
        <p><a href="${github}/field-marketing-pipeline-system">Open the complete field-marketing pipeline system →</a></p>
        <div class="reconstruction"><strong>Framework.</strong> The public templates reconstruct the operating method with fictional examples. No attendee, account or opportunity data is included.</div>
      </div>
    </article>
    <article class="case-study" id="ai">
      <aside class="case-side"><div class="case-number">07</div><div class="case-tags"><span class="tag">LLMs</span><span class="tag">Content operations</span><span class="tag">Human review</span></div></aside>
      <div class="case-body"><p class="eyebrow">Content Cosmos · Belvo</p><h2>I built an AI workflow around the context people kept rebuilding.</h2><p class="case-deck">I wanted a faster way to create useful content without losing the product truth, the market nuance or the voice behind it.</p>
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
  title: 'Playbooks & Systems | Ximena Aguirre',
  description: 'Open-source marketing and communications systems for field marketing, PR storytelling, B2B launches and responsible AI-assisted work.',
  path: '/playbooks/',
  body: `${pageHero('Proof of work', 'Useful on Monday.', 'Four open systems designed for marketers, communications leaders and cross-functional teams. Each includes a workflow, templates, a worked example and honest limits.', [['License', 'Open, with attribution'], ['Format', 'Markdown + editable templates'], ['Audience', 'Non-technical teams'], ['Principle', 'Judgment before tooling']])}
  <section class="section"><div class="site-shell">
    <article class="artifact"><div><span class="artifact-label">01 / Field marketing</span><h3>Field Marketing Pipeline System</h3></div><div><p>Move from event selection to account intent, sales alignment, sub-24-hour follow-up and opportunity measurement.</p><div class="artifact-links"><a href="${github}/field-marketing-pipeline-system">Open repository ↗</a><a href="/case-studies/#field">Read the case</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">02 / PR</span><h3>PR Storytelling System</h3></div><div><p>Turn company news into a credible external angle using a story-gap canvas, newsworthiness score and spokesperson brief.</p><div class="artifact-links"><a href="${github}/pr-storytelling-system">Open repository ↗</a><a href="/case-studies/#belvo">See it in context</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">03 / GTM</span><h3>Communications Launch Kit</h3></div><div><p>Align message, proof, audiences, spokespeople, timing and measurement for a complex B2B launch.</p><div class="artifact-links"><a href="${github}/communications-launch-kit">Open repository ↗</a><a href="/case-studies/#zendesk">See regional execution</a></div></div></article>
    <article class="artifact"><div><span class="artifact-label">04 / AI operations</span><h3>AI for Marketing & Communications</h3></div><div><p>Research, synthesis, drafting, repurposing and QA workflows built around source hygiene and human review.</p><div class="artifact-links"><a href="${github}/ai-for-marketing-comms">Open repository ↗</a><a href="/case-studies/#ai">Read the operating stance</a></div></div></article>
  </div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">How to read them</p><h2>Framework, not theatre.</h2></div><div><p class="lede">I start each repository with the decision to make, not the software to use. I keep examples deliberately clean and fictional where real material is confidential.</p><p><a href="/proof/">Read the evidence and reconstruction policy →</a></p></div></div></section>`
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
    contribution: 'I supported founder positioning around creativity, technology and the thinking behind campaigns, not just the award headline.',
    proof: 'Joint founder interview + a four-award TikTok Ad Awards story',
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
  title: 'Writing & Media | Ximena Aguirre',
  description: 'Authored work, executive ghostwriting, public relations outcomes, interviews and video work by senior communications leader Ximena Aguirre.',
  path: '/writing/',
  body: `${pageHero('My writing + media', 'I build stories people can read, hear and use.', 'Some pieces carry my name. Some carry a leader’s. Others become interviews, coverage, podcasts or live conversations. I label the difference because authorship and trust matter.', [['Authored', 'My byline'], ['Ghostwritten', 'Executive voice'], ['Earned', 'PR outcome'], ['Format', 'Print · web · video · audio']])}

  <section class="section-tight corpus-section"><div class="site-shell">
    <div class="corpus-intro"><div><p class="eyebrow">A public body of work</p><h2>I count what anyone can verify.</h2></div><p>Forbes and Expansión do not publish article-level pageviews, so I do not manufacture an “average reach.” I use public archive counts here and keep performance metrics clearly labeled as portfolio records.</p></div>
    <div class="corpus-grid" data-reveal>
      <article><strong>7</strong><span>selected pieces with my Belvo byline</span><i style="--size:35%"></i></article>
      <article><strong>5</strong><span>Fast Company columns written for Federica Gregorini</span><i style="--size:25%"></i></article>
      <article><strong>14</strong><span>items visible in 100 Ladrillos’ public press archive</span><i style="--size:70%"></i></article>
      <article><strong>20</strong><span>selected videos and live appearances collected here</span><i style="--size:100%"></i></article>
    </div>
  </div></section>

  <section class="section section-light"><div class="site-shell">
    <div class="writing-modes" data-reveal>
      <article><span>01</span><h3>I sign it.</h3><p>I write product launches, customer stories and reports for specialist B2B audiences.</p></article>
      <article><span>02</span><h3>I write in their voice.</h3><p>I ghostwrite and edit for leaders; the published byline remains theirs.</p></article>
      <article><span>03</span><h3>I help it get earned.</h3><p>I develop the story, prepare the spokesperson and work with media; the coverage remains the publisher’s.</p></article>
    </div>
  </div></section>

  <section class="section"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Work that carries my name</p><h2>I make complex products readable.</h2></div><p>I write about open finance, employment data, payments and trust without flattening the technical detail or losing the human reason to care.</p></div>
    <div class="article-link-grid">${writingItems.map(([date, title, role, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer"><small>${date} · ${role}</small><strong>${title}</strong><span>Read ↗</span></a>`).join('')}</div>
    <p class="small muted">I verify my signed work through ${external('https://belvo.com/es/author/ximena-aguirre/', 'my Belvo author archive')}.</p>
  </div></section>

  <section class="section section-dark" id="voices"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">The voices I write and position</p><h2>I disappear into the voice, not the thinking.</h2></div><p>I do the hard editorial work behind the byline: find the argument, test the claim, keep the expert’s cadence and make the point worth publishing.</p></div>
    <div class="voice-library" data-reveal>${voiceGroups.map(voiceCard).join('')}</div>
  </div></section>

  <section class="section"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">Coverage + clippings</p><h2>I follow the story after it leaves my brief.</h2></div><p>These print and broadcast records show where my external communications, PR and executive-visibility work travelled.</p></div>
    <div class="clipping-grid" data-reveal>
      ${evidenceImage({src:'/assets/media/belvo-clip-partnership-press.webp', width:'1280', height:'808', alt:'Newspaper coverage of Belvo and Clip partnership', label:'Belvo · PR outcome', caption:'Open-finance partnership coverage.', className:'clipping-landscape'})}
      ${evidenceImage({src:'/assets/media/wework-hybrid-feature.webp', width:'762', height:'954', alt:'Magazine feature about hybrid work featuring WeWork Mexico CEO Álvaro Villar', label:'WeWork · media relations', caption:'Executive positioning around hybrid work.'})}
      ${evidenceImage({src:'/assets/media/wework-hybrid-work-press.webp', width:'771', height:'1280', alt:'Newspaper feature about WeWork and Michael Page hybrid-work research', label:'WeWork · research story', caption:'Regional data turned into a news hook.'})}
      ${evidenceImage({src:'/assets/media/expok-sustainability-press-1.webp', width:'1008', height:'1280', alt:'El Economista article about sustainable development', label:'Expok · story development', caption:'Expert narrative + media relations.'})}
      ${evidenceImage({src:'/assets/media/expok-lth-press.webp', width:'966', height:'1280', alt:'NotiSUR coverage of LTH social responsibility programmes', label:'Expok · account PR', caption:'Community impact in local media.'})}
    </div>
  </div></section>

  <section class="section section-blue"><div class="site-shell">
    <div class="section-heading section-heading-row"><div><p class="eyebrow">20 selected videos + live appearances</p><h2>I prepare the voice and the moment.</h2></div><p>I have worked across interviews, live conversations, event content and executive visibility in fintech, SaaS, proptech, workplace and creative industries.</p></div>
    <div class="video-grid">${videoItems.map(videoCard).join('')}</div>
    <div class="audio-feature"><div><p class="eyebrow">Podcast</p><h3>View from the Top: leadership and the future of work</h3><p>I supported the editorial framing and executive visibility around this conversation with WeWork COO Liliana Méndez.</p></div><iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/17agLGCAI2yClM7tDUf90P?utm_source=generator" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify podcast episode"></iframe></div>
  </div></section>

  <section class="section-tight"><div class="site-shell"><p class="small muted">I label my contribution to every piece. I do not claim independent editorial decisions, presenter performance or third-party coverage as my authorship.</p></div></section>`
});

const about = layout({
  title: 'About | Ximena Aguirre',
  description: 'I am a senior communications and Product Marketing leader who connects people, product, story and growth across Europe and Latin America.',
  path: '/about/',
  schema: true,
  body: `${pageHero('About', 'I am interested in people before I am interested in channels.', 'I love connecting. I want to know what people are living, what moves them and what would help them understand each other. That is why I do this work.', [['Scope', 'Europe + Latin America'], ['Practice', 'Comms · Product · Field'], ['Languages', 'Spanish · English'], ['Experience', '10 years']])}
  <section class="section"><div class="site-shell about-story"><div><p class="eyebrow">The honest version</p><blockquote class="quote">I ask questions until the complicated thing becomes clear enough to share.</blockquote></div><div class="measure"><p class="lede">My career makes sense when I tell it as a story about curiosity.</p><p>I started in teams where a message had to earn attention and produce a response. Then I moved through public affairs, luxury fashion and social impact, where context changed everything. Regional PR taught me that translation is not the same as relevance. Internal communications taught me that trust begins with the people already inside the company.</p><p>Product Marketing, field and lifecycle brought me even closer to the business. I learned to turn product truth into positioning, carry it through a launch or a live room, give the lead to Sales with context and return to the data to see what we should do differently next time.</p><p>I am warm, direct and quick to learn. I am comfortable with senior decisions and with the detailed work that makes those decisions real. I like connecting people who use different language and helping them see that they are solving the same problem.</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><p class="eyebrow">What stays constant</p><div class="note-grid note-grid-three"><article class="note"><strong>I listen for the real question.</strong><p>I pay attention to what is said, what is avoided and what the audience is actually trying to solve.</p></article><article class="note"><strong>I learn the world quickly.</strong><p>I get close to the product, the category and the people who live the market before I recommend a story.</p></article><article class="note"><strong>I connect the last mile.</strong><p>I care about how the message lands, who follows up, what the data says and what the team learns.</p></article></div></div></section>
  <section class="section"><div class="site-shell"><div class="section-heading section-heading-row"><div><p class="eyebrow">My timeline</p><h2>Every role has its own place in the story.</h2></div><p>I have worked across nonprofit, public sector, agency, SaaS, workplace, proptech, fintech and the creator economy. I keep each experience visible because each one taught me something different.</p></div>${careerTimeline()}</div></section>`
});

const resume = layout({
  title: 'Résumé | Ximena Aguirre',
  description: 'My résumé across Communications, Product Marketing, PR, Field, CRM, lead generation and AI-enabled content operations.',
  path: '/resume/',
  body: `${pageHero('Résumé', 'Senior Communications, Product Marketing, PR & Field Leader', 'I connect employees, leaders, products, media, customers, events and commercial teams across Europe and Latin America.', [['Scope', 'Europe + Latin America'], ['Authorization', 'Spain · no sponsorship required'], ['Languages', 'Spanish · English'], ['Education', 'BA Communication']])}
  <section class="section-tight no-print"><div class="site-shell"><div class="hero-actions"><button class="button button-solid" type="button" data-print>Print / save as PDF</button><a class="button" href="${linkedin}" target="_blank" rel="noopener noreferrer">Request a copy on LinkedIn</a></div></div></section>
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Profile</p><h2>I connect the story to the business.</h2></div><div><p class="lede">I have ten years across internal and external communications, PR, Product Marketing, field, lifecycle and content. I can shape the positioning, prepare the voice, run the launch, build the CRM journey and read what moved.</p><p class="kicker-line"><strong>Core:</strong> Product positioning · GTM launches · Internal and external communications · PR and media relations · Field marketing · CRM and lead generation · Executive visibility · Reputation · Data and measurement · AI content operations</p></div></div></section>
  <section class="section section-light"><div class="site-shell"><div class="section-heading section-heading-row"><div><p class="eyebrow">Experience</p><h2>One role at a time.</h2></div><p>I keep every company and project separate. My earlier work is not a footnote. It is where I learned team leadership, lead generation, public responsibility, creator work and account craft.</p></div>${careerTimeline({ detailed: true })}</div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Tools + systems</p><h2>I learn the tool, then build the habit around it.</h2></div><div><p><strong>CRM, lead generation + measurement:</strong> HubSpot, Salesforce, Tableau, Power BI</p><p><strong>Content + collaboration:</strong> WordPress, Notion, Figma, Jira, Asana</p><p><strong>Media + research:</strong> Meltwater, Cision/Gorkana, SEMrush</p><p><strong>Events:</strong> Eventbrite, Luma, StreamYard</p><p><strong>LLMs + AI workflows:</strong> ChatGPT, Gemini, Claude, NotebookLM, Cursor, GitHub</p><p class="kicker-line"><strong>Applied AI project:</strong> I worked with engineering to build Content Cosmos, an internal LLM-enabled editorial workflow grounded in approved product knowledge, brand voice, market context and human review.</p></div></div></section>
  <section class="section-tight"><div class="site-shell"><p class="small"><strong>Education:</strong> BA in Communication, Universidad Panamericana, 2014 to 2018. · <strong>Contact:</strong> ${external(linkedin, 'LinkedIn')} · ${external(github, 'GitHub')}</p><p class="small muted">I label performance figures as portfolio records and keep confidential dashboards, private company materials and former work contact details private.</p></div></section>`
});

const recruiter = layout({
  title: '90-Second Recruiter View | Ximena Aguirre',
  description: 'My concise recruiter view across communications, Product Marketing, PR, field, lead generation, data and AI content operations.',
  path: '/recruiter/',
  body: `${pageHero('My 90-second recruiter view', 'I connect communications, product and growth.', 'I work across internal and external communications, PR, Product Marketing, field and lifecycle. I set the narrative, align the people around it and stay close enough to execute and measure it.', [['Experience', '10 years'], ['Markets', 'Europe + Latin America'], ['Languages', 'Spanish · English'], ['Work status', 'Authorized in Spain']])}
  <section class="section-tight"><div class="site-shell"><p class="eyebrow">Results in one line</p><div class="recruiter-results"><div><strong>19 → 42</strong><span>quarterly media mentions</span><small>Belvo Mexico · Q1 2024 to Q4 2025</small></div><div><strong>1,729</strong><span>MQLs in 2025</span><small>Belvo Mexico · +129.6% YoY</small></div><div><strong>US$722.9K</strong><span>event-sourced ACV</span><small>Belvo · 2024 · +362% YoY</small></div><div><strong>+78%</strong><span>regional media exposure</span><small>Zendesk · six-month regional period</small></div><div><strong>2,000+</strong><span>colleagues served</span><small>WeWork · internal communications</small></div></div></div></section>
  <section class="section"><div class="site-shell split"><div class="sticky-label"><p class="eyebrow">Best evidence</p><h2>Three cases to open first.</h2></div><div class="case-list"><a class="case-row" href="/case-studies/#belvo"><span class="case-index">01</span><div><h3>Belvo</h3><p>Integrated Mexico narrative, launches, customer proof and field pipeline.</p></div><p>Best for: B2B fintech · GTM · Comms leadership</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#zendesk"><span class="case-index">02</span><div><h3>Zendesk</h3><p>A multi-market PR localization engine.</p></div><p>Best for: regional roles · SaaS · external comms</p><span class="case-arrow">↗</span></a><a class="case-row" href="/case-studies/#field"><span class="case-index">03</span><div><h3>Field system</h3><p>Event thesis through opportunity measurement.</p></div><p>Best for: field marketing · sales alignment · pipeline</p><span class="case-arrow">↗</span></a></div></div></section>
  <section class="section section-dark"><div class="site-shell split split-even"><div><p class="eyebrow">Role fit</p><h2>Where I add the most value.</h2></div><div><p class="lede">I fit Senior, Lead and Manager roles that need one person to connect corporate and internal communications, regional PR, Product Marketing, field, lifecycle and launches.</p><p><strong>I am especially credible in:</strong> complex B2B products, quick category learning, multi-market work, cross-functional leadership, reputation, lead generation, events tied to commercial outcomes and responsible AI-assisted operations.</p><p><strong>I do not position myself as:</strong> a pure paid-growth specialist, a social-only creator or a software engineer.</p></div></div></section>
  <section class="section"><div class="site-shell split split-even"><div><p class="eyebrow">Practical</p><h2>Ready for the conversation.</h2></div><div><p><strong>Work authorization:</strong> Spain; no sponsorship required</p><p><strong>Languages:</strong> Spanish (native), English (C2)</p><p><strong>Tools:</strong> HubSpot, Salesforce, WordPress, Notion, Figma, Meltwater/Cision, Tableau/Power BI, ChatGPT, Gemini, NotebookLM, Claude, Cursor.</p><div class="hero-actions"><a class="button button-solid" href="/resume/">Open résumé</a><a class="button" href="${linkedin}" target="_blank" rel="noopener noreferrer">Contact on LinkedIn</a></div></div></div></section>`
});

const proof = layout({
  title: 'Evidence Notes | Ximena Aguirre',
  description: 'Evidence, attribution and confidentiality notes for metrics, case studies, public links and reconstructed frameworks in Ximena Aguirre’s portfolio.',
  path: '/proof/',
  body: `${pageHero('Evidence notes', 'Specific, sourced, honest about limits.', 'This page explains what is publicly verifiable, what comes from documented performance records and what has been reconstructed to protect confidential information.', [['Public evidence', 'Linked primary pages'], ['Metrics', 'Portfolio records'], ['Frameworks', 'Clearly reconstructed'], ['Policy', 'No private source data']])}
  <section class="section"><div class="site-shell split"><div><p class="eyebrow">Metric register</p><h2>What each number means.</h2></div><div>
    <details open><summary>10 years</summary><div>I calculate this from my career start in marketing leadership in January 2016 through 2026, rounded down to a whole year.</div></details>
    <details><summary>Europe + Latin America</summary><div>Direct professional scope includes Mexico, Chile, Colombia, Argentina, Peru, the Caribbean and Costa Rica; current base and cross-regional work connect the profile to Spain and broader European teams.</div></details>
    <details><summary>+121% media mentions</summary><div>Belvo portfolio record: 19 quarterly mentions in Q1 2024 versus 42 in Q4 2025. Arithmetic: (42−19)÷19 = 121.05%, rounded to 121%.</div></details>
    <details><summary>+129.6% YoY MQLs</summary><div>Belvo portfolio record for 2025 versus 2024; 1,729 MQLs recorded in 2025. The site does not publish underlying CRM exports.</div></details>
    <details><summary>+35.3% Contact Us submissions</summary><div>Belvo portfolio record for 2025 versus the previous year; 330 submissions were recorded in 2025. I treat this as a higher-intent signal and do not present it as a subset of the MQL figure.</div></details>
    <details><summary>+38% deals created</summary><div>Belvo portfolio record for Q4 2025 versus Q4 2024; 69 deals were created in Q4 2025. The underlying Salesforce opportunity data remains private.</div></details>
    <details><summary>+362% event-sourced ACV</summary><div>Belvo portfolio record for 2024 versus 2023; US$722.9K event-sourced ACV recorded in 2024. Account and opportunity data remain private.</div></details>
    <details><summary>+78% regional exposure</summary><div>Zendesk portfolio record for a documented six-month period within the 2020 to 2022 regional PR remit. Public coverage examples demonstrate the program; the underlying media report remains private.</div></details>
  </div></div></section>
  <section class="section section-light"><div class="site-shell split split-even"><div><p class="eyebrow">My three evidence classes</p><h2>I label every claim.</h2></div><div><p><strong>Public record:</strong> I link bylines, author archives, company announcements and third-party coverage at a stable URL.</p><p><strong>Performance record:</strong> I use figures documented in my résumé and portfolio, checked for internal consistency but not linked to confidential dashboards.</p><p><strong>Reconstruction:</strong> I demonstrate my actual process with fictional or generalized inputs instead of publishing company material.</p></div></div></section>
  <section class="section"><div class="site-shell"><p class="eyebrow">Intentionally withheld</p><div class="note-grid"><div class="note"><strong>Personal data</strong><p>Phone number, home address and former work contact details.</p></div><div class="note"><strong>Company data</strong><p>CRM exports, account lists, budgets, attendee details and internal dashboards.</p></div><div class="note"><strong>Sensitive context</strong><p>Incident specifics, confidential launch material and internal communications artifacts.</p></div></div></div></section>`
});

const contact = layout({
  title: 'Contact | Ximena Aguirre',
  description: 'Contact me about senior communications, Product Marketing, PR, field, lifecycle and regional leadership opportunities.',
  path: '/contact/',
  body: `<section class="section contact-hero"><div class="site-shell contact-layout"><div class="contact-copy"><p class="eyebrow">Contact</p><h1>Tell me what you are trying to make clearer.</h1><p class="lede">I am open to senior international roles and selected projects across Communications, Product Marketing, PR, Field and Lifecycle.</p><p>I am based in Madrid and authorized to work in Spain without sponsorship. You can also <a href="${linkedin}" target="_blank" rel="noopener noreferrer">contact me on LinkedIn</a> or <a href="${github}" target="_blank" rel="noopener noreferrer">see how I build on GitHub</a>.</p></div>${leadForm()}</div></section>`
});

const notFound = layout({
  title: 'Page not found | Ximena Aguirre',
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
