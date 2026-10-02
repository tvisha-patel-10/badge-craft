/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { PlacedSticker, StickerType, NameTagState } from './types';
import { CARD_COLORS } from './utils/cardThemes';
import { Tag } from './components/Tag';
import { Sticker } from './components/Sticker';
import { StickerSidebar } from './components/StickerSidebar';
import { Controls } from './components/Controls';
import { TrashZone } from './components/TrashZone';
import { encodeStateToHash, decodeStateFromHash } from './utils/urlState';
import { getStickerDefinition } from './utils/stickers';
import { Info, Smile, Maximize2 } from 'lucide-react';

// Helper to generate default stickers hugging the four corners of the name tag
export const createDefaultStickers = (
  tagRelX: number = 160,
  tagRelY: number = 200,
  tagW: number = 490,
  tagH: number = 230
): PlacedSticker[] => [
  {
    id: 'stk-starburst-1',
    type: 'starburst',
    x: Math.round(tagRelX - 35),
    y: Math.round(tagRelY - 40),
    rotation: -12,
    scale: 1,
    zIndex: 10,
    customText: 'CREATIVE',
  },
  {
    id: 'stk-smiley-1',
    type: 'smiley',
    x: Math.round(tagRelX + tagW - 65),
    y: Math.round(tagRelY - 32),
    rotation: 8,
    scale: 1,
    zIndex: 11,
  },
  {
    id: 'stk-arrow-1',
    type: 'arrow',
    x: Math.round(tagRelX - 25),
    y: Math.round(tagRelY + tagH - 55),
    rotation: -4,
    scale: 1,
    zIndex: 12,
  },
  {
    id: 'stk-tvisha-1',
    type: 'tvisha_fan',
    x: Math.round(tagRelX + tagW - 130),
    y: Math.round(tagRelY + tagH - 26),
    rotation: 3,
    scale: 1,
    zIndex: 13,
    customText: '#1 TVISHA FAN',
  },
];

// Default initial state with #1 Tvisha Fan and Cat icon
const DEFAULT_STATE: NameTagState = {
  name: 'Tvisha Patel',
  title: 'Product Designer & Builder',
  tagline:
    'Create your own name tag with fun stickers like this!',
  avatarEmoji: 'shades',
  cardColorId: 'white',
  stickers: createDefaultStickers(),
};

