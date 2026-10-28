import fs from "fs";
import path from "path";
import { User, AccessRequest, DiligenceDocument, InvestorInquiry, AuditEvent, UserRole, CampaignWindowConfig } from "@/types";
import { INITIAL_DOCUMENTS } from "@/data/projectData";

interface DBData {
  users: User[];
  accessRequests: AccessRequest[];
  documents: DiligenceDocument[];
  inquiries: InvestorInquiry[];
  auditLogs: AuditEvent[];
  campaignWindow?: CampaignWindowConfig;
}

const DB_PATH = path.join(process.cwd(), "server-storage", "db.json");

const SEED_USERS: User[] = [
  {
    id: "usr-admin",
    email: "admin@jonikndovufarm.com",
    name: "Jonik Admin",
    organization: "Jonik Ndovu Farm Management",
    country: "Kenya",
    role: "admin",
    passwordHash: "12aa80b677752250a3aceed4c69114f73dc0d4cfe3f2786ccf9276d26c57f9f69680e3e3612d950edf8eab4842057ec5fd95441e2476d8af143b982c68ecfec6",
    passwordSalt: "d9ca3553daf2747c09c77e0513e05a9a",
    authProvider: "credentials",
    status: "active",
    createdAt: "2026-10-01T09:00:00Z",
    notes: "Platform Super Administrator",
  },
  {
    id: "usr-approved",
    email: "investor.approved@example.com",
    name: "Marcus Vance",
    organization: "Highland Hospitality Partners",
    country: "United Kingdom",
    role: "approved",
    category: "Hospitality or Strategic Investor",
    interest: "Equity",
    indicativeRange: "$500,000 – $1,000,000",
    passwordHash: "2220e500278d07715332f45eb93f692bcdf4c288cbb1391adf5610ee27a8de2ce1096bdbf84b1af5c74de57164891e13bdb774781a5d9ec7e9d09c50ba59497c",
    passwordSalt: "b4d0994939d361998041c37ad87e39d6",
    authProvider: "credentials",
    status: "active",
    ndaAccepted: true,
    ndaAcceptedAt: "2026-10-06T14:20:00Z",
    createdAt: "2026-10-05T11:30:00Z",
    approvedAt: "2026-10-06T14:20:00Z",
    approvedBy: "admin@jonikndovufarm.com",
    notes: "Verified hospitality private equity investor; full Tier 3 access granted.",
  },
  {
    id: "usr-registered",
    email: "investor.registered@example.com",
    name: "Elena Rostova",
    organization: "Rostova Capital Advisory",
    country: "Switzerland",
    role: "registered",
    category: "Family Office or Investment Company",
    interest: "Joint Venture or Strategic Partnership",
    indicativeRange: "$250,000 – $500,000",
    passwordHash: "0f4989bb3a1a1258784560a158d4c4bcca0f775258673455850fb7dd5319c9c31dcf0e071d74552a74f07e910d2939d517f4680689256502c4fe292854c36af8",
    passwordSalt: "06ad3dd82722524fc299f7d56fd299ed",
    authProvider: "credentials",
    status: "active",
    createdAt: "2026-10-18T16:45:00Z",
    notes: "Registered portal user; pending administrative diligence interview for Tier 3 upgrade.",
  },
];

const SEED_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: "req-01",
    fullName: "Amina Odhiambo",
    businessEmail: "amina.o@lakebasinholdings.co.ke",
    organization: "Lake Basin Holdings",
    country: "Kenya",
    category: "Private Investor",
    interest: "Equity",
    indicativeRange: "$250,000 – $500,000",
    message: "Interested in the agro-tourism synergy and expansion of the 7 ha parcel. Would like to review the 10-year financial model.",
    privacyAccepted: true,
    status: "pending",
    createdAt: "2026-10-23T14:15:00Z",
  },
  {
    id: "req-02",
    fullName: "Dr. Henk van der Merwe",
    businessEmail: "henk@africagreencapital.com",
    organization: "Africa Green Capital",
    country: "South Africa",
    category: "Institutional Investor",
    interest: "Debt or Structured Financing",
    indicativeRange: "$1,000,000+",
    message: "Evaluating structured debt and green hospitality funding for East African biodiversity corridors.",
    privacyAccepted: true,
    status: "pending",
    createdAt: "2026-10-24T10:05:00Z",
  },
  {
    id: "req-03",
    fullName: "Marcus Vance",
    businessEmail: "investor.approved@example.com",
    organization: "Highland Hospitality Partners",
    country: "United Kingdom",
    category: "Hospitality or Strategic Investor",
    interest: "Equity",
    indicativeRange: "$500,000 – $1,000,000",
    message: "Approved Tier 3 profile.",
    privacyAccepted: true,
    status: "approved",
    assignedRole: "approved",
    createdAt: "2026-10-05T11:30:00Z",
    reviewedAt: "2026-10-06T14:20:00Z",
    reviewedBy: "admin@jonikndovufarm.com",
  },
];

