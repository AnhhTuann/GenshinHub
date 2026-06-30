"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUrlInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function ImageUrlInput({ label, value, onChange, error, placeholder, required }: ImageUrlInputProps) {
  const [imgError, setImgError] = useState(false);
  const [focused, setFocused] = useState(false);

  const hasUrl = value && value.startsWith('http');
  const showPreview = hasUrl && !imgError;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      <div className="flex gap-2.5 items-start">
        {/* Input */}
        <div className="flex-1">
          <input
            type="url"
            value={value}
            onChange={(e) => { onChange(e.target.value); setImgError(false); }}
            placeholder={placeholder || 'https://...'}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm font-medium outline-none"
            style={{
              background: 'rgba(4,4,10,0.8)',
              border: error ? '1px solid rgba(239,68,68,0.5)' : focused ? '1px solid rgba(200,168,75,0.4)' : '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.88)',
              boxShadow: focused ? '0 0 0 3px rgba(200,168,75,0.07)' : 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {error && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* Preview thumbnail */}
        <div
          className="shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            background: 'rgba(4,4,10,0.8)',
            border: showPreview ? '1px solid rgba(200,168,75,0.25)' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {showPreview ? (
            <div className="relative w-full h-full">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                unoptimized
              />
            </div>
          ) : (
            <span className="text-white/15 text-lg">
              {imgError ? '❌' : '🖼️'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
