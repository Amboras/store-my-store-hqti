'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Lock,
  Wifi,
  Terminal,
  Cpu,
  Award,
  Users,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=80'

const categories = [
  {
    icon: Wifi,
    title: 'Network Analysis',
    description: 'Tools for packet capture, traffic analysis, and wireless auditing.',
    href: '/products',
  },
  {
    icon: Lock,
    title: 'Lock & Physical',
    description: 'Physical penetration testing gear, lock pick sets, and bypass tools.',
    href: '/products',
  },
  {
    icon: Terminal,
    title: 'Hardware Hacking',
    description: 'USB attack platforms, JTAG interfaces, and firmware extraction kits.',
    href: '/products',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'RFID/NFC cloners, RF spectrum analyzers, and SDR bundles.',
    href: '/products',
  },
]

const stats = [
  { value: '12,000+', label: 'Security Professionals' },
  { value: '98.4%', label: 'Satisfaction Rate' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '72h', label: 'Expert Support' },
]

const trustBadges = [
  'CEH Approved',
  'OSCP Recommended',
  'ISO 27001 Aligned',
  'GDPR Compliant',
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0e1629] overflow-hidden">
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)',
          }}
        />

        <div className="relative container-custom grid lg:grid-cols-2 gap-10 items-center py-20 lg:py-32">
          {/* Text */}
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Pro-Grade Toolkit — 2025
              </span>
            </div>

            <h1 className="text-4xl lg:text-display font-heading font-bold text-white leading-tight">
              Test. Break.
              <br />
              <span className="text-emerald-400">Secure.</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-md leading-relaxed">
              Professional security testing tools engineered for ethical hackers, red teamers, and enterprise security teams. Every kit built for real-world engagements.
            </p>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 border border-slate-600 px-3 py-1 rounded"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Shop All Kits
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-slate-500 text-slate-300 hover:border-white hover:text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-sm overflow-hidden animate-fade-in">
            <Image
              src={HERO_IMAGE}
              alt="Security testing professional at work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
              priority
            />
            {/* overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1629]/60 to-transparent" />

            {/* floating badge */}
            <div className="absolute bottom-6 left-6 bg-[#0e1629]/90 backdrop-blur border border-emerald-500/30 px-4 py-3 rounded">
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Trusted By</p>
              <p className="text-white font-bold text-lg leading-tight">12,000+</p>
              <p className="text-slate-400 text-xs">Security professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border/50">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-2xl font-bold text-[#0e1629] font-heading">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Categories ── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold mb-3">
              Built for Every Engagement
            </p>
            <h2 className="text-h2 font-heading font-bold text-[#0e1629]">
              Our Tool Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group bg-white border border-border rounded-sm p-6 hover:border-emerald-400 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-semibold text-[#0e1629] mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                    Browse <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map(
            (
              collection: {
                id: string
                handle: string
                title: string
                metadata?: Record<string, unknown>
              },
              index: number
            ) => (
              <CollectionSection
                key={collection.id}
                collection={collection}
                alternate={index % 2 === 1}
              />
            )
          )}
        </>
      ) : null}

      {/* ── Brand Story / Why Us ── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] bg-muted rounded-sm overflow-hidden">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Security researcher analyzing vulnerabilities"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e1629]/20 to-transparent" />
            </div>

            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                Why SecurityTests
              </p>
              <h2 className="text-h2 font-heading font-bold text-[#0e1629]">
                Engineered for the Field. Trusted in the Lab.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every tool we carry is vetted by our team of certified penetration testers with 10+ years of real-world experience. We only stock gear that performs under pressure — no consumer-grade compromises.
              </p>

              <ul className="space-y-3">
                {[
                  'Curated by certified pentesters (OSCP, CEH, CISSP)',
                  'Lab-tested before listing — guaranteed to perform',
                  'Detailed documentation and usage guides included',
                  'Compliant with ethical hacking frameworks',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-600 hover:text-emerald-700 transition-colors pb-0.5 link-underline"
                prefetch={true}
              >
                About Our Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="py-section-sm border-y bg-muted/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <Truck className="h-6 w-6 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $99</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <RotateCcw className="h-6 w-6 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Hassle-free policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end text-center md:text-right">
              <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <section className="py-section bg-[#0e1629]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-3">
              Community Trusted
            </p>
            <h2 className="text-h2 font-heading font-bold text-white">
              What Professionals Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  '"The WiFi Pineapple bundle from SecurityTests arrived fully configured with their custom guide. Used it in my first engagement the same week."',
                name: 'Marcus L.',
                role: 'Senior Red Team Lead, Fortune 500',
              },
              {
                quote:
                  '"Best sourced hardware I\'ve found. The USB Rubber Ducky bundle comes with payload scripts the others don\'t include. Worth every cent."',
                name: 'Sophie K.',
                role: 'Freelance Pentester, CEH',
              },
              {
                quote:
                  '"I\'ve tried every vendor. SecurityTests is the only one that actually lab-tests before shipping. No dead devices, no waiting weeks for replacements."',
                name: 'James T.',
                role: 'CISO, Mid-Market SaaS',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-[#172038] border border-slate-700 rounded-sm p-6 space-y-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-emerald-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{t.quote}</p>
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certification Logos ── */}
      <section className="py-section-sm border-b">
        <div className="container-custom">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8 font-semibold">
            Recommended By Certifying Bodies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[
              { icon: Award, label: 'CEH — EC-Council' },
              { icon: ShieldCheck, label: 'OSCP — Offensive Security' },
              { icon: Users, label: 'SANS Institute' },
              { icon: Lock, label: 'CompTIA Security+' },
              { icon: Cpu, label: 'eWPT — eLearnSecurity' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-section">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold mb-3">
            Stay Ahead
          </p>
          <h2 className="text-h2 font-heading font-bold text-[#0e1629]">Join the Intel Feed</h2>
          <p className="mt-3 text-muted-foreground">
            New tools, exclusive bundles, CVE-driven product drops, and early access — delivered to security professionals only.
          </p>
          <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none transition-colors rounded-sm"
            />
            <button
              type="submit"
              className="bg-[#0e1629] text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-[#1a2a48] transition-colors whitespace-nowrap rounded-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            No spam. Unsubscribe at any time. For professionals only.
          </p>
        </div>
      </section>
    </>
  )
}
