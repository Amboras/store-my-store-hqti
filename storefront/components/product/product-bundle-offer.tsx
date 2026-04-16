'use client'

import { useState, useEffect } from 'react'
import { Package, Zap, Clock, ShieldCheck, Lock, Truck, Award, RefreshCw, Loader2, Check } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils/format-price'

interface BundleOfferProps {
  product: {
    id: string
    title: string
    variants?: Array<{
      id: string
      calculated_price?: {
        calculated_amount?: number
        currency_code?: string
      }
    }>
  }
}

const URGENCY_STOCK = 7
const SALE_HOURS = 3
const SALE_MINUTES = 47

function useCountdown(initialHours: number, initialMinutes: number) {
  const [time, setTime] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return time
}

const BUNDLE_OPTIONS = [
  {
    id: 'single',
    label: 'Single Unit',
    description: 'One kit — full power, no extras',
    multiplier: 1,
    badge: null,
    savings: null,
  },
  {
    id: 'double',
    label: 'Dual Pack',
    description: 'Two kits — for your team or a backup unit',
    multiplier: 2,
    badge: 'MOST POPULAR',
    savings: 10,
  },
  {
    id: 'triple',
    label: 'Team Bundle',
    description: 'Three kits — best value for full red teams',
    multiplier: 3,
    badge: 'BEST VALUE',
    savings: 20,
  },
] as const

type BundleId = (typeof BUNDLE_OPTIONS)[number]['id']

export default function ProductBundleOffer({ product }: BundleOfferProps) {
  const [selected, setSelected] = useState<BundleId>('single')
  const [justAdded, setJustAdded] = useState(false)
  const { addItem, isAddingItem } = useCart()
  const countdown = useCountdown(SALE_HOURS, SALE_MINUTES)

  const variant = product.variants?.[0]
  const basePrice = variant?.calculated_price?.calculated_amount ?? null
  const currency = variant?.calculated_price?.currency_code ?? 'usd'

  const selectedBundle = BUNDLE_OPTIONS.find((b) => b.id === selected)!

  const getDiscountedPrice = (multiplier: number, savings: number | null) => {
    if (!basePrice) return null
    const total = basePrice * multiplier
    if (!savings) return total
    return Math.round(total * (1 - savings / 100))
  }

  const originalTotal =
    basePrice && selectedBundle.multiplier > 1
      ? basePrice * selectedBundle.multiplier
      : null

  const finalPrice = getDiscountedPrice(selectedBundle.multiplier, selectedBundle.savings)

  const handleAddBundle = () => {
    if (!variant?.id) return
    addItem(
      { variantId: variant.id, quantity: selectedBundle.multiplier },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success(
            selectedBundle.multiplier > 1
              ? `${selectedBundle.multiplier}x ${product.title} added to bag`
              : `${product.title} added to bag`
          )
          setTimeout(() => setJustAdded(false), 2000)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add to bag')
        },
      }
    )
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="space-y-5 border-t pt-6">
      {/* Urgency Banner */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-sm px-4 py-3">
        <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Flash Sale Ends In
          </p>
          <p className="text-lg font-mono font-bold text-amber-700 leading-tight tabular-nums">
            {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-amber-700 font-medium">
            <span className="font-bold">{URGENCY_STOCK}</span> kits left
          </p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i < URGENCY_STOCK ? 'bg-amber-500' : 'bg-amber-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bundle Selector */}
      <div>
        <p className="text-xs uppercase tracking-widest font-semibold mb-3 text-foreground">
          Choose Your Bundle
        </p>
        <div className="space-y-2">
          {BUNDLE_OPTIONS.map((option) => {
            const price = getDiscountedPrice(option.multiplier, option.savings)
            const origPrice = option.savings ? basePrice && basePrice * option.multiplier : null
            const isSelected = selected === option.id

            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`w-full text-left flex items-center gap-4 border rounded-sm px-4 py-3.5 transition-all ${
                  isSelected
                    ? 'border-[#0e1629] bg-[#0e1629]/5 ring-1 ring-[#0e1629]'
                    : 'border-border hover:border-foreground/40'
                }`}
              >
                {/* Radio indicator */}
                <div
                  className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected ? 'border-[#0e1629]' : 'border-muted-foreground/40'
                  }`}
                >
                  {isSelected && <div className="h-2 w-2 rounded-full bg-[#0e1629]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{option.label}</span>
                    {option.badge && (
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                          option.id === 'triple'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-[#0e1629]/10 text-[#0e1629]'
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {option.savings && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-red-100 text-red-600">
                        Save {option.savings}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  {origPrice && currency ? (
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(origPrice, currency)}
                    </p>
                  ) : null}
                  {price && currency ? (
                    <p className={`text-sm font-bold ${option.savings ? 'text-red-600' : 'text-foreground'}`}>
                      {formatPrice(price, currency)}
                    </p>
                  ) : null}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bundle CTA */}
      <button
        onClick={handleAddBundle}
        disabled={isAddingItem || !variant?.id}
        className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
          justAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-[#0e1629] text-white hover:bg-[#1a2a48]'
        }`}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Added to Bag
          </>
        ) : (
          <>
            <Package className="h-4 w-4" />
            {selectedBundle.multiplier > 1
              ? `Add ${selectedBundle.multiplier}x Bundle to Bag`
              : 'Add to Bag'}
            {finalPrice && currency ? ` — ${formatPrice(finalPrice, currency)}` : ''}
          </>
        )}
      </button>

      {/* Trust Strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { icon: Truck, label: 'Free Shipping', sub: 'On orders over $99' },
          { icon: ShieldCheck, label: '30-Day Guarantee', sub: 'Hassle-free returns' },
          { icon: Lock, label: 'Secure Checkout', sub: '256-bit SSL' },
          { icon: Award, label: 'Expert Vetted', sub: 'OSCP certified team' },
        ].map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-1.5 bg-muted/30 rounded-sm p-3"
          >
            <Icon className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold leading-tight">{label}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{sub}</p>
          </div>
        ))}
      </div>

      {/* Guarantee note */}
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-sm px-4 py-3">
        <RefreshCw className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-800 leading-relaxed">
          <span className="font-semibold">SecurityTests Performance Guarantee:</span> Every kit is lab-tested before shipping. If any component fails on arrival, we replace it free — no questions asked within 30 days.
        </p>
      </div>
    </div>
  )
}
