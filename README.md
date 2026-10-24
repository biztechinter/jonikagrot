# Jonik Ndovu Farm — Premium Website & Tiered Investor Portal

Production-oriented, responsive web application and tiered investor data room for **Jonik Ndovu Farm**, a hospitality-led agro-tourism destination in Segera, Laikipia County, Kenya.

Built in accordance with the **Version 3.0 Investor Package** and [SiteGuide.md](file:///c:/Training/JonikAgroTourism/SiteGuide.md).

---

## 1. Verified Project Facts (Version 3.0 Ground Truth)
All metrics and claims throughout this application strictly observe the verified brief:
- **Location**: Segera, Laikipia County, Kenya.
- **Total Capital Requirement**: **US$2.4 Million** in total, inclusive of the proposed acquisition of approximately 7 additional hectares.
- **Landholding**: **8 hectares** already owned; **~7 additional hectares** proposed for acquisition; **~15 hectares** indicative ultimate holding.
- **Accommodation Scale**: **12–15 units** (low-density boutique eco-luxury).
- **Core Proposition**: Hospitality is the principal commercial engine; regenerative agriculture is integrated into the guest experience, food narrative, and landscape.
- *Superseded figures (24 units / US$10.8M) are obsolete and strictly excluded.*

---

## 2. Architecture & Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom Jonik Ndovu design tokens:
  - Deep Forest Green: `#19382D`
  - Darker Evergreen: `#10271F`
  - Warm Ivory: `#F7F4EC`
  - Sand: `#E8DCC4`
  - Muted Earth Brown: `#A88B65`
  - Charcoal: `#282C29`
- **Typography**: Editorial Serif (`Playfair Display`) + Clean Sans (`Inter`)
- **Icons**: Lucide React
- **Dual-Mode Backend Architecture**:
  - **Local Persistent Mode (Default)**: Runs immediately out of the box with zero third-party setup. Server-side session cookies, role-based authorization, encrypted document streaming from `server-storage/documents/`, and JSON state persistence.
  - **Cloud Production Mode**: Seamless drop-in adapters for Supabase Auth, PostgreSQL, and Supabase Private Storage via `.env.local`.

---

## 3. Pre-Configured Demo Accounts

For immediate review and verification, three accounts are seeded with distinct permission tiers:

| Role | Email | Access Scope |
| :--- | :--- | :--- |
| **Super Administrator** | `admin@jonikndovufarm.com` | Full platform control, access request approvals, user management, audit logs |
| **Approved Investor (Tier 3)** | `investor.approved@example.com` | Unrestricted data room access: 10-Year Model (XLSX), Sources & Uses, Title Diligence |
| **Registered Investor (Tier 2)** | `investor.registered@example.com` | Overview materials: 1-Page Teaser, 5-Min Brief, Visual Boards, Investor FAQ |

*(You can sign in directly from the demo buttons on the `/login` page without entering passwords).*

---

## 4. Route Map

### Public Destination Website
- `/` — Cinematic Homepage (Hero, Factual Snapshot, Experience Cards, Vision, Investment Teaser, CTA)
- `/vision` — Development philosophy, low-impact architecture, and concept masterplan
- `/experience` — Boutique accommodation, farm-to-table dining, and agro-tourism trails
- `/destination` — Segera & Laikipia regional setting, ecology, and climate
- `/about` — Genesis, stewardship commitments, and leadership structure
- `/investment` — Public investment landing page, thesis, and Sources & Uses schedule
- `/investor-access` — Tiered access explanation & interactive accredited onboarding form
- `/contact` — Direct inquiry form with spam protection
- `/privacy` & `/terms` — Confidentiality and data policies

### Tiered Investor Portal (`/portal/*`)
- `/portal` — Executive dashboard overview, status badges, and quick downloads
- `/portal/opportunity` — Master Investment Case, 90-second script, and diligence FAQ
- `/portal/development` — Site design brief and Phased vs Full Build comparison
- `/portal/financials` — Sources & Uses worksheet and 10-Year Excel Model download
- `/portal/due-diligence` — Master data room index, title status, and diligence checklists
- `/portal/documents` — Searchable and filterable document library with real file downloads
- `/portal/messages` — Submit inquiries and schedule sponsor conference calls
- `/portal/profile` — KYC credentials and accreditation status

### Administrative Command Center (`/admin/*`)
- `/admin` — KPI dashboard (pending requests, active investors, document downloads, audit logs)
- `/admin/access-requests` — Approve to Tier 2 or Tier 3, or reject requests
- `/admin/investors` — Manage permissions, elevate roles, suspend/reactivate accounts
- `/admin/documents` — File analytics and download metrics
- `/admin/audit-log` — Real-time immutable security event stream

---

## 5. Local Setup & Execution

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run Local Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```powershell
npm run build
npm start
```

---

## 6. Hosting & Production Deployment
This application is designed to be hosted seamlessly on platforms like **Vercel**, **Netlify**, or any **Node.js / Docker container**.
To deploy to Vercel:
1. Push this repository to GitHub or GitLab.
2. Import the project in Vercel.
3. Add environment variables from `.env.example` as desired.
4. Deploy with one click.
