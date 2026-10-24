import fs from "fs";
import path from "path";
import { User, AccessRequest, DiligenceDocument, InvestorInquiry, AuditEvent, UserRole } from "@/types";
import { INITIAL_DOCUMENTS } from "@/data/projectData";

interface DBData {
  users: User[];
  accessRequests: AccessRequest[];
  documents: DiligenceDocument[];
  inquiries: InvestorInquiry[];
  auditLogs: AuditEvent[];
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
    status: "active",
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

function getDB(): DBData {
  if (!fs.existsSync(DB_PATH)) {
    const initialData: DBData = {
      users: SEED_USERS,
      accessRequests: SEED_ACCESS_REQUESTS,
      documents: INITIAL_DOCUMENTS,
      inquiries: [],
      auditLogs: SEED_AUDIT_LOGS,
    };
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json, returning empty defaults:", err);
    return {
      users: SEED_USERS,
      accessRequests: SEED_ACCESS_REQUESTS,
      documents: INITIAL_DOCUMENTS,
      inquiries: [],
      auditLogs: SEED_AUDIT_LOGS,
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
};
