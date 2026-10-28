"use client";

import { useState, useEffect } from "react";
import { DiligenceDocument, DocumentCategory, ConfidentialityLevel, UserRole } from "@/types";
import {
  FileText,
  Download,
  ShieldCheck,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  Lock,
  Layers,
} from "lucide-react";

const CATEGORIES: DocumentCategory[] = [
  "Investment Overview",
  "Site and Development",
  "Financial Information",
  "Due Diligence",
  "Transaction and Investment Process",
];

const CLASSIFICATIONS: { level: ConfidentialityLevel; defaultRole: UserRole }[] = [
  { level: "Public", defaultRole: "public" },
  { level: "Tier 2 Registered", defaultRole: "registered" },
  { level: "Tier 3 Approved", defaultRole: "approved" },
];

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DiligenceDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedClassification, setSelectedClassification] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DiligenceDocument | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState<DocumentCategory>("Investment Overview");
  const [formClassification, setFormClassification] = useState<ConfidentialityLevel>("Tier 2 Registered");
  const [formRole, setFormRole] = useState<UserRole>("registered");
  const [formVersion, setFormVersion] = useState("V1.0");
  const [formDate, setFormDate] = useState("October 2026");
  const [formHighlights, setFormHighlights] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);

  const fetchDocs = () => {
    setLoading(true);
    fetch("/api/admin/documents")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch documents");
        return res.json();
      })
      .then((data) => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback to portal endpoint if needed
        fetch("/api/portal/documents")
          .then((r) => r.json())
          .then((d) => setDocuments(d.documents || []))
          .finally(() => setLoading(false));
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const openCreateModal = () => {
    setEditingDoc(null);
    setFormTitle("");
    setFormDescription("");
    setFormCategory("Investment Overview");
    setFormClassification("Tier 2 Registered");
    setFormRole("registered");
    setFormVersion("V1.0");
    setFormDate(new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }));
    setFormHighlights("");
    setFormFile(null);
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (doc: DiligenceDocument) => {
    setEditingDoc(doc);
    setFormTitle(doc.title);
    setFormDescription(doc.description || "");
    setFormCategory(doc.category);
    setFormClassification(doc.confidentiality);
    setFormRole(doc.requiredRole);
    setFormVersion(doc.version || "V1.0");
    setFormDate(doc.date || "October 2026");
    setFormHighlights((doc.executiveHighlights || []).join("\n"));
    setFormFile(null);
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleClassificationChange = (level: ConfidentialityLevel) => {
    setFormClassification(level);
    const matched = CLASSIFICATIONS.find((c) => c.level === level);
    if (matched) {
      setFormRole(matched.defaultRole);
    }
  };

  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setModalError("Document title is required.");
      return;
    }

    if (!editingDoc && !formFile) {
      setModalError("Please select a file to upload for the new document.");
      return;
    }

    setIsSaving(true);
    setModalError(null);

    try {
      const formData = new FormData();
      if (editingDoc) {
        formData.append("id", editingDoc.id);
      }
      formData.append("title", formTitle.trim());
      formData.append("description", formDescription.trim());
      formData.append("category", formCategory);
      formData.append("confidentiality", formClassification);
      formData.append("requiredRole", formRole);
      formData.append("version", formVersion.trim());
      formData.append("date", formDate.trim());

      const highlights = formHighlights
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      formData.append("executiveHighlights", JSON.stringify(highlights));

      if (formFile) {
        formData.append("file", formFile);
      }

      const res = await fetch("/api/admin/documents", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save document.");
      }

      setIsModalOpen(false);
      setFeedbackMsg({
        type: "success",
        text: data.message || "Document saved successfully.",
      });
      fetchDocs();
    } catch (err: any) {
      setModalError(err.message || "Error saving document.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDocument = async (doc: DiligenceDocument) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete '${doc.title}' (${doc.filename}) from the data room?\n\nThis will remove the file and all associated access permissions.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch("/api/admin/documents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: doc.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete document.");
      }

      setFeedbackMsg({
        type: "success",
        text: data.message || `Deleted '${doc.title}'.`,
      });
      fetchDocs();
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: err.message || "Could not delete document.",
      });
    }
  };

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;

    const matchesClassification =
      selectedClassification === "all" || doc.confidentiality === selectedClassification;

    return matchesSearch && matchesCategory && matchesClassification;
  });

  const totalDownloads = documents.reduce((sum, d) => sum + (d.downloadsCount || 0), 0);
  const tier3Count = documents.filter((d) => d.confidentiality === "Tier 3 Approved").length;
  const tier2Count = documents.filter((d) => d.confidentiality === "Tier 2 Registered").length;
  const publicCount = documents.filter((d) => d.confidentiality === "Public").length;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Title & Actions Header */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
            Data Room Index & Governance
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Document Registry & Access Controls
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-2xl leading-relaxed">
            Manage data room assets, security classifications, and access tiers. Add new collateral, replace existing versions, or retire outdated packages in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchDocs}
            className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2"
            title="Refresh document list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={openCreateModal}
            className="luxury-btn !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-4 border flex items-center justify-between transition-all ${
            feedbackMsg.type === "success"
              ? "bg-forest/5 border-forest/30 text-forest"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center space-x-2 text-xs">
            {feedbackMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span className="font-medium">{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-xs hover:opacity-70 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 border border-sand/50 shadow-subtle">
          <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 block">
            Total Registry Assets
          </span>
          <span className="font-serif text-2xl font-bold text-forest mt-1 block">
            {documents.length}
          </span>
          <span className="text-[10px] text-charcoal/50 mt-1 block">Across 5 Categories</span>
        </div>

        <div className="bg-white p-4 border border-sand/50 shadow-subtle">
          <span className="text-[10px] uppercase font-mono tracking-wider text-earth font-bold block">
            Tier 3 Diligence (Protected)
          </span>
          <span className="font-serif text-2xl font-bold text-earth mt-1 block">
            {tier3Count}
          </span>
          <span className="text-[10px] text-charcoal/50 mt-1 block">Requires NDA & Approval</span>
        </div>

        <div className="bg-white p-4 border border-sand/50 shadow-subtle">
          <span className="text-[10px] uppercase font-mono tracking-wider text-forest font-bold block">
            Tier 2 Registered
          </span>
          <span className="font-serif text-2xl font-bold text-forest mt-1 block">
            {tier2Count}
          </span>
          <span className="text-[10px] text-charcoal/50 mt-1 block">Registered Investors</span>
        </div>

        <div className="bg-white p-4 border border-sand/50 shadow-subtle">
          <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 block">
            Public Overview
          </span>
          <span className="font-serif text-2xl font-bold text-charcoal mt-1 block">
            {publicCount}
          </span>
          <span className="text-[10px] text-charcoal/50 mt-1 block">Open Teaser Access</span>
        </div>

        <div className="bg-white p-4 border border-sand/50 shadow-subtle col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 block">
            Verified Downloads
          </span>
          <span className="font-serif text-2xl font-bold text-forest mt-1 block">
            {totalDownloads}
          </span>
          <span className="text-[10px] text-charcoal/50 mt-1 block">Watermarked & Logged</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-sand/50 shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, filename or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-sand/60 focus:border-forest focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs border border-sand/60 px-3 py-2 bg-white text-forest focus:border-forest focus:outline-none"
          >
            <option value="all">All Categories ({documents.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({documents.filter((d) => d.category === cat).length})
              </option>
            ))}
          </select>

          <select
            value={selectedClassification}
            onChange={(e) => setSelectedClassification(e.target.value)}
            className="text-xs border border-sand/60 px-3 py-2 bg-white text-forest focus:border-forest focus:outline-none"
          >
            <option value="all">All Classifications</option>
            <option value="Tier 3 Approved">Tier 3 Approved ({tier3Count})</option>
            <option value="Tier 2 Registered">Tier 2 Registered ({tier2Count})</option>
            <option value="Public">Public ({publicCount})</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal/60 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-5 h-5 animate-spin text-forest" />
            <p>Loading document registry...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal/60">
            <FileText className="w-8 h-8 text-charcoal/30 mx-auto mb-2" />
            <p className="font-semibold text-forest">No documents match the filter criteria</p>
            <p className="text-[11px] text-charcoal/50 mt-1">Try resetting your search query or upload a new asset.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/20 text-forest uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5 border-b border-sand/30">Document Title & Filename</th>
                  <th className="p-3.5 border-b border-sand/30">Category</th>
                  <th className="p-3.5 border-b border-sand/30">Format / Size</th>
                  <th className="p-3.5 border-b border-sand/30">Classification</th>
                  <th className="p-3.5 border-b border-sand/30">Version & Date</th>
                  <th className="p-3.5 border-b border-sand/30 text-center">Downloads</th>
                  <th className="p-3.5 border-b border-sand/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-3.5 max-w-xs">
                      <span className="font-semibold text-forest block text-sm leading-snug">{doc.title}</span>
                      <span className="font-mono text-[10px] text-charcoal/60 block mt-0.5 truncate">
                        {doc.filename}
                      </span>
                      {doc.description && (
                        <p className="text-[11px] text-charcoal/60 line-clamp-1 mt-1">{doc.description}</p>
                      )}
                    </td>

                    <td className="p-3.5 whitespace-nowrap text-xs font-medium text-forest/90">
                      {doc.category}
                    </td>

                    <td className="p-3.5 whitespace-nowrap font-mono text-[11px]">
                      <span className="px-1.5 py-0.5 bg-sand/30 rounded text-[10px] font-bold text-forest">
                        {doc.filetype}
                      </span>{" "}
                      <span className="text-charcoal/60">{doc.filesize}</span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase font-bold tracking-wider rounded ${
                          doc.confidentiality === "Tier 3 Approved"
                            ? "bg-earth/15 text-earth border border-earth/30"
                            : doc.confidentiality === "Tier 2 Registered"
                            ? "bg-forest/10 text-forest border border-forest/30"
                            : "bg-charcoal/10 text-charcoal border border-charcoal/20"
                        }`}
                      >
                        {doc.confidentiality === "Tier 3 Approved" && <Lock className="w-2.5 h-2.5" />}
                        {doc.confidentiality}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap font-mono text-[11px] text-charcoal/70">
                      <span className="font-semibold text-forest">{doc.version || "V1.0"}</span>
                      <span className="block text-[10px] text-charcoal/50">{doc.date || "—"}</span>
                    </td>

                    <td className="p-3.5 text-center font-mono font-bold text-forest">
                      <span className="inline-block px-2 py-0.5 bg-sand/20 rounded">
                        {doc.downloadsCount || 0}
                      </span>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => openEditModal(doc)}
                          className="p-1.5 text-forest hover:bg-forest/10 rounded transition-colors"
                          title="Edit Document Details & Classification"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteDocument(doc)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog: Add / Edit Document */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-sand shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-6 border-b border-sand/40 flex items-center justify-between bg-sand/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-earth font-bold block">
                  {editingDoc ? "Document Management" : "New Collateral Registration"}
                </span>
                <h3 className="font-serif text-xl font-bold text-forest">
                  {editingDoc ? `Edit: ${editingDoc.title}` : "Upload & Register New Document"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-charcoal/50 hover:text-charcoal p-1 rounded hover:bg-sand/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveDocument} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block font-semibold text-forest mb-1">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 5-Year Pro-Forma Financial Model (Excel)"
                  className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none font-medium"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-forest mb-1">
                  Description / Synopsis
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief summary of document contents and investor utility..."
                  className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none"
                />
              </div>

              {/* Category & Security Classification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-forest mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as DocumentCategory)}
                    className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-forest mb-1">
                    Security Classification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formClassification}
                    onChange={(e) => handleClassificationChange(e.target.value as ConfidentialityLevel)}
                    className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none bg-white font-medium"
                  >
                    {CLASSIFICATIONS.map((c) => (
                      <option key={c.level} value={c.level}>
                        {c.level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Access Tier Role & Version / Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-forest mb-1">
                    Required Investor Tier <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none bg-white font-mono uppercase"
                  >
                    <option value="public">public (Public)</option>
                    <option value="registered">registered (Tier 2)</option>
                    <option value="approved">approved (Tier 3)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-forest mb-1">Version</label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    placeholder="e.g. V3.1"
                    className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-forest mb-1">Date</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g. October 2026"
                    className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="border border-dashed border-sand/80 p-4 bg-sand/5">
                <label className="block font-semibold text-forest mb-1.5 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Upload className="w-3.5 h-3.5 text-earth" />
                    <span>
                      {editingDoc
                        ? "Replace Document File (Optional)"
                        : "Upload Document File (.pdf, .xlsx, .docx, .pptx) *"}
                    </span>
                  </span>
                  {editingDoc && (
                    <span className="text-[10px] font-mono text-charcoal/50">
                      Current: {editingDoc.filename} ({editingDoc.filesize})
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.txt"
                  onChange={(e) => setFormFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-charcoal file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-forest file:text-sand hover:file:bg-forest/90 cursor-pointer"
                />
                <p className="text-[10px] text-charcoal/50 mt-1">
                  Supported formats: PDF, Microsoft Excel, Microsoft Word, PowerPoint, TXT. File will be securely watermarked upon investor download.
                </p>
              </div>

              {/* Executive Highlights */}
              <div>
                <label className="block font-semibold text-forest mb-1">
                  Key Executive Highlights (Optional — 1 bullet per line)
                </label>
                <textarea
                  rows={3}
                  value={formHighlights}
                  onChange={(e) => setFormHighlights(e.target.value)}
                  placeholder="Comprehensive financial model covering Phase 1 and 2&#10;Validated by external audit&#10;Key IRR and payback sensitivity tables"
                  className="w-full px-3 py-2 border border-sand/60 text-xs focus:border-forest focus:outline-none font-sans"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-sand/40 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 border border-sand/80 text-charcoal/80 hover:bg-sand/20 text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="luxury-btn !py-2 !px-5 text-xs tracking-wider flex items-center space-x-2 shadow-sm disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Document...</span>
                    </>
                  ) : (
                    <span>{editingDoc ? "Save Changes" : "Register Document"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
