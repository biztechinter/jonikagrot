# PROJECT: JONIK NDOVU FARM — PREMIUM WEBSITE & INVESTOR PORTAL

## 1. YOUR ROLE

Act as a world-class digital product studio combining:
- A premium hospitality and luxury destination brand agency.
- A senior UI/UX designer.
- A senior full-stack web engineer.
- A security-conscious investor relations platform architect.
- A conversion-focused website strategist.

Design and build a production-oriented, responsive website and investor portal for Jonik Ndovu Farm, a hospitality-led agro-tourism development in Segera, Laikipia, Kenya.

Do not stop at a wireframe, static mockup or written plan. Build the actual application, implement its core interactions, run it, test it and fix the issues you find.

Use sensible defaults and make progress independently. Ask questions only when a genuinely essential decision cannot be made safely.

## 2. BUSINESS CONTEXT — USE THESE FACTS CONSISTENTLY

Project name: Jonik Ndovu Farm.

Location: Segera, Laikipia, Kenya.

Project concept: A premium, hospitality-led agro-tourism destination combining accommodation, hospitality, agricultural experiences, landscape and nature-based activities.

Capital requirement: US$2.4 million in total, including the proposed acquisition of approximately 7 additional hectares.

Existing landholding: 8 hectares already owned.

Proposed additional land acquisition: Approximately 7 hectares, subject to completion of the acquisition.

Potential total landholding: Approximately 15 hectares after the additional land is acquired.

Planned accommodation: 12–15 units, consistent with the current development concept.

Primary audiences:
1. Kenyan private investors and business groups.
2. International private investors and family offices.
3. Hospitality and tourism investors.
4. Strategic partners and relevant investment organisations.
5. Potential future guests and destination partners.

The underlying feasibility study, land documents, land-use documentation, environmental documentation, unit designs and cost estimates are largely in place. The website should professionally organise and present the existing evidence rather than suggesting that the project has no supporting research.

Do not invent financial returns, occupancy rates, revenue, profit, approvals, construction status, operating history, partnerships, investor commitments or projected opening dates.

Label proposed plans and concept renders accurately. Never imply that concept imagery is an actual photograph of the property or an approved architectural plan.

## 3. PRIMARY OBJECTIVES

The website must:

1. Establish a distinctive, premium and trustworthy brand.
2. Communicate the destination vision through strong imagery and concise storytelling.
3. Explain the hospitality-led agro-tourism investment proposition.
4. Convert relevant visitors into investor enquiries and access requests.
5. Provide tiered access to private investor information.
6. Enable the project team to approve users, manage permissions and maintain documents.
7. Work beautifully on mobile, tablet and desktop.
8. Be straightforward for a non-technical project team to update.
9. Be structured so that future imagery, approved designs and documents can be added without rebuilding the site.

## 4. BRAND AND ART DIRECTION

The design should combine understated African luxury, contemporary hospitality, natural materials and institutional investment credibility.

It must feel bespoke, editorial, spacious and sophisticated.

Avoid:
- Generic agricultural website templates.
- Generic corporate SaaS dashboards.
- Excessive gradients, glassmorphism and glowing effects.
- Loud colours, cluttered layouts and excessive animation.
- Overused safari clichés or stereotypical African motifs.
- Fake awards, testimonials, ratings, partners or investor logos.
- Unverified photographs presented as actual project imagery.
- Excessive text on the homepage.

### Colour palette

Use a restrained design system:
- Deep forest green: #19382D
- Darker evergreen: #10271F
- Warm ivory: #F7F4EC
- Sand: #E8DCC4
- Muted earth brown: #A88B65
- Charcoal: #282C29
- White: #FFFFFF

Use forest green for primary navigation, selected backgrounds and calls to action. Use warm ivory for the main content canvas. Reserve earth tones for subtle accents.

Ensure readable contrast and accessible text sizes.

### Typography

Use an elegant editorial serif for major headlines and a clean sans-serif for body text, forms and navigation.

Suggested fonts:
- Headings: Playfair Display or Cormorant Garamond.
- Body and interface: Inter or Manrope.

Load fonts efficiently and provide appropriate fallbacks.

### Layout

Use generous whitespace, editorial grid layouts, strong photographic compositions, refined borders, subtle shadows and restrained transitions.

