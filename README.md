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

## 6. Hosting & Production Deployment on Hostinger (Non-VPS / hPanel)

This project has been pre-configured for **Hostinger Web & Cloud Hosting (Non-VPS)**.

### Method 1: Hostinger Business or Cloud Hosting (Built-in Node.js in hPanel)
Hostinger's Business Web Hosting and Cloud Hosting plans include a native **Node.js Application Manager** directly inside hPanel.

#### 1. Generate the Standalone Bundle
Run the packaging command locally:
```powershell
npm run build:hostinger
```
This builds Next.js in `standalone` mode and bundles all static chunks, images, and server dependencies into `.next/standalone/`.

#### 2. Upload to Hostinger via File Manager
1. Log in to **Hostinger hPanel** and open **File Manager** for your domain.
2. Compress the contents of `.next/standalone` into a zip file on your computer.
3. Upload and extract the zip file directly into your website's folder (e.g., `public_html` or `/domains/yourdomain.com/jonik-app`).
4. Ensure your `.env` or production variables (like `SESSION_SECRET`) are present or added in hPanel.

#### 3. Configure the Node.js App in hPanel
1. In hPanel, go to **Websites** > **Node.js** (or search "Node.js" in the top bar).
2. Click **Create Application**:
   - **Node.js version**: Choose `Node.js 18.x` or `20.x`.
   - **Application root**: Select the directory where files were uploaded (e.g., `public_html` or `jonik-app`).
   - **Application startup file**: Enter `server.js`.
   - **Application mode**: Set to `Production`.
3. Click **Create** / **Start Application**.
4. The application is now live on your domain.

---

### Method 2: Hostinger Shared/Premium Hosting with Custom Domain Routing
If your Hostinger plan is **Single** or **Premium Shared Hosting** (which does not have the persistent Node.js daemon enabled in hPanel):

Because Next.js 14 App Router powers dynamic server authentication (`cookies()`, session validation, and tiered document streaming), running dynamic Node.js directly on Apache-only shared web roots is not supported by Hostinger. In this case, the standard industry approach is:

1. Deploy the Next.js frontend/server for free to **Vercel** or **Cloudflare Pages**.
2. Keep your domain, business email, and DNS on **Hostinger**.
3. In **Hostinger hPanel DNS Zone Editor**, point your `@` (A record) or `www` (CNAME record) to the deployment endpoint (e.g. `cname.vercel-dns.com` or Cloudflare).
4. All traffic resolves seamlessly under your Hostinger custom domain without requiring a VPS.
