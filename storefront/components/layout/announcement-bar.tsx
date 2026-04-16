'use client'

import { useState } from 'react'
import { X, ShieldCheck } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[#0e1629] text-white">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-sm tracking-wide">
        <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
        <p>
          <span className="font-semibold text-emerald-400">Free Shipping</span> on orders over $99 — Trusted by 12,000+ security professionals
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