export default function App() {
  const [tagData, setTagData] = useState<NameTagState>(DEFAULT_STATE);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isDraggingAny, setIsDraggingAny] = useState(false);
  const [isDraggingFromSidebar, setIsDraggingFromSidebar] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareToastMessage, setShareToastMessage] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mobileTab, setMobileTab] = useState<'canvas' | 'stickers'>('canvas');

  // Highest z-index tracking so touched stickers pop to front
  const maxZIndexRef = useRef(20);
  const canvasRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const trashZoneRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Restore state from URL Hash on initial mount
  useEffect(() => {
    if (window.location.hash) {
      const parsed = decodeStateFromHash(window.location.hash);
      if (parsed) {
        setTagData((prev) => ({
          ...prev,
          ...parsed,
          stickers: parsed.stickers?.length ? parsed.stickers : prev.stickers,
        }));
        return;
      }
    }

    // If no URL hash, dynamically align default stickers right around the badge on this screen
    const snapDefaultStickers = () => {
      if (!tagRef.current || !canvasRef.current) return;
      const tagRect = tagRef.current.getBoundingClientRect();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      if (tagRect.width < 50 || canvasRect.width < 50) return;

      const tagRelX = tagRect.left - canvasRect.left;
      const tagRelY = tagRect.top - canvasRect.top;
      const tagW = tagRect.width;
      const tagH = tagRect.height;

      setTagData((prev) => {
        const isInitialStickerSet =
          prev.stickers.length === 4 &&
          prev.stickers.every((s) => s.id.startsWith('stk-'));
        if (!isInitialStickerSet) return prev;

        return {
          ...prev,
          stickers: createDefaultStickers(tagRelX, tagRelY, tagW, tagH),
        };
      });
    };

    const timer = setTimeout(snapDefaultStickers, 80);
    window.addEventListener('resize', snapDefaultStickers);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', snapDefaultStickers);
    };
  }, []);

  // Selected card color object
  const currentCardColor =
    CARD_COLORS.find((c) => c.id === tagData.cardColorId) || CARD_COLORS[0];

  // Update card fields (name, title, tagline, avatar)
  const handleUpdateTag = (
    field: 'name' | 'title' | 'tagline' | 'avatarEmoji',
    value: string
  ) => {
    setTagData((prev) => ({ ...prev, [field]: value }));
  };

  // Bring a touched sticker to the very front
  const handleBringToFront = useCallback((id: string) => {
    maxZIndexRef.current += 1;
    const newZ = maxZIndexRef.current;
    setTagData((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? { ...s, zIndex: newZ } : s)),
    }));
  }, []);

  // Update sticker position
  const handleUpdatePosition = useCallback((id: string, x: number, y: number) => {
    setTagData((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? { ...s, x, y } : s)),
    }));
  }, []);

  // Update sticker rotation
  const handleUpdateRotation = useCallback((id: string, rotation: number) => {
    let normalized = Math.round(rotation);
    if (normalized > 180) normalized -= 360;
    if (normalized < -180) normalized += 360;
    setTagData((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? { ...s, rotation: normalized } : s)),
    }));
  }, []);

  // Delete a sticker
  const handleDeleteSticker = useCallback((id: string) => {
    setTagData((prev) => ({
      ...prev,
      stickers: prev.stickers.filter((s) => s.id !== id),
    }));
    setSelectedStickerId(null);
    setIsOverTrash(false);
  }, []);

  // Clear all stickers
  const handleClearAllStickers = useCallback(() => {
    setTagData((prev) => ({ ...prev, stickers: [] }));
    setSelectedStickerId(null);
  }, []);

  // Check if pointer coordinates fall within the trash zone bounds
  const checkTrashOverlap = useCallback((clientX: number, clientY: number): boolean => {
    if (!trashZoneRef.current) return false;
    const rect = trashZoneRef.current.getBoundingClientRect();
    const padding = 24;
    return (
      clientX >= rect.left - padding &&
      clientX <= rect.right + padding &&
      clientY >= rect.top - padding &&
      clientY <= rect.bottom + padding
    );
  }, []);

  // Handle drag state updates from Sticker component
  const handleDragStateChange = useCallback(
    (_id: string, isDragging: boolean, overTrash: boolean) => {
      setIsDraggingAny(isDragging);
      setIsOverTrash(overTrash);
    },
    []
  );

  // Spawn a sticker from the sidebar onto the canvas
  const handleSpawnSticker = useCallback(
    (type: StickerType, dropX?: number, dropY?: number) => {
      maxZIndexRef.current += 1;
      const def = getStickerDefinition(type);

      let initialX = dropX;
      let initialY = dropY;

      // If coordinates not provided (user tapped / clicked "+ Add" in sidebar):
      // Calculate placement DIRECTLY on the Name Tag area!
      if (initialX === undefined || initialY === undefined) {
        let tagRelX = 0;
        let tagRelY = 0;
        let tagW = 480;
        let tagH = 200;

        let hasValidTagRect = false;
        if (tagRef.current && canvasRef.current) {
          const tagRect = tagRef.current.getBoundingClientRect();
          const canvasRect = canvasRef.current.getBoundingClientRect();
          if (tagRect.width > 50 && canvasRect.width > 50) {
            tagRelX = tagRect.left - canvasRect.left;
            tagRelY = tagRect.top - canvasRect.top;
            tagW = tagRect.width;
            tagH = tagRect.height;
            hasValidTagRect = true;
          }
        }

        if (!hasValidTagRect && canvasRef.current && canvasRef.current.clientWidth > 50) {
          const cw = canvasRef.current.clientWidth;
          const ch = canvasRef.current.clientHeight;
          tagRelX = cw / 2 - 240;
          tagRelY = ch / 2 - 100;
          tagW = 480;
          tagH = 200;
        } else if (!hasValidTagRect) {
          tagRelX = 200;
          tagRelY = 160;
          tagW = 480;
          tagH = 200;
        }

        // Cycle through prominent spots right on or overlapping the name tag:
        const count = tagData.stickers.length;
        const slot = count % 5;

        if (slot === 0) {
          // Top-right of tag
          initialX = tagRelX + tagW - def.width * 0.75;
          initialY = tagRelY - def.height * 0.35;
        } else if (slot === 1) {
          // Bottom-right of tag
          initialX = tagRelX + tagW - def.width * 0.85;
          initialY = tagRelY + tagH - def.height * 0.65;
        } else if (slot === 2) {
          // Top-left of tag
          initialX = tagRelX - def.width * 0.2;
          initialY = tagRelY - def.height * 0.3;
        } else if (slot === 3) {
          // Bottom-left of tag
          initialX = tagRelX + 15;
          initialY = tagRelY + tagH - def.height * 0.55;
        } else {
          // Middle-right of tag
          initialX = tagRelX + tagW - def.width * 0.5;
          initialY = tagRelY + tagH * 0.25;
        }
      }

      initialX = Math.round(initialX);
      initialY = Math.round(initialY);

      if (isNaN(initialX) || isNaN(initialY)) {
        initialX = 240;
        initialY = 180;
      }

      // Constrain within canvas bounds
      if (canvasRef.current) {
        const bounds = canvasRef.current.getBoundingClientRect();
        if (bounds.width > 100) {
          initialX = Math.max(10, Math.min(bounds.width - def.width - 10, initialX));
          initialY = Math.max(10, Math.min(bounds.height - def.height - 10, initialY));
        }
      }

      const newSticker: PlacedSticker = {
        id: `stk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        type,
        x: initialX,
        y: initialY,
        rotation: def.defaultRotation + (Math.random() * 6 - 3),
        scale: 1,
        zIndex: maxZIndexRef.current,
        customText:
          type === 'starburst'
            ? 'CREATIVE'
            : type === 'tvisha_fan' || type === 'hire_me'
            ? '#1 TVISHA FAN'
            : undefined,
      };

      setTagData((prev) => ({
        ...prev,
        stickers: [...prev.stickers, newSticker],
      }));
      setSelectedStickerId(newSticker.id);

      // If on mobile, switch to canvas view so user immediately sees their placed sticker
      setMobileTab('canvas');
    },
    [tagData.stickers.length]
  );

  // Deselect sticker when clicking on canvas background or wrapper
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (
      e.target === canvasRef.current ||
      (e.target as HTMLElement).id === 'canvas-wrapper' ||
      (e.target as HTMLElement).id === 'canvas-surface'
    ) {
      setSelectedStickerId(null);
    }
  };

  // Download high-resolution PNG
  const handleDownloadPng = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    setSelectedStickerId(null); // Clear selection ring before export

    try {
      await new Promise((r) => setTimeout(r, 60));

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#f7f9fa',
        filter: (node) => {
          if (node instanceof HTMLElement && node.dataset.noExport === 'true') {
            return false;
          }
          return true;
        },
      });

      const safeName = (tagData.name || 'nametag')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
      const link = document.createElement('a');
      link.download = `${safeName}-badge.png`;
      link.href = dataUrl;
      link.click();

      // Confetti burst on successful download
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#ec4899', '#2563eb', '#facc15', '#10b981', '#a855f7'],
      });
    } catch (err) {
      console.error('Failed to download badge as PNG', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Native OS Share popover with generated PNG image file (or image clipboard fallback)
  const handleShare = async () => {
    if (!canvasRef.current) return;
    setIsSharing(true);
    setSelectedStickerId(null); // Clear selection ring before export

    const hash = encodeStateToHash(tagData);
    const fullUrl = `${window.location.origin}${window.location.pathname}${hash}`;
    window.location.hash = hash;

    try {
      await new Promise((r) => setTimeout(r, 60));

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#f7f9fa',
        filter: (node) => {
          if (node instanceof HTMLElement && node.dataset.noExport === 'true') {
            return false;
          }
          return true;
        },
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const safeName = (tagData.name || 'nametag')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
      const file = new File([blob], `${safeName}-badge.png`, { type: 'image/png' });

      // If browser supports sharing files via native OS share sheet (macOS Safari/Chrome, iOS, Android):
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `${tagData.name || 'Name Tag'} Badge`,
            text: `Check out my custom interactive name tag badge: ${tagData.name} (${tagData.title})!`,
            files: [file],
          });
          return;
        } catch (err: any) {
          // If user dismissed share sheet, do nothing
          if (err?.name === 'AbortError') return;
        }
      }

      // If OS file sharing is not supported, copy the PNG image directly to clipboard!
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setShareToastMessage('Image Copied!');
          setTimeout(() => setShareToastMessage(null), 2500);
          return;
        }
      } catch (clipErr) {
        console.warn('Clipboard image copy not available, falling back to link', clipErr);
      }

      // Final fallback: copy shareable link
      await navigator.clipboard.writeText(fullUrl);
      setShareToastMessage('Link Copied!');
      setTimeout(() => setShareToastMessage(null), 2500);
    } catch (err) {
      console.error('Failed to share badge as PNG', err);
    } finally {
      setIsSharing(false);
    }
  };

  // Reset badge text, colors, avatar, and stickers to default sample layout hugging the badge
  const handleReset = () => {
    let tagRelX = 160;
    let tagRelY = 200;
    let tagW = 490;
    let tagH = 230;

    if (tagRef.current && canvasRef.current) {
      const tagRect = tagRef.current.getBoundingClientRect();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      if (tagRect.width > 50 && canvasRect.width > 50) {
        tagRelX = tagRect.left - canvasRect.left;
        tagRelY = tagRect.top - canvasRect.top;
        tagW = tagRect.width;
        tagH = tagRect.height;
      }
    }

    setTagData({
      ...DEFAULT_STATE,
      stickers: createDefaultStickers(tagRelX, tagRelY, tagW, tagH),
    });
    window.location.hash = '';
    setSelectedStickerId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fa] selection:bg-amber-200">
      {/* Top Bar Controls (Streamlined with responsive burger menu) */}
      <Controls
        onDownloadPng={handleDownloadPng}
        onShare={handleShare}
        onReset={handleReset}
        isDownloading={isDownloading}
        isSharing={isSharing}
        shareToastMessage={shareToastMessage}
        selectedColorId={tagData.cardColorId}
        onSelectColor={(color) => setTagData((prev) => ({ ...prev, cardColorId: color.id }))}
        onClearStickers={handleClearAllStickers}
        stickerCount={tagData.stickers.length}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center justify-center px-3 mb-2">
        <div className="flex items-center p-1 bg-slate-200/80 rounded-xl text-xs font-bold w-full max-w-sm shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileTab('canvas')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'canvas'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 size={13} />
            <span>Playground ({tagData.stickers.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('stickers')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'stickers'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smile size={14} className="text-amber-500" strokeWidth={2.5} />
            <span>Sticker menu</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Sidebar + Expansive Right Play Zone */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-2.5 sm:px-4 pb-4 flex flex-col lg:flex-row gap-3.5 sm:gap-4 items-stretch">
        {/* Left Side Menu for Stickers & Styles */}
        <div className={`${mobileTab === 'stickers' ? 'block' : 'hidden'} lg:block`}>
          <StickerSidebar
            onSpawnSticker={handleSpawnSticker}
            canvasRef={canvasRef}
            onDragStateChange={setIsDraggingFromSidebar}
            selectedColorId={tagData.cardColorId}
            onSelectColor={(color) => setTagData((prev) => ({ ...prev, cardColorId: color.id }))}
            onClearStickers={handleClearAllStickers}
            stickerCount={tagData.stickers.length}
            onMobileDone={() => setMobileTab('canvas')}
          />
        </div>

        {/* Right Main Interactive Canvas Area (Larger Play Zone) */}
        <main
          id="canvas-wrapper"
          onClick={handleCanvasClick}
          className={`flex-1 flex flex-col select-none relative overflow-hidden ${
            mobileTab === 'canvas' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Expanded Large Canvas Surface with Grid Paper */}
          <div
            ref={canvasRef}
            id="canvas-surface"
            onClick={handleCanvasClick}
            className={`relative flex-1 w-full min-h-[480px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[680px] bg-grid-paper rounded-3xl border shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden touch-none transition-all ${
              isDraggingFromSidebar
                ? 'border-blue-400 ring-4 ring-blue-100/90'
                : 'border-slate-200/90'
            }`}
          >
            {/* Centered Name Tag Card with fixed container width to guarantee no resizing during description edit */}
            <div
              ref={tagRef}
              className="pointer-events-auto px-2 sm:px-4 z-[2] w-full max-w-[510px] flex justify-center"
            >
              <Tag
                name={tagData.name}
                title={tagData.title}
                tagline={tagData.tagline}
                avatarEmoji={tagData.avatarEmoji}
                cardColor={currentCardColor}
                onUpdate={handleUpdateTag}
              />
            </div>

            {/* Draggable Stickers Layer */}
            {tagData.stickers.map((stk) => (
              <Sticker
                key={stk.id}
                sticker={stk}
                isSelected={selectedStickerId === stk.id}
                isOverTrash={isOverTrash && selectedStickerId === stk.id}
                prefersReducedMotion={prefersReducedMotion}
                onBringToFront={handleBringToFront}
                onUpdatePosition={handleUpdatePosition}
                onUpdateRotation={handleUpdateRotation}
                onDelete={handleDeleteSticker}
                onSelect={setSelectedStickerId}
                checkTrashOverlap={checkTrashOverlap}
                onDragStateChange={handleDragStateChange}
              />
            ))}

            {/* Trash Zone in bottom corner */}
            <div data-no-export="true">
              <TrashZone
                ref={trashZoneRef}
                isOverTrash={isOverTrash}
                isDraggingAny={isDraggingAny}
              />
            </div>
          </div>

          {/* Micro-Instructions Bar */}
          <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 min-w-0">
              <Info size={13} className="text-slate-400 shrink-0" />
              <span className="sm:hidden truncate">
                Tap to place · Drag & rotate on canvas
              </span>
              <span className="hidden sm:inline">
                Click to add · Drag to move · Rotate with handle or [ / ] keys · Click × to delete
              </span>
            </div>
            <span className="text-slate-400 font-semibold shrink-0 text-[11px] sm:text-xs">
              {tagData.stickers.length} stickers
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
