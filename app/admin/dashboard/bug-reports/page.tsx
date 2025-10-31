"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { api } from "@/lib/api";
import type { BugReport } from "@/types/models";

export default function BugReportsPage() {
  const [reports, setReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminBugReports({
        status: statusFilter || undefined,
        severity: severityFilter || undefined,
        category: categoryFilter || undefined,
        search: searchQuery || undefined,
        limit: 100,
      });
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bug reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter, severityFilter, categoryFilter, searchQuery]);

  const handleResolve = async (reportId: string) => {
    if (!confirm("Marquer ce bug report comme résolu?")) return;
    try {
      await api.resolveBugReport(reportId, adminNotes);
      fetchReports();
      setSelectedReport(null);
      setAdminNotes("");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-500/10";
      case "high": return "text-orange-500 bg-orange-500/10";
      case "medium": return "text-yellow-500 bg-yellow-500/10";
      case "low": return "text-blue-500 bg-blue-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "text-red-500 bg-red-500/10";
      case "in-progress": return "text-blue-500 bg-blue-500/10";
      case "resolved": return "text-green-500 bg-green-500/10";
      case "closed": return "text-gray-500 bg-gray-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F4F4F4]">Bug Reports</h2>
          <p className="text-[#B0B3B8] text-sm">Gérer les signalements de bugs</p>
        </div>

        {/* Filters */}
        <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Statut</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Tous</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Sévérité</label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Tous</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Catégorie</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Tous</option>
                <option value="bug">Bug</option>
                <option value="crash">Crash</option>
                <option value="ui">UI</option>
                <option value="feature-request">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Recherche</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titre ou description..."
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Reports List */}
        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="space-y-3">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-[#F4F4F4] font-semibold mb-1">{report.title}</h3>
                      <p className="text-[#B0B3B8] text-sm line-clamp-2">{report.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#B0B3B8]">
                    <span>📁 {report.category}</span>
                    {report.appVersion && <span>📱 v{report.appVersion}</span>}
                    {report.userEmail && <span>✉️ {report.userEmail}</span>}
                    <span>🕐 {new Date(report.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[#B0B3B8]">Aucun bug report</div>
            )}
          </div>
        )}

        {/* Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto p-4">
            <div className="bg-[#2C2F38] rounded-xl border border-white/10 w-full max-w-3xl my-8">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#F4F4F4] mb-2">{selectedReport.title}</h2>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(selectedReport.severity)}`}>
                        {selectedReport.severity}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-semibold text-purple-500 bg-purple-500/10">
                        {selectedReport.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-[#B0B3B8] hover:text-[#F4F4F4] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F4F4F4] mb-2">Description</h3>
                    <p className="text-[#B0B3B8] text-sm whitespace-pre-wrap">{selectedReport.description}</p>
                  </div>

                  {selectedReport.errorStack && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F4F4] mb-2">Error Stack</h3>
                      <pre className="text-[#B0B3B8] text-xs bg-[#1B1F3B] p-3 rounded overflow-x-auto">
                        {selectedReport.errorStack}
                      </pre>
                    </div>
                  )}

                  {selectedReport.deviceInfo && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F4F4] mb-2">Device Info</h3>
                      <pre className="text-[#B0B3B8] text-xs bg-[#1B1F3B] p-3 rounded overflow-x-auto">
                        {JSON.stringify(selectedReport.deviceInfo, null, 2)}
                      </pre>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedReport.userEmail && (
                      <div>
                        <span className="text-[#B0B3B8]">Email:</span>
                        <span className="text-[#F4F4F4] ml-2">{selectedReport.userEmail}</span>
                      </div>
                    )}
                    {selectedReport.appVersion && (
                      <div>
                        <span className="text-[#B0B3B8]">Version:</span>
                        <span className="text-[#F4F4F4] ml-2">{selectedReport.appVersion}</span>
                      </div>
                    )}
                    {selectedReport.pageUrl && (
                      <div>
                        <span className="text-[#B0B3B8]">Page URL:</span>
                        <span className="text-[#F4F4F4] ml-2 text-xs">{selectedReport.pageUrl}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[#B0B3B8]">Created:</span>
                      <span className="text-[#F4F4F4] ml-2">{new Date(selectedReport.createdAt).toLocaleString('fr-FR')}</span>
                    </div>
                  </div>

                  {selectedReport.adminNotes && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F4F4] mb-2">Notes Admin</h3>
                      <p className="text-[#B0B3B8] text-sm">{selectedReport.adminNotes}</p>
                    </div>
                  )}

                  {selectedReport.status !== "resolved" && selectedReport.status !== "closed" && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F4F4] mb-2">Ajouter des notes (optionnel)</h3>
                      <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
                        rows={3}
                        placeholder="Notes pour la résolution..."
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  {selectedReport.status !== "resolved" && selectedReport.status !== "closed" && (
                    <button
                      onClick={() => handleResolve(selectedReport.id)}
                      className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
                    >
                      Marquer comme résolu
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="flex-1 px-4 py-2 rounded-lg bg-[#1B1F3B] text-[#B0B3B8] font-semibold text-sm hover:bg-[#1B1F3B]/80 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