const SEED_AUDIT_LOGS: AuditEvent[] = [
  {
    id: "aud-01",
    timestamp: "2026-10-24T18:15:00Z",
    actorEmail: "admin@jonikndovufarm.com",
    actorRole: "admin",
    action: "USER_LOGIN",
    details: "Super Administrator signed in from management console.",
  },
  {
    id: "aud-02",
    timestamp: "2026-10-24T18:30:00Z",
    actorEmail: "investor.approved@example.com",
    actorRole: "approved",
    action: "DOCUMENT_DOWNLOADED",
    targetResource: "Jonik_Ndovu_Farm_V3_10_Year_Illustrative_Model.xlsx",
    details: "Downloaded 10-Year Illustrative Financial Model (XLSX).",
  },
  {
    id: "aud-03",
    timestamp: "2026-10-24T18:45:00Z",
    actorEmail: "amina.o@lakebasinholdings.co.ke",
    actorRole: "public",
    action: "ACCESS_REQUEST_SUBMITTED",
    details: "Submitted registration request for Tier 3 accredited investor access.",
  },
];

const DEFAULT_CAMPAIGN_WINDOW: CampaignWindowConfig = {
  roundName: "Phase 1 Lead Partner & Syndicate Allocation",
  closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  status: "active",
  enabled: true,
  targetCapital: "US$2.4 Million",
  institutionalNote: "Structured timetable for lead investor diligence and indicative syndicate allocations prior to capital lock.",
  lastUpdated: new Date().toISOString(),
  updatedBy: "system",
};

function getDB(): DBData {
  if (!fs.existsSync(DB_PATH)) {
    const initialData: DBData = {
      users: SEED_USERS,
      accessRequests: SEED_ACCESS_REQUESTS,
      documents: INITIAL_DOCUMENTS,
      inquiries: [],
      auditLogs: SEED_AUDIT_LOGS,
      campaignWindow: DEFAULT_CAMPAIGN_WINDOW,
    };
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const parsed: DBData = JSON.parse(raw);
    let mutated = false;

    if (!parsed.campaignWindow) {
      parsed.campaignWindow = DEFAULT_CAMPAIGN_WINDOW;
      mutated = true;
    }

    // Migrate any users that lack password hashes
    parsed.users.forEach((u) => {
      if (!u.passwordHash) {
        if (u.role === "admin" || u.email === "admin@jonikndovufarm.com") {
          u.passwordHash = "12aa80b677752250a3aceed4c69114f73dc0d4cfe3f2786ccf9276d26c57f9f69680e3e3612d950edf8eab4842057ec5fd95441e2476d8af143b982c68ecfec6";
          u.passwordSalt = "d9ca3553daf2747c09c77e0513e05a9a";
        } else if (u.role === "approved") {
          u.passwordHash = "2220e500278d07715332f45eb93f692bcdf4c288cbb1391adf5610ee27a8de2ce1096bdbf84b1af5c74de57164891e13bdb774781a5d9ec7e9d09c50ba59497c";
          u.passwordSalt = "b4d0994939d361998041c37ad87e39d6";
        } else {
          u.passwordHash = "0f4989bb3a1a1258784560a158d4c4bcca0f775258673455850fb7dd5319c9c31dcf0e071d74552a74f07e910d2939d517f4680689256502c4fe292854c36af8";
          u.passwordSalt = "06ad3dd82722524fc299f7d56fd299ed";
        }
        u.authProvider = u.authProvider || "credentials";
        mutated = true;
      }
    });

    if (mutated) {
      saveDB(parsed);
    }
    return parsed;
  } catch (err) {
    console.error("Error reading db.json, returning empty defaults:", err);
    return {
      users: SEED_USERS,
      accessRequests: SEED_ACCESS_REQUESTS,
      documents: INITIAL_DOCUMENTS,
      inquiries: [],
      auditLogs: SEED_AUDIT_LOGS,
      campaignWindow: DEFAULT_CAMPAIGN_WINDOW,
    };
  }
}

