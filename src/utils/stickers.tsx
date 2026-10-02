/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StickerType } from '../types';

export interface StickerDefinition {
  type: StickerType;
  name: string;
  defaultRotation: number;
  width: number;
  height: number;
  previewScale?: number;
  component: React.FC<{ customText?: string; className?: string }>;
}

/**
 * Red/Coral Starburst sticker with "CREATIVE" angled text
 * Exact aesthetic matching the reference image
 */
export const StarburstSticker: React.FC<{ customText?: string; className?: string }> = ({
  customText = 'CREATIVE',
  className = '',
}) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <svg
        width="110"
        height="110"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Symmetric 14-point starburst shape centered perfectly at (60, 60) */}
        <polygon
          points="60,6 68.5,23 83.4,11.3 83.7,30.3 102.2,26.3 94.2,43.5 112.6,48 98,60 112.6,72 94.2,76.5 102.2,93.7 83.7,89.7 83.4,108.7 68.5,97 60,114 51.5,97 36.6,108.7 36.3,89.7 17.8,93.7 25.8,76.5 7.4,72 22,60 7.4,48 25.8,43.5 17.8,26.3 36.3,30.3 36.6,11.3 51.5,23"
          fill="#ff5c6a"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Inner subtle glow accent */}
        <polygon
          points="60,16 66.7,30.8 79.1,20.4 78.7,36.5 94.4,32.6 87,47 102.9,50.2 90,60 102.9,69.8 87,73 94.4,87.4 78.7,83.5 79.1,99.6 66.7,89.2 60,104 53.3,89.2 40.9,99.6 41.3,83.5 25.6,87.4 33,73 17.1,69.8 30,60 17.1,50.2 33,47 25.6,32.6 41.3,36.5 40.9,20.4 53.3,30.8"
          fill="#ff717e"
        />
        {/* White bold angled text centered perfectly in starburst */}
        <g transform="rotate(-12 60 60)">
          <text
            x="60"
            y="60"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize="14"
            fontWeight="900"
            fontFamily="'DM Sans', system-ui, sans-serif"
            style={{
              textShadow: '0 1.5px 0 rgba(0,0,0,0.35)',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))',
            }}
          >
            {customText}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Sunshine Yellow Smiley Sticker
 * Chunky black border and hard drop shadow matching reference
 */
export const SmileySticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <svg
        width="76"
        height="76"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Yellow circular base */}
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="#ffd13b"
          stroke="#000000"
          strokeWidth="4"
        />
        {/* Left eye dot */}
        <ellipse cx="28" cy="33" rx="4" ry="4.5" fill="#000000" />
        {/* Right eye dot */}
        <ellipse cx="52" cy="33" rx="4" ry="4.5" fill="#000000" />
        {/* Big smile arc */}
        <path
          d="M 27 46 C 30 57, 50 57, 53 46"
          stroke="#000000"
          strokeWidth="4.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tiny gloss highlight */}
        <path
          d="M 19 24 C 23 16, 32 12, 42 12"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

/**
 * #1 Tvisha Fan Badge Sticker
 * Playful, vibrant pink & gold badge with crown & sparkle
 */
export const TvishaFanSticker: React.FC<{ customText?: string; className?: string }> = ({
  customText = '#1 TVISHA FAN',
  className = '',
}) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#ec4899] text-white font-black text-[13.5px] tracking-wide rounded-2xl border-[3.5px] border-black shadow-[3.5px_4px_0px_#000000] whitespace-nowrap">
        {/* Gold Crown */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#fde047"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
        >
          <path d="M 3 18 L 21 18 L 19 8 L 14 13 L 12 5 L 10 13 L 5 8 Z" />
          <circle cx="12" cy="4" r="1.5" fill="#ffffff" stroke="#000" strokeWidth="1" />
        </svg>
        <span className="drop-shadow-[0_1.5px_0_rgba(0,0,0,0.6)] font-black uppercase tracking-wider">
          {customText}
        </span>
        {/* Sparkle */}
        <span className="text-amber-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] text-xs font-black">
          ✨
        </span>
      </div>
    </div>
  );
};

