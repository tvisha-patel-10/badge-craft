/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StickerType = 
  | 'starburst'
  | 'smiley'
  | 'tvisha_fan'
  | 'matcha'
  | 'arrow'
  | 'fire'
  | 'heart'
  | 'verified'
  | 'sparkles'
  | 'wip'
  // Legacy types for URL backward compatibility
  | 'hire_me'
  | 'coffee';

export interface PlacedSticker {
  id: string;
  type: StickerType;
  x: number; // px from canvas top-left
  y: number;
  rotation: number; // degrees (-45 to 45)
  scale: number;
  zIndex: number;
  customText?: string;
}

export interface CardColor {
  id: string;
  name: string;
  bgClass: string;
  hex: string;
  textColor: string;
  titleColor: string;
  borderColor: string;
  dividerColor: string;
  avatarBg: string;
}

export interface NameTagState {
  name: string;
  title: string;
  tagline: string;
  avatarEmoji: string; // ID of avatar icon (e.g. 'cat', 'matcha_cup', 'panda') or emoji
  cardColorId: string;
  stickers: PlacedSticker[];
}
