/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'motion/react';
import { PlacedSticker } from '../types';
import { getStickerDefinition } from '../utils/stickers';
import { RotateCw, RotateCcw } from 'lucide-react';

interface StickerProps {
  sticker: PlacedSticker;
  isSelected: boolean;
  isOverTrash: boolean;
  prefersReducedMotion: boolean;
  onBringToFront: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateRotation: (id: string, rotation: number) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string | null) => void;
  checkTrashOverlap?: (clientX: number, clientY: number) => boolean;
  onDragStateChange?: (id: string, isDragging: boolean, isOverTrash: boolean) => void;
}

export const Sticker: React.FC<StickerProps> = ({
  sticker,
  isSelected,
  isOverTrash,
  prefersReducedMotion,
  onBringToFront,
  onUpdatePosition,
  onUpdateRotation,
  onDelete,
  onSelect,
  checkTrashOverlap,
  onDragStateChange,
}) => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  // Store pointer start position and initial sticker offset
  const dragInfo = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    pointerId: number;
  }>({
    startX: 0,
    startY: 0,
    initialX: sticker.x,
    initialY: sticker.y,
    pointerId: -1,
  });

  // Find the matching sticker graphic component
  const definition = getStickerDefinition(sticker.type);
  const Component = definition.component;

  // Mount animation to bounce in visibly
  useEffect(() => {
    if (!prefersReducedMotion) {
      controls.start({
        scale: [0.6, 1.15, 0.95, 1],
        rotate: [sticker.rotation - 6, sticker.rotation + 3, sticker.rotation],
        opacity: 1,
        transition: { duration: 0.35, ease: 'easeOut' },
      });
    } else {
      controls.start({
        scale: 1,
        rotate: sticker.rotation,
        opacity: 1,
        transition: { duration: 0.1 },
      });
    }
  }, []);

  // Finish dragging and drop sticker down with spring/squash animation
  const finishDrag = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(false);

      // Check if dropped into trash zone
      if (checkTrashOverlap && checkTrashOverlap(clientX, clientY)) {
        onDragStateChange?.(sticker.id, false, false);
        onDelete(sticker.id);
        return;
      }

      onDragStateChange?.(sticker.id, false, false);

      // On drop: spring/squash animation (physics-based)
      if (!prefersReducedMotion) {
        controls.start({
          scale: [1.14, 0.9, 1.05, 0.98, 1],
          rotate: [sticker.rotation + 4, sticker.rotation - 1, sticker.rotation],
          opacity: 1,
          transition: {
            times: [0, 0.25, 0.55, 0.8, 1],
            duration: 0.4,
            ease: 'easeOut',
          },
        });
      } else {
        controls.start({
          scale: 1,
          rotate: sticker.rotation,
          opacity: 1,
          transition: { duration: 0.1 },
        });
      }
    },
    [checkTrashOverlap, controls, onDelete, onDragStateChange, prefersReducedMotion, sticker.id, sticker.rotation]
  );

  // Handle pointer down (pickup)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button
    if (e.button !== 0) return;
    e.stopPropagation();

    onBringToFront(sticker.id);
    onSelect(sticker.id);

    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: sticker.x,
      initialY: sticker.y,
      pointerId: e.pointerId,
    };

    setIsDragging(true);
    onDragStateChange?.(sticker.id, true, false);

    // On pickup animation: scale up ~1.1, rotate slightly
    if (!prefersReducedMotion) {
      controls.start({
        scale: 1.14,
        rotate: sticker.rotation + 4,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 25 },
      });
    }
  };

  // Window-level pointer listeners while dragging so sticker NEVER gets stuck!
  useEffect(() => {
    if (!isDragging) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - dragInfo.current.startX;
      const deltaY = e.clientY - dragInfo.current.startY;

      const nextX = Math.round(dragInfo.current.initialX + deltaX);
      const nextY = Math.round(dragInfo.current.initialY + deltaY);

      onUpdatePosition(sticker.id, nextX, nextY);

      if (checkTrashOverlap) {
        const overTrash = checkTrashOverlap(e.clientX, e.clientY);
        onDragStateChange?.(sticker.id, true, overTrash);
      }
    };

    const handleWindowPointerUp = (e: PointerEvent) => {
      finishDrag(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [isDragging, finishDrag, checkTrashOverlap, onDragStateChange, onUpdatePosition, sticker.id]);

  // Handle dragging the interactive rotation handle
  const handleRotatePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!dragRef.current) return;

    const rect = dragRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const startPointerAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const startRotation = sticker.rotation;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const currentPointerAngle = Math.atan2(moveEvt.clientY - centerY, moveEvt.clientX - centerX) * (180 / Math.PI);
      const angleDiff = currentPointerAngle - startPointerAngle;
      let newRot = Math.round(startRotation + angleDiff);

      // Snap near right angles (0°, 90°, -90°, 180°) if within 3°
      if (Math.abs(newRot) < 3) newRot = 0;
      else if (Math.abs(newRot - 90) < 3) newRot = 90;
      else if (Math.abs(newRot + 90) < 3) newRot = -90;
      else if (Math.abs(Math.abs(newRot) - 180) < 3) newRot = 180;

      onUpdateRotation(sticker.id, newRot);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  // Keyboard accessibility: Arrow keys to nudge, Delete to remove, [ / ] or Shift+Arrow to rotate
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Rotation keys (reversed so left arrow rotates to the left and right arrow rotates to the right)
    if (e.key === '[' || (e.shiftKey && e.key === 'ArrowLeft')) {
      e.preventDefault();
      onUpdateRotation(sticker.id, Math.round(sticker.rotation + 5));
      return;
    }
    if (e.key === ']' || (e.shiftKey && e.key === 'ArrowRight')) {
      e.preventDefault();
      onUpdateRotation(sticker.id, Math.round(sticker.rotation - 5));
      return;
    }
    if (e.key.toLowerCase() === 'r') {
      e.preventDefault();
      onUpdateRotation(sticker.id, Math.round(sticker.rotation - 15));
      return;
    }

    // Position nudging
    const step = e.shiftKey ? 20 : 6;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onUpdatePosition(sticker.id, sticker.x - step, sticker.y);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onUpdatePosition(sticker.id, sticker.x + step, sticker.y);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onUpdatePosition(sticker.id, sticker.x, sticker.y - step);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onUpdatePosition(sticker.id, sticker.x, sticker.y + step);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onDelete(sticker.id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onSelect(null);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onBringToFront(sticker.id);
      if (!prefersReducedMotion) {
        controls.start({
          scale: [1, 1.15, 0.95, 1],
          opacity: 1,
          transition: { duration: 0.3 },
        });
      }
    }
  };

  // Synchronize base rotation when not dragging
  useEffect(() => {
    if (!isDragging) {
      controls.start({
        rotate: sticker.rotation,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.15 },
      });
    }
  }, [sticker.rotation, isDragging, controls]);

  return (
    <motion.div
      ref={dragRef}
      tabIndex={0}
      role="button"
      aria-label={`${definition.name} sticker. Press arrow keys to move, [ / ] to rotate, Delete to remove.`}
      animate={controls}
      initial={{ scale: 0.6, rotate: sticker.rotation, opacity: 1 }}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={`absolute cursor-grab active:cursor-grabbing touch-none outline-none select-none transition-shadow ${
        isDragging ? 'z-50' : ''
      } ${
        isSelected
          ? 'ring-2 ring-blue-500/80 ring-offset-2 ring-offset-transparent rounded-2xl'
          : ''
      } ${isOverTrash ? 'opacity-50 grayscale contrast-125' : ''}`}
      style={{
        left: `${sticker.x}px`,
        top: `${sticker.y}px`,
        zIndex: sticker.zIndex,
        transformOrigin: 'center center',
      }}
    >
      {/* Rotation Handle protruding above sticker when selected */}
      {isSelected && !isDragging && (
        <div
          data-no-export="true"
          className="absolute left-1/2 -top-11 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-40 select-none"
        >
          {/* Circular Rotate Knob */}
          <div
            role="slider"
            aria-label="Rotate sticker"
            title="Drag to rotate sticker freely (or press [ and ])"
            onPointerDown={handleRotatePointerDown}
            className="w-7 h-7 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center shadow-md hover:scale-115 active:scale-95 cursor-grab active:cursor-grabbing hover:bg-blue-50 transition-transform"
          >
            <RotateCw size={12} strokeWidth={2.5} />
          </div>
          {/* Vertical connecting indicator line */}
          <div className="w-0.5 h-3.5 bg-blue-500/80" />
        </div>
      )}

      {/* Main Sticker Graphic */}
      <div
        className={`transition-all duration-150 ${
          isDragging
            ? 'sticker-drop-shadow-drag'
            : 'hover:sticker-drop-shadow-hover sticker-drop-shadow'
        }`}
      >
        <Component customText={sticker.customText} />
      </div>

      {/* Accessible delete pill button when selected */}
      {isSelected && !isDragging && (
        <button
          type="button"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(sticker.id);
          }}
          aria-label="Delete sticker"
          title="Delete sticker (or press Delete)"
          className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-sm font-black shadow-lg hover:scale-115 active:scale-90 transition-all cursor-pointer z-30 border-2 border-white pointer-events-auto select-none"
        >
          ×
        </button>
      )}

      {/* Floating Quick Rotate Pill below selected sticker */}
      {isSelected && !isDragging && (
        <div
          data-no-export="true"
          className="absolute left-1/2 -bottom-9 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-slate-900/90 backdrop-blur-xs text-white rounded-full shadow-lg border border-slate-700/60 text-[10px] font-bold z-40 whitespace-nowrap pointer-events-auto animate-in fade-in duration-100"
        >
          <button
            type="button"
            title="Rotate left"
            aria-label="Rotate left"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onUpdateRotation(sticker.id, sticker.rotation + 15);
            }}
            className="p-1 hover:bg-slate-700 rounded-full transition-colors cursor-pointer text-slate-300 hover:text-white"
          >
            <RotateCcw size={11} />
          </button>
          <button
            type="button"
            title="Reset rotation to 0°"
            aria-label="Reset rotation to 0°"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onUpdateRotation(sticker.id, 0);
            }}
            className="px-1.5 py-0.5 hover:bg-slate-700 rounded text-[10px] text-amber-300 font-mono transition-colors cursor-pointer"
          >
            {Math.round(sticker.rotation)}°
          </button>
          <button
            type="button"
            title="Rotate right"
            aria-label="Rotate right"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onUpdateRotation(sticker.id, sticker.rotation - 15);
            }}
            className="p-1 hover:bg-slate-700 rounded-full transition-colors cursor-pointer text-slate-300 hover:text-white"
          >
            <RotateCw size={11} />
          </button>
        </div>
      )}
    </motion.div>
  );
};