/**
 * Chunky Yellow Directional Arrow Sticker
 * Iconic, bold, comic-style chunky arrow pointing down-right
 */
export const ArrowSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <svg
        width="62"
        height="62"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <g transform="rotate(38 32 32)">
          {/* Arrow outline & base yellow shape */}
          <path
            d="M 8 22 L 32 22 L 32 10 L 56 32 L 32 54 L 32 42 L 8 42 Z"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Bright yellow face fill */}
          <path
            d="M 11 25 L 32 25 L 32 16 L 49 32 L 32 48 L 32 39 L 11 39 Z"
            fill="#fde047"
          />
          {/* White glossy highlight bar */}
          <path
            d="M 14 26 L 30 26"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 34 22 L 44 31"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * Matcha Sticker (Replaces Coffee)
 * Beautiful matcha green badge with cute steaming matcha bowl
 */
export const MatchaSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#15803d] text-[#bbf7d0] font-black text-xs md:text-[13px] tracking-wide rounded-2xl border-[3.5px] border-black shadow-[3.5px_4px_0px_#000000] whitespace-nowrap">
        {/* Matcha Bowl SVG */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Bowl */}
          <path
            d="M 4 10 C 4 17, 7 20, 12 20 C 17 20, 20 17, 20 10 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
          />
          {/* Matcha green liquid */}
          <path
            d="M 5 11 C 7 15, 17 15, 19 11 Z"
            fill="#4ade80"
          />
          {/* Steam */}
          <path
            d="M 9 7 C 8 5, 10 4, 9 2"
            stroke="#bbf7d0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 15 6 C 14 4, 16 3, 15 1"
            stroke="#bbf7d0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span className="tracking-wider uppercase text-white font-extrabold drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]">
          MATCHA
        </span>
      </div>
    </div>
  );
};

/**
 * Fire / 100 Hot Sticker
 */
export const FireSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <div className="inline-flex items-center justify-center gap-1.5 pl-2.5 pr-3 py-1.5 bg-[#ea580c] text-white font-black rounded-2xl border-[3.5px] border-black shadow-[3.5px_4px_0px_#000000] whitespace-nowrap">
        {/* Crisp vector flame */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
        >
          <path
            d="M 12 2 C 12 2, 7 8, 7 13.5 C 7 18, 9.5 21.5, 12 21.5 C 14.5 21.5, 17 18, 17 13.5 C 17 9.5, 14 6.5, 14 6.5 C 14 6.5, 13.5 8.5, 12 9.5 C 11.5 7.5, 12 2, 12 2 Z"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M 12 12.5 C 11 12.5, 9.5 14, 9.5 16 C 9.5 18, 10.5 19.5, 12 19.5 C 13.5 19.5, 14.5 18, 14.5 16 C 14.5 14, 13 13, 12 12.5 Z"
            fill="#ef4444"
          />
        </svg>
        <span className="uppercase font-black text-sm leading-none text-white drop-shadow-[0_1.5px_0_rgba(0,0,0,0.5)] tracking-wider flex items-center pt-0.5">
          HOT
        </span>
      </div>
    </div>
  );
};

/**
 * Pink Chunky Heart Sticker
 */
export const HeartSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <svg
        width="68"
        height="64"
        viewBox="0 0 74 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path
          d="M 37 64 C 37 64, 8 46, 8 23 C 8 11, 18 5, 27 5 C 33 5, 36 9, 37 12 C 38 9, 41 5, 47 5 C 56 5, 66 11, 66 23 C 66 46, 37 64, 37 64 Z"
          fill="#f43f5e"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Gloss highlight */}
        <path
          d="M 17 18 C 17 13, 23 9, 29 9"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

/**
 * Verified Badge Sticker
 */
