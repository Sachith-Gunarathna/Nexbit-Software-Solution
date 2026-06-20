"use client";

import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Key, CheckCircle2, Ban, Laptop, Search, RotateCw, Plus,
  Hourglass, Copy, Edit2, Unlink, Trash2, LogOut, Check, X
} from 'lucide-react';
import { toast } from 'sonner';
import LicenseModals from './LicenseModals';

interface LicenseDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function LicenseDashboard({ user, onLogout }: LicenseDashboardProps) {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editLicense, setEditLicense] = useState<any>(null);
  const [deleteLicense, setDeleteLicense] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'licenses'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        approvalStatus: d.data().approvalStatus || 'approved'
      }));
      setLicenses(data);
      setLoading(false);
    }, (err) => {
      console.error(err);
      toast.error('Failed to load licenses: ' + err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const stats = {
    total: licenses.length,
    active: licenses.filter(l => l.isActive && l.approvalStatus === 'approved').length,
    deactivated: licenses.filter(l => !l.isActive).length,
    bound: licenses.filter(l => l.hardwareId).length,
    pending: licenses.filter(l => l.approvalStatus === 'pending').length
  };

  const filteredLicenses = licenses.filter(l => {
    if (filter === 'pending' && l.approvalStatus !== 'pending') return false;
    if (filter === 'active' && (!l.isActive || l.approvalStatus !== 'approved')) return false;
    if (filter === 'inactive' && l.isActive) return false;
    if (filter === 'bound' && !l.hardwareId) return false;
    if (filter === 'unbound' && l.hardwareId) return false;
    if (['basic', 'premium', 'deluxe'].includes(filter) && (l.edition || 'basic') !== filter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (l.licenseKey || '').toLowerCase().includes(q) ||
        (l.customerName || '').toLowerCase().includes(q) ||
        (l.customerEmail || '').toLowerCase().includes(q) ||
        (l.hardwareId || '').toLowerCase().includes(q) ||
        (l.notes || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  const copyText = (t: string) => {
    navigator.clipboard.writeText(t);
    toast.success(`Copied: ${t}`);
  };

  const handleApprove = async (id: string, key: string) => {
    try {
      await updateDoc(doc(db, 'licenses', id), { approvalStatus: 'approved', approvedAt: serverTimestamp() });
      toast.success(`${key} approved — POS can now activate ✓`);
    } catch (e: any) { toast.error('Approval failed: ' + e.message); }
  };

  const handleReject = async (id: string, key: string) => {
    try {
      await updateDoc(doc(db, 'licenses', id), { approvalStatus: 'rejected' });
      toast.warning(`${key} rejected`);
    } catch (e: any) { toast.error('Failed: ' + e.message); }
  };

  const handleToggle = async (id: string, key: string, isActive: boolean) => {
    try {
      await updateDoc(doc(db, 'licenses', id), { isActive: !isActive });
      toast.success(isActive ? 'License deactivated — POS will lock on next check' : 'License reactivated ✓');
    } catch (e: any) { toast.error('Failed: ' + e.message); }
  };

  const handleUnbind = async (id: string) => {
    if (!confirm('Unbind hardware from this license?\nThe machine can then re-activate on a new device.')) return;
    try {
      await updateDoc(doc(db, 'licenses', id), { hardwareId: null, activatedAt: null });
      toast.success('Hardware unbound — key can activate on a new machine');
    } catch (e: any) { toast.error('Failed: ' + e.message); }
  };

  const handleDelete = async () => {
    if (!deleteLicense) return;
    try {
      await deleteDoc(doc(db, 'licenses', deleteLicense.id));
      toast.success(`${deleteLicense.key} deleted permanently`);
      setDeleteLicense(null);
    } catch (e: any) { toast.error('Delete failed: ' + e.message); }
  };

  const formatDate = (ts: any) => {
    if (!ts) return null;
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString('en-LK', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getEditionBadge = (edition: string) => {
    const map: any = {
      basic: { bg: 'bg-[#dcfce7]', text: 'text-[#166534]', border: 'border-[#bbf7d0]' },
      premium: { bg: 'bg-[#dbeafe]', text: 'text-[#1e40af]', border: 'border-[#bfdbfe]' },
      deluxe: { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]', border: 'border-[#fde68a]' },
    };
    const style = map[edition] || map.basic;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border whitespace-nowrap uppercase ${style.bg} ${style.text} ${style.border}`}>
        {edition}
      </span>
    );
  };

  const getStatusBadge = (status: string, isActive: boolean) => {
    if (status === 'approved') {
      return isActive
        ? <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap bg-[#1a9e6e]/10 text-[#1a9e6e]"><span className="w-1.5 h-1.5 rounded-full bg-current"></span>Active</span>
        : <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap bg-[#c0392b]/10 text-[#c0392b]"><span className="w-1.5 h-1.5 rounded-full bg-current"></span>Deactivated</span>;
    }
    return null;
  };

  const getApprovalBadge = (status: string) => {
    if (status === 'approved') return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap bg-[#1a9e6e]/10 text-[#1a9e6e]"><span className="w-1.5 h-1.5 rounded-full bg-current"></span>Approved</span>;
    if (status === 'pending') return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap bg-[#c47f17]/10 text-[#c47f17]"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>Pending</span>;
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap bg-[#c0392b]/10 text-[#c0392b]"><span className="w-1.5 h-1.5 rounded-full bg-current"></span>Rejected</span>;
  };

  return (
    <div className="flex min-h-screen bg-[#f4f3f0] text-[#0a0a0f] font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-[#0a0a0f] h-screen sticky top-0 flex flex-col overflow-y-auto">
        <div className="p-7 pb-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] bg-[#5b4fff] rounded-lg flex items-center justify-center text-[15px] shrink-0 text-white">
              🔑
            </div>
            <div className="font-syne text-[15px] font-bold text-white tracking-tight leading-tight">
              NexCentauri
              <small className="block text-[10px] font-normal text-white/35 font-sans tracking-widest uppercase">License Console</small>
            </div>
          </div>
        </div>
        <nav className="p-4 flex-1">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-white/25 px-3 mb-1.5 mt-4">Management</div>
          <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white bg-[#5b4fff]/20 font-medium text-[13.5px] w-full text-left transition-colors border-none cursor-pointer">
            <svg className="w-4 h-4 shrink-0 text-[#8b7fff]" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 8h6M5 10.5h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="3.5" cy="8" r=".7" fill="currentColor" />
            </svg>
            Licenses
            {stats.pending > 0 && (
              <span className="ml-auto bg-[#c47f17] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full font-mono">{stats.pending}</span>
            )}
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-white/5 group">
            <div className="w-[30px] h-[30px] bg-[#5b4fff] rounded-full flex items-center justify-center text-[12px] font-syne font-bold text-white shrink-0">
              {(user.email || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-medium text-white/80 whitespace-nowrap overflow-hidden text-ellipsis">{user.email || 'admin'}</div>
              <div className="text-[10.5px] text-white/30 font-mono">Administrator</div>
            </div>
            <button onClick={onLogout} className="bg-transparent border-none text-white/25 hover:text-white/60 cursor-pointer p-1 rounded-md transition-colors" title="Sign out">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-[60px] bg-[#f4f3f0] border-b border-[#d6d3cc] flex items-center px-7 gap-4 sticky top-0 z-10">
          <h1 className="font-syne text-[17px] font-bold text-[#0a0a0f] tracking-tight flex-1 m-0">License Management</h1>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setIsCreateOpen(true)} className="h-[40px] bg-[#5b4fff] hover:bg-[#4a3eee] text-white border-none rounded-[10px] font-syne text-[13px] font-semibold px-4 cursor-pointer flex items-center gap-2 transition-all shadow-[0_2px_8px_rgba(91,79,255,0.25)] hover:shadow-[0_4px_14px_rgba(91,79,255,0.35)] hover:-translate-y-[1px]">
              <Plus size={14} />
              Generate Key
            </button>
          </div>
        </header>

        <div className="p-7 flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3.5 mb-6">
            {[
              { icon: '🗝️', value: stats.total, label: 'Total Keys', color: 'before:bg-[#5b4fff]' },
              { icon: '✅', value: stats.active, label: 'Active', color: 'before:bg-[#1a9e6e]' },
              { icon: '🚫', value: stats.deactivated, label: 'Deactivated', color: 'before:bg-[#c0392b]' },
              { icon: '💻', value: stats.bound, label: 'Bound to Hardware', color: 'before:bg-[#c47f17]' },
            ].map((stat, i) => (
              <div key={i} className={`bg-white border border-[#d6d3cc] rounded-[16px] p-5 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06),0_1px_2px_rgba(0,0,0,.04)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,.08),0_1px_4px_rgba(0,0,0,.04)] hover:-translate-y-[1px] before:content-[''] before:absolute before:top-0 before:right-0 before:w-[80px] before:h-[80px] before:rounded-bl-[80px] before:opacity-10 ${stat.color}`}>
                <span className="text-[20px] mb-3 block">{stat.icon}</span>
                <div className="font-syne text-[32px] font-extrabold text-[#0a0a0f] tracking-tight leading-none mb-1">{stat.value === 0 && loading ? '—' : stat.value}</div>
                <div className="text-[12px] text-[#888] font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Pending Banner */}
          {stats.pending > 0 && (
            <div className="flex items-center gap-3.5 bg-[#fffbf0] border border-[#f0d070] rounded-[16px] p-3.5 px-4 mb-4 animate-in fade-in slide-in-from-bottom-2">
              <span className="text-[22px] shrink-0">⏳</span>
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold text-[#7a5500]">{stats.pending} license{stats.pending > 1 ? 's' : ''} waiting for approval</div>
                <div className="text-[12px] text-[#9a7010]">Approve them so the POS client can activate.</div>
              </div>
              <button onClick={() => setFilter('pending')} className="bg-transparent border border-[#d4a820] text-[#7a5500] rounded-md px-3 py-1.5 text-[12px] font-semibold cursor-pointer transition-colors hover:bg-[#fef3c7] whitespace-nowrap">
                View Pending
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa] pointer-events-none" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keys, customers, hardware ID…"
                className="w-full h-[40px] bg-white border border-[#d6d3cc] rounded-[10px] pl-[38px] pr-3.5 font-sans text-[13.5px] text-[#0a0a0f] outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,.06)] focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 placeholder:text-[#bbb]"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-[40px] bg-white border border-[#d6d3cc] rounded-[10px] pl-3 pr-8 font-sans text-[13px] text-[#0a0a0f] cursor-pointer outline-none appearance-none shadow-[0_1px_3px_rgba(0,0,0,.06)] focus:border-[#5b4fff] bg-no-repeat bg-[right_10px_center]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")` }}
            >
              <option value="all">All Status</option>
              <option value="basic">🟢 Basic Edition</option>
              <option value="premium">🔵 Premium Edition</option>
              <option value="deluxe">👑 Deluxe Edition</option>
              <option value="pending">⏳ Pending Approval</option>
              <option value="active">✅ Active Only</option>
              <option value="inactive">🚫 Deactivated</option>
              <option value="bound">💻 Bound to Hardware</option>
              <option value="unbound">🔓 Not Activated</option>
            </select>
            <button onClick={handleRefresh} className="w-[40px] h-[40px] bg-white border border-[#d6d3cc] rounded-[10px] flex items-center justify-center cursor-pointer text-[#888] transition-colors shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:bg-[#eceae5] hover:text-[#0a0a0f]" title="Refresh">
              <RotateCw size={15} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-[#d6d3cc] rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,.06)] overflow-hidden">
            {loading ? (
              <div className="w-full">
                <table className="w-full border-collapse">
                  <tbody>
                    {Array(5).fill(0).map((_, i) => (
                      <tr key={i}>
                        {Array(9).fill(0).map((_, j) => (
                          <td key={j} className="p-3.5"><div className="h-3.5 bg-gradient-to-r from-[#f4f3f0] via-[#eceae5] to-[#f4f3f0] rounded animate-[shimmer_1.4s_infinite] bg-[length:200%_100%]"></div></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : filteredLicenses.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-[#bbb] gap-3">
                <span className="text-[48px]">🗝️</span>
                <p className="text-[13.5px]">{(searchQuery || filter !== 'all') ? 'No licenses match your search.' : 'No licenses yet. Generate your first key!'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#f4f3f0]">
                    <tr>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">License Key</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Customer</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Edition</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Hardware ID</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Status</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Approval</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Created</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Expiry</th>
                      <th className="py-2.5 px-4 text-left text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Last Check</th>
                      <th className="py-2.5 px-4 text-right text-[10.5px] font-semibold tracking-wider uppercase text-[#888] border-b border-[#d6d3cc] whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLicenses.map((l) => (
                      <tr key={l.id} className="hover:bg-[#f4f3f0] transition-colors border-b border-[#eceae5] last:border-0">
                        <td className="py-3 px-4 align-middle">
                          <button onClick={() => copyText(l.licenseKey)} className="font-mono text-[11.5px] font-semibold bg-[#f4f3f0] border border-[#d6d3cc] rounded-md px-2 py-1 tracking-wider text-[#0a0a0f] cursor-pointer transition-all hover:bg-[#5b4fff]/10 hover:border-[#5b4fff] hover:text-[#5b4fff] text-left">
                            {l.licenseKey}
                          </button>
                          {l.notes && <div className="text-[11px] text-[#aaa] mt-1 italic max-w-[160px] truncate" title={l.notes}>{l.notes}</div>}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          <div className="font-medium text-[13px]">{l.customerName || <span className="text-[#ccc]">—</span>}</div>
                          {l.customerEmail && <div className="text-[11.5px] text-[#999]">{l.customerEmail}</div>}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          {getEditionBadge(l.edition || 'basic')}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          {l.hardwareId ? (
                            <span className="font-mono text-[11px] text-[#888] block max-w-[140px] truncate" title={l.hardwareId}>⬡ {l.hardwareId}</span>
                          ) : (
                            <span className="text-[11.5px] text-[#ccc] italic">Not activated</span>
                          )}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          {getStatusBadge(l.approvalStatus, l.isActive) || <span className="text-[#ccc]">—</span>}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          {getApprovalBadge(l.approvalStatus)}
                        </td>
                        <td className="py-3 px-4 align-middle font-mono text-[11.5px] text-[#aaa] whitespace-nowrap">
                          {formatDate(l.createdAt)}
                        </td>
                        <td className="py-3 px-4 align-middle font-mono text-[11.5px] whitespace-nowrap">
                          {l.expiryDate ? <span className="text-[#0a0a0f] font-semibold">{l.expiryDate}</span> : <span className="text-[#1a9e6e] font-bold">LIFETIME</span>}
                        </td>
                        <td className="py-3 px-4 align-middle font-mono text-[11.5px] text-[#aaa] whitespace-nowrap">
                          {formatDate(l.lastCheckedAt) || '—'}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          <div className="flex items-center justify-end gap-1">
                            {l.approvalStatus === 'pending' && (
                              <>
                                <button onClick={() => handleApprove(l.id, l.licenseKey)} className="w-7 h-7 rounded-md flex items-center justify-center border-none bg-transparent text-[#bbb] cursor-pointer transition-colors hover:bg-[#1a9e6e]/10 hover:text-[#1a9e6e]" title="Approve">
                                  <Check size={14} strokeWidth={2.5} />
                                </button>
                                <button onClick={() => handleReject(l.id, l.licenseKey)} className="w-7 h-7 rounded-md flex items-center justify-center border-none bg-transparent text-[#bbb] cursor-pointer transition-colors hover:bg-[#c0392b]/10 hover:text-[#c0392b]" title="Reject">
                                  <X size={14} strokeWidth={2.5} />
                                </button>
                              </>
                            )}
                            {l.approvalStatus === 'approved' && (
                              <button onClick={() => handleToggle(l.id, l.licenseKey, l.isActive)} className="w-7 h-7 rounded-md flex items-center justify-center border-none bg-transparent text-[#bbb] cursor-pointer transition-colors hover:bg-[#c47f17]/10 hover:text-[#c47f17]" title={l.isActive ? 'Deactivate' : 'Reactivate'}>
                                {l.isActive ? <Ban size={14} /> : <CheckCircle2 size={14} />}
                              </button>
                            )}
                            <button onClick={() => setEditLicense(l)} className="w-7 h-7 rounded-md flex items-center justify-center border-none bg-transparent text-[#bbb] cursor-pointer transition-colors hover:bg-[#5b4fff]/10 hover:text-[#5b4fff]" title="Edit">
                              <Edit2 size={13} />
                            </button>
                            {l.hardwareId && (
                              <button onClick={() => handleUnbind(l.id)} className="w-7 h-7 rounded-md flex items-center justify-center border-none bg-transparent text-[#bbb] cursor-pointer transition-colors hover:bg-[#c47f17]/10 hover:text-[#c47f17]" title="Unbind hardware">
                                <Unlink size={13} />
                              </button>
                            )}
                            <button onClick={() => setDeleteLicense({ id: l.id, key: l.licenseKey })} className="w-7 h-7 rounded-md flex items-center justify-center border-none bg-transparent text-[#bbb] cursor-pointer transition-colors hover:bg-[#c0392b]/10 hover:text-[#c0392b]" title="Delete">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && filteredLicenses.length > 0 && (
              <div className="py-2.5 px-4 border-t border-[#eceae5] text-[12px] text-[#aaa]">
                Showing <strong className="text-[#888]">{filteredLicenses.length}</strong> of <strong className="text-[#888]">{licenses.length}</strong> licenses
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals Component */}
      <LicenseModals
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        editLicense={editLicense}
        setEditLicense={setEditLicense}
        deleteLicense={deleteLicense}
        setDeleteLicense={setDeleteLicense}
        onDelete={handleDelete}
      />
    </div>
  );
}