function saveDB(data: DBData): void {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  getUsers: (): User[] => getDB().users,
  getUserByEmail: (email: string): User | undefined =>
    getDB().users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
  getUserById: (id: string): User | undefined => getDB().users.find((u) => u.id === id),
  saveUser: (user: User): void => {
    const data = getDB();
    const idx = data.users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      data.users[idx] = user;
    } else {
      data.users.push(user);
    }
    saveDB(data);
  },
  updateUserRole: (userId: string, role: UserRole, status: "active" | "suspended" = "active"): void => {
    const data = getDB();
    const user = data.users.find((u) => u.id === userId);
    if (user) {
      user.role = role;
      user.status = status;
      saveDB(data);
    }
  },

  deleteUser: (userId: string): boolean => {
    const data = getDB();
    const user = data.users.find((u) => u.id === userId);
    if (!user) return false;

    data.users = data.users.filter((u) => u.id !== userId);
    data.accessRequests = data.accessRequests.filter(
      (r) => r.businessEmail.toLowerCase() !== user.email.toLowerCase()
    );
    data.inquiries = data.inquiries.filter(
      (i) => i.userId !== userId && i.userEmail.toLowerCase() !== user.email.toLowerCase()
    );
    saveDB(data);
    return true;
  },

  getAccessRequests: (): AccessRequest[] => getDB().accessRequests,
  saveAccessRequest: (req: AccessRequest): void => {
    const data = getDB();
    const idx = data.accessRequests.findIndex((r) => r.id === req.id);
    if (idx >= 0) {
      data.accessRequests[idx] = req;
    } else {
      data.accessRequests.unshift(req);
    }
    saveDB(data);
  },

  getDocuments: (): DiligenceDocument[] => getDB().documents,
  getDocumentById: (id: string): DiligenceDocument | undefined =>
    getDB().documents.find((d) => d.id === id),
  saveDocument: (doc: DiligenceDocument): void => {
    const data = getDB();
    const idx = data.documents.findIndex((d) => d.id === doc.id);
    if (idx >= 0) {
      data.documents[idx] = doc;
    } else {
      data.documents.push(doc);
    }
    saveDB(data);
  },
  deleteDocument: (id: string): boolean => {
    const data = getDB();
    const initLen = data.documents.length;
    data.documents = data.documents.filter((d) => d.id !== id);
    if (data.documents.length !== initLen) {
      saveDB(data);
      return true;
    }
    return false;
  },
  incrementDocumentDownload: (id: string): void => {
    const data = getDB();
    const doc = data.documents.find((d) => d.id === id);
    if (doc) {
      doc.downloadsCount = (doc.downloadsCount || 0) + 1;
      saveDB(data);
    }
  },

  getInquiries: (): InvestorInquiry[] => getDB().inquiries,
  saveInquiry: (inquiry: InvestorInquiry): void => {
    const data = getDB();
    data.inquiries.unshift(inquiry);
    saveDB(data);
  },
  updateInquiryStatus: (id: string, status: "read" | "replied"): InvestorInquiry | null => {
    const data = getDB();
    const inquiry = data.inquiries.find((i) => i.id === id);
    if (!inquiry) return null;
    inquiry.status = status;
    saveDB(data);
    return inquiry;
  },

  getAuditLogs: (): AuditEvent[] => getDB().auditLogs,
  addAuditLog: (event: Omit<AuditEvent, "id" | "timestamp">): void => {
    const data = getDB();
    const newEvent: AuditEvent = {
      id: "aud-" + Date.now(),
      timestamp: new Date().toISOString(),
      ...event,
    };
    data.auditLogs.unshift(newEvent);
    if (data.auditLogs.length > 500) {
      data.auditLogs = data.auditLogs.slice(0, 500);
    }
    saveDB(data);
  },

  getCampaignWindow: (): CampaignWindowConfig => {
    const data = getDB();
    return data.campaignWindow || DEFAULT_CAMPAIGN_WINDOW;
  },

  updateCampaignWindow: (
    updates: Partial<CampaignWindowConfig>,
    updatedBy: string
  ): CampaignWindowConfig => {
    const data = getDB();
    const current = data.campaignWindow || DEFAULT_CAMPAIGN_WINDOW;
    const updated: CampaignWindowConfig = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
      updatedBy,
    };
    data.campaignWindow = updated;
    saveDB(data);

    // Audit log
    db.addAuditLog({
      actorEmail: updatedBy,
      actorRole: "admin",
      action: "CAMPAIGN_WINDOW_UPDATED",
      targetResource: "CampaignWindowConfig",
      details: `Updated campaign window: closingDate=${updated.closingDate}, status=${updated.status}, enabled=${updated.enabled}`,
    });

    return updated;
  },

  requestTierUpgrade: (userId: string, ndaAccepted: boolean): User | null => {
    const data = getDB();
    const user = data.users.find((u) => u.id === userId);
    if (!user) return null;

    user.ndaAccepted = ndaAccepted;
    user.ndaAcceptedAt = new Date().toISOString();
    user.diligenceRequestedAt = new Date().toISOString();
    saveDB(data);

    // Also update or create an AccessRequest record so admin can review
    const req = data.accessRequests.find((r) => r.businessEmail.toLowerCase() === user.email.toLowerCase());
    if (req) {
      req.status = "pending";
      req.message = (req.message ? req.message + " | " : "") + "Requested Tier 3 Diligence Access & Accepted NDA.";
      saveDB(data);
    } else {
      const newReq: AccessRequest = {
        id: "req-" + Date.now(),
        fullName: user.name,
        businessEmail: user.email,
        organization: user.organization || "Investor Syndicate",
        country: user.country || "International",
        category: user.category || "Private Investor",
        interest: user.interest || "Equity",
        indicativeRange: user.indicativeRange || "US$250,000 – US$500,000",
        message: "Requested Tier 3 Diligence Access & Accepted NDA via portal.",
        privacyAccepted: true,
        emailVerified: true,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      db.saveAccessRequest(newReq);
    }

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "TIER_UPGRADE_REQUESTED",
      targetResource: user.email,
      details: `Investor ${user.name} (${user.email}) requested Tier 3 diligence upgrade and executed digital NDA.`,
    });

    return user;
  },

  upgradeUserToApproved: (userId: string, approvedBy: string): User | null => {
    const data = getDB();
    const user = data.users.find((u) => u.id === userId);
    if (!user) return null;

    user.role = "approved";
    user.approvedAt = new Date().toISOString();
    user.approvedBy = approvedBy;
    saveDB(data);

    // Mark corresponding access request as approved
    const req = data.accessRequests.find((r) => r.businessEmail.toLowerCase() === user.email.toLowerCase());
    if (req) {
      req.status = "approved";
      req.assignedRole = "approved";
      req.reviewedAt = new Date().toISOString();
      req.reviewedBy = approvedBy;
      saveDB(data);
    }

    db.addAuditLog({
      actorEmail: approvedBy,
      actorRole: "admin",
      action: "TIER_UPGRADE_APPROVED",
      targetResource: user.email,
      details: `Administrator approved Tier 3 diligence access for ${user.name} (${user.email}). Full data room unlocked.`,
    });

    return user;
  },

  isAuthorizedAdminEmail: (email: string): boolean => {
    if (!email || typeof email !== "string") return false;
    const normalized = email.trim().toLowerCase();

    // 1. Check ADMIN_EMAILS environment variable (comma-separated list of emails)
    const envAdmins = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (envAdmins.includes(normalized)) return true;

    // 2. Default platform admin
    if (normalized === "admin@jonikndovufarm.com") return true;

    // 3. Database check: any user with role === "admin" and not suspended
    const data = getDB();
    const existing = data.users.find(
      (u) => u.email.toLowerCase() === normalized && u.role === "admin" && u.status !== "suspended"
    );
    return Boolean(existing);
  },

  ensureAdminUser: (
    email: string,
    name?: string,
    authProvider: "google" | "credentials" = "google"
  ): User => {
    const data = getDB();
    const normalized = email.trim().toLowerCase();
    let user = data.users.find((u) => u.email.toLowerCase() === normalized);

    if (user) {
      user.role = "admin";
      user.status = "active";
      user.authProvider = authProvider;
      user.emailVerified = true;
      if (name && (!user.name || user.name === "Google Verified Investor")) {
        user.name = name;
      }
    } else {
      user = {
        id: "usr-admin-" + Date.now(),
        email: normalized,
        name: name || "Jonik Administrator",
        organization: "Jonik Ndovu Farm Management",
        country: "Kenya",
        role: "admin",
        status: "active",
        createdAt: new Date().toISOString(),
        notes: "Authorized Platform Administrator",
        authProvider,
        emailVerified: true,
      };
      data.users.push(user);
    }

    saveDB(data);
    return user;
  },
};



