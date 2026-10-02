/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NameTagState, StickerType } from '../types';

export function encodeStateToHash(state: NameTagState): string {
  try {
    const compact = {
      n: state.name,
      t: state.title,
      g: state.tagline,
      e: state.avatarEmoji,
      c: state.cardColorId,
      s: state.stickers.map((s) => ({
        i: s.id,
        t: s.type,
        x: Math.round(s.x),
        y: Math.round(s.y),
        r: Math.round(s.rotation),
        z: s.zIndex,
        ...(s.customText ? { l: s.customText } : {}),
      })),
    };
    const jsonStr = JSON.stringify(compact);
    // Base64 encode safe for UTF-8
    const encoded = btoa(encodeURIComponent(jsonStr));
    return `#tag=${encoded}`;
  } catch (err) {
    console.error('Failed to encode state to hash', err);
    return '';
  }
}

export function decodeStateFromHash(hash: string): Partial<NameTagState> | null {
  try {
    if (!hash || !hash.includes('#tag=')) return null;
    const raw = hash.replace(/^#tag=/, '');
    if (!raw) return null;
    const jsonStr = decodeURIComponent(atob(raw));
    const compact = JSON.parse(jsonStr);

    return {
      name: compact.n,
      title: compact.t,
      tagline: compact.g,
      avatarEmoji: compact.e,
      cardColorId: compact.c,
      stickers: (compact.s || []).map((s: any) => {
        let type: StickerType = s.t;
        let customText = s.l;
        // Migrate legacy stickers
        if (type === 'hire_me') {
          type = 'tvisha_fan';
          customText = customText === 'HIRE ME' ? '#1 TVISHA FAN' : customText;
        } else if (type === 'coffee') {
          type = 'matcha';
        }

        return {
          id: s.i || `stk-${Math.random().toString(36).substr(2, 6)}`,
          type,
          x: s.x,
          y: s.y,
          rotation: s.r ?? 0,
          scale: 1,
          zIndex: s.z ?? 1,
          customText,
        };
      }),
    };
  } catch (err) {
    console.warn('Failed to parse state from URL hash', err);
    return null;
  }
}
