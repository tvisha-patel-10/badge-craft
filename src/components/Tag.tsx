/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { CardColor } from '../types';
import { Pencil, Check, Sparkles, Smile, Utensils } from 'lucide-react';
import { AVATAR_ICONS, AVATAR_ICON_LIST } from '../utils/avatarIcons';

interface TagProps {
  name: string;
  title: string;
  tagline: string;
  avatarEmoji: string;
  cardColor: CardColor;
  onUpdate: (field: 'name' | 'title' | 'tagline' | 'avatarEmoji', value: string) => void;
}

export const Tag: React.FC<TagProps> = ({
  name,
  title,
  tagline,
  avatarEmoji,
  cardColor,
  onUpdate,
}) => {
  // Editing state for each field
  const [editingField, setEditingField] = useState<'name' | 'title' | 'tagline' | null>(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconCategory, setIconCategory] = useState<'all' | 'animals' | 'food' | 'vibes'>('all');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const taglineInputRef = useRef<HTMLTextAreaElement>(null);
  const iconPickerRef = useRef<HTMLDivElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingField === 'name') {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    } else if (editingField === 'title') {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    } else if (editingField === 'tagline') {
      taglineInputRef.current?.focus();
      taglineInputRef.current?.select();
    }
  }, [editingField]);

  // Close icon picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (iconPickerRef.current && !iconPickerRef.current.contains(e.target as Node)) {
        setShowIconPicker(false);
      }
    };
    if (showIconPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showIconPicker]);

  const isDark = cardColor.id === 'dark';

  // Resolve current avatar illustration or fallback
  const currentAvatarDef = AVATAR_ICONS[avatarEmoji] || AVATAR_ICONS['cat'];
  const CurrentIconComp = currentAvatarDef?.component;

  const filteredIcons = AVATAR_ICON_LIST.filter(
    (item) => iconCategory === 'all' || item.category === iconCategory
  );

  return (
    <div
      className={`relative w-full max-w-full sm:min-w-[440px] md:w-[490px] rounded-3xl p-5 sm:p-7 md:p-8 transition-colors duration-200 select-none
        border ${cardColor.borderColor} ${cardColor.bgClass}
        shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.06)]
      `}
      style={{
        boxShadow: isDark
          ? '0 20px 45px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)'
          : '0 20px 40px -12px rgba(15, 23, 42, 0.08), 0 4px 14px -3px rgba(15, 23, 42, 0.04)',
      }}
    >
      {/* Top row: Avatar circle + Name & Title */}
      <div className="flex items-center gap-3.5 sm:gap-4 w-full">
        {/* Avatar circle */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowIconPicker((prev) => !prev)}
            aria-label="Change badge avatar icon"
            title="Click to pick an avatar illustration"
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-inner ${
              isDark
                ? 'bg-white text-slate-900 ring-2 ring-white/40 border-2 border-slate-200/90 shadow-md'
                : `${cardColor.avatarBg} ring-2 ring-black/5`
            } hover:ring-blue-400`}
          >
            {CurrentIconComp ? (
              <CurrentIconComp className="w-8 h-8 sm:w-9 sm:h-9" />
            ) : (
              <span className="text-2xl">{avatarEmoji}</span>
            )}
          </button>

          {/* Icon Selector Popover */}
          {showIconPicker && (
            <div
              ref={iconPickerRef}
              className="absolute left-0 top-16 z-50 p-3 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 w-72 sm:w-80 max-w-[calc(100vw-36px)] animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 tracking-wide">
                  Choose avatar icon
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Animals & food</span>
              </div>

              {/* Category tabs */}
              <div className="flex items-center gap-1 mb-2.5 p-1 bg-slate-100/90 rounded-xl text-xs font-medium">
                {(['all', 'animals', 'food', 'vibes'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setIconCategory(cat)}
                    className={`flex-1 py-1 rounded-lg text-center capitalize transition-all cursor-pointer ${
                      iconCategory === cat
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of fun vector icon illustrations with generous padding and internal scaling to prevent clipping */}
              <div className="grid grid-cols-4 gap-2.5 max-h-60 overflow-y-auto px-3.5 py-3 custom-scrollbar">
                {filteredIcons.map((item) => {
                  const Comp = item.component;
                  const isSelected = avatarEmoji === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      title={item.name}
                      onClick={() => {
                        onUpdate('avatarEmoji', item.id);
                        setShowIconPicker(false);
                      }}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-100/90 ring-2 ring-inset ring-amber-500 shadow-xs'
                          : 'bg-slate-50 hover:bg-amber-50/80 hover:border-amber-300 border border-slate-200/70'
                      }`}
                    >
                      <Comp className="w-8 h-8 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] mt-1 text-slate-600 font-medium truncate max-w-full text-center">
                        {item.name.split(' ')[0]}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xs">
                          <Check size={9} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Text Details (Name & Title) */}
        <div className="flex-1 min-w-0">
          {/* Editable Name */}
          <div className="relative group w-full">
            {editingField === 'name' ? (
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => onUpdate('name', e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Escape') setEditingField(null);
                }}
                maxLength={40}
                className={`w-full text-xl md:text-2xl font-bold tracking-tight bg-transparent border-b-2 border-blue-500 focus:outline-none py-0.5 ${cardColor.textColor}`}
              />
            ) : (
              <div
                onClick={() => setEditingField('name')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setEditingField('name');
                }}
                className={`flex items-center gap-1.5 cursor-pointer rounded-lg -mx-1 px-1 py-0.5 transition-colors group-hover:bg-black/5 ${cardColor.textColor}`}
                title="Click to edit name"
              >
                <span className="text-xl md:text-2xl font-bold tracking-tight truncate">
                  {name || 'Your name'}
                </span>
                <Pencil
                  size={14}
                  className="opacity-0 group-hover:opacity-50 transition-opacity text-slate-400 shrink-0"
                />
              </div>
            )}
          </div>

          {/* Editable Title */}
          <div className="relative group mt-0.5 w-full">
            {editingField === 'title' ? (
              <input
                ref={titleInputRef}
                type="text"
                value={title}
                onChange={(e) => onUpdate('title', e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Escape') setEditingField(null);
                }}
                maxLength={50}
                className={`w-full text-sm font-medium bg-transparent border-b-2 border-blue-500 focus:outline-none py-0.5 ${cardColor.titleColor}`}
              />
            ) : (
              <div
                onClick={() => setEditingField('title')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setEditingField('title');
                }}
                className={`flex items-center gap-1.5 cursor-pointer rounded-lg -mx-1 px-1 py-0.5 transition-colors group-hover:bg-black/5 ${cardColor.titleColor}`}
                title="Click to edit title"
              >
                <span className="text-sm font-medium truncate">
                  {title || 'Role or title'}
                </span>
                <Pencil
                  size={12}
                  className="opacity-0 group-hover:opacity-50 transition-opacity text-slate-400 shrink-0"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className={`my-4 sm:my-5 border-b ${cardColor.dividerColor}`} />

      {/* Editable Tagline / Description - Fixed width container to prevent card resizing */}
      <div className="relative group w-full min-h-[56px]">
        {editingField === 'tagline' ? (
          <textarea
            ref={taglineInputRef}
            rows={3}
            value={tagline}
            onChange={(e) => onUpdate('tagline', e.target.value)}
            onBlur={() => setEditingField(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setEditingField(null);
              }
              if (e.key === 'Escape') setEditingField(null);
            }}
            maxLength={160}
            className={`w-full min-w-full block text-[15px] leading-relaxed font-normal bg-transparent border-b-2 border-blue-500 focus:outline-none resize-none p-1 rounded-md ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        ) : (
          <div
            onClick={() => setEditingField('tagline')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setEditingField('tagline');
            }}
            className={`w-full flex items-start gap-1.5 cursor-pointer rounded-xl -mx-1.5 p-1.5 transition-colors group-hover:bg-black/5 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}
            title="Click to edit description/tagline"
          >
            <p className="text-[15px] leading-relaxed font-normal flex-1 break-words line-clamp-3 overflow-hidden text-ellipsis">
              {tagline || 'Add a friendly tagline or bio here...'}
            </p>
            <Pencil
              size={13}
              className="opacity-0 group-hover:opacity-50 transition-opacity text-slate-400 shrink-0 mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};
