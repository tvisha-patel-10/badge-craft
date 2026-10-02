/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from 'react';
import { Trash2 } from 'lucide-react';

interface TrashZoneProps {
  isOverTrash: boolean;
  isDraggingAny: boolean;
}

export const TrashZone = forwardRef<HTMLDivElement, TrashZoneProps>(
  ({ isOverTrash, isDraggingAny }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute bottom-4 right-4 z-40 transition-all duration-200 select-none ${
          isDraggingAny ? 'opacity-100 scale-100' : 'opacity-70 hover:opacity-100'
        }`}
      >
        <div
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 transition-all duration-200 ${
            isOverTrash
              ? 'bg-red-500 text-white border-red-600 scale-110 shadow-lg shadow-red-500/30'
              : isDraggingAny
              ? 'bg-white/95 text-slate-700 border-dashed border-red-300 shadow-md animate-pulse'
              : 'bg-white/80 text-slate-500 border-slate-200/80 shadow-sm'
          }`}
        >
          <div
            className={`transition-transform duration-200 ${
              isOverTrash ? '-rotate-12 scale-125' : ''
            }`}
          >
            <Trash2
              size={18}
              className={isOverTrash ? 'text-white' : 'text-slate-500 group-hover:text-red-500'}
            />
          </div>
          <span
            className={`text-xs font-bold tracking-tight ${
              isOverTrash ? 'text-white' : 'text-slate-600'
            }`}
          >
            {isOverTrash ? 'Drop to remove' : 'Trash zone'}
          </span>
        </div>
      </div>
    );
  }
);

TrashZone.displayName = 'TrashZone';
