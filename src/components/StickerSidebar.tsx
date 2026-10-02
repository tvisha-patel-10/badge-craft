/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { STICKER_CATALOG, StickerDefinition } from '../utils/stickers';
import { StickerType, CardColor } from '../types';
import { CARD_COLORS } from '../utils/cardThemes';
import { Smile, Trash2, Palette, ArrowRight } from 'lucide-react';

interface StickerSidebarProps {
  onSpawnSticker: (type: StickerType, x?: number, y?: number) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onDragStateChange?: (isDragging: boolean) => void;
  selectedColorId: string;
  onSelectColor: (color: CardColor) => void;
  onClearStickers: () => void;
  stickerCount: number;
  onMobileDone?: () => void;
}

export const StickerSidebar: React.FC<StickerSidebarProps> = ({
  onSpawnSticker,
  canvasRef,
  onDragStateChange,
  selectedColorId,
  onSelectColor,
  onClearStickers,
  stickerCount,
  onMobileDone,
}) => {
  const [activeGhost, setActiveGhost] = useState<{
    type: StickerType;
    definition: StickerDefinition;
    clientX: number;
    clientY: number;
  } | null>(null);

  const [recentlyAddedType, setRecentlyAddedType] = useState<StickerType | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'badges' | 'fun'>('all');

  const dragSessionRef = useRef<{
    type: StickerType;
    definition: StickerDefinition;
    startX: number;
    startY: number;
    hasDragged: boolean;
  } | null>(null);

  // Clean up ghost if unmounted
  useEffect(() => {
    return () => {
      onDragStateChange?.(false);
    };
  }, [onDragStateChange]);

  const startDrag = (e: React.PointerEvent, definition: StickerDefinition) => {
    // Only primary mouse button or touch
    if (e.button !== 0) return;

    dragSessionRef.current = {
      type: definition.type,
      definition,
      startX: e.clientX,
      startY: e.clientY,
      hasDragged: false,
    };

    const handleWindowPointerMove = (moveEvt: PointerEvent) => {
      if (!dragSessionRef.current) return;

      const dx = moveEvt.clientX - dragSessionRef.current.startX;
      const dy = moveEvt.clientY - dragSessionRef.current.startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Threshold to distinguish between a tap/click and an intentional drag
      if (dist > 12 || dragSessionRef.current.hasDragged) {
        if (!dragSessionRef.current.hasDragged) {
          dragSessionRef.current.hasDragged = true;
          onDragStateChange?.(true);
        }

        setActiveGhost({
          type: dragSessionRef.current.type,
          definition: dragSessionRef.current.definition,
          clientX: moveEvt.clientX,
          clientY: moveEvt.clientY,
        });
      }
    };

    const handleWindowPointerUp = (upEvt: PointerEvent) => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);

      const session = dragSessionRef.current;
      dragSessionRef.current = null;
      setActiveGhost(null);
      onDragStateChange?.(false);

      if (!session) return;

      if (session.hasDragged) {
        // User dragged out of the sidebar: drop onto canvas
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const isOverCanvas =
            upEvt.clientX >= rect.left - 20 &&
            upEvt.clientX <= rect.right + 20 &&
            upEvt.clientY >= rect.top - 20 &&
            upEvt.clientY <= rect.bottom + 20;

          if (isOverCanvas) {
            const dropX = Math.max(
              15,
              Math.min(rect.width - session.definition.width - 15, upEvt.clientX - rect.left - session.definition.width / 2)
            );
            const dropY = Math.max(
              15,
              Math.min(rect.height - session.definition.height - 15, upEvt.clientY - rect.top - session.definition.height / 2)
            );
            onSpawnSticker(session.type, dropX, dropY);
            return;
          }
        }
        // Fallback if dropped outside canvas: spawn on tag
        handleDirectClick(session.type);
      } else {
        // Simple tap or click without dragging: place directly on tag
        handleDirectClick(session.type);
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);
  };

  const handleDirectClick = (type: StickerType) => {
    onSpawnSticker(type);
    setRecentlyAddedType(type);
    setTimeout(() => setRecentlyAddedType(null), 900);
  };

  const filteredStickers = STICKER_CATALOG.filter((item) => {
    if (selectedFilter === 'badges') {
      return ['tvisha_fan', 'starburst', 'verified', 'wip', 'matcha'].includes(item.type);
    }
    if (selectedFilter === 'fun') {
      return ['smiley', 'heart', 'fire', 'sparkles', 'arrow'].includes(item.type);
    }
    return true;
  });

  return (
    <>
      {/* 
        Single unified scroll on mobile to eliminate double scrollbars:
        Badge Color is at the top so it is immediately accessible.
      */}
      <aside className="w-full lg:w-80 shrink-0 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col p-3.5 sm:p-4 gap-3 select-none overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[840px] custom-scrollbar">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs border border-amber-500/30 shrink-0">
              <Smile size={18} strokeWidth={2.4} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none">Stickers & styles</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Tap to place or drag to canvas
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full shrink-0">
            {STICKER_CATALOG.length} styles
          </span>
        </div>

        {/* 
          1. Badge Color Swatches:
          Positioned right at the top so users never have to scroll down to find it!
        */}
        <div className="p-2.5 bg-slate-50/90 rounded-2xl border border-slate-200/60 flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Palette size={13} className="text-slate-500" />
              Badge color
            </span>
            <span className="text-[11px] text-slate-400 capitalize font-medium">
              {CARD_COLORS.find((c) => c.id === selectedColorId)?.name || 'White'}
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 pt-0.5">
            {CARD_COLORS.map((color) => {
              const isSelected = color.id === selectedColorId;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onSelectColor(color)}
                  aria-label={`Select ${color.name} background`}
                  title={`${color.name} background`}
                  className={`h-7 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-center ${
                    color.id === 'white' ? 'border border-slate-300' : ''
                  } ${
                    isSelected
                      ? 'ring-2 ring-blue-600 scale-105 shadow-xs'
                      : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
          </div>
        </div>

        {/* 2. Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold shrink-0">
          {(['all', 'badges', 'fun'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`flex-1 py-1 rounded-lg text-center capitalize transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 3. Stickers Grid (Single natural layout, no separate trapped scrollbar on mobile) */}
        <div className="grid grid-cols-2 gap-2.5 pt-0.5">
          {filteredStickers.map((item) => {
            const Comp = item.component;
            const isJustAdded = recentlyAddedType === item.type;
            return (
              <div
                key={item.type}
                role="button"
                tabIndex={0}
                aria-label={`Add ${item.name} sticker`}
                title="Click to place on name tag, or drag onto canvas"
                onPointerDown={(e) => startDrag(e, item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDirectClick(item.type);
                  }
                }}
                className={`group relative flex flex-col items-center justify-between p-2.5 rounded-2xl border transition-all cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-md active:scale-95 overflow-hidden ${
                  isJustAdded
                    ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                    : 'bg-slate-50/70 hover:bg-white border-slate-200/80'
                }`}
                style={{ minHeight: '108px' }}
              >
                {/* Sticker Graphic Container */}
                <div className="w-full h-16 flex items-center justify-center pointer-events-none overflow-hidden py-1">
                  <div
                    className="origin-center transition-transform group-hover:scale-105"
                    style={{
                      transform: `scale(${item.previewScale || 0.65})`,
                    }}
                  >
                    <Comp />
                  </div>
                </div>

                {/* Sticker Label and Add Button */}
                <div className="w-full flex items-center justify-between gap-1 pt-1.5 border-t border-slate-200/40 pointer-events-none min-w-0">
                  <span className="text-[11px] font-semibold text-slate-700 truncate min-w-0 leading-tight">
                    {item.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap inline-flex items-center gap-0.5 transition-colors leading-tight ${
                      isJustAdded
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200/80 text-slate-700 group-hover:bg-blue-600 group-hover:text-white'
                    }`}
                  >
                    {isJustAdded ? '✓ Added' : '+ Add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Action Buttons: Clear Stickers + Mobile Done Button */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 shrink-0">
          {stickerCount > 0 && (
            <button
              type="button"
              onClick={onClearStickers}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <Trash2 size={13} className="text-red-500" />
              <span>Clear all stickers ({stickerCount})</span>
            </button>
          )}

          {/* Quick jump back to Playground on Mobile */}
          {onMobileDone && (
            <button
              type="button"
              onClick={onMobileDone}
              className="lg:hidden w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
            >
              <span>View on playground</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </aside>

      {/* Floating Ghost when dragging from sidebar onto canvas */}
      {activeGhost && (
        <div
          className="fixed pointer-events-none z-[120] -translate-x-1/2 -translate-y-1/2 sticker-drop-shadow-drag"
          style={{
            left: `${activeGhost.clientX}px`,
            top: `${activeGhost.clientY}px`,
            transform: `translate(-50%, -50%) rotate(${activeGhost.definition.defaultRotation + 4}deg) scale(1.12)`,
          }}
        >
          <activeGhost.definition.component />
        </div>
      )}
    </>
  );
};
