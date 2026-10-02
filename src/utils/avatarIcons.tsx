/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface AvatarIconItem {
  id: string;
  name: string;
  category: 'animals' | 'food' | 'vibes';
  component: React.FC<{ className?: string }>;
}

export const AVATAR_ICONS: Record<string, AvatarIconItem> = {
  // Animals
  cat: {
    id: 'cat',
    name: 'Whiskers Cat',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Cat head base */}
        <circle cx="20" cy="22" r="14" fill="#fb923c" stroke="#1e293b" strokeWidth="2.5" />
        {/* Left ear */}
        <polygon points="9,14 15,6 18,13" fill="#fb923c" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="11,13 15,8 17,12" fill="#fda4af" />
        {/* Right ear */}
        <polygon points="31,14 25,6 22,13" fill="#fb923c" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="29,13 25,8 23,12" fill="#fda4af" />
        {/* Eyes */}
        <ellipse cx="15" cy="20" rx="2" ry="2.5" fill="#1e293b" />
        <ellipse cx="25" cy="20" rx="2" ry="2.5" fill="#1e293b" />
        <circle cx="14.2" cy="19.2" r="0.8" fill="#ffffff" />
        <circle cx="24.2" cy="19.2" r="0.8" fill="#ffffff" />
        {/* Nose & mouth */}
        <polygon points="18.5,24 21.5,24 20,25.5" fill="#e11d48" />
        <path d="M 17 26.5 C 18.5 28, 20 27, 20 25.5 C 20 27, 21.5 28, 23 26.5" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
        {/* Whiskers */}
        <line x1="8" y1="22" x2="13" y2="23" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="26" x2="13" y2="25" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="22" x2="27" y2="23" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="26" x2="27" y2="25" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },

  dog: {
    id: 'dog',
    name: 'Happy Pup',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Floppy Left Ear */}
        <path d="M 8 16 C 5 21, 6 29, 10 29 C 13 29, 13 22, 12 16 Z" fill="#92400e" stroke="#1e293b" strokeWidth="2.5" />
        {/* Floppy Right Ear */}
        <path d="M 32 16 C 35 21, 34 29, 30 29 C 27 29, 27 22, 28 16 Z" fill="#92400e" stroke="#1e293b" strokeWidth="2.5" />
        {/* Head */}
        <circle cx="20" cy="21" r="13" fill="#fcd34d" stroke="#1e293b" strokeWidth="2.5" />
        {/* Eye patch */}
        <ellipse cx="15" cy="18" rx="4.5" ry="5.5" fill="#f59e0b" />
        {/* Eyes */}
        <circle cx="15" cy="18" r="2" fill="#1e293b" />
        <circle cx="25" cy="18" r="2" fill="#1e293b" />
        <circle cx="14.2" cy="17.2" r="0.7" fill="#ffffff" />
        <circle cx="24.2" cy="17.2" r="0.7" fill="#ffffff" />
        {/* Snout */}
        <ellipse cx="20" cy="25" rx="5" ry="3.8" fill="#ffffff" stroke="#1e293b" strokeWidth="1.8" />
        <ellipse cx="20" cy="23.5" rx="2.5" ry="1.8" fill="#1e293b" />
        {/* Tongue */}
        <path d="M 19 26 C 19 29, 21 29, 21 26 Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.2" />
      </svg>
    ),
  },

  panda: {
    id: 'panda',
    name: 'Cozy Panda',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Ears */}
        <circle cx="10" cy="13" r="5" fill="#1e293b" />
        <circle cx="30" cy="13" r="5" fill="#1e293b" />
        {/* Head */}
        <circle cx="20" cy="22" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
        {/* Eye patches */}
        <ellipse cx="14" cy="20" rx="3.5" ry="4.5" fill="#1e293b" transform="rotate(-15 14 20)" />
        <ellipse cx="26" cy="20" rx="3.5" ry="4.5" fill="#1e293b" transform="rotate(15 26 20)" />
        {/* White pupils */}
        <circle cx="14.5" cy="19.5" r="1.3" fill="#ffffff" />
        <circle cx="25.5" cy="19.5" r="1.3" fill="#ffffff" />
        {/* Nose */}
        <ellipse cx="20" cy="25" rx="2.5" ry="1.8" fill="#1e293b" />
        {/* Smile */}
        <path d="M 18 28 C 19 29.5, 21 29.5, 22 28" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
        {/* Pink cheeks */}
        <circle cx="11" cy="24" r="2" fill="#fda4af" opacity="0.8" />
        <circle cx="29" cy="24" r="2" fill="#fda4af" opacity="0.8" />
      </svg>
    ),
  },

  fox: {
    id: 'fox',
    name: 'Clever Fox',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Ears */}
        <polygon points="8,15 14,5 18,14" fill="#ea580c" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="10,13 14,8 16,13" fill="#1e293b" />
        <polygon points="32,15 26,5 22,14" fill="#ea580c" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="30,13 26,8 24,13" fill="#1e293b" />
        {/* Head */}
        <path d="M 8 20 C 8 28, 20 33, 20 33 C 20 33, 32 28, 32 20 C 32 13, 20 12, 20 12 C 20 12, 8 13, 8 20 Z" fill="#ea580c" stroke="#1e293b" strokeWidth="2.5" />
        {/* White cheeks */}
        <path d="M 9 20 C 13 24, 18 28, 20 32 C 16 31, 10 27, 9 20 Z" fill="#ffffff" />
        <path d="M 31 20 C 27 24, 22 28, 20 32 C 24 31, 30 27, 31 20 Z" fill="#ffffff" />
        {/* Eyes */}
        <ellipse cx="15" cy="19" rx="1.8" ry="2.2" fill="#1e293b" />
        <ellipse cx="25" cy="19" rx="1.8" ry="2.2" fill="#1e293b" />
        {/* Nose */}
        <circle cx="20" cy="31" r="2" fill="#1e293b" />
      </svg>
    ),
  },

  bunny: {
    id: 'bunny',
    name: 'Sweet Bunny',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Left Ear */}
        <path d="M 12 18 C 10 10, 12 4, 15 4 C 18 4, 18 10, 16 18 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M 13 15 C 12 10, 13 6, 15 6 C 16 6, 16 10, 15 15 Z" fill="#f472b6" />
        {/* Right Ear */}
        <path d="M 28 18 C 30 10, 28 4, 25 4 C 22 4, 22 10, 24 18 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M 27 15 C 28 10, 27 6, 25 6 C 24 6, 24 10, 25 15 Z" fill="#f472b6" />
        {/* Head */}
        <circle cx="20" cy="25" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
        {/* Eyes */}
        <circle cx="16" cy="23" r="1.8" fill="#1e293b" />
        <circle cx="24" cy="23" r="1.8" fill="#1e293b" />
        {/* Nose */}
        <polygon points="19,27 21,27 20,28.5" fill="#f43f5e" />
        {/* Cheeks */}
        <circle cx="13" cy="26" r="2" fill="#fda4af" opacity="0.8" />
        <circle cx="27" cy="26" r="2" fill="#fda4af" opacity="0.8" />
      </svg>
    ),
  },

  duck: {
    id: 'duck',
    name: 'Rubber Duckie',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Head */}
        <circle cx="18" cy="18" r="10" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
        {/* Body */}
        <path d="M 10 24 C 10 24, 8 32, 18 32 C 28 32, 33 26, 33 22 C 33 19, 29 20, 26 22 Z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Eye */}
        <circle cx="16" cy="16" r="2" fill="#1e293b" />
        <circle cx="15.2" cy="15.2" r="0.7" fill="#ffffff" />
        {/* Beak */}
        <ellipse cx="26" cy="20" rx="4.5" ry="3" fill="#f97316" stroke="#1e293b" strokeWidth="2" />
      </svg>
    ),
  },

  frog: {
    id: 'frog',
    name: 'Happy Frog',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Big frog eyes */}
        <circle cx="13" cy="15" r="5" fill="#22c55e" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="27" cy="15" r="5" fill="#22c55e" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="13" cy="14" r="2.5" fill="#1e293b" />
        <circle cx="27" cy="14" r="2.5" fill="#1e293b" />
        <circle cx="12" cy="13" r="1" fill="#ffffff" />
        <circle cx="26" cy="13" r="1" fill="#ffffff" />
        {/* Face */}
        <ellipse cx="20" cy="23" rx="14" ry="10" fill="#4ade80" stroke="#1e293b" strokeWidth="2.5" />
        {/* Wide smile */}
        <path d="M 12 24 C 16 29, 24 29, 28 24" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Cheeks */}
        <circle cx="10" cy="22" r="2" fill="#fb7185" opacity="0.8" />
        <circle cx="30" cy="22" r="2" fill="#fb7185" opacity="0.8" />
      </svg>
    ),
  },

  bear: {
    id: 'bear',
    name: 'Teddy Bear',
    category: 'animals',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Ears */}
        <circle cx="11" cy="13" r="4.5" fill="#b45309" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="11" cy="13" r="2" fill="#d97706" />
        <circle cx="29" cy="13" r="4.5" fill="#b45309" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="29" cy="13" r="2" fill="#d97706" />
        {/* Head */}
        <circle cx="20" cy="22" r="13" fill="#b45309" stroke="#1e293b" strokeWidth="2.5" />
        {/* Snout */}
        <ellipse cx="20" cy="25" rx="5.5" ry="4" fill="#fde68a" stroke="#1e293b" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="15" cy="19" r="1.8" fill="#1e293b" />
        <circle cx="25" cy="19" r="1.8" fill="#1e293b" />
        {/* Nose & mouth */}
        <ellipse cx="20" cy="24" rx="2.2" ry="1.5" fill="#1e293b" />
        <path d="M 20 25.5 L 20 27" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    ),
  },

  // Food
  matcha_cup: {
    id: 'matcha_cup',
    name: 'Matcha Latte',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Cup */}
        <path d="M 10 16 L 12 32 C 12 34, 28 34, 28 32 L 30 16 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Cup sleeve */}
        <path d="M 11 20 L 11.8 28 L 28.2 28 L 29 20 Z" fill="#15803d" stroke="#1e293b" strokeWidth="2" />
        {/* Matcha foam surface */}
        <ellipse cx="20" cy="16" rx="10" ry="3.5" fill="#86efac" stroke="#1e293b" strokeWidth="2" />
        {/* Heart latte art */}
        <path d="M 20 17.5 C 20 17.5, 17 15, 18.5 14 C 19.5 13.5, 20 14.5, 20 14.5 C 20 14.5, 20.5 13.5, 21.5 14 C 23 15, 20 17.5, 20 17.5 Z" fill="#166534" />
        {/* Steam swirls */}
        <path d="M 16 11 C 15 8, 17 6, 16 4" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
        <path d="M 23 10 C 22 7, 24 5, 23 3" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  boba: {
    id: 'boba',
    name: 'Boba Milk Tea',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Straw */}
        <line x1="20" y1="4" x2="20" y2="18" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
        {/* Cup */}
        <path d="M 11 14 L 13 32 C 13 35, 27 35, 27 32 L 29 14 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Lid */}
        <ellipse cx="20" cy="14" rx="10" ry="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
        {/* Pearls */}
        <circle cx="16" cy="30" r="2" fill="#1e293b" />
        <circle cx="21" cy="31" r="2" fill="#1e293b" />
        <circle cx="25" cy="29" r="2" fill="#1e293b" />
        <circle cx="18" cy="27" r="2" fill="#1e293b" />
        <circle cx="23" cy="26" r="2" fill="#1e293b" />
      </svg>
    ),
  },

  pizza: {
    id: 'pizza',
    name: 'Pizza Slice',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Crust & Cheese */}
        <path d="M 20 6 L 33 29 C 31 32, 9 32, 7 29 Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Crust top */}
        <path d="M 6 29 C 9 34, 31 34, 34 29" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
        {/* Pepperoni */}
        <circle cx="18" cy="16" r="2.5" fill="#dc2626" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="23" cy="24" r="2.8" fill="#dc2626" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="14" cy="26" r="2.2" fill="#dc2626" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    ),
  },

  taco: {
    id: 'taco',
    name: 'Tasty Taco',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Shell */}
        <path d="M 6 26 C 6 12, 34 12, 34 26 Z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
        {/* Fillings */}
        <path d="M 10 24 Q 13 18 17 22 Q 21 16 25 21 Q 29 18 31 24" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="21" r="1.8" fill="#dc2626" />
        <circle cx="22" cy="19" r="1.8" fill="#dc2626" />
        <circle cx="28" cy="21" r="1.8" fill="#dc2626" />
        <path d="M 9 26 L 31 26" stroke="#ca8a04" strokeWidth="2" />
      </svg>
    ),
  },

  avocado: {
    id: 'avocado',
    name: 'Fresh Avocado',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Skin & Flesh */}
        <path d="M 20 6 C 14 6, 9 14, 9 23 C 9 30, 14 34, 20 34 C 26 34, 31 30, 31 23 C 31 14, 26 6, 20 6 Z" fill="#bbf7d0" stroke="#15803d" strokeWidth="3.5" />
        {/* Pit */}
        <circle cx="20" cy="25" r="5" fill="#78350f" stroke="#1e293b" strokeWidth="2" />
        <circle cx="18.5" cy="23.5" r="1.2" fill="#ffffff" opacity="0.6" />
      </svg>
    ),
  },

  donut: {
    id: 'donut',
    name: 'Glazed Donut',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Dough */}
        <circle cx="20" cy="20" r="13" fill="#fde68a" stroke="#1e293b" strokeWidth="2.5" />
        {/* Pink Frosting */}
        <path d="M 20 8 C 26 8, 31 12, 31 18 C 30 21, 28 19, 26 22 C 24 25, 23 20, 20 22 C 17 24, 15 21, 13 23 C 10 21, 8 24, 9 18 C 9 12, 14 8, 20 8 Z" fill="#f43f5e" />
        {/* Hole */}
        <circle cx="20" cy="20" r="4.5" fill="#f7f9fa" stroke="#1e293b" strokeWidth="2.5" />
        {/* Sprinkles */}
        <line x1="15" y1="12" x2="17" y2="13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="23" y1="11" x2="25" y2="13" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26" y1="17" x2="28" y2="18" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },

  ice_cream: {
    id: 'ice_cream',
    name: 'Soft Serve',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Cone */}
        <polygon points="13,20 27,20 20,35" fill="#f59e0b" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="16" y1="24" x2="23" y2="30" stroke="#b45309" strokeWidth="1.5" />
        <line x1="24" y1="24" x2="17" y2="30" stroke="#b45309" strokeWidth="1.5" />
        {/* Swirled Ice Cream */}
        <circle cx="16" cy="18" r="4.5" fill="#ec4899" stroke="#1e293b" strokeWidth="2" />
        <circle cx="24" cy="18" r="4.5" fill="#ec4899" stroke="#1e293b" strokeWidth="2" />
        <circle cx="20" cy="13" r="5" fill="#f472b6" stroke="#1e293b" strokeWidth="2" />
        <circle cx="20" cy="7" r="3" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2" />
        {/* Cherry */}
        <circle cx="20" cy="5" r="2.5" fill="#dc2626" />
      </svg>
    ),
  },

  croissant: {
    id: 'croissant',
    name: 'Flaky Croissant',
    category: 'food',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Crescent */}
        <path d="M 8 25 C 8 13, 32 13, 32 25 C 29 23, 27 28, 20 27 C 13 28, 11 23, 8 25 Z" fill="#f59e0b" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Inner segments */}
        <path d="M 14 17 C 16 23, 17 26, 17 27" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <path d="M 20 15 C 20 22, 20 26, 20 27" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <path d="M 26 17 C 24 23, 23 26, 23 27" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // Vibes & Fun Icons
  sparkles: {
    id: 'sparkles',
    name: 'Magic Sparkles',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Big star */}
        <path d="M 20 6 Q 20 18 32 18 Q 20 18 20 30 Q 20 18 8 18 Q 20 18 20 6 Z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Mini star */}
        <path d="M 30 26 Q 30 31 35 31 Q 30 31 30 36 Q 30 31 25 31 Q 30 31 30 26 Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="11" cy="28" r="2" fill="#fde047" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    ),
  },

  shades: {
    id: 'shades',
    name: 'Cool Sunglasses',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Left lens */}
        <path d="M 6 16 L 18 16 L 16 26 C 15 28, 9 28, 8 26 Z" fill="#1e293b" stroke="#1e293b" strokeWidth="2" />
        {/* Right lens */}
        <path d="M 22 16 L 34 16 L 32 26 C 31 28, 25 28, 24 26 Z" fill="#1e293b" stroke="#1e293b" strokeWidth="2" />
        {/* Bridge */}
        <line x1="17" y1="17" x2="23" y2="17" stroke="#1e293b" strokeWidth="3" />
        {/* Glare */}
        <line x1="9" y1="19" x2="14" y2="24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="25" y1="19" x2="30" y2="24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    ),
  },

  gamepad: {
    id: 'gamepad',
    name: 'Retro Arcade',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Body */}
        <rect x="6" y="13" width="28" height="16" rx="8" fill="#6366f1" stroke="#1e293b" strokeWidth="2.5" />
        {/* D-Pad */}
        <path d="M 12 17 L 14 17 L 14 19 L 16 19 L 16 21 L 14 21 L 14 23 L 12 23 L 12 21 L 10 21 L 10 19 L 12 19 Z" fill="#1e293b" />
        {/* Buttons */}
        <circle cx="27" cy="18" r="1.8" fill="#f43f5e" />
        <circle cx="23" cy="22" r="1.8" fill="#facc15" />
      </svg>
    ),
  },

  palette: {
    id: 'palette',
    name: 'Art Palette',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Palette Board */}
        <path d="M 20 8 C 29 8, 34 14, 34 22 C 34 29, 29 33, 23 33 C 20 33, 19 30, 16 30 C 13 30, 12 33, 9 31 C 6 29, 6 20, 9 14 C 12 9, 16 8, 20 8 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
        {/* Color drops */}
        <circle cx="15" cy="14" r="2.2" fill="#ef4444" />
        <circle cx="22" cy="13" r="2.2" fill="#3b82f6" />
        <circle cx="28" cy="17" r="2.2" fill="#eab308" />
        <circle cx="28" cy="24" r="2.2" fill="#22c55e" />
        {/* Thumb hole */}
        <ellipse cx="14" cy="24" rx="2.5" ry="3.5" fill="#f7f9fa" stroke="#1e293b" strokeWidth="2" />
      </svg>
    ),
  },

  rocket: {
    id: 'rocket',
    name: 'Cosmic Rocket',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Flame */}
        <polygon points="16,28 20,36 24,28" fill="#f97316" stroke="#1e293b" strokeWidth="1.5" />
        <polygon points="18,28 20,33 22,28" fill="#facc15" />
        {/* Fins */}
        <polygon points="13,26 8,30 14,21" fill="#ef4444" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="27,26 32,30 26,21" fill="#ef4444" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
        {/* Fuselage */}
        <path d="M 14 27 C 14 18, 20 6, 20 6 C 20 6, 26 18, 26 27 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Nose cone tip */}
        <path d="M 17 12 C 17 12, 20 6, 20 6 C 20 6, 23 12, 23 12 Z" fill="#ef4444" />
        {/* Porthole */}
        <circle cx="20" cy="19" r="3" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" />
      </svg>
    ),
  },

  zap: {
    id: 'zap',
    name: 'Neon Zap',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        <polygon
          points="22,4 10,21 19,21 16,36 30,17 21,17"
          fill="#facc15"
          stroke="#1e293b"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  sprout: {
    id: 'sprout',
    name: 'Little Sprout',
    category: 'vibes',
    component: ({ className = 'w-8 h-8' }) => (
      <svg viewBox="0 0 40 40" fill="none" className={className}>
        {/* Pot */}
        <polygon points="13,23 27,23 25,34 15,34" fill="#d97706" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Stem */}
        <path d="M 20 23 L 20 15" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left Leaf */}
        <path d="M 20 16 C 14 14, 13 8, 20 12 Z" fill="#4ade80" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
        {/* Right Leaf */}
        <path d="M 20 14 C 26 12, 27 6, 20 10 Z" fill="#22c55e" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const AVATAR_ICON_LIST = Object.values(AVATAR_ICONS);
