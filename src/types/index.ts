export type UserRole = "public" | "registered" | "approved" | "admin";

export type InvestorCategory =
  | "Private Investor"
  | "Family Office or Investment Company"
  | "Hospitality or Strategic Investor"
  | "Institutional Investor"
  | "Professional Adviser"
  | "Other";

export type InvestmentInterest =
  | "Equity"
  | "Debt or Structured Financing"
  | "Joint Venture or Strategic Partnership"
  | "Exploring Options";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  passwordSalt?: string;
  authProvider?: "credentials" | "google";
  organization?: string;
  country?: string;
  role: UserRole;
  category?: InvestorCategory;
  interest?: InvestmentInterest;
  indicativeRange?: string;
  websiteOrLinkedin?: string;
  status: "active" | "suspended" | "pending";
  emailVerified?: boolean;
  verificationCode?: string;
  termsAccepted?: boolean;
  termsAcceptedAt?: string;
  profileCompleted?: boolean;
  ndaAccepted?: boolean;
  ndaAcceptedAt?: string;
  diligenceRequestedAt?: string;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  notes?: string;
}

export type DocumentCategory =
  | "Investment Overview"
  | "Site and Development"
  | "Financial Information"
  | "Due Diligence"
  | "Transaction and Investment Process";

export type ConfidentialityLevel = "Public" | "Tier 2 Registered" | "Tier 3 Approved";

export interface DiligenceDocument {
  id: string;
  title: string;
  description: string;
  category: DocumentCategory;
  filename: string;
  filesize: string;
  filetype: "DOCX" | "PDF" | "XLSX" | "PPTX" | "TXT";
  version: string;
  date: string;
  confidentiality: ConfidentialityLevel;
  requiredRole: UserRole; // 'registered', 'approved', 'admin'
  downloadsCount: number;
  executiveHighlights?: string[];
}

export interface AccessRequest {
  id: string;
  fullName: string;
  businessEmail: string;
  organization: string;
  country: string;
  category: InvestorCategory;
  interest: InvestmentInterest;
  indicativeRange?: string;
  websiteOrLinkedin?: string;
  message?: string;
  privacyAccepted: boolean;
  emailVerified?: boolean;
  status: "pending" | "approved" | "rejected";
  assignedRole?: UserRole;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface InvestorInquiry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  type: "General Question" | "Meeting Request" | "Due Diligence Request" | "Term Sheet Discussion";
  message: string;
  preferredDate?: string;
  status: "new" | "read" | "replied" | "in_review" | "answered";
  createdAt: string;
  response?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: UserRole;
  action:
    | "USER_LOGIN"
    | "USER_LOGOUT"
    | "ACCESS_REQUEST_SUBMITTED"
    | "EMAIL_VERIFIED"
    | "ACCESS_REQUEST_APPROVED"
    | "ACCESS_REQUEST_REJECTED"
    | "USER_ROLE_CHANGED"
    | "USER_SUSPENDED"
    | "DOCUMENT_VIEWED"
    | "DOCUMENT_DOWNLOADED"
    | "INQUIRY_SUBMITTED"
    | "INQUIRY_RESPONDED"
    | "INQUIRY_STATUS_UPDATED"
    | "CAMPAIGN_WINDOW_UPDATED"
    | "USER_REGISTERED"
    | "PASSWORD_CHANGED"
    | "ADMIN_LOGIN_SUCCESS"
    | "ADMIN_LOGIN_FAILED"
    | "TIER_UPGRADE_REQUESTED"
    | "TIER_UPGRADE_APPROVED";
  targetResource?: string;
  details: string;
  ipAddress?: string;
}

export type CampaignRoundStatus = "active" | "under_review" | "closed" | "extended";

export interface CampaignWindowConfig {
  roundName: string;
  closingDate: string; // ISO string, e.g. "2026-12-15T23:59:59.000Z"
  status: CampaignRoundStatus;
  enabled: boolean;
  targetCapital: string; // e.g. "US$2.4 Million"
  institutionalNote: string;
  lastUpdated: string;
  updatedBy: string;
}