The design should resemble a carefully art-directed luxury hospitality website rather than a theme-based business website.

Use a consistent spacing scale, typography scale, colour tokens, reusable buttons, cards, form controls and navigation components.

## 5. SITE ARCHITECTURE

Create the following public routes:

- /
- /vision
- /experience
- /destination
- /about
- /investment
- /investor-access
- /contact
- /privacy
- /terms

Create authentication routes:

- /login
- /register
- /forgot-password
- /auth/callback, if required by the selected authentication provider

Create protected investor routes:

- /portal
- /portal/opportunity
- /portal/development
- /portal/financials
- /portal/due-diligence
- /portal/documents
- /portal/messages
- /portal/profile

Create protected administrative routes:

- /admin
- /admin/investors
- /admin/documents
- /admin/access-requests
- /admin/audit-log

Use clean URLs, sensible page titles and a consistent site-wide navigation system.

Protected routes must be protected by server-side or backend-enforced authorisation, not merely hidden from the navigation.

## 6. HOMEPAGE

Build a polished, cinematic homepage with the following sections.

### A. Header and navigation

Desktop:
- Jonik Ndovu Farm logo or typographic wordmark.
- The Vision.
- The Experience.
- Destination.
- About.
- Investment.
- Contact.
- A prominent but restrained “Investor Access” button.

Mobile:
- Compact wordmark.
- Accessible menu button.
- A clear, easy-to-use navigation drawer.
- Investor Access visible without excessive scrolling.

The header may be transparent over the hero and become a solid background after scrolling.

### B. Hero section

Use a large, immersive landscape or premium lodge image.

Suggested headline:

“A Distinctive Destination in the Landscapes of Laikipia.”

Supporting copy:

“Envisioning a hospitality-led agro-tourism destination where considered accommodation, the African landscape and meaningful agricultural experiences come together.”

Primary CTA: “Explore the Vision”.

Secondary CTA: “Explore the Investment”.

The hero must look excellent at desktop and mobile aspect ratios. Apply a subtle dark overlay only when necessary for text legibility.

### C. Project introduction

Introduce Jonik Ndovu Farm in a short, elegant paragraph.

Explain the relationship between:
- Accommodation and hospitality.
- Agricultural experiences.
- Food and landscape.
- Nature and the wider destination context.

Keep the focus on the proposed experience and the project's distinctive combination of uses.

### D. Project snapshot

Present four elegant factual indicators:
- US$2.4M total capital requirement.
- 8 hectares already owned.
- Approximately 7 additional hectares proposed for acquisition.
- 12–15 planned accommodation units.

Make clear that the capital requirement includes the proposed additional land acquisition.

Do not imply that the proposed land acquisition is complete.

### E. Experience cards

Create visually rich cards for:
- Thoughtful Accommodation.
- Farm-to-Table Experiences.
- Landscape and Nature.
- Agricultural Experiences.
- Outdoor Activities and Connection.

Describe these as proposed experiences where they are not yet operational.

### F. Development vision

Showcase the planned development concept using a large visual, supporting text and a CTA to explore the vision.

Concept plans and generated architectural imagery must be labelled “Concept visualisation” or “Illustrative development concept” where appropriate.

### G. Investment introduction

Present the opportunity in a measured, credible manner.

Suggested copy:

“An opportunity to participate in the development of a distinctive hospitality-led agro-tourism destination in Laikipia, Kenya.”

Mention the US$2.4 million capital requirement and direct visitors to the investment page.

Do not promise returns or imply guaranteed financial performance.

CTA: “Explore the Investment Opportunity”.

### H. Final call to action

Invite visitors to connect with the team or request investor access.

### I. Footer

Include:
- Brand wordmark.
- Short project description.
- Main navigation links.
- Investor Access.
- Contact information placeholders.
- Privacy and terms links.
- Copyright notice.

Do not invent an address, email address, phone number or social media profile. Use clearly marked configuration placeholders until real details are supplied.

## 7. PUBLIC PAGE REQUIREMENTS

### The Vision — /vision

Explain the overall development philosophy, site planning principles, accommodation concept, integration of agriculture and landscape, and intended guest journey.

Include a conceptual site-plan gallery.

Include clearly labelled placeholders for approved masterplan drawings and unit designs.

Do not present generated images as technical drawings or approved designs.

