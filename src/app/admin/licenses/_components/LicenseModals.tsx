"use client";

import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { X, AlertTriangle } from 'lucide-react';

interface LicenseModalsProps {
  isCreateOpen: boolean;
  setIsCreateOpen: (v: boolean) => void;
  editLicense: any | null;
  setEditLicense: (v: any | null) => void;
  deleteLicense: any | null;
  setDeleteLicense: (v: any | null) => void;
  onDelete: () => void;
}

export default function LicenseModals({
  isCreateOpen, setIsCreateOpen,
  editLicense, setEditLicense,
  deleteLicense, setDeleteLicense,
  onDelete
}: LicenseModalsProps) {

  // Form state
  const [hardwareId, setHardwareId] = useState('');
  const [edition, setEdition] = useState('basic');
  const [shopCategory, setShopCategory] = useState('general');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('pending');

  const [hwError, setHwError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const isOpen = isCreateOpen || !!editLicense;

  useEffect(() => {
    if (editLicense) {
      setEdition(editLicense.edition || 'basic');
      setShopCategory(editLicense.shopCategory || 'general');
      setCustomerName(editLicense.customerName || '');
      setCustomerEmail(editLicense.customerEmail || '');
      setExpiryDate(editLicense.expiryDate || '');
      setNotes(editLicense.notes || '');
      setApprovalStatus(editLicense.approvalStatus || 'pending');
      setGeneratedKey(null);
      setHwError(false);
    } else {
      setHardwareId('');
      setEdition('basic');
      setShopCategory('general');
      setCustomerName('');
      setCustomerEmail('');
      setExpiryDate('');
      setNotes('');
      setApprovalStatus('pending');
      setGeneratedKey(null);
      setHwError(false);
    }
  }, [editLicense, isCreateOpen]);

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setEditLicense(null);
  };

  const handleModalSubmit = async () => {
    if (generatedKey) {
      closeCreateModal();
      return;
    }

    if (isSubmitting) return;

    const shopTypeMap: any = {
      'general': 'GROCERY', 'pharmacy': 'PHARMACY', 'bakery': 'BAKERY',
      'clothing': 'CLOTHING', 'hardware': 'HARDWARE', 'salon': 'SALON',
      'electronics': 'GENERAL', 'mobile_shop': 'MOBILE_SHOP', 'other': 'GENERAL', 'book_shop': 'BOOK_SHOP'
    };
    const shopType = shopTypeMap[shopCategory] || 'GENERAL';

    if (!editLicense) {
      if (!hardwareId.trim()) {
        setHwError(true);
        return;
      }
      setHwError(false);
    }

    setIsSubmitting(true);

    try {
      if (editLicense) {
        await updateDoc(doc(db, 'licenses', editLicense.id), {
          edition, shopCategory, shopType, customerName: customerName.trim(),
          customerEmail: customerEmail.trim(), notes: notes.trim(),
          expiryDate: expiryDate || null, approvalStatus
        });
        toast.success('License updated ✓');
        closeCreateModal();
      } else {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const prefix = edition === 'basic' ? 'BASC' : edition === 'premium' ? 'PREM' : 'DLUX';
        const key = `${prefix}-${seg()}-${seg()}-${seg()}`;

        await addDoc(collection(db, 'licenses'), {
          licenseKey: key, edition, shopCategory, shopType,
          customerName: customerName.trim(), customerEmail: customerEmail.trim(),
          expiryDate: expiryDate || null, notes: notes.trim(),
          hardwareId: hardwareId.trim(), isActive: true, approvalStatus: 'pending',
          activatedAt: null, lastCheckedAt: null,
          createdAt: serverTimestamp(), approvedAt: null,
        });

        setGeneratedKey(key);
        toast.success(`Key generated & bound to hardware ✓`);
      }
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      toast.success('License key copied to clipboard ✓');
    }
  };

  return (
    <>
      {/* Create/Edit Modal Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#0a0a0f]/55 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => e.target === e.currentTarget && closeCreateModal()}>
        <div className={`bg-white rounded-[18px] w-full max-w-[460px] max-h-[90vh] overflow-y-auto shadow-[0_12px_40px_rgba(0,0,0,.12),0_4px_12px_rgba(0,0,0,.06)] p-7 transition-transform duration-250 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'}`}>
          <div className="flex items-start justify-between mb-5.5">
            <div>
              <div className="font-syne text-[18px] font-bold text-[#0a0a0f] tracking-tight">{editLicense ? 'Edit License' : 'Generate License Key'}</div>
              <div className="text-[13px] text-[#888] mt-0.5">{editLicense ? 'Update customer details for this license' : 'Hardware ID is required — get it from the POS activation screen'}</div>
            </div>
            <button onClick={closeCreateModal} className="w-8 h-8 bg-[#f4f3f0] border-none rounded-lg flex items-center justify-center cursor-pointer text-[#888] transition-colors hover:bg-[#eceae5] hover:text-[#0a0a0f] shrink-0">
              <X size={14} strokeWidth={1.8} />
            </button>
          </div>

          {generatedKey && (
            <div className="bg-[#f0fdf4] border-[1.5px] border-[#86efac] rounded-[10px] p-3.5 px-4 mb-4">
              <div className="text-[11px] font-bold text-[#16a34a] uppercase tracking-wider mb-2">✓ Key Generated &amp; Hardware Bound</div>
              <div className="flex items-center gap-2.5">
                <div className="flex-1 font-mono text-[16px] font-bold tracking-widest text-[#166534]">{generatedKey}</div>
                <button onClick={copyKey} className="bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded-md px-2.5 py-1 text-[11.5px] font-semibold cursor-pointer transition-colors hover:bg-[#bbf7d0] whitespace-nowrap">Copy</button>
              </div>
              <div className="text-[11.5px] text-[#16a34a] mt-2">Status: <strong>Pending Approval</strong> — approve it in the table to let the POS activate.</div>
            </div>
          )}

          {!generatedKey && !editLicense && (
            <div className="mb-4">
              <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#666] mb-1.5">Hardware ID <span className="text-[#c0392b] ml-0.5">*</span></label>
              <input
                type="text"
                value={hardwareId}
                onChange={(e) => setHardwareId(e.target.value)}
                placeholder="Paste the hardware ID from the POS machine"
                className={`w-full h-[44px] px-3.5 bg-[#f4f3f0] border-[1.5px] ${hwError ? 'border-[#c0392b]' : 'border-[#d6d3cc]'} rounded-[10px] font-mono text-[12.5px] tracking-wider text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white`}
              />
              <div className="flex items-start gap-2 bg-[#f0f4ff] border border-[#d0d8ff] rounded-lg p-2.5 px-3 mt-1.5 text-[12px] text-[#446]">
                💡 On the POS machine, open the app → the activation screen shows a <strong>Hardware ID</strong> badge with a <strong>Copy</strong> button.
              </div>
              {hwError && <div className="text-[11.5px] text-[#c0392b] mt-1.5">⚠ Hardware ID is required.</div>}
            </div>
          )}

          {!generatedKey && (
            <>
              <div className="mb-4">
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#5b4fff] mb-1.5">Edition (පැකේජය)</label>
                <select
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  className="w-full h-[44px] px-3.5 pr-8 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[14px] text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")` }}
                >
                  <option value="basic">🟢 Basic Edition</option>
                  <option value="premium">🔵 Premium Edition</option>
                  <option value="deluxe">👑 Deluxe Edition</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#5b4fff] mb-1.5">Shop Type (ව්‍යාපාරයේ වර්ගය)</label>
                <select
                  value={shopCategory}
                  onChange={(e) => setShopCategory(e.target.value)}
                  className="w-full h-[44px] px-3.5 pr-8 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[14px] text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")` }}
                >
                  <option value="general">🛒 General Grocery</option>
                  <option value="pharmacy">💊 Pharmacy</option>
                  <option value="bakery">🍞 Bakery & Cafe</option>
                  <option value="clothing">👕 Clothing & Fashion</option>
                  <option value="hardware">🔧 Hardware Store</option>
                  <option value="salon">✂️ Salon & Spa</option>
                  <option value="electronics">💻 Electronics</option>
                  <option value="mobile_shop">📱 Mobile Shop</option>
                  <option value="book_shop">📖 Book Shop</option>
                  <option value="other">🏪 Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#666] mb-1.5">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Dhananjani Store – Colombo Branch"
                  className="w-full h-[44px] px-3.5 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[14px] text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#666] mb-1.5">Customer Email</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="customer@email.com"
                  className="w-full h-[44px] px-3.5 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[14px] text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#5b4fff] mb-1.5">System Expiry Date (අගුළු වැටෙන දිනය)</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full h-[44px] px-3.5 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[14px] text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white"
                />
                <div className="text-[11.5px] text-[#aaa] mt-1.5">හිස්ව තැබුවහොත් &quot;Lifetime License&quot; ලෙස සලකනු ලැබේ.</div>
              </div>

              {editLicense && (
                <div className="mb-4">
                  <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#666] mb-1.5">Approval Status</label>
                  <select
                    value={approvalStatus}
                    onChange={(e) => setApprovalStatus(e.target.value)}
                    className="w-full h-[44px] px-3.5 pr-8 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[14px] text-[#0a0a0f] outline-none transition-all focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")` }}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="approved">✅ Approved</option>
                    <option value="rejected">🚫 Rejected</option>
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-[12px] font-semibold tracking-wider uppercase text-[#666] mb-1.5">Notes <span className="font-normal text-[#aaa]">(optional)</span></label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Branch location, plan type, etc."
                  className="w-full h-[72px] p-2.5 px-3.5 bg-[#f4f3f0] border-[1.5px] border-[#d6d3cc] rounded-[10px] font-sans text-[13.5px] leading-relaxed text-[#0a0a0f] outline-none transition-all resize-none focus:border-[#5b4fff] focus:ring-3 focus:ring-[#5b4fff]/20 focus:bg-white"
                ></textarea>
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button onClick={closeCreateModal} className="h-[40px] px-4.5 bg-[#f4f3f0] border border-[#d6d3cc] rounded-[10px] font-sans text-[13.5px] font-medium text-[#555] cursor-pointer transition-colors hover:bg-[#eceae5]">
              {generatedKey ? 'Close' : 'Cancel'}
            </button>
            <button
              onClick={handleModalSubmit}
              disabled={isSubmitting}
              className="h-[40px] px-5.5 bg-[#5b4fff] hover:bg-[#4a3eee] border-none rounded-[10px] font-syne text-[13.5px] font-semibold text-white cursor-pointer flex items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{editLicense ? 'Saving…' : 'Generating…'}</span>
                </>
              ) : (
                <span>{generatedKey ? 'Done' : editLicense ? 'Save Changes' : 'Generate Key'}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`fixed inset-0 z-50 bg-[#0a0a0f]/55 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 ${!!deleteLicense ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => e.target === e.currentTarget && setDeleteLicense(null)}>
        <div className={`bg-white rounded-[18px] w-full max-w-[380px] shadow-[0_12px_40px_rgba(0,0,0,.12),0_4px_12px_rgba(0,0,0,.06)] p-7 transition-transform duration-250 ${!!deleteLicense ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'}`}>
          <div className="w-12 h-12 bg-[#c0392b]/15 text-[#c0392b] rounded-xl flex items-center justify-center mb-4">
            <AlertTriangle size={22} />
          </div>
          <div className="font-syne text-[18px] font-bold mb-2">Delete License?</div>
          <div className="text-[13.5px] text-[#666] leading-relaxed mb-5">
            Permanently delete <span className="font-mono font-semibold text-[#0a0a0f]">{deleteLicense?.key}</span>?
            <span className="block text-[#c0392b] text-[12.5px] mt-1">This cannot be undone. The POS on that machine will lock immediately.</span>
          </div>
          <div className="flex items-center justify-end gap-2.5">
            <button onClick={() => setDeleteLicense(null)} className="h-[40px] px-4.5 bg-[#f4f3f0] border border-[#d6d3cc] rounded-[10px] font-sans text-[13.5px] font-medium text-[#555] cursor-pointer transition-colors hover:bg-[#eceae5]">Cancel</button>
            <button onClick={onDelete} className="h-[40px] px-5.5 bg-[#c0392b] border-none rounded-[10px] font-syne text-[13.5px] font-semibold text-white cursor-pointer transition-colors hover:bg-[#a93226]">Delete Permanently</button>
          </div>
        </div>
      </div>
    </>
  );
}
