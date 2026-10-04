"use client";

import React from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { COLLEGES } from '@/lib/colleges';

interface CollegeSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export function CollegeSelect({ value, onChange, disabled }: CollegeSelectProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        <Building2 size={18} />
      </div>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full h-12 pl-11 pr-10 bg-[#111726] border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer disabled:opacity-60 appearance-none"
      >
        {COLLEGES.map((college) => (
          <option key={college} value={college} className="bg-[#192031] text-white py-2">
            {college}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