### The Experience — /experience

Create a premium editorial page introducing the proposed accommodation, dining, agricultural experiences, nature and activities.

Use large images, concise descriptions and a varied editorial layout.

Do not invent operational amenities or claim that facilities are already available.

### Destination — /destination

Introduce Segera and the wider Laikipia context using factual, carefully worded content.

Provide an image-led sense of place.

Do not invent travel times, transport arrangements, nearby attractions or location-specific claims.

Use placeholders for a verified map, directions and practical travel information until supplied.

### About — /about

Present the project story, vision and development philosophy.

Provide configurable placeholders for the founders, project leadership and team biographies.

Do not invent personal biographies, credentials, company history or partnerships.

### Investment — /investment

This is the principal public-facing investment landing page.

Include:
- Investment thesis.
- Destination and hospitality concept.
- Project snapshot.
- Current development status.
- High-level use-of-funds explanation.
- Planned accommodation scale.
- Existing and proposed landholding.
- A clear explanation of the investment evaluation process.
- A prominent Investor Access CTA.
- Appropriate investment disclaimer.

Avoid publishing sensitive technical documentation on the public page.

Do not invent financial projections or an allocation of the US$2.4 million that has not been approved in the existing financial model.

### Investor Access — /investor-access

Explain that access is available in stages.

Describe the registration, review, approval and due-diligence process.

Include a registration form with:
- Full name.
- Business email.
- Organisation, where applicable.
- Country.
- Investor category.
- Investment interest.
- Optional indicative investment range.
- Short message.
- Required acknowledgement of the privacy notice.

Investor categories:
- Private investor.
- Family office or investment company.
- Hospitality or strategic investor.
- Institutional investor.
- Professional adviser.
- Other.

Investment interests:
- Equity.
- Debt or structured financing.
- Joint venture or strategic partnership.
- Exploring options.

Do not require an indicative investment amount.

Include validation, accessible error messages, loading states, submission confirmation and duplicate-request handling.

Never show an account as approved merely because a registration form was submitted.

### Contact — /contact

Provide a simple contact form and configurable contact details.

Validate the form and protect it against spam.

Do not fabricate contact information.

## 8. TIERED INVESTOR ACCESS

Implement three access levels.

### Level 1 — Public

No account required.

Visitors can view the public website and high-level investment summary.

### Level 2 — Registered investor

Requires a verified email account and acceptance of the applicable terms.

Access is limited to explicitly designated overview materials and the registered user's own profile.

Registration must not automatically grant access to sensitive files.

### Level 3 — Approved investor

Requires explicit approval by an authorised administrator.

Access can include:
- Detailed investment brief.
- Feasibility study.
- Financial model.
- Sources-and-uses schedule.
- Cost estimates.
- Land and acquisition documents.
- Relevant land-use and environmental documentation.
- Unit designs and development plans.
- Risk register.
- Due-diligence index.
- Investment terms framework.

Permissions should be configurable by document category and individual user.

A further restricted transaction-stage tier may be added later if needed.

### Security requirements

Use a reputable authentication provider and secure database/storage service.

Preferred stack if compatible with the coding environment:
- Next.js with TypeScript.
- Tailwind CSS.
- Accessible component primitives such as shadcn/ui.
- Supabase Auth, PostgreSQL and private Storage.
- A server-side authorisation layer for protected operations.

If the environment has a better-supported secure stack, adapt sensibly and document the choice.

Requirements:
- Verify email addresses.
- Use secure sessions and supported authentication flows.
- Enforce authorisation on the server or database.
- Implement least-privilege access.
- Use private document storage.
- Generate short-lived signed URLs only after checking the user's permissions.
- Never expose service-role keys or secrets in browser code.
- Use database row-level security where applicable.
- Protect forms against spam and abuse.
- Validate all user input on the server.
- Add rate limiting to sensitive endpoints where supported.
- Log important administrative actions.
- Allow immediate account suspension and access revocation.
- Ensure that document URLs cannot be guessed and used to bypass permissions.
- Do not rely on obscured navigation or frontend-only checks for security.

Do not claim to implement download prevention, audit tracking or authentication features unless they actually work.

If credentials or environment variables are unavailable, create the integration structure and clearly document the configuration needed. Never substitute a fake authentication flow while presenting it as production-secure.

