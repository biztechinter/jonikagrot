import { DiligenceDocument } from "@/types";

export const PROJECT_FACTS = {
  name: "Jonik Ndovu Farm",
  tagline: "A Distinctive Hospitality-Led Agro-Tourism Destination in Segera, Laikipia",
  location: {
    region: "Segera, Laikipia County, Kenya",
    elevation: "Approx. 1,800m above sea level",
    climate: "Temperate highland savannah, comfortable year-round temperatures",
    ecosystem: "Part of the renowned Greater Ewaso ecosystem & wildlife corridors",
    nearbyConservancies: {
      headline: "Bordering Major Wildlife Zones in the Laikipia Ecosystem",
      narrative:
        "Segera borders major neighboring wildlife zones in the Laikipia ecosystem, including the Lewa Wildlife Conservancy and Ol Pejeta Conservancy, which are globally recognized strongholds for rhinos and large predators.",
      lewa: {
        name: "Lewa Wildlife Conservancy",
        status: "UNESCO World Heritage Site",
        highlights:
          "Globally recognized sanctuary harboring over 12% of Kenya's eastern black rhinos, the world's largest population of endangered Grevy's zebras, and an essential elephant migration highway connecting Mount Kenya to Samburu.",
        distance: "Neighboring Laikipia Ecosystem Sector",
      },
      olPejeta: {
        name: "Ol Pejeta Conservancy",
        status: "Largest Black Rhino Sanctuary in East & Central Africa",
        highlights:
          "Spanning 90,000 acres, home to East Africa's largest black rhino population, the world's last two northern white rhinos, and the highest apex predator density (lions, leopards, cheetahs, wild dogs) in Kenya.",
        distance: "Neighboring Laikipia Ecosystem Sector",
      },
      corridors: {
        name: "Greater Ewaso Wildlife Corridor",
        status: "Continuous Open Wilderness Flow",
        highlights:
          "Permeable, corridor-friendly boundary design allowing natural elephant and plains game movement across Segera while nurturing regenerative permaculture terraces and apiaries.",
      },
    },
  },
  uniqueValueProposition: {
    title: "Why Jonik Ndovu Farm is Unique",
    subtitle:
      "The Confluence of Intimate Regenerative Agro-Ecology and Africa's Premier Wildlife Sanctuaries",
    pillars: [
      {
        title: "Immediate Proximity to World-Class Conservancies",
        description:
          "Segera borders major neighboring wildlife zones in the Laikipia ecosystem, including Lewa Wildlife Conservancy and Ol Pejeta Conservancy—globally recognized strongholds for rhinos and large predators. Guests experience premier safari circuits paired with peaceful farm immersion.",
      },
      {
        title: "Intimate Low-Density Boutique Scale",
        description:
          "Strictly 12–15 suites (maximum 24–30 guests) ensuring serene privacy, bespoke culinary engagement, and premium ADR yields without mass-tourism footprint.",
      },
      {
        title: "Closed-Loop Living Bio-Economy ($980,000 / 40.8% of Capex)",
        description:
          "Over 40% of capital invested in 100% off-grid solar-hybrid microgrid, circular anaerobic biogas, 10,000 L/hr solar borehole with 5.3 ha automated drip irrigation, and zero-waste kitchen gardens.",
      },
      {
        title: "Permeable Corridor Stewardship",
        description:
          "15-hectare platform (8 ha owned + ~7 ha proposed) designed with deference to natural migratory corridors, integrating contour bioswales, indigenous acacia restoration, and bee-fence buffers.",
      },
    ],
  },
  capitalRequirement: {
    totalUSD: 2400000,
    formatted: "US$2.4 Million",
    notes:
      "Inclusive of the proposed acquisition of approximately 7 additional hectares and contingency. Final cost allocations are subject to an independent quantity surveyor cost plan.",
  },
  landholding: {
    existingOwnedHectares: 8,
    existingOwnedAcres: 19.77,
    proposedAdditionalHectares: 7,
    proposedAdditionalAcres: 17.3,
    indicativeTotalHectares: 15,
    indicativeTotalAcres: 37.07,
    statusNote:
      "8 hectares already owned (subject to customary title diligence); acquisition of approximately 7 adjacent hectares is currently in negotiation and subject to satisfactory contract, access, and diligence completion.",
  },
  accommodation: {
    unitsRange: "12–15 boutique units",
    capacityGuests: "24–30 guests maximum",
    typology:
      "Low-impact eco-suites and family pavilions utilizing natural stone, sustainably harvested timber, and canvas elements.",
    supersededNote:
      "Earlier preliminary documents referencing 24 units or US$10.8M are superseded and erroneous. The verified development brief is 12–15 units.",
  },
  primaryCommercialEngine:
    "Boutique hospitality (accommodation, dining, wellness, curated activities) is the core commercial driver; regenerative agriculture and permaculture are integrated to enrich the guest experience, food narrative, and landscape.",
  greenEcosystem: {
    energy: "60 kWp Solar PV Array + 120 kWh LiFePO4 Battery Bank delivering 100% clean off-grid renewable power",
    biogas: "Commercial Anaerobic Biodigester converting livestock manure & catering waste into clean cooking gas and organic bio-fertilizer",
    irrigation: "Deep solar borehole (10,000 L/hr), 200,000L storage buffer, smart drip irrigation across 5.3 ha, and reed-bed greywater recycling",
    animalHusbandry: "Sheltered rotational sheep paddocks, free-range poultry houses, solarized milking dairy station, and apiary bee sanctuaries",
    farmMachinery: "Compact low-impact farm tractors, cultivation equipment, compost spreaders, and zero-emission electric utility carts",
    landscaping: "Contour swales for moisture retention, agroforestry windbreaks, productive fruit orchards, and indigenous acacia restoration",
    cateringHub: "Farm-to-fork commercial lodge kitchen, artisanal bakery, solar cold-chain storage, curing larder, and live-fire dining",
    farmProduceShop: "Dedicated on-site farm gate retail boutique selling organic produce, cold-pressed oils, honey, and value-added artisanal goods",
  },
  contactPlaceholders: {
    email: "investor.relations@jonikndovufarm.com",
    address: "Segera, Laikipia County, Kenya",
    phone: "+254 (0) 700 000 000 [Representative Office]",
    portalSupport: "support@jonikndovufarm.com",
  },
  disclaimer:
    "This website and portal are prepared solely for confidential discussion and information purposes regarding Jonik Ndovu Farm. Nothing herein constitutes an offer of securities, an invitation to subscribe for shares, or investment advice. Financial representations, masterplans, and concept visualisations are preliminary working drafts subject to technical diligence, architectural approvals, and formal legal contracts.",
};

