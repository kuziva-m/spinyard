import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Send,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  Inbox,
  RefreshCw,
  Trash2,
  ArrowLeft,
  Reply,
  Calendar,
  User,
} from "lucide-react";
import logo from "../../assets/header-logo.png";

export default function EmailManager() {
  const [activeTab, setActiveTab] = useState("compose"); // 'compose' | 'inbox'
  const [inboxMessages, setInboxMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // State to track which message is currently open
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  // --- FETCH INBOX ---
  useEffect(() => {
    if (activeTab === "inbox") fetchInbox();

    const subscription = supabase
      .channel("inbox_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inbox_messages" },
        (payload) => setInboxMessages((prev) => [payload.new, ...prev]),
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [activeTab]);

  const fetchInbox = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("inbox_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setInboxMessages(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await supabase.from("inbox_messages").delete().eq("id", id);
    if (selectedMessage?.id === id) setSelectedMessage(null); // Close if open
    fetchInbox();
  };

  // --- REPLY LOGIC ---
  const handleReply = (msg) => {
    // 1. Format the "On [Date], [Person] wrote:" quote
    const dateStr = new Date(msg.created_at).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const quoteHeader = `\n\n\n\n--------------------------------------------------\nOn ${dateStr}, ${msg.sender} wrote:\n\n`;
    const originalBody = msg.body_text || "No text content.";

    // 2. Pre-fill the form
    setFormData({
      to: msg.sender,
      // Add "Re:" only if it's not already there
      subject: msg.subject?.startsWith("Re:")
        ? msg.subject
        : `Re: ${msg.subject || "No Subject"}`,
      message: quoteHeader + originalBody,
    });

    // 3. Switch tabs
    setSelectedMessage(null);
    setActiveTab("compose");
  };

  const generateEmailTemplate = (message, subject) => {
    const logoUrl = `${window.location.origin}${logo}`;
    return `
      <!DOCTYPE html>
      <html>
      <body style="background-color: #fbfaf8; font-family: sans-serif; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px;">
          <img src="${logoUrl}" alt="Spinyard" width="150" style="margin-bottom: 20px;">
          <div style="border-top: 4px solid #06a51c; padding-top: 20px;">
            <h2 style="color: #09090b;">${subject}</h2>
            <p style="color: #3f3f46; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">Sent via Spinyard Admin</p>
        </div>
      </body>
      </html>
    `;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const htmlBody = generateEmailTemplate(
        formData.message,
        formData.subject,
      );
      const { error } = await supabase.functions.invoke("send-email", {
        body: {
          email: formData.to,
          subject: formData.subject,
          message: htmlBody,
        },
      });
      if (error) throw error;
      setStatus("success");
      setFormData({ to: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-ash-grey-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* SUB-TABS */}
        <div className="flex border-b border-ash-grey-100 flex-shrink-0">
          <button
            onClick={() => setActiveTab("compose")}
            className={`flex-1 p-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "compose"
                ? "bg-olive-leaf-50 text-olive-leaf-700 border-b-2 border-olive-leaf-600"
                : "text-ash-grey-500 hover:bg-ash-grey-50"
            }`}
          >
            <Send size={16} /> Compose
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex-1 p-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "inbox"
                ? "bg-olive-leaf-50 text-olive-leaf-700 border-b-2 border-olive-leaf-600"
                : "text-ash-grey-500 hover:bg-ash-grey-50"
            }`}
          >
            <Inbox size={16} /> Inbox
          </button>
        </div>

        {/* --- COMPOSE TAB --- */}
        {activeTab === "compose" && (
          <form
            onSubmit={handleSend}
            className="p-6 space-y-6 flex-1 overflow-y-auto"
          >
            {status === "success" && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex gap-2">
                <CheckCircle size={20} /> Sent Successfully!
              </div>
            )}
            {status === "error" && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex gap-2">
                <AlertCircle size={20} /> Error sending email.
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-ash-grey-700 mb-1">
                To
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-ash-grey-300 rounded-lg focus:ring-2 focus:ring-olive-leaf-500 outline-none"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-ash-grey-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-ash-grey-300 rounded-lg focus:ring-2 focus:ring-olive-leaf-500 outline-none"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-ash-grey-700 mb-1">
                Message
              </label>
              <textarea
                rows={12}
                required
                className="w-full px-4 py-2 border border-ash-grey-300 rounded-lg focus:ring-2 focus:ring-olive-leaf-500 outline-none resize-none font-mono text-sm"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                disabled={loading}
                className="px-8 py-3 bg-olive-leaf-600 text-white font-bold rounded-lg flex gap-2 items-center hover:bg-olive-leaf-700 transition-colors"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}{" "}
                Send Email
              </button>
            </div>
          </form>
        )}

        {/* --- INBOX TAB --- */}
        {activeTab === "inbox" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* INBOX VIEW: LIST vs DETAIL */}
            {selectedMessage ? (
              // --- DETAIL VIEW (READING PANE) ---
              <div className="flex-1 flex flex-col p-6 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="flex items-center gap-2 text-ash-grey-600 hover:text-olive-leaf-600 font-bold text-sm transition-colors"
                  >
                    <ArrowLeft size={18} /> Back to Inbox
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Email Metadata */}
                <div className="bg-ash-grey-50 rounded-xl p-6 mb-6 border border-ash-grey-100">
                  <h2 className="text-xl font-bold text-ash-grey-900 mb-4">
                    {selectedMessage.subject}
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-olive-leaf-100 flex items-center justify-center text-olive-leaf-700 font-bold">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-ash-grey-900">
                          {selectedMessage.sender}
                        </p>
                        <p className="text-ash-grey-500 text-xs">From</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-ash-grey-500 bg-white px-3 py-1.5 rounded-lg border border-ash-grey-200 shadow-sm">
                      <Calendar size={14} />
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Email Body - UPDATED WITH HTML FIX */}
                <div className="flex-1 bg-white rounded-xl border border-ash-grey-100 p-6 shadow-sm mb-6 min-h-[200px]">
                  {selectedMessage.body_html ? (
                    <div
                      className="prose max-w-none text-ash-grey-700 font-sans email-content"
                      dangerouslySetInnerHTML={{
                        __html: selectedMessage.body_html,
                      }}
                    />
                  ) : (
                    <div className="prose max-w-none text-ash-grey-700 whitespace-pre-wrap font-sans">
                      {selectedMessage.body_text ||
                        "No text content available."}
                    </div>
                  )}
                </div>

                {/* Reply Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleReply(selectedMessage)}
                    className="px-6 py-3 bg-olive-leaf-600 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-olive-leaf-700 transition-colors shadow-lg shadow-olive-leaf-600/20"
                  >
                    <Reply size={18} /> Reply to{" "}
                    {selectedMessage.sender.split("<")[0]}
                  </button>
                </div>
              </div>
            ) : (
              // --- LIST VIEW ---
              <div className="flex-1 overflow-y-auto">
                {/* Toolbar */}
                <div className="p-4 border-b border-ash-grey-100 flex justify-between items-center bg-ash-grey-50/30">
                  <h3 className="font-bold text-ash-grey-700 flex items-center gap-2">
                    <Inbox size={16} /> All Messages
                  </h3>
                  <button
                    onClick={fetchInbox}
                    className="p-2 hover:bg-white rounded-full text-ash-grey-500 hover:text-olive-leaf-600 transition-all"
                    title="Refresh"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>

                {/* Empty State */}
                {!loading && inboxMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-64 text-ash-grey-400">
                    <Inbox size={48} className="mb-4 opacity-20" />
                    <p>No messages yet.</p>
                  </div>
                )}

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center p-12 text-olive-leaf-600">
                    <Loader2 className="animate-spin" size={32} />
                  </div>
                )}

                {/* Message List */}
                <div className="divide-y divide-ash-grey-100">
                  {inboxMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className="p-5 hover:bg-ash-grey-50 transition-colors cursor-pointer group flex gap-4 items-start"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-soft-linen-200 text-soft-linen-700 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-1">
                        {msg.sender.charAt(0).toUpperCase()}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-bold text-ash-grey-900 truncate pr-2">
                            {msg.sender}
                          </span>
                          <span className="text-xs text-ash-grey-400 flex-shrink-0">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-olive-leaf-700 mb-1 truncate">
                          {msg.subject || "(No Subject)"}
                        </h4>
                        <p className="text-sm text-ash-grey-500 line-clamp-2">
                          {msg.body_text}
                        </p>
                      </div>

                      {/* Hover Actions */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center self-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg.id);
                          }}
                          className="p-2 text-ash-grey-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SIDEBAR INFO */}
      <div className="space-y-6">
        <div className="bg-ash-grey-900 text-white rounded-xl p-6 shadow-md">
          <Mail className="h-8 w-8 text-olive-leaf-400 mb-4" />
          <h4 className="text-lg font-bold mb-2">Email System</h4>
          <p className="text-sm text-ash-grey-400 leading-relaxed">
            <strong>Send:</strong> Processed via Resend.
            <br />
            <strong>Receive:</strong> Emails to <em>info@spinyard.co.zw</em> are
            captured here via Webhook.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-ash-grey-200 p-6 shadow-sm">
          <h4 className="font-bold text-ash-grey-900 mb-2">Pro Tip</h4>
          <p className="text-sm text-ash-grey-600">
            When you click <strong>Reply</strong>, the system automatically
            quotes the original message and sets the subject line for you.
          </p>
        </div>
      </div>
    </div>
  );
}