## 9. INVESTOR PORTAL

Build a professional, uncluttered dashboard with a different information hierarchy from the public website.

The dashboard should include:
- Welcome message.
- Investor access status.
- Project snapshot.
- Quick links to permitted documents.
- Recent document updates.
- Messages or enquiry links.
- Profile and account settings.

Use the confirmed project facts consistently:
- US$2.4M capital requirement.
- 8 hectares owned.
- Approximately 7 additional hectares proposed.
- 12–15 accommodation units.

### Document library

Organise documents into categories:
1. Investment Overview.
2. Site and Development.
3. Financial Information.
4. Due Diligence.
5. Transaction and Investment Process.

Each document record should include:
- Title.
- Description.
- Category.
- Version.
- Document date.
- Confidentiality level.
- Access permissions.
- File type.
- Optional document owner.
- Upload timestamp.

Show only the documents that the current user is authorised to access.

Provide search and filtering by category and document title.

Support document versioning and replacement without accidentally making older confidential versions public.

If the user lacks permission, show a clear “Request access” action rather than a broken download link.

### Investor enquiries

Allow users to submit questions and request meetings.

Show their own submissions and responses where the backend supports this.

Do not expose one investor's enquiries or profile to another investor.

## 10. ADMINISTRATOR DASHBOARD

Create a separate protected administrative interface.

Only authorised administrators can access it.

Features:
- View access requests.
- Review investor profiles.
- Approve or reject requests.
- Assign or revoke access levels.
- Grant document-category permissions.
- Upload and replace documents.
- Set document metadata and confidentiality classifications.
- Manage document versions.
- Suspend accounts.
- Review an audit log.
- View and respond to investor enquiries.

Ask for confirmation before destructive actions.

Record important actions such as approvals, permission changes, document uploads and account suspensions.

Never allow a normal investor to promote their own account or assign themselves permissions.

Create a clear first-administrator setup procedure. Do not hardcode a public admin password or leave a default privileged account active.

## 11. VISUAL ASSET STRATEGY

Build the website so images can be replaced easily through a central asset configuration or content-management layer.

Use the following asset categories:
- Hero landscape.
- Lodge exterior and architecture.
- Accommodation interiors.
- Agricultural gardens and food.
- Landscape and nature.
- Conceptual masterplan.
- Site development vision.
- Logo and brand assets.

During initial development, use high-quality, appropriately licensed image sources or temporary image placeholders.

Never claim an external stock photograph depicts Jonik Ndovu Farm.

Prefer verified project photography when supplied.

For generated architectural concepts, use labels such as “Illustrative AI concept — not an approved architectural plan.”

Do not invent maps, land boundaries, aerial photographs of the actual site or precise masterplan geometry.

Use optimised images, responsive image sizes, lazy loading below the fold and appropriate alternative text.

Provide elegant placeholders when images are missing rather than broken image icons.

## 12. RESPONSIVE DESIGN

Design mobile-first and verify the experience at approximately:
- 360px mobile.
- 390px mobile.
- 768px tablet.
- 1024px laptop.
- 1440px desktop.
- 1920px large desktop.

Requirements:
- No horizontal overflow.
- Navigation works by touch and keyboard.
- Forms are comfortable to complete on mobile.
- Cards reflow naturally.
- Images maintain attractive aspect ratios.
- Tables remain usable on small screens.
- Portal sidebars become appropriate mobile navigation.
- Dialogs fit small viewports.
- Buttons have suitable touch targets.
- Sticky elements do not obscure content.
- All essential functionality remains available on mobile.

Do not merely shrink the desktop layout. Create intentional responsive compositions.

## 13. ACCESSIBILITY, PERFORMANCE AND SEO

Target WCAG 2.2 AA accessibility practices where practical.

Implement:
- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Accessible labels and form errors.
- Appropriate colour contrast.
- Reduced-motion support.
- Descriptive image alt text.
- Correct heading hierarchy.
- Accessible modal and menu behaviour.

Performance:
- Optimise images.
- Avoid unnecessary JavaScript.
- Lazy-load non-critical media.
- Prevent layout shifts.
- Use appropriate caching.
- Keep public pages fast on mobile connections.