export const VerifiedSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#10b981] text-white font-black text-xs tracking-wider rounded-full border-[3.5px] border-black shadow-[3.5px_4px_0px_#000000] whitespace-nowrap">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="tracking-widest uppercase">VERIFIED</span>
      </div>
    </div>
  );
};

/**
 * Sparkles Cluster Sticker
 */
export const SparklesSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <svg
        width="66"
        height="66"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Main Star */}
        <path
          d="M 35 6 Q 35 26 55 26 Q 35 26 35 46 Q 35 26 15 26 Q 35 26 35 6 Z"
          fill="#facc15"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Secondary Star */}
        <path
          d="M 52 40 Q 52 50 62 50 Q 52 50 52 60 Q 52 50 42 50 Q 52 50 52 40 Z"
          fill="#fde047"
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Small sparkle */}
        <circle cx="18" cy="48" r="3.5" fill="#facc15" stroke="#000000" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

/**
 * Work In Progress (WIP) Badge
 */
export const WipSticker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative select-none sticker-drop-shadow ${className}`}>
      <div className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#f59e0b] text-black font-black text-xs rounded-lg border-[3.5px] border-black shadow-[3.5px_4px_0px_#000000] whitespace-nowrap">
        <span className="text-sm">🚧</span>
        <span className="tracking-wider uppercase font-black text-slate-950">WIP</span>
      </div>
    </div>
  );
};

export const STICKER_CATALOG: StickerDefinition[] = [
  {
    type: 'tvisha_fan',
    name: '#1 Tvisha Fan',
    defaultRotation: 4,
    width: 148,
    height: 44,
    previewScale: 0.52,
    component: TvishaFanSticker,
  },
  {
    type: 'starburst',
    name: 'Creative Star',
    defaultRotation: -12,
    width: 110,
    height: 110,
    previewScale: 0.62,
    component: StarburstSticker,
  },
  {
    type: 'smiley',
    name: 'Happy Smiley',
    defaultRotation: 8,
    width: 76,
    height: 76,
    previewScale: 0.72,
    component: SmileySticker,
  },
  {
    type: 'matcha',
    name: 'Matcha Cup',
    defaultRotation: -3,
    width: 112,
    height: 44,
    previewScale: 0.64,
    component: MatchaSticker,
  },
  {
    type: 'arrow',
    name: 'Chunky Arrow',
    defaultRotation: 2,
    width: 62,
    height: 62,
    previewScale: 0.72,
    component: ArrowSticker,
  },
  {
    type: 'heart',
    name: 'Glossy Heart',
    defaultRotation: -8,
    width: 68,
    height: 64,
    previewScale: 0.7,
    component: HeartSticker,
  },
  {
    type: 'fire',
    name: 'Fire Badge',
    defaultRotation: -5,
    width: 96,
    height: 44,
    previewScale: 0.65,
    component: FireSticker,
  },
  {
    type: 'sparkles',
    name: 'Magic Sparkles',
    defaultRotation: 6,
    width: 66,
    height: 66,
    previewScale: 0.7,
    component: SparklesSticker,
  },
  {
    type: 'verified',
    name: 'Verified Badge',
    defaultRotation: -6,
    width: 120,
    height: 44,
    previewScale: 0.6,
    component: VerifiedSticker,
  },
  {
    type: 'wip',
    name: 'Work In Progress',
    defaultRotation: -3,
    width: 90,
    height: 44,
    previewScale: 0.68,
    component: WipSticker,
  },
];

// Helper to look up definition even for legacy types
export function getStickerDefinition(type: StickerType): StickerDefinition {
  if (type === 'hire_me') {
    return STICKER_CATALOG[0]; // maps to tvisha_fan
  }
  if (type === 'coffee') {
    const matchaDef = STICKER_CATALOG.find((s) => s.type === 'matcha');
    if (matchaDef) return matchaDef;
  }
  return STICKER_CATALOG.find((s) => s.type === type) || STICKER_CATALOG[0];
}