export const INITIAL_DOCUMENTS: DiligenceDocument[] = [
  // 1. Investment Overview
  {
    id: "doc-01",
    title: "One-Page Investor Teaser",
    description: "High-level visual executive summary of the hospitality-led agro-tourism opportunity, landholding, and capital requirements.",
    category: "Investment Overview",
    filename: "Jonik_Ndovu_Farm_V3_One_Page_Investor_Teaser.pdf",
    filesize: "5.3 KB",
    filetype: "PDF",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 2 Registered",
    requiredRole: "registered",
    downloadsCount: 28,
    executiveHighlights: [
      "Fixed US$2.4M capital target with US$980k (40.8%) allocated to greener ecosystem & productive assets",
      "8.0 ha owned today + ~7.0 ha adjacent option in negotiation (15 ha total)",
      "Prime wildlife adjacency: bordering Lewa Conservancy (UNESCO rhino stronghold) & Ol Pejeta Conservancy",
      "Unlevered project IRR of 14.8% and 2.85x equity multiple over 10-year horizon",
    ],
  },
  {
    id: "doc-02",
    title: "Investor Brief — 5-Minute Overview",
    description: "Decision-useful executive briefing on project background, concept architecture, land logic, and investor milestones.",
    category: "Investment Overview",
    filename: "Jonik_Ndovu_Farm_V3_Investor_Brief.docx",
    filesize: "41.7 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 2 Registered",
    requiredRole: "registered",
    downloadsCount: 42,
    executiveHighlights: [
      "Comprehensive synthesis of verified project facts ($2.4M, 12–15 suites, 15 ha total)",
      "Strategic conservation geography bordering Lewa and Ol Pejeta with permeable wildlife corridor design",
      "Full 12-category Sources & Uses schedule with $980k / 40.8% greener ecosystem subtotal",
      "10-year pro-forma highlights: ADR ramping $380 to $560, occupancy 35% to 68%",
    ],
  },
  {
    id: "doc-03",
    title: "Investor Presentation Deck",
    description: "Master slide deck covering destination context, competitive landscape, accommodation typologies, and financial thesis.",
    category: "Investment Overview",
    filename: "Jonik_Ndovu_Farm_V3_Investor_Presentation.pptx",
    filesize: "183.2 KB",
    filetype: "PPTX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 19,
    executiveHighlights: [
      "20 visual slides formatted for presentation to investment committees",
      "Macro tourism data for Laikipia conservancy and safari circuits",
      "Spatial masterplan overlays and accommodation architectural renders",
      "Series A Preferred Equity investment summary & governance terms"
    ],
  },
  {
    id: "doc-04",
    title: "Master Investment Case",
    description: "Detailed institutional thesis detailing hospitality economics, agricultural integration, target demographic, and risk matrix.",
    category: "Investment Overview",
    filename: "Jonik_Ndovu_Farm_V3_Master_Investment_Case.docx",
    filesize: "44.2 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 31,
    executiveHighlights: [
      "10 comprehensive sections covering macro context, land assembly, unit economics, and circular utilities",
      "Regional analysis: Segera bordering Lewa and Ol Pejeta rhinos and apex predator sanctuaries",
      "Greener ecosystem deep dive ($980,000 / 40.8% of Capex): microgrid, biogas, hydrology, animals, and retail",
      "Institutional risk matrix with 7 risk categories and minority shareholder protections",
    ],
  },

  // 2. Site and Development
  {
    id: "doc-05",
    title: "Conceptual Site & Infrastructure Plan",
    description: "Spatial masterplanning, circulation engineering, and off-grid utility sizing brief for the consolidated 15-hectare platform.",
    category: "Site and Development",
    filename: "Jonik_Ndovu_Farm_V3_Conceptual_Site_Design_Brief.docx",
    filesize: "40.7 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 22,
    executiveHighlights: [
      "Full spatial allocation across 15 ha with dedicated greener ecosystem & productive infrastructure schedule",
      "60 kWp solar PV + 120 kWh LiFePO4 battery storage + 10k L/hr solar borehole + biogas digester",
      "Segregated circulation: Guest Serenity, Farm Operations, and BOH Service networks",
      "Precision drip irrigation network across 5.3 ha and reed-bed greywater recycling"
    ],
  },
  {
    id: "doc-06",
    title: "Visual Investor Board & Moodboard",
    description: "Visual direction portfolio illustrating proposed material palettes (volcanic stone, cedar, thatch, canvas) and guest experiences.",
    category: "Site and Development",
    filename: "Jonik_Ndovu_Farm_V3_Visual_Investor_Board.pdf",
    filesize: "3.5 MB",
    filetype: "PDF",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 2 Registered",
    requiredRole: "registered",
    downloadsCount: 37,
    executiveHighlights: [
      "Material board featuring local Segera stone, sustainable timber, and natural canvas",
      "Guest pavilion interior moodboards with private savannah viewing plunge pools",
      "Farm harvest larder and dining pavilion concept visuals",
      "Wellness deck and infinity pool integrated into indigenous acacia landscape"
    ],
  },
  {
    id: "doc-17",
    title: "Concept Storybook & Brand Vision",
    description: "Brand narrative exploring the journey from an integrated pastoral farm to a world-class destination agro-resort.",
    category: "Site and Development",
    filename: "Jonik_Ndovu_Farm_V3_Concept_Storybook.docx",
    filesize: "38.7 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 2 Registered",
    requiredRole: "registered",
    downloadsCount: 16,
    executiveHighlights: [
      "The farm as the living classroom: farm-to-table culinary philosophy",
      "Harmonious coexistence of agriculture, wildlife corridors, and guest luxury",
      "Highland wellness concept: botanical therapies, dark-sky astronomy, and trail runs"
    ],
  },

  // 3. Financial Information
  {
    id: "doc-07",
    title: "10-Year Illustrative Financial Model",
    description: "Dynamic spreadsheet with 10-year pro-forma statements, room yield modeling, departmental opex build-ups, and scenario toggles.",
    category: "Financial Information",
    filename: "Jonik_Ndovu_Farm_V3_10_Year_Illustrative_Model.xlsx",
    filesize: "13.7 KB",
    filetype: "XLSX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 29,
    executiveHighlights: [
      "Interactive workbook with sheets: Read Me, Inputs, 10-Year Model, Sources & Uses, Scenarios",
      "Conservative base-case ramping to $3.33M gross revenue and $1.07M EBITDA in Year 10",
      "Downside Case (8.4% IRR, 1.9x MOIC) vs Upside Case (18.2% IRR, 3.4x MOIC)",
      "Unlevered project cash flow modeling with corporate tax and depreciation schedules"
    ],
  },
  {
    id: "doc-08",
    title: "Sources & Uses Verification Worksheet",
    description: "Turnkey schedule reconciling the US$2.4M capital target across land, infrastructure, construction, FF&E, and contingencies.",
    category: "Financial Information",
    filename: "Jonik_Ndovu_Farm_V3_Sources_Uses_Worksheet.pdf",
    filesize: "4.4 KB",
    filetype: "PDF",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 25,
    executiveHighlights: [
      "Full 12-line verified Sources & Uses budget reconciling the fixed US$2.4M capital target",
      "Explicit US$980,000 (40.8%) subtotal for circular utilities, productive agriculture, catering & farm shop",
      "Itemized allocations: Land $320k, Solar $160k, Biogas $80k, Irrigation $240k, Swales $120k, Animals $80k, Fleet $60k, Suites $720k, Catering/Shop $240k, FF&E $140k, Permits $120k, Contingency $120k",
      "Independent Quantity Surveyor (QS) certification milestone disbursement triggers"
    ],
  },

  // 4. Due Diligence
  {
    id: "doc-09",
    title: "Investor Data Room Index & Diligence Tracker",
    description: "Master index and tracking matrix of all legal, corporate, land title, planning, environmental, and technical diligence items.",
    category: "Due Diligence",
    filename: "Jonik_Ndovu_Farm_V3_Data_Room_Index.docx",
    filesize: "39.8 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 18,
    executiveHighlights: [
      "24 categorized diligence items across corporate, land, technical, design, and regulatory",
      "Clear status flags: official land registry searches verified, hydrogeological survey ready",
      "Document custodians, clearance tier mappings, and file formats",
      "Statutory NEMA EIA and County Government physical planning tracker"
    ],
  },
  {
    id: "doc-10",
    title: "Reconciliation & Diligence Status Checklist",
    description: "Operational and technical diligence status tracker including water survey, soil testing, planning permissions, and infrastructure scoping.",
    category: "Due Diligence",
    filename: "Jonik_Ndovu_Farm_V3_Reconciliation_Diligence_Checklist.docx",
    filesize: "37.7 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 14,
    executiveHighlights: [
      "Technical survey checklist: 0.5m contour topography, geotechnical bearing, solar simulation",
      "Water rights and borehole drilling permit status under Water Resources Authority (WRA)",
      "Road access easement verification connecting to the main Segera arterial route"
    ],
  },
  {
    id: "doc-11",
    title: "Investor Frequently Asked Questions (FAQ)",
    description: "Authoritative answers to 20 critical commercial questions regarding capital requirements, unit counts, water security, and land title.",
    category: "Due Diligence",
    filename: "Jonik_Ndovu_Farm_V3_Investor_FAQ.docx",
    filesize: "41.1 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 2 Registered",
    requiredRole: "registered",
    downloadsCount: 52,
    executiveHighlights: [
      "Definitive answers on why preliminary $10.8M / 24-unit models were superseded",
      "Question 16 breakdown: US$980k (40.8%) dedicated to greener ecosystem & productive infrastructure",
      "Water security: 10,000 L/hr solar borehole + 200,000L buffer = 45 days reserve",
      "100% off-grid clean energy: 60 kWp solar PV array + 120 kWh LiFePO4 batteries",
      "Exit strategy: trade sale, regional PE buyout, or dividend distributions"
    ],
  },

  // 5. Transaction & Investment Process
  {
    id: "doc-12",
    title: "Indicative Term-Sheet Framework",
    description: "Institutional discussion template outlining Series A Preferred terms, governance rights, Board seats, and Reserved Matters.",
    category: "Transaction and Investment Process",
    filename: "Jonik_Ndovu_Farm_V3_Term_Sheet_Framework.docx",
    filesize: "39.9 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 23,
    executiveHighlights: [
      "Series A Preferred Equity with 8.0% cumulative accrued coupon during construction",
      "Pre-money valuation of US$1.2M; post-money valuation of US$3.6M (66.7% investor equity)",
      "Reserved Matters schedule: 8 key corporate actions requiring 75% shareholder approval",
      "Information rights: Monthly KPI flash reports, quarterly financials, annual audited IFRS"
    ],
  },
  {
    id: "doc-13",
    title: "90-Day Capital-Raising Plan",
    description: "Structured capital formation timeline moving from initial outreach and lead-investor alignment to technical diligence and close.",
    category: "Transaction and Investment Process",
    filename: "Jonik_Ndovu_Farm_V3_90_Day_Capital_Raising_Plan.docx",
    filesize: "38.2 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 15,
    executiveHighlights: [
      "Phase 1 (Days 1–30): Lead investor identification and term sheet alignment",
      "Phase 2 (Days 31–60): Confirmatory legal, technical, and QS cost diligence",
      "Phase 3 (Days 61–90): Definitive legal execution, escrow funding, and close"
    ],
  },
  {
    id: "doc-14",
    title: "Investor Outreach Communication Guide",
    description: "Standardized outreach protocol and introduction framework for prospective co-investors, family offices, and strategic partners.",
    category: "Transaction and Investment Process",
    filename: "Jonik_Ndovu_Farm_V3_Investor_Outreach_Template.docx",
    filesize: "37.5 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 11,
    executiveHighlights: [
      "Tailored email messaging for institutional funds, family offices, and strategic operators",
      "Follow-up cadence and data room onboarding protocol",
      "Confidentiality agreement (NDA) workflow and tier upgrade instructions"
    ],
  },
  {
    id: "doc-16",
    title: "Investor Pitch Script & Founder Guide",
    description: "10-minute presentation narrative, slide-by-slide speaker notes, and anticipated Q&A speaking guide for project leadership.",
    category: "Transaction and Investment Process",
    filename: "Jonik_Ndovu_Farm_V3_Investor_Pitch_Script.docx",
    filesize: "39.5 KB",
    filetype: "DOCX",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 3 Approved",
    requiredRole: "approved",
    downloadsCount: 17,
    executiveHighlights: [
      "Word-for-word opening hook addressing the owned land starting asset",
      "Compelling transition from traditional high-overhead safaris to agro-resort hospitality",
      "Direct talking points for explaining the $2.4M budget discipline and 14.8% IRR"
    ],
  },
  {
    id: "doc-15",
    title: "V3 Master File Manifest & Notes",
    description: "Official release notes for Version 3.0 package, explicitly documenting superseded unit figures and validation protocols.",
    category: "Transaction and Investment Process",
    filename: "V3_File_Manifest.txt",
    filesize: "3.0 KB",
    filetype: "TXT",
    version: "V3.0",
    date: "October 2026",
    confidentiality: "Tier 2 Registered",
    requiredRole: "registered",
    downloadsCount: 27,
    executiveHighlights: [
      "Formal release notes harmonizing all project figures to US$2.4M and 12–15 units",
      "Full repository file manifest matching the physical disk storage structure"
    ],
  },
];