SEO:
- Unique titles and meta descriptions.
- Open Graph metadata.
- Canonical URLs where appropriate.
- Sitemap and robots configuration.
- Structured data only for facts that are verified.
- Sensible URL structure.

Protect investor-only routes and documents from indexing. A robots.txt rule is not a security control; actual authentication and authorisation must protect private content.

## 14. CONTENT AND TONE

Use polished, understated, confident English.

The tone should be:
- Premium but not pretentious.
- Ambitious but credible.
- Warm but professional.
- Commercially clear without aggressive sales language.
- Respectful of the landscape and local context.

Avoid unsupported terms such as “world-class”, “guaranteed returns”, “fully approved”, “operational”, “award-winning” or “market-leading” unless independently substantiated.

Clearly distinguish:
- Existing facts.
- Proposed development.
- Illustrative concepts.
- Modelled financial projections.
- Information available only to approved investors.

Include a suitable statement that investment information is provided for evaluation, that projections are not guarantees, and that access to materials does not constitute an offer where such wording is appropriate. Have the final legal language reviewed by qualified counsel.

## 15. CONTENT MANAGEMENT AND CONFIGURATION

Make it easy for the project team to update:
- Public page text.
- Images.
- Project facts.
- Contact information.
- Investor-facing announcements.
- Document library entries.
- Document access permissions.

Store project facts in a single configuration or database source rather than repeating hardcoded values across multiple pages.

Use placeholders for all unknown contact details and external links.

Keep secrets in environment variables. Provide an example environment file containing variable names and placeholder values only.

## 16. TESTING AND ACCEPTANCE CRITERIA

Before declaring the project complete, verify the following.

### Public website
- All public routes load correctly.
- Navigation links work.
- The design is visually consistent.
- Images have suitable fallbacks.
- Forms validate correctly.
- The site works on mobile, tablet and desktop.
- No invented project claims appear.

### Investor workflow
- A visitor can register.
- Email verification works when configured.
- Registration does not automatically grant sensitive access.
- An administrator can approve or reject a request.
- An approved investor can access only permitted content.
- A registered but unapproved investor cannot access sensitive documents.
- A suspended user loses access.
- Users cannot access another investor's private data.

### Document security
- Private storage is not publicly readable.
- A document download requires valid permission.
- Expired signed URLs no longer work after expiry.
- Changing a frontend URL or API request cannot bypass authorisation.
- Document permissions are enforced server-side or by database/storage policies.
- Administrative actions are protected.

### Administration
- Only authorised administrators can manage users and documents.
- Permissions can be revoked.
- Important actions are recorded.
- Empty states, error states and loading states are implemented.

### Engineering
- No broken routes or major console errors.
- No exposed secrets.
- No non-functional buttons presented as complete features.
- No misleading fake data presented as real investor activity.
- Type checking, linting and available tests pass.
- Document any features that remain unconfigured or incomplete.

If an external integration cannot be fully configured, clearly identify the remaining steps instead of claiming that the feature is live.

## 17. REQUIRED DELIVERABLES

Deliver:
1. A complete, polished responsive public website.
2. A working tiered investor portal.
3. A protected administrative interface.
4. Authentication and document storage integration, or clearly documented setup requirements.
5. Reusable components and a consistent design system.
6. Seed/demo content clearly identified as demo content.
7. A README with setup, deployment and maintenance instructions.
8. An environment variable template.
9. Database schema and access policies where applicable.
10. A list of production configuration requirements.
11. A concise testing report showing what was tested and what remains.
12. A list of any external services, credentials or paid plans required.

## 18. IMPLEMENTATION INSTRUCTIONS

Start by inspecting the available development environment.

If an application already exists, inspect and improve it rather than unnecessarily rebuilding it.

If starting from scratch:
1. Establish the application structure and design tokens.
2. Build the public navigation and homepage.
3. Create the remaining public pages.
4. Implement authentication and the access-control model.
5. Build the investor portal and administrator dashboard.
6. Integrate private document storage and permissions.
7. Test responsive layouts and essential workflows.
8. Fix issues and document deployment.

Prioritise a complete, coherent and secure core experience over a large collection of superficial features.

Make the public website beautiful, the investor portal clear, and the access-control system trustworthy.

The final result should look and feel like a bespoke premium hospitality brand backed by a serious investment process — not a generic template or an unfinished AI-generated demo.