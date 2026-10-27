"use client";

import { useState, useEffect } from "react";
import { DiligenceDocument } from "@/types";
import { FileText, Download, ShieldCheck, RefreshCw } from "lucide-react";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DiligenceDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = () => {
    setLoading(true);
    fetch("/api/portal/documents")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-red-800 font-bold block mb-1">
            Data Room Index
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Document Registry & Download Analytics
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            Monitor document files, security classifications, versions, and verified download counts across the 15 package assets.
          </p>
        </div>

        <button
          onClick={fetchDocs}
          className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Docs Table */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
        {loading ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">Loading document registry...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3.5 border-b border-sand/30">Document Title & Filename</th>
                  <th className="p-3.5 border-b border-sand/30">Category</th>
                  <th className="p-3.5 border-b border-sand/30">Type / Size</th>
                  <th className="p-3.5 border-b border-sand/30">Classification</th>
                  <th className="p-3.5 border-b border-sand/30">Required Tier</th>
                  <th className="p-3.5 border-b border-sand/30 text-right">Downloads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-3.5">
                      <span className="font-semibold text-forest block">{doc.title}</span>
                      <span className="font-mono text-[10px] text-charcoal/50 block">{doc.filename}</span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">{doc.category}</td>

                    <td className="p-3.5 whitespace-nowrap font-mono text-[11px]">
                      {doc.filetype} · {doc.filesize}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          doc.confidentiality === "Tier 3 Approved"
                            ? "bg-earth text-white"
                            : "bg-forest text-sand"
                        }`}
                      >
                        {doc.confidentiality}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap font-mono uppercase text-[10px]">
                      {doc.requiredRole}
                    </td>

                    <td className="p-3.5 text-right font-mono font-bold text-forest">
                      {doc.downloadsCount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
