# TinyAnalytics brand & marketing documentation

**Version:** 1.1  
**Last updated:** July 28, 2026  
**Owner:** TinyAnalytics product and marketing
**Status:** Draft for product-owner review  
**Source basis:** Public documentation, shipped product capability map, current plan catalog, and the positioning brief supplied for this document

---

## Table of contents

1. [Brand positioning](#brand-positioning)
2. [Core differentiators](#core-differentiators)
3. [Target audience](#target-audience)
4. [Website copy](#website-copy)
5. [Product descriptions](#product-descriptions)
6. [Customer proof and testimonials](#customer-proof-and-testimonials)
7. [FAQs](#faqs)
8. [Social media content](#social-media-content)
9. [Use cases](#use-cases)
10. [Competitive positioning](#competitive-positioning)
11. [Brand voice and tone](#brand-voice-and-tone)
12. [Handles and naming](#handles-and-naming)
13. [Critical TODOs](#critical-todos)
14. [Source notes](#source-notes)

---

## Brand positioning

### Category

**Privacy-friendly web and product analytics**

TinyAnalytics belongs between simple web analytics and complex product analytics suites. It keeps the installation and daily dashboard approachable while covering the deeper work growing teams usually add separate products for: funnels, retention, feature flags, experiments, surveys, revenue, SQL analysis, alerts, and uptime monitoring.

### Core positioning statement

**TinyAnalytics is privacy-friendly web and product analytics for teams that want clear answers without cookies, a complicated analytics stack, or a data-sharing bargain. One tracking script gives you traffic, behavior, conversion, revenue, AI discovery, experimentation, and monitoring in one hosted platform.**

### Single promise

**Understand your traffic and your product without tracking people.**

Every headline and campaign should reinforce this promise. The five primary differentiators explain why a buyer should believe it:

1. It is simple to install and read.
2. It is cookieless and privacy-friendly by design.
3. It is AI-native in the product and in the documentation.
4. It replaces several disconnected analytics and product tools.
5. Its free plan is designed for real use, not a short demo.

### Recommended tagline

**No cookies. Just insights.**

Use this as the short brand line. Use the positioning promise when more context is available.

### Supporting lines

- **Simple analytics. Serious depth.**
- **Tiny on your site. Deep in your dashboard.**
- **Web and product analytics, without the tracking baggage.**
- **One small script. The full product picture.**
- **Privacy-friendly analytics that grows with your product.**

### One-liner

**TinyAnalytics combines cookieless web analytics, product analytics, AI discovery reports, revenue, experiments, and monitoring in one easy-to-use platform.**

### Elevator pitch

Most teams start with a traffic dashboard, then add separate products for funnels, feature flags, surveys, revenue, uptime, and AI traffic. The result is more scripts, more dashboards, and more data to reconcile.

TinyAnalytics keeps the setup small and the answers together. Add one tracking script—under 6.5 KB gzipped—to measure pageviews, sessions, events, journeys, funnels, retention, revenue, experiments, AI referrals, AI crawlers, and more. It sets no analytics cookies and stores no raw IP addresses in analytics data. You get a dashboard that is easy to start with and deep enough to keep.

### Value proposition

TinyAnalytics helps you:

- **See the whole journey:** connect acquisition, behavior, conversion, and revenue in one reporting model.
- **Start quickly:** install one script and collect pageviews plus common interactions automatically.
- **Respect visitors:** use cookieless identity with no raw IP storage and no cross-site profile.
- **Understand AI discovery:** separate human visits from AI assistants and crawler activity.
- **Run product decisions:** use flags, experiments, surveys, cohorts, and B2B account analytics without adding another platform.
- **Keep your history:** import data from GA4, Plausible, Umami, or Simple Analytics.
- **Ask deeper questions:** use read-only SQL or describe a question in plain English and let AI draft the query.
- **Begin without procurement:** use a free plan intended to support meaningful traffic and core analysis.

### Messaging hierarchy

Use messages in this order:

1. **Outcome:** understand traffic and product behavior.
2. **Privacy mechanism:** no cookies, no raw IP storage, cookieless identity.
3. **Simplicity:** one small script and a clear dashboard.
4. **Depth:** web analytics plus product analytics, revenue, and monitoring.
5. **AI-native capabilities:** AI traffic, AI crawlers, and natural-language analysis.
6. **Offer:** a generous free plan.
7. **EU trust story:** made and hosted in the EU on European-owned infrastructure, once the supporting details are published and verified.

### Positioning guardrails

- Write **TinyAnalytics** as one word with a capital **T** and **A**, including at the start of a sentence.
- Use **site** for a tracked website or app.
- Say **privacy-friendly by design**, not “100% GDPR compliant.”
- Say many sites can avoid an analytics-cookie banner, then note that consent requirements depend on jurisdiction and on the data the customer chooses to send.
- Make clear that optional features can change that analysis. Feature flags use a persistent browser ID to keep assignments sticky, and customers can deliberately send IDs, traits, or personal data.
- Never claim session replay, heatmaps, or platform self-hosting. They are not part of the hosted product described by the current documentation.
- Never imply cookieless visitor counts are perfect. They are useful estimates; `identify()` provides stable cross-device identity for signed-in users.
- Do not call the cookieless identity mechanism “fingerprinting” without explaining that no raw IP is stored and no identifier is written to the visitor’s device.
- Describe “AI-native” through shipped behavior, not as a generic adjective.

---

## Core differentiators

### 1. Simple from installation to answer

**Message:** “Install one small script. See the answers that matter.”

The simplicity claim is supported by product behavior:

- The tracking script is **under 6.5 KB gzipped**.
- A standard installation is one script tag.
- Automatic pageviews and single-page-app navigation tracking reduce manual setup.
- Autocapture can collect outbound links, file downloads, button clicks, text copies, form submissions, and engagement.
- Realtime makes the first successful visit visible within seconds.
- Shared date ranges, filters, segments, and comparisons work across reports.
- Integrations cover major frameworks, CMSs, ecommerce platforms, static-site generators, and React Native.

**Benefit:** You spend less time maintaining analytics and more time using it.

**Proof to show:**

- A live “install to first visit” demo.
- The exact gzipped script size from the release build.
- A screenshot of Overview with the six headline metrics, trend chart, and breakdowns.

### 2. Privacy-friendly by design

**Message:** “Useful analytics without cookies or raw IP storage.”

TinyAnalytics does not bolt privacy controls onto a persistent tracker. Its default collection model is cookieless:

- Core anonymous analytics writes no cookie or anonymous analytics ID to the visitor’s device.
- The server derives a one-way identifier from the request instead of storing the raw IP address.
- Raw IP addresses are not written to analytics data.
- There is no cross-site visitor profile.
- Names, emails, and other identifying details enter the product only when a customer deliberately sends them through `identify()`, traits, event properties, or an optional integration flow.
- Bot traffic is kept separate from human analytics.

Optional features persist only the state their behavior requires: `identify()` keeps the user ID the customer provides, feature flags keep a random site-specific visitor ID, groups keep account associations, surveys keep wait-period and completion markers, and browser opt-out keeps a disabled marker. These values do not form a cross-site profile, but browser storage can still affect a customer’s consent analysis.

**Benefit:** You get traffic and product insight with less consent friction and less personal data to manage.

**Honest limit:** Cookieless visitor counts are estimates. Shared networks can merge people, while network or browser changes can split one person. For signed-in products, `identify()` attaches the customer’s own stable ID and improves cross-device accuracy.

**Approved privacy line:**

> No cookies. No raw IP storage. No cross-site profile.

**Legal line:**

> TinyAnalytics is designed to support privacy-friendly analytics. Your consent and compliance obligations still depend on your jurisdiction, configuration, and the data you choose to send.

### 3. AI-native where it changes the answer

**Message:** “Measure AI discovery and ask your analytics questions in plain English.”

“AI-native” has three concrete product meanings:

1. **AI traffic:** See visits from ChatGPT, Perplexity, Gemini, Claude, Copilot, and other assistants, including trends, revenue, and landing pages.
2. **AI crawler visibility:** See GPTBot, ClaudeBot, PerplexityBot, and other AI crawlers separately from human visitors.
3. **Ask AI for SQL:** Describe the analysis you want in plain English. TinyAnalytics drafts a site-scoped, read-only query for review before it runs.

It also has a documentation meaning:

- Documentation pages are available as Markdown for AI tools.
- The documentation supports AI assistants, `llms.txt`, editor integrations, and a docs MCP connection.

**Benefit:** You can measure how AI platforms discover and send traffic to your site, then explore your own data without starting from a blank SQL editor.

**Honest limits:**

- AI traffic measures click-throughs from assistant answers, not unseen citations.
- AI crawler reports show that a crawler read a page, not that the page was cited.
- AI-generated SQL still runs through the same read-only, site-scoped guard as hand-written SQL.

### 4. One platform for several product jobs

**Message:** “Web analytics is the starting point, not the limit.”

TinyAnalytics combines:

- **Web analytics:** overview, realtime, pages, sessions, users, events, journeys, funnels, goals, retention, maps, channels, and Core Web Vitals.
- **Product analytics:** custom events, identify, behavioral cohorts, feature flags, experiments, surveys, B2B account analytics, and custom dashboards.
- **Revenue analytics:** client-event revenue, Stripe charges and refunds, acquisition attribution, and revenue trends.
- **AI and acquisition:** AI referrals, AI crawlers, bot reporting, Search Console, and campaign attribution.
- **Monitoring and automation:** alerts, scheduled reports, uptime monitoring, and shortlinks.
- **Sharing and access:** public dashboards, embedded dashboards, live-visitor widgets, organizations, teams, and roles.
- **Data access:** CSV/PDF export, an API playground, read-only SQL, and a broad HTTP API surface.
- **Mobile:** a React Native SDK that reports screen views, events, errors, and identified users into the same dashboard.

**Benefit:** Your acquisition, product, and revenue questions use one event model instead of being split across several tools.

**Preferred phrase:** **One platform for traffic, product, revenue, and reliability.**

Avoid the vague phrase “multi-product platform” on its own. Name the products it replaces or connects.

### 5. A free plan for real sites

**Message:** “Start free. Keep the analytics you use every day.”

The current product plan catalog defines a Free plan with:

- Up to **100,000 monthly pageviews**.
- Up to **3 sites**.
- Core analytics, including Overview, comparison, channels, pages, sessions, users, journeys, Web Vitals, errors, bots, and AI traffic.
- **180 days** of queryable history.
- 3 goals, 1 funnel, 1 dashboard, 1 scheduled report, and 20 AI query generations per month.

The catalog also defines a 14-day Business trial followed by Free without a card.

**Benefit:** A buyer can use the real product before needing a paid plan, rather than evaluating a locked dashboard.

> **Publication gate:** The product catalog and the current public pricing page disagree. Do not publish these exact limits until pricing, billing enforcement, trial behavior, and the website are confirmed together. Until then, use “Start with a generous free plan.”

### 6. An EU product and infrastructure story

**Owner-supplied message:** “Made and hosted in the EU, powered by European-owned infrastructure. 🇪🇺”

This can become a strong trust differentiator when it is supported with the same mechanism-level detail as the privacy story:

- Legal entity and ownership jurisdiction.
- Primary data region.
- Infrastructure provider and its country of ownership.
- CDN, email, support, error-reporting, and backup subprocessors.
- Whether analytics data ever leaves the EU.
- Encryption, retention, deletion, and incident processes.

**Recommended public line after verification:**

> Made and hosted in the EU. Your analytics runs on European-owned infrastructure.

> **Publication gate:** The current product documentation does not yet verify the provider, region, or subprocessor path. The current public website says London/UK, which conflicts with this new positioning. Resolve and document the facts before publishing the EU claim.

### 7. Bring your history with you

**Message:** “Switch tools without resetting your story.”

TinyAnalytics can import history from:

- Google Analytics 4 through a connected Google account.
- Plausible export files.
- Umami export files.
- Simple Analytics export files.

**Benefit:** Teams can compare future performance with historical baselines instead of starting from zero.

**Honest limit:** Some source dimensions are approximate or unavailable after import. Link to the relevant import guide rather than promising a lossless migration.

---

## Target audience

### Primary audience 1: Privacy-conscious site owners and founders

**Mindset:** “I want useful analytics, but I do not want a surveillance product or a consent-flow project.”

**Pain points:**

- GA4 feels complicated and tied to an advertising ecosystem.
- Cookie banners reduce trust and create operational work.
- Simple privacy tools can feel too shallow as the product grows.
- Privacy claims are often vague or impossible to verify.

**Jobs to be done:**

- Understand where traffic comes from.
- See which pages and campaigns work.
- Measure goals and revenue.
- Keep bots out of human metrics.
- Explain the analytics setup to customers or a privacy reviewer.

**Best message:** “Understand your traffic without tracking people.”

### Primary audience 2: Developers and technical founders

**Mindset:** “Give me a small, predictable install and let me verify it.”

**Pain points:**

- Heavy trackers affect performance and add network noise.
- Framework-specific setup is often unclear.
- Event APIs drift from dashboard behavior.
- Separate analytics tools require several SDKs and identity models.

**Jobs to be done:**

- Install tracking in minutes.
- Track SPA routes, custom events, errors, revenue, and identified users.
- Use feature flags and experiments from the same script.
- Query or export data programmatically.
- Verify the first event and troubleshoot failures.

**Best message:** “One under-6.5 KB script for traffic, events, experiments, and more.”

### Primary audience 3: Product and growth teams

**Mindset:** “I need to connect acquisition to product behavior and revenue.”

**Pain points:**

- Traffic analytics and product analytics disagree.
- Experiment exposure, goals, and revenue live in different tools.
- AI referrals are buried inside generic referral traffic.
- Custom questions require a data team or fragile exports.

**Jobs to be done:**

- Build funnels and behavioral cohorts.
- Measure retention and user journeys.
- Run feature flags and A/B experiments.
- Collect in-product feedback.
- Attribute revenue to acquisition.
- Ask ad hoc questions with SQL or AI-assisted SQL.

**Best message:** “One event model from first visit to product adoption and revenue.”

### Primary audience 4: Agencies and multi-site teams

**Mindset:** “I need clear reporting across several sites without enterprise overhead.”

**Pain points:**

- Client sites are split across accounts and tools.
- Sharing a dashboard creates access and branding problems.
- Repeating the same report work wastes time.

**Jobs to be done:**

- Compare sites from an organization overview.
- Build organization and site dashboards.
- Control access with organizations, teams, and roles.
- Share public or private read-only dashboards.
- Schedule reports and export data.

**Best message:** “Manage and report on every site from one organization.”

### Primary audience 5: AI discovery, SEO, and content teams

**Mindset:** “I need to know whether AI platforms are reading and recommending our content.”

**Pain points:**

- AI referrals are hidden inside “Referral.”
- Crawler logs are noisy and separate from analytics.
- A crawl is easily confused with a citation or a visit.

**Jobs to be done:**

- Measure traffic arriving from AI assistants.
- See which landing pages receive AI-referred visitors.
- Compare AI traffic and revenue over time.
- See which AI crawlers read the site.
- Combine AI traffic with Search Console and conversion data.

**Best message:** “See both sides of AI discovery: crawlers reading and people clicking.”

### Secondary audiences

- **Ecommerce teams:** connect acquisition to client or Stripe revenue.
- **B2B SaaS teams:** analyze companies and workspaces as accounts, not only individual visitors.
- **Privacy and compliance evaluators:** inspect the mechanism, data boundaries, and limits.
- **Teams leaving GA4, Plausible, Umami, or Simple Analytics:** keep history while changing tools.
- **React Native teams:** measure mobile screens, events, errors, and identities beside web data.

---

## Website copy

### Recommended homepage hero

**Eyebrow:**  
Web + product analytics, without cookies

**Headline:**  
**Understand your traffic and your product without tracking people.**

**Subheadline:**  
Install one under-6.5 KB script to measure traffic, product behavior, revenue, AI referrals, experiments, and uptime. No analytics cookies. No raw IP storage. One clear dashboard.

**Primary CTA:**  
**Start free**

**Secondary CTA:**  
**Explore the docs**

**Trust line:**  
Generous free plan · No credit card after trial **[TODO: verify live signup flow]** · Made and hosted in the EU **[TODO: verify infrastructure statement]**

### Hero alternatives

The first three are the strongest candidates for testing.

1. **Simple analytics. Serious product insight.**
2. **One small script. Your whole product picture.**
3. **No cookies. No clutter. Just the answers that matter.**
4. **Privacy-friendly analytics that grows with your product.**
5. **From first visit to revenue, in one clear dashboard.**
6. **See what brings people in—and what keeps them.**
7. **Web analytics is only the beginning.**
8. **Measure traffic, product, and revenue without tracking people.**
9. **A smaller tracker for a much bigger picture.**
10. **The analytics stack that starts with one script.**
11. **Know your visitors’ journey without following them around the web.**
12. **Traffic, product, revenue, and AI discovery—together.**

### Homepage section 1: Privacy mechanism

**Headline:**  
**No cookies. No raw IP storage. No cross-site profile.**

**Body:**  
TinyAnalytics derives a one-way visitor identifier on the server instead of writing an analytics ID to the browser. Raw IP addresses are not stored in analytics data. You get useful trends and multi-day analysis with less personal data to manage.

**Supporting points:**

- Core anonymous analytics writes no anonymous analytics ID to the visitor’s device.
- Automated traffic stays out of human metrics.
- You control whether user IDs, traits, or personal data are sent.
- `identify()` gives signed-in products stable cross-device identity when they need it.

**CTA:**  
**See how cookieless identity works**

### Homepage section 2: Simplicity

**Headline:**  
**Install once. Start with the answers.**

**Body:**  
Add one under-6.5 KB script and see your first visit in Realtime. Pageviews, SPA navigation, outbound links, downloads, button clicks, form shapes, and engagement can be collected automatically.

**Feature labels:**

- Five-minute quickstart
- Realtime verification
- Automatic interaction capture
- Framework and CMS guides
- First-party proxy support

**CTA:**  
**Install TinyAnalytics**

### Homepage section 3: Web and product analytics

**Headline:**  
**Start with traffic. Keep going.**

**Body:**  
See pages, sources, sessions, users, and campaigns. Then build funnels, study retention, run experiments, collect feedback, measure revenue, and analyze B2B accounts—without rebuilding your analytics stack.

**Feature groups:**

- **Understand acquisition:** channels, campaigns, AI traffic, Search Console.
- **Understand behavior:** journeys, sessions, events, funnels, retention.
- **Improve the product:** flags, experiments, surveys, cohorts.
- **Connect outcomes:** goals, revenue, Stripe, alerts.

**CTA:**  
**Explore every report**

### Homepage section 4: AI-native analytics

**Headline:**  
**See how AI discovers your site. Then ask your data what happened.**

**Body:**  
Measure people arriving from ChatGPT, Perplexity, Gemini, Claude, and Copilot. See which AI crawlers read your pages. For questions the standard reports do not answer, describe the result you want and let Ask AI draft a safe, read-only SQL query.

**Three cards:**

- **AI traffic:** sessions, trends, landing pages, and revenue from AI assistants.
- **AI crawlers:** which model crawlers are reading the site, kept separate from human traffic.
- **Ask AI:** natural-language questions converted into reviewable, site-scoped SQL.

**CTA:**  
**Explore AI analytics**

### Homepage section 5: Revenue and experiments

**Headline:**  
**Connect the visit to the decision—and the revenue.**

**Body:**  
Build funnels from pages and events. Run experiments against real exposures and goals. Send revenue with a purchase event or connect Stripe for verified charges, refunds, and lost disputes.

**CTA:**  
**See product analytics**

### Homepage section 6: Migration

**Headline:**  
**Switch without starting over.**

**Body:**  
Bring historical data from GA4, Plausible, Umami, or Simple Analytics. Keep your baseline while new cookieless data flows into the same reports.

**CTA:**  
**Plan your migration**

### Homepage section 7: Free plan

**Headline:**  
**Free analytics you can actually use.**

**Body before exact limits are verified:**  
Start with the core analytics, real traffic volume, and enough product features to evaluate TinyAnalytics on your own site. Upgrade when your team or product needs more—not before you can see the value.

**Body after the current catalog is confirmed:**  
Track up to 100,000 monthly pageviews across three sites, keep 180 days of queryable history, and use the complete core analytics dashboard for free.

**CTA:**  
**Start free**

### Homepage section 8: EU trust

**Headline after verification:**  
**Made in Europe. Hosted in Europe.**

**Body after verification:**  
TinyAnalytics is built and hosted in the EU on European-owned infrastructure, so your analytics does not depend on a US-owned hosting layer.

**Proof links required beside the claim:**

- Infrastructure and data handling
- Subprocessors
- Data processing agreement
- Security

### Final CTA

**Headline:**  
**See what your site is doing—without tracking people.**

**Body:**  
Add TinyAnalytics, open Realtime, and see your first visit in minutes.

**Primary CTA:**  
**Start free**

**Secondary CTA:**  
**Read the quickstart**

---

## Product descriptions

### Short description (under 160 characters)

Privacy-friendly web and product analytics. No cookies—just traffic, funnels, revenue, AI insights, experiments, and monitoring in one platform.

### Medium description

TinyAnalytics is cookieless web and product analytics for teams that want clear answers without a complicated stack. Install one under-6.5 KB script to measure traffic, sessions, funnels, retention, revenue, AI referrals, experiments, surveys, and uptime. No analytics cookies, no raw IP storage, and a generous free plan.

### Long description

TinyAnalytics helps you understand how people find, use, and pay for your product without building a surveillance-heavy analytics stack.

Start with the metrics you need every day: visitors, sessions, pages, sources, campaigns, devices, journeys, and realtime activity. Go deeper with custom events, funnels, goals, retention, behavioral cohorts, feature flags, A/B experiments, surveys, B2B account analytics, and revenue from client events or Stripe.

AI discovery is part of the product, not a generic label. The AI traffic report shows visits and revenue from assistants such as ChatGPT, Perplexity, Gemini, Claude, and Copilot. The Bots & AI crawlers report shows which model crawlers read your site while keeping that traffic out of your human metrics. When a standard report is not enough, Ask AI can draft a read-only, site-scoped SQL query from a plain-English question.

The tracking script is under 6.5 KB gzipped and supports automatic pageviews, SPA routes, outbound links, downloads, common interactions, engagement, Web Vitals, and error tracking. TinyAnalytics sets no analytics cookies and stores no raw IP addresses in analytics data. It uses a cookieless, one-way identifier for anonymous reporting and lets signed-in products attach their own stable IDs with `identify()`.

Your traffic, product, revenue, and reliability data stay in one hosted platform—with migration from GA4, Plausible, Umami, and Simple Analytics and a free plan designed for real sites.

### App-directory description

**Category:** Web analytics / Product analytics  
**Best for:** Founders, developers, product teams, growth teams, agencies, and privacy-conscious organizations  
**Deployment:** Hosted service  
**Install:** Browser tracking script or React Native SDK  
**Core promise:** Understand traffic and product behavior without analytics cookies

### Social bio

**Option A:**  
Cookieless web + product analytics. Traffic, funnels, revenue, AI discovery, experiments, and monitoring—one small script.

**Option B:**  
Understand your traffic and product without tracking people. No cookies. Just insights.

---

## Customer proof and testimonials

### Rule: never fabricate proof

Do not publish:

- Unverified customer counts.
- Unverified pageview totals.
- Ratings without a live review profile.
- Quotes without the customer’s permission and source.
- Customer logos without written approval.
- Performance or conversion improvements without a reproducible method.

### Proof hierarchy

Build proof in this order:

1. **Product proof:** live demo, screenshots, public dashboard, script-size measurement.
2. **Mechanism proof:** cookieless identity, data-handling, and bot-detection documentation.
3. **Customer proof:** named quote, role, company, and a specific outcome.
4. **Quantified case study:** baseline, implementation, result, timeframe, and caveats.
5. **Aggregate proof:** customer or site counts from an auditable production query.

### Testimonial questions

Ask customers:

- What did you use before TinyAnalytics?
- What was difficult or missing?
- How long did installation take?
- Which report do you use most?
- What did TinyAnalytics replace?
- Did the privacy model change your consent or review process?
- What decision did the data help you make?
- What specific result can we publish?

### Testimonial format

> “[Specific problem solved or result achieved in the customer’s own words.]”
>
> **[Full name]**  
> [Role], [Company]  
> Result measured over [timeframe]

### Current-site proof audit

The current public site displays claims including “19,000 websites,” “56.6B tracked pageviews,” “5.2K active users,” “4.97/5,” and “300+ Capterra reviews.” Treat every one as **unverified and blocked from reuse** until the underlying source or public review profile is supplied.

---

## FAQs

### What is TinyAnalytics?

TinyAnalytics is a hosted, privacy-friendly web and product analytics platform. It combines traffic reports, events, funnels, retention, revenue, feature flags, experiments, surveys, AI discovery reports, and monitoring in one product.

### Does TinyAnalytics use cookies?

Core anonymous analytics does not write analytics cookies or an anonymous analytics ID to the visitor’s device. The server derives a one-way cookieless identifier from the request instead. Optional product features can use purpose-specific browser storage.

### Does TinyAnalytics store IP addresses?

Raw IP addresses are used in memory to derive a cookieless identifier and approximate location, then discarded. They are not written to analytics data.

### Do I need a cookie banner?

Core anonymous analytics sets no analytics cookies and stores no anonymous analytics ID in the browser. Your obligations still depend on your jurisdiction, configuration, the data you send, and the optional features you enable. Identification, feature flags, groups, surveys, and browser opt-out use purpose-specific browser storage. This is product information, not legal advice.

### Is TinyAnalytics GDPR compliant?

Avoid a blanket legal guarantee. TinyAnalytics is designed to support privacy-friendly use: no analytics cookies, no raw IP storage, and no personal data by default. Compliance depends on how you configure the product, what data you send, and which laws apply to you.

### How does TinyAnalytics count visitors without cookies?

The server hashes the visitor’s IP address and browser user agent into a short, one-way identifier. This creates useful multi-day estimates without storing the raw IP or writing an ID to the browser.

### Are cookieless visitor counts exact?

No. People on the same network and browser can merge, while one person changing networks or browsers can split. When signed-in accuracy matters, call `identify()` with your own stable internal user ID.

### What makes TinyAnalytics AI-native?

It measures visits from AI assistants, reports which AI crawlers read your site, and converts plain-English analytics questions into reviewable, read-only SQL. Its documentation is also structured for AI assistants and editor tools.

### Can TinyAnalytics tell me whether ChatGPT cited my page?

Not directly. The AI traffic report measures people who clicked through from an AI answer. The AI crawler report shows that a model crawler read a page. A crawl does not prove a citation, and a citation without a click is not visible through web analytics.

### Is TinyAnalytics only for web analytics?

No. It also includes product analytics, feature flags, experiments, surveys, B2B account analysis, client and Stripe revenue, alerts, scheduled reports, uptime monitoring, and custom dashboards.

### How large is the tracking script?

The browser tracking script is under 6.5 KB gzipped. Optional capabilities such as Web Vitals and surveys load only when enabled.

### Does TinyAnalytics work with single-page apps?

Yes. It tracks client-side navigation and has installation guides for Next.js, React, Vue, Nuxt, Angular, SvelteKit, Astro, Gatsby, Remix, and other platforms.

### Does TinyAnalytics support mobile apps?

Yes. The React Native SDK tracks screens, custom events, errors, and identified users and sends them to the same dashboard as your sites.

### Can I import historical analytics?

Yes. TinyAnalytics imports from GA4, Plausible, Umami, and Simple Analytics. Some dimensions can be approximate or unavailable depending on the source.

### Is there a free plan?

Yes. TinyAnalytics is designed to offer a generous free plan with the core analytics product. Publish exact limits only after the live pricing and product catalog are reconciled.

### Is TinyAnalytics open source?

No. TinyAnalytics is a closed-source, hosted service. If auditing the source or self-hosting is a requirement, an open-source alternative may be a better fit. TinyAnalytics earns trust through precise documentation of what it stores, what it does not store, and how its privacy mechanisms work.

### Where is TinyAnalytics hosted?

The approved marketing direction is “made and hosted in the EU on European-owned infrastructure.” Publish the provider, region, and subprocessor details before using that claim publicly. The current public website still describes London/UK hosting and must be updated.

---

## Social media content

### Content pillars

1. **Privacy mechanisms:** explain no cookies, no raw IP storage, and the limits of cookieless identity.
2. **AI discovery:** show AI referrals, AI crawlers, and what each can and cannot prove.
3. **Product depth:** demonstrate funnels, experiments, revenue, surveys, and B2B analytics.
4. **Simplicity:** show the install and a first useful answer.
5. **Migrations:** help teams move from GA4, Plausible, Umami, or Simple Analytics.
6. **Transparent building:** share release facts, measurements, and honest trade-offs.

### Launch post

Most analytics tools force a choice:

Simple enough to use, or deep enough to keep.

TinyAnalytics is built for both.

One under-6.5 KB script gives you:

- Web analytics
- Product analytics
- Funnels and retention
- Feature flags and experiments
- Revenue and Stripe
- AI traffic and AI crawlers
- Alerts and uptime

No analytics cookies. No raw IP storage.

Understand your traffic and your product without tracking people.

**Start free: [signup URL]**

### Privacy post

“Cookieless” should explain a mechanism, not hide one.

TinyAnalytics:

- Writes no analytics ID to the browser
- Stores no raw IP address in analytics data
- Creates no cross-site profile
- Tells you where cookieless counts can overcount or undercount
- Lets signed-in products use their own stable ID when they need exact identity

Privacy claims are stronger when you can inspect how they work.

**Read the mechanism: [cookieless identity URL]**

### AI discovery post

AI discovery has two sides:

1. Crawlers reading your pages
2. People clicking through from AI answers

TinyAnalytics reports both—separately.

See GPTBot, ClaudeBot, PerplexityBot, and other crawlers without inflating human traffic. Then see sessions, landing pages, trends, and revenue from ChatGPT, Perplexity, Gemini, Claude, Copilot, and more.

**Explore AI analytics: [AI traffic URL]**

### Product analytics post

Web analytics tells you how people arrived.

Product analytics tells you what happened next.

TinyAnalytics connects both:

- Custom events
- Funnels
- Retention
- Cohorts
- Feature flags
- A/B experiments
- Surveys
- Revenue

One install. One identity model. One dashboard.

### Migration post

Changing analytics tools should not erase your baseline.

TinyAnalytics imports history from:

- GA4
- Plausible
- Umami
- Simple Analytics

Keep the past. Change what you collect next.

**Plan your migration: [migration URL]**

### Free-plan post

Free should mean “use the product,” not “look at a locked dashboard.”

TinyAnalytics keeps core analytics available on its free plan so you can measure a real site before deciding whether your team needs more.

**[TODO: add exact limits after pricing is confirmed]**

### Short ad variants

**Ad 1 — privacy**

Understand your traffic without analytics cookies. TinyAnalytics gives you web and product insight with no raw IP storage and one small script.

**CTA:** Start free

**Ad 2 — product depth**

Traffic, funnels, retention, experiments, revenue, and uptime—one analytics platform, one install.

**CTA:** See the product

**Ad 3 — AI discovery**

See which AI crawlers read your site and which AI assistants send visitors. Keep bots out of human analytics.

**CTA:** Explore AI analytics

**Ad 4 — migration**

Leave GA4 without leaving your history behind. Import past traffic, then continue with cookieless analytics.

**CTA:** Switch to TinyAnalytics

### Email subject lines

- Your traffic and product, without analytics cookies
- See who AI sends to your site
- One script for web and product analytics
- Bring your GA4 history with you
- Free analytics for a real site
- Which AI crawlers are reading your pages?

---

## Use cases

### Use case 1: Privacy-friendly website analytics

**Problem:** A site owner needs acquisition and content insights without adding analytics cookies or a complex consent workflow.

**TinyAnalytics approach:**

- Install the tracking script.
- Measure visitors, sessions, pages, sources, campaigns, devices, and locations.
- Keep bot traffic separate.
- Use cookieless identity with no raw IP storage.
- Export or share reports when needed.

**Outcome:** Clear traffic trends with less personal data and less privacy overhead.

### Use case 2: Product analytics for a growing SaaS

**Problem:** A product team has web traffic data but cannot see activation, conversion, or retention.

**TinyAnalytics approach:**

- Send custom events for key actions.
- Use `identify()` for signed-in users.
- Build funnels and behavioral cohorts.
- Measure retention and journeys.
- Add feature flags, experiments, and surveys as the product matures.

**Outcome:** Acquisition and product behavior share one event model.

### Use case 3: AI discovery reporting

**Problem:** A content team cannot separate AI referrals from ordinary referral traffic or connect crawler activity to human visits.

**TinyAnalytics approach:**

- Monitor AI sessions and their landing pages.
- Compare assistant trends over time.
- Attribute revenue to AI-referred sessions.
- Inspect AI crawlers separately from people.
- Combine AI reporting with Search Console.

**Outcome:** A clear view of what AI platforms read and what traffic they actually send.

### Use case 4: Ecommerce and revenue attribution

**Problem:** A team sees purchases in Stripe and traffic in analytics but cannot connect the two.

**TinyAnalytics approach:**

- Send client purchase events or connect Stripe.
- Measure total and net revenue, refunds, orders, and paying sessions.
- Break revenue down by acquisition source.
- Use goals, funnels, experiments, and alerts around revenue.

**Outcome:** Traffic and product decisions can be evaluated against money.

### Use case 5: A/B testing without another analytics stack

**Problem:** A team uses one tool for flags, another for experiments, and another for conversion reporting.

**TinyAnalytics approach:**

- Create a multivariate feature flag.
- Record exposure when the visitor experiences the variant.
- Connect the experiment to a goal.
- Compare conversion, lift, and statistical significance.

**Outcome:** Assignment, exposure, conversion, and reporting stay together.

### Use case 6: Multi-site and agency reporting

**Problem:** An agency or multi-brand company repeats reporting work and struggles with access control.

**TinyAnalytics approach:**

- Organize sites under one organization.
- Grant access through teams and roles.
- Compare sites in the organization overview.
- Build site or organization dashboards.
- Schedule reports or share read-only views.

**Outcome:** Clients and internal teams get the right view without separate analytics accounts.

### Use case 7: Move away from GA4 without losing history

**Problem:** A team wants a simpler, cookieless platform but needs historical context.

**TinyAnalytics approach:**

- Connect GA4 and select the property and date range.
- Import the available historical reports.
- Install TinyAnalytics for new collection.
- Compare imported history with new data in the same dashboard.

**Outcome:** The team changes its future collection model without resetting every benchmark.

### Use case 8: Mobile and web in one analytics workspace

**Problem:** A product has both a website and a React Native app, with behavior split across tools.

**TinyAnalytics approach:**

- Track the site with the browser script.
- Track the app with the React Native SDK.
- Collect screens, events, errors, and identities.
- Analyze both within the same organization.

**Outcome:** Web and mobile teams use the same product vocabulary and access model.

### Use case 9: Reliability and analytics together

**Problem:** A traffic drop could mean lower demand, a broken page, or an outage.

**TinyAnalytics approach:**

- Track traffic and conversion.
- Monitor HTTP or TCP availability.
- Open incidents after confirmed failures.
- Send alerts through email, Slack, Discord, or webhooks.
- Add chart annotations around launches and incidents.

**Outcome:** Teams can connect business metrics with operational events.

---

## Competitive positioning

### Positioning principle

Do not claim TinyAnalytics wins every comparison. It does not.

- Google Analytics is deeply connected to Google’s advertising ecosystem.
- Plausible is open source, EU-hosted, and has a smaller tracking script.
- Umami is open source and now offers a broad analytics surface, including funnels, retention, revenue, performance, heatmaps, and session replay.
- TinyAnalytics is closed-source and hosted-only.

The defensible position is the combination of **simplicity, cookieless identity, AI discovery, product analytics, monitoring, and a meaningful free tier**.

### At a glance

| Capability | TinyAnalytics | Google Analytics 4 | Plausible | Umami |
| --- | --- | --- | --- | --- |
| Cookieless default | Yes | No; GA4 JavaScript uses first-party cookies | Yes | Yes |
| Raw IP stored in analytics data | No | Different collection model; verify per Google policy | No personal data by stated design | No personal data by stated design |
| Hosted service | Yes | Yes | Yes | Yes |
| Self-host option | No | No | Yes | Yes |
| Open source | No | No | Yes | Yes |
| Web analytics | Yes | Yes | Yes | Yes |
| Product analytics depth | Events, funnels, retention, cohorts, flags, experiments, surveys, B2B accounts | Broad | Focused web analytics | Broad and expanding |
| AI traffic report | Yes | Not a first-class TinyAnalytics-equivalent report | Verify current product | Verify current product |
| AI crawler report | Yes | Verify current product | Verify current product | Verify current product |
| Natural-language to scoped SQL | Yes | Different exploration model | Verify current product | Verify current product |
| Monitoring and alerts | Uptime, analytics alerts, scheduled reports | Different product ecosystem | Scheduled reports and related features; verify current scope | Verify current scope |
| Historical import | GA4, Plausible, Umami, Simple Analytics | N/A | Verify current product | Verify current product |
| Free ongoing plan | Planned/current catalog: yes | Yes | Trial-led paid service | Cloud plan and self-host option; verify current terms |

### vs Google Analytics 4

**Lead with:** simplicity, cookieless collection, privacy mechanism, and a product not built around advertising.

**Recommended line:**

> Google Analytics connects deeply to Google’s advertising ecosystem and uses first-party cookies in its standard JavaScript setup. TinyAnalytics gives you web and product analytics without analytics cookies, with a smaller install and a dashboard designed to answer the daily questions first.

**Do not say:**

- “Google Analytics is illegal.”
- “GA4 always requires consent everywhere.”
- “TinyAnalytics is more accurate.”
- “Google sells your analytics data.”

**Trade-off to acknowledge:** Teams centered on Google Ads and the wider Google marketing stack may value GA4’s native ecosystem more than TinyAnalytics’ privacy and simplicity.

### vs Plausible

**Lead with:** deeper product workflows, multi-day cookieless identity, AI discovery reporting, experimentation, and a free ongoing plan.

**Recommended line:**

> Plausible is an excellent open-source, EU-hosted choice for focused web analytics. TinyAnalytics is for teams that want that cookieless starting point plus product analytics, AI traffic and crawler reports, feature flags, experiments, surveys, B2B analytics, and monitoring in one hosted platform.

**Trade-offs to acknowledge:**

- Plausible is open source; TinyAnalytics is not.
- Plausible can be self-hosted; TinyAnalytics cannot.
- Plausible publicly documents a 2.5 KB gzipped script; TinyAnalytics is under 6.5 KB.
- Plausible already publishes detailed EU infrastructure evidence. TinyAnalytics must publish its own before using an equivalent claim.

### vs Umami

**Lead with:** the integrated privacy + AI discovery + product operations story, not a claim that Umami only does basic web analytics.

**Recommended line:**

> Umami is an open-source, privacy-focused analytics platform with a broad and growing report set. TinyAnalytics differentiates through its hosted-only simplicity, AI traffic and crawler reporting, natural-language SQL workflow, integrated feature delivery and experimentation, revenue, monitoring, and a product designed to keep those jobs in one organization.

**Trade-offs to acknowledge:**

- Umami is open source and can be self-hosted.
- Umami’s current documentation includes funnels, retention, revenue, performance, boards, heatmaps, and session replay.
- Buyers who require source access or self-hosting should choose Umami or another open-source product.

### Competitive weaknesses to state internally

- Closed-source and hosted-only.
- EU infrastructure proof is not yet published.
- The public website is materially out of sync with the shipped product.
- Pricing and Free-plan limits are inconsistent across current sources.
- Current public social proof needs verification.
- No session replay or heatmaps by design.
- A cookieless hash gives estimated anonymous identity; it is not exact without `identify()`.
- The under-6.5 KB script is larger than Plausible’s currently advertised 2.5 KB script.

### Summary competitive statement

**TinyAnalytics is the privacy-friendly analytics platform for teams that want an easy web-analytics start without giving up product analytics, AI discovery, experimentation, revenue, and monitoring as they grow.**

---

## Brand voice and tone

### Archetype

- **Primary:** Sage—truthful, evidence-led, explains the mechanism.
- **Secondary:** Everyman—plain-spoken, practical, and approachable.

### Voice attributes

**Clear, not clever**

- Say what the product does in the first sentence.
- Use a memorable line only when its meaning is immediate.
- Prefer “See visits from AI assistants” over “Decode the new discovery frontier.”

**Confident, not absolute**

- State shipped behavior directly.
- State limits with the same confidence as benefits.
- Avoid “perfect,” “complete,” “100% compliant,” and “the only platform.”

**Specific, not inflated**

- Use “under 6.5 KB gzipped,” not “blazing fast.”
- Use “AI traffic, AI crawlers, and Ask AI for SQL,” not “AI-powered.”
- Use “no raw IP storage,” not “military-grade privacy.”

**Simple, not shallow**

- Start with the answer.
- Add the mechanism for readers who need proof.
- Never confuse a simple interface with a small feature set.

**Warm, not cute**

- Write like a helpful product expert.
- Avoid mascots, jokes, or excessive emoji in trust and privacy copy.
- The EU flag is acceptable in short social or footer contexts after the claim is verified.

### Writing principles

1. Lead with the user’s outcome.
2. Support every claim with a feature, mechanism, number, demo, or source.
3. Use one promise per section.
4. Keep paragraphs short and headings meaningful.
5. Explain privacy mechanisms and their limits.
6. Translate features into the decision they improve.
7. Use second person, active voice, and present tense.
8. Name UI actions only when writing product instructions.
9. Keep CTAs specific: **Start free**, **See AI traffic**, **Plan your migration**.
10. Read copy aloud and remove committee language.

### Words to use

- privacy-friendly
- cookieless
- web and product analytics
- site
- organization
- team
- custom event
- identify
- AI traffic
- AI crawlers
- one tracking script
- hosted service
- read-only SQL
- free plan
- made and hosted in the EU (after verification)

### Words to avoid

- fingerprinting, without the full mechanism and limits
- property or project, when “site” is meant
- workspace, when “organization” is meant
- pixel or tag, when “tracking script” is meant
- revolutionary
- cutting-edge
- best-in-class
- seamless
- robust
- effortless
- 100% GDPR compliant
- anonymous, when data is actually pseudonymous
- fully accurate
- unlimited, unless the active plan catalog confirms it

### Preferred copy transformations

| Avoid | Prefer |
| --- | --- |
| Powerful analytics for everyone | Traffic, funnels, revenue, experiments, and monitoring in one platform |
| AI-powered insights | See AI referrals and crawlers; turn plain-English questions into read-only SQL |
| Fully GDPR compliant | No analytics cookies, no raw IP storage, and no personal data by default |
| Lightweight | Under 6.5 KB gzipped |
| Easy setup | Add one script and verify the first visit in Realtime |
| All-in-one | Web analytics, product analytics, revenue, and uptime in one event model |
| Accurate users | Useful cookieless estimates, with `identify()` for signed-in accuracy |

---

## Handles and naming

### Approved naming

- **Brand:** TinyAnalytics
- **Website:** `tinyanalytics.io`
- **Dashboard:** `dash.tinyanalytics.io`
- **Documentation:** `tinyanalytics.io/docs`
- **Product noun:** TinyAnalytics
- **Tracked entity:** site

### Handle strategy

Prefer the exact lowercase handle:

- `@tinyanalytics`

If unavailable, test in this order:

1. `@tinyanalyticsio`
2. `@usetinyanalytics`
3. `@tinyanalyticshq`

Do not register a handle until availability, trademark conflicts, and account ownership are checked across:

- X
- LinkedIn
- Bluesky
- Mastodon
- YouTube
- GitHub, if a public organization is needed

### Support and sales addresses

The current public website uses `hello@tinyanalytics.io`. Confirm which addresses are monitored before publishing:

- General: `hello@tinyanalytics.io`
- Support: **[TODO]**
- Privacy/DPA: **[TODO]**
- Security: **[TODO]**

---

## Critical TODOs

### P0 — Blockers before new marketing copy goes live

#### 1. Replace the legacy public-site product story

The current public website claims session recording, heatmaps, London/UK hosting, “100% GDPR compliant,” and other behavior that conflicts with the current hosted product documentation.

**Action:**

- Remove session replay and heatmap claims.
- Replace UK/London hosting claims only after the EU infrastructure facts are verified.
- Replace blanket legal guarantees with the approved privacy mechanism and legal caveat.
- Update the product surface to include web analytics, product analytics, AI reporting, revenue, and monitoring.
- Use **TinyAnalytics** with a capital **T** and **A** consistently.

#### 2. Reconcile pricing and Free-plan limits

Three sources currently disagree:

- The public website advertises 50,000 monthly pageviews and one site.
- The product plan catalog defines 100,000 monthly pageviews and three sites.
- The documentation PRD notes that billing behavior and public pricing still need owner confirmation.

**Action:**

- Confirm the live Free, Growth, and Business plans.
- Confirm whether billing enforcement is active.
- Confirm the 14-day Business trial and no-card downgrade flow.
- Confirm retention semantics and all quota gates.
- Make the website render from the same plan catalog the product enforces, if possible.

#### 3. Verify the EU hosting claim

**Action:**

- Name the legal entity and country.
- Name the infrastructure provider and data-center region.
- Verify European ownership.
- Document CDN, email, monitoring, support, AI-provider, and backup data flows.
- Publish a subprocessor list, DPA, security page, and deletion/retention behavior.
- Decide whether the accurate claim is EU-hosted, EU-owned, EU-only processing, or a narrower statement.

#### 4. Audit every public proof claim

**Action:**

- Verify “19,000 websites.”
- Verify “56.6B tracked pageviews.”
- Verify “5.2K active users.”
- Verify the uptime figure and measurement window.
- Verify “4.97/5” and “300+ Capterra reviews.”
- Remove anything that cannot be reproduced or linked.

#### 5. Confirm signup and CTA destinations

**Action:**

- Test account creation at `dash.tinyanalytics.io`.
- Confirm whether a card is required.
- Confirm the trial-to-Free behavior.
- Add a live demo or public dashboard before using **View live demo**.
- Use one primary CTA label across the homepage and campaigns.

### P1 — Trust and conversion assets

#### 6. Publish a live product demo

Show:

- Overview and Realtime.
- AI traffic and AI crawlers.
- Funnel and retention.
- Experiment results.
- Revenue.
- Uptime.

Use seeded, clearly labeled demo data.

#### 7. Publish a privacy and infrastructure trust center

Include:

- Cookieless identity.
- Data handling.
- Subprocessors.
- Security practices.
- Retention and deletion.
- DPA.
- Incident response contact.
- Legal disclaimers.

#### 8. Collect five named customer stories

Prioritize:

- A privacy-led migration from GA4.
- A SaaS using funnels and retention.
- A team using AI discovery reporting.
- An ecommerce site connecting revenue.
- An agency managing several sites.

#### 9. Create focused landing pages

- `/privacy-friendly-analytics`
- `/product-analytics`
- `/ai-traffic-analytics`
- `/analytics-for-saas`
- `/analytics-for-agencies`
- `/google-analytics-alternative`
- `/plausible-alternative`
- `/umami-alternative`
- `/migrate-from-ga4`

Each page should have one promise, one audience, one CTA, product screenshots, and honest comparison points.

#### 10. Measure and publish script performance

**Action:**

- Automate the gzipped script-size number per release.
- Measure load and execution cost against a reproducible test page.
- Avoid environmental or carbon claims unless the method is published and reviewed.

### P2 — Brand distribution

#### 11. Secure social handles

Confirm ownership and choose one canonical handle across channels.

#### 12. Build a repeatable content calendar

Monthly mix:

- One privacy mechanism article.
- One product workflow.
- One AI discovery report or benchmark.
- One migration guide.
- One customer story.
- One release with concrete before/after evidence.

#### 13. Create an analytics benchmark report

Potential recurring report:

**“The state of AI referral traffic”**

Possible measures:

- Share of sessions from AI assistants.
- Fastest-growing assistant sources.
- Landing-page categories receiving AI traffic.
- Conversion or revenue differences, reported only from opted-in, aggregated data with a documented privacy method.

---

## Source notes

### Internal product sources

This document was built from a page-by-page inventory of the public documentation navigation and its 95+ guides/reference pages, with close reading of the core positioning and high-risk claims:

- [Documentation introduction](./index.mdx)
- [How TinyAnalytics works](./how-it-works.mdx)
- [Privacy and GDPR](./resources/privacy.mdx)
- [Cookieless identity](./resources/cookieless-identity.mdx)
- [Data handling](./resources/data-handling.mdx)
- [Comparison](./resources/comparison.mdx)
- [AI traffic](./ai-traffic.mdx)
- [Bots and AI crawlers](./bots.mdx)
- [SQL query builder](./sql-query-builder.mdx)
- [Revenue analytics](./revenue.mdx)
- [Feature flags](./feature-flags.mdx)
- [Experiments](./experiments.mdx)
- [Surveys](./surveys.mdx)
- [Migration](./migrate.mdx)
- [Documentation product requirements](./PRD.md)
- `../tinyanalytics/wiki/features.md`
- `../tinyanalytics/apps/api/src/billing/plans.ts`

The product source repository contains self-hosting implementation material, but the customer product described here is closed-source and hosted-only. No self-hosting claim or instruction should appear in public marketing.

### External sources checked on July 28, 2026

- [Current TinyAnalytics public website](https://tinyanalytics.io/) — treated as a legacy surface to audit, not a source of shipped product behavior.
- [Google Analytics 4 cookie usage](https://support.google.com/analytics/answer/11397207) — Google documents first-party cookies in the standard GA4 JavaScript setup.
- [Plausible privacy-focused analytics](https://plausible.io/privacy-focused-web-analytics) — official statements on cookieless analytics, open source, script size, and EU infrastructure.
- [Umami product overview](https://docs.umami.is/docs/about) — official statements on privacy, open source, cloud/self-hosting, and its current feature surface.

### User-supplied positioning requiring product proof

- “Made and hosted in the EU.”
- “Powered by European-owned infrastructure.”
- “Generous free plan.”

The first two require infrastructure and subprocessor documentation. The third has support in the current product plan catalog, but its exact limits must be reconciled with the live website and billing behavior.

---

## Document version history

**Version 1.1 — July 28, 2026**

- Clarified the boundary between core anonymous analytics and optional browser storage.
- Aligned the documentation homepage, metadata, privacy pages, AI page, and comparison page with the brand promise.

**Version 1.0 — July 28, 2026**

- Rebuilt the TechnologyChecker template for TinyAnalytics.
- Defined the single promise and five primary differentiators.
- Added evidence-backed website, product, FAQ, social, use-case, and competitor copy.
- Added the EU hosting claim as owner-supplied positioning with a publication gate.
- Avoided fabricated testimonials and unverified social proof.
- Flagged current website conflicts: unshipped session replay/heatmaps, UK vs EU hosting, legal absolutes, pricing drift, and unsupported proof claims.
