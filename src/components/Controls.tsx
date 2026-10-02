/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  Share2,
  Check,
  RotateCcw,
  Loader2,
  Menu,
  X,
  Trash2,
} from 'lucide-react';
import { CardColor } from '../types';

interface ControlsProps {
  onDownloadPng: () => void;
  onShare: () => void;
  onReset: () => void;
  isDownloading: boolean;
  isSharing?: boolean;
  shareToastMessage?: string | null;
  selectedColorId?: string;
  onSelectColor?: (color: CardColor) => void;
  onClearStickers?: () => void;
  stickerCount?: number;
}

export const Controls: React.FC<ControlsProps> = ({
  onDownloadPng,
  onShare,
  onReset,
  isDownloading,
  isSharing = false,
  shareToastMessage = null,
  onClearStickers,
  stickerCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAction = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative w-full max-w-[1440px] mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col justify-center border-b border-slate-200/70 bg-white/90 backdrop-blur-md rounded-2xl mt-1.5 sm:mt-2 mb-2 shadow-xs transition-all">
      {/* Top Main Bar */}
      <div className="w-full flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs rotate-[-3deg] shrink-0">
            🏷️
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none truncate">
              BadgeCraft
            </h1>
            <p className="hidden sm:block text-[11px] text-slate-500 font-medium truncate mt-0.5">
              Interactive name tag playground
            </p>
          </div>
        </div>

        {/* Desktop Action Zone (sm and above: Clean horizontal buttons) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            aria-label="Reset badge to default"
            title="Reset badge text, colors, and stickers to default"
            className="h-9 px-3 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          {/* Share Button (Native OS Share with PNG image and clipboard fallback) */}
          <button
            type="button"
            onClick={onShare}
            disabled={isSharing || isDownloading}
            aria-label="Share badge as PNG image"
            title="Share badge PNG via native share or copy image"
            className={`h-9 px-3.5 flex items-center gap-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer shadow-xs disabled:opacity-60 ${
              shareToastMessage
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {isSharing ? (
              <>
                <Loader2 size={14} className="animate-spin text-slate-500" />
                <span>Preparing PNG...</span>
              </>
            ) : shareToastMessage ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span>{shareToastMessage}</span>
              </>
            ) : (
              <>
                <Share2 size={14} className="text-slate-500" />
                <span>Share PNG</span>
              </>
            )}
          </button>

          {/* Download PNG Button */}
          <button
            type="button"
            onClick={onDownloadPng}
            disabled={isDownloading}
            className="h-9 px-4 flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-black active:scale-95 rounded-xl border border-slate-900 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Download size={14} />
            <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
          </button>
        </div>

        {/* Mobile Action Zone (< sm: Compact icon buttons + Burger menu) */}
        <div className="flex sm:hidden items-center gap-1.5">
          {/* Quick Share Icon Button */}
          <button
            type="button"
            onClick={onShare}
            disabled={isSharing || isDownloading}
            title="Share PNG"
            aria-label="Share badge PNG"
            className={`w-9 h-9 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
              shareToastMessage
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-200 active:bg-slate-50'
            }`}
          >
            {isSharing ? (
              <Loader2 size={16} className="animate-spin text-slate-500" />
            ) : shareToastMessage ? (
              <Check size={16} className="text-emerald-600" />
            ) : (
              <Share2 size={16} />
            )}
          </button>

          {/* Quick Download PNG Icon Button */}
          <button
            type="button"
            onClick={onDownloadPng}
            disabled={isDownloading}
            title="Download PNG"
            aria-label="Download badge PNG"
            className="w-9 h-9 rounded-xl bg-slate-900 text-white active:bg-black flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isDownloading ? (
              <Loader2 size={15} className="animate-spin text-white" />
            ) : (
              <Download size={15} />
            )}
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
              mobileMenuOpen
                ? 'bg-slate-100 border-slate-300 text-slate-900'
                : 'bg-white border-slate-200 text-slate-700 active:bg-slate-50'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Confirmation Toast */}
      {shareToastMessage && (
        <div className="sm:hidden absolute top-[calc(100%+6px)] right-3 py-1.5 px-3 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150 z-50 pointer-events-none">
          <Check size={13} className="text-emerald-400" />
          <span>{shareToastMessage}</span>
        </div>
      )}

      {/* Mobile Stacked Burger Menu Dropdown (Clean utilities: Reset and Clear Stickers) */}
      {mobileMenuOpen && (
        <div className="sm:hidden w-full pt-2.5 pb-1 border-t border-slate-100 mt-2 flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-150">

          <div className="flex flex-col gap-1.5">
            {/* Reset to Default */}
            <button
              type="button"
              onClick={() => handleAction(onReset)}
              className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-2 shadow-2xs cursor-pointer"
            >
              <RotateCcw size={15} className="text-slate-500" />
              <span>Reset badge to default</span>
            </button>

            {/* Clear all stickers if any placed */}
            {stickerCount > 0 && onClearStickers && (
              <button
                type="button"
                onClick={() => handleAction(onClearStickers)}
                className="w-full h-10 px-3.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 font-semibold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Trash2 size={15} className="text-red-500" />
                <span>Clear all stickers ({stickerCount})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