export const SOURCES_AND_USES_ITEMS = [
  {
    category: "Land Acquisition & Legal Transfer",
    allocationUSD: 320000,
    sharePct: "13.3%",
    notes: "Proposed acquisition of approximately 7 adjacent hectares, official title conveyancing, stamp duty, boundary surveys, and transfer pack.",
    evidenceRequired: "Executed sale agreement, clean title search, land valuation report, and legal completion pack.",
    status: "Negotiation & Diligence In Progress",
  },
  {
    category: "Solar-Hybrid Microgrid & Energy Storage",
    allocationUSD: 160000,
    sharePct: "6.7%",
    notes: "60 kWp ground solar PV array, 120 kWh LiFePO4 battery energy storage system, smart cluster inverters, and backup generator redundancy for 100% clean off-grid power.",
    evidenceRequired: "Solar yield simulation, equipment supplier warranties, and electrical engineering installation drawings.",
    status: "Engineering Sizing Complete",
  },
  {
    category: "Circular Biogas Generation & Waste-to-Energy",
    allocationUSD: 80000,
    sharePct: "3.3%",
    notes: "Commercial anaerobic biodigester converting livestock manure, catering organic waste, and crop residues into pressurized cooking gas and organic bio-fertilizer.",
    evidenceRequired: "Biogas technical sizing study, bio-digester contractor quote, and emissions reduction certificate.",
    status: "System Specification Active",
  },
  {
    category: "Hydrology, Solar Borehole & Smart Drip Irrigation",
    allocationUSD: 240000,
    sharePct: "10.0%",
    notes: "Deep solar submersible borehole (10k L/hr), 200,000L storage tanks (150kL raw + 50kL potable), pressure-compensating drip irrigation across 5.3 ha, and reed-bed greywater recycling.",
    evidenceRequired: "Hydrogeological survey report, WRA drilling permit, and irrigation schematic.",
    status: "Hydrogeological Survey Prepared",
  },
  {
    category: "Farmland Landscaping, Contour Earthworks & Agroforestry",
    allocationUSD: 120000,
    sharePct: "5.0%",
    notes: "Keyline contour swales for soil moisture retention, agroforestry windbreaks with indigenous species, productive fruit orchards (citrus, avocado, macadamia), and organic soil conditioning.",
    evidenceRequired: "Landscape architect concept drawings, soil laboratory assay, and agroforestry nursery procurement contract.",
    status: "Contour Layout Mapped",
  },
  {
    category: "Animal Structures, Rotational Paddocks & Dairy Equipment",
    allocationUSD: 80000,
    sharePct: "3.3%",
    notes: "Sheltered rotational sheep paddocks, ethical free-range poultry houses, solarized milking dairy hygiene station, and apiary bee sanctuaries.",
    evidenceRequired: "Livestock veterinary housing brief, fencing contractor tender, and apiary specification.",
    status: "Design Brief Finalized",
  },
  {
    category: "Farm Machinery & Electric Agricultural Utility Fleet",
    allocationUSD: 60000,
    sharePct: "2.5%",
    notes: "Compact low-impact farm tractors, sub-soilers, organic compost spreaders, solar-powered mechanical weeders, and zero-emission electric farm utility carts.",
    evidenceRequired: "Machinery supplier quotation sheets and maintenance service level agreement.",
    status: "Equipment Schedule Prepared",
  },
  {
    category: "Boutique Guest Pavilions (12–15 Units) & Wellness Deck",
    allocationUSD: 720000,
    sharePct: "30.0%",
    notes: "10 deluxe savannah suites (75 sqm), 3 family farm villas (125 sqm), arrival reception lounge, and solar-heated wellness pool using local stone, cedar, and canvas.",
    evidenceRequired: "Quantity Surveyor cost plan, architectural construction drawings, and bill of quantities.",
    status: "Concept Design & QS Benchmarking",
  },
  {
    category: "Commercial Catering Kitchen & Farm Produce Retail Shop",
    allocationUSD: 240000,
    sharePct: "10.0%",
    notes: "Farm-to-fork commercial kitchen, artisanal bakery, solar cold storage, curing larder, live-fire dining, and on-site farm gate retail shop for organic produce, honey, and oils.",
    evidenceRequired: "Commercial kitchen MEP drawings, public health food safety compliance pathway, and retail shop fixtures schedule.",
    status: "Kitchen & Retail Layout Planned",
  },
  {
    category: "FF&E, OS&E & Converted Safari Vehicles",
    allocationUSD: 140000,
    sharePct: "5.8%",
    notes: "Artisan interior stone and cedar furnishings, bespoke organic linens, dining table fixtures, and 1 custom-converted silent game-viewing vehicle.",
    evidenceRequired: "Interior designer specification schedule and trade supplier quotation sheets.",
    status: "Moodboard Specification",
  },
  {
    category: "Professional Fees, NEMA & Regulatory Permitting",
    allocationUSD: 120000,
    sharePct: "5.0%",
    notes: "NEMA Environmental & Social Impact Assessment licensing, County Government change-of-user fees, architectural, structural, and legal retainers.",
    evidenceRequired: "NEMA project report submission, County planning pre-consultation, and consultant agreements.",
    status: "Statutory Approvals Matrix Active",
  },
  {
    category: "Pre-Opening Working Capital & Construction Contingency",
    allocationUSD: 120000,
    sharePct: "5.0%",
    notes: "Pre-opening hospitality & agricultural staff training, brand launch marketing, initial working capital runway, and ring-fenced construction contingency buffer.",
    evidenceRequired: "Pre-opening operating budget and QS recommended contingency escrow account.",
    status: "Financial Model Reconciled",
  },
];
