"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Phone, ArrowRight, Instagram, Heart } from "lucide-react";
import { getDictionary, Locale } from "@/i18n";

/* ── Animation variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.12 },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Gold Divider component ──────────────────────────────────────── */
function GoldDivider() {
  return <div className="gold-divider my-0" />;
}

/* ── Animated Star ────────────────────────────────────────────────── */
function AnimatedStars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.4, ease: "backOut" }}
        >
          <Star className="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Review Carousel — Fan Layout ────────────────────────────────── */
const reviews = [
  { name: "Khalid M.", text: "Best Spanish Latte in Riyadh. The atmosphere is unmatched — cozy, elegant, and always welcoming.", rating: 5, date: "2 weeks ago" },
  { name: "Sara A.", text: "DD Cafe feels like a hidden gem. Every visit is a perfect escape from the city rush.", rating: 5, date: "1 month ago" },
  { name: "Omar K.", text: "The V60 pour-over here is exceptional. You can taste the difference quality beans make.", rating: 5, date: "3 weeks ago" },
  { name: "Nora H.", text: "Gorgeous interior design and the matcha latte is perfection. My new favorite cafe!", rating: 5, date: "1 week ago" },
  { name: "Fahad S.", text: "Great place for meetings or working remotely. Fast WiFi, amazing coffee, friendly staff.", rating: 4, date: "2 months ago" },
];

function ReviewCarousel() {
  const [active, setActive] = React.useState(2); // center card

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: "#1a120b" }}>
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[var(--color-gold)] text-sm font-semibold uppercase tracking-[0.3em] mb-4">What Our Guests Say</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-white/95 mb-4">Loved by Hundreds</motion.h2>
          <motion.div variants={fadeUp}><div className="w-16 h-[2px] bg-[var(--color-gold)] mx-auto" /></motion.div>
        </motion.div>

        {/* Fan cards */}
        <div className="relative flex items-center justify-center h-[360px] md:h-[400px]">
          {reviews.map((review, idx) => {
            const offset = idx - active;
            const absOffset = Math.abs(offset);
            const isActive = idx === active;

            return (
              <motion.div
                key={idx}
                animate={{
                  x: offset * 110,
                  scale: isActive ? 1 : 0.85 - absOffset * 0.05,
                  rotateY: offset * -5,
                  zIndex: reviews.length - absOffset,
                  opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={() => setActive(idx)}
                className="absolute w-[300px] md:w-[360px] cursor-pointer"
              >
                <div
                  className={`p-8 rounded-2xl border transition-all duration-500 ${isActive
                      ? "bg-white/10 backdrop-blur-xl border-[var(--color-gold)]/40 shadow-2xl shadow-[var(--color-gold)]/10"
                      : "bg-white/5 backdrop-blur-md border-white/10 shadow-lg"
                    }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 font-light italic">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      <p className="text-white/40 text-xs">{review.date}</p>
                    </div>
                    <div className="text-[var(--color-gold)] text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                      Google
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === active ? "bg-[var(--color-gold)] w-6" : "bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(lang as Locale).then(setDict);
  }, [lang]);

  if (!dict) return null;
  const t = dict.home;

  return (
    <div className="flex flex-col min-h-screen">
      {/* ════════════════ 1. CINEMATIC HERO ════════════════ */}
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background with slow zoom */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
            alt="Aesthetic cafe interior"
            fill
            className="object-cover blur-[1px]"
            priority
          />
        </motion.div>

        {/* Dark gradient overlay — cinematic */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Soft steam wisps */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute bottom-[30%] left-1/2 w-28 h-28 bg-white/5 blur-3xl rounded-full animate-steam" />
          <div className="absolute bottom-[25%] left-[45%] w-36 h-36 bg-white/5 blur-3xl rounded-full animate-steam-delay" />
        </div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center"
        >
          {/* Floating review badge */}
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-8 border border-white/15">
            <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            <span>4.8 ⭐ Rated by 400+ Customers</span>
            <span className="text-[10px] opacity-60 ml-1">Google Reviews</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 drop-shadow-xl leading-tight"
          >
            {t.heroTitle}
          </motion.h1>

          {/* Gold accent line */}
          <motion.div variants={fadeUp} custom={2} className="w-24 h-[2px] bg-[var(--color-gold)] mx-auto mb-6" />

          <motion.p variants={fadeUp} custom={3} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 drop-shadow-sm font-light leading-relaxed">
            {t.heroSubtitle}
          </motion.p>

          <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/90 text-[var(--color-espresso)] text-base h-13 px-10 font-semibold border border-[var(--color-gold)]/50 shadow-lg shadow-[var(--color-gold)]/20" asChild>
              <Link href={`/${lang}/menu`}>{t.ctaPrimary}</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white hover:text-[var(--color-espresso)] text-base h-13 px-10 bg-transparent hover:bg-white border-white/30 hover:border-white font-medium" asChild>
              <Link href={`/${lang}/menu`}>{t.ctaSecondary}</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-2 bg-[var(--color-gold)] rounded-full" />
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* ════════════════ 2. SOCIAL PROOF — CAROUSEL FAN ════════════════ */}
      <ReviewCarousel />

      <GoldDivider />

      {/* ════════════════ 3. SIGNATURE DRINKS — ASYMMETRIC ════════════════ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-espresso)] mb-4">{t.featuredTitle}</motion.h2>
            <motion.div variants={fadeUp}><GoldDivider /></motion.div>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto mt-4">{t.featuredSubtitle}</motion.p>
          </motion.div>

          {/* Asymmetric bento-style grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Signature Spanish Latte", price: "28 SAR", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80", tag: "Best Seller", featured: true },
              { name: "Ceremonial Iced Matcha", price: "32 SAR", img: "https://images.unsplash.com/photo-1536514072410-5019a3c69182?auto=format&fit=crop&q=80", tag: "Community Favorite" },
              { name: "V60 Pour Over", price: "24 SAR", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80", tag: "New" },
              { name: "Pecan Caramel Cake", price: "35 SAR", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80" },
              { name: "Rich Chocolate Pudding", price: "29 SAR", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                custom={idx}
                whileHover={{ y: -8 }}
                className={`group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden ${idx === 0 ? "h-80 md:h-full" : "h-64"}`}>
                  <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  {/* Steam effect on coffee items */}
                  {idx < 3 && (
                    <div className="absolute top-2 right-1/3 pointer-events-none">
                      <div className="w-6 h-6 bg-white/20 rounded-full blur-lg animate-steam" />
                      <div className="w-4 h-4 bg-white/15 rounded-full blur-lg animate-steam-delay ml-2" />
                    </div>
                  )}
                  {/* Tag */}
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-[var(--color-gold)] text-[var(--color-espresso)] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {item.tag}
                    </span>
                  )}
                  {/* Dark gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex justify-between items-end">
                    <h3 className="font-serif text-xl font-bold drop-shadow-md">{item.name}</h3>
                    <span className="font-bold text-[var(--color-gold)] group-hover:text-white transition-colors text-lg">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 text-center">
            <Button variant="outline" size="lg" className="border-[var(--color-gold)] text-[var(--color-espresso)] hover:bg-[var(--color-gold)] hover:text-[var(--color-espresso)] transition-all" asChild>
              <Link href={`/${lang}/menu`} className="inline-flex items-center gap-2">
                {t.ctaSecondary} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════ 4. BARISTAS — WITH PERSONALITY ════════════════ */}
      <section className="py-24 bg-[var(--color-cream)] overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-espresso)] mb-4">{t.baristasTitle}</motion.h2>
            <motion.div variants={fadeUp}><GoldDivider /></motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Rio", quote: "Every cup should feel personal.", img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80" },
              { name: "Junel", quote: "Coffee is a conversation starter.", img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80" },
              { name: "Sed", quote: "Precision in every pour.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
              { name: "Neoaz", quote: "The aroma tells the story.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80" }
            ].map((barista, idx) => (
              <motion.div key={idx} variants={fadeUp} custom={idx} className="text-center group">
                {/* Square portrait — not circular */}
                <div className="relative aspect-square mx-auto rounded-xl overflow-hidden mb-5 shadow-md group-hover:shadow-xl transition-shadow border-2 border-[var(--color-gold)]/20 group-hover:border-[var(--color-gold)]/50">
                  <Image src={barista.img} alt={barista.name} fill className="object-cover sepia-[0.15] group-hover:sepia-0 transition-all duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-espresso)]">{barista.name}</h3>
                <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.2em] mt-1">Expert Barista</p>
                <p className="text-muted-foreground text-sm italic mt-2">&quot;{barista.quote}&quot;</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════ 5. THE DD EXPERIENCE — WOW SECTION ════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#3B2A1E' }}>
        {/* Subtle animated background */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
            alt="Coffee ambience"
            fill
            className="object-cover opacity-20"
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[var(--color-gold)] text-sm font-semibold uppercase tracking-[0.3em] mb-6">The DD Experience</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white/95 leading-tight mb-6">
              From the first sip to the last conversation
            </motion.h2>
            <motion.div variants={fadeUp}><div className="w-16 h-[2px] bg-[var(--color-gold)] mx-auto mb-8" /></motion.div>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed font-light">
              DD Cafe is designed for moments that linger. A place where every detail — the aroma, the light, the warmth — invites you to slow down.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════ 6. INSTAGRAM GALLERY — MASONRY STYLE ════════════════ */}
      <section className="py-2 bg-background">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-1">
          {[
            { img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80", span: "row-span-2" },
            { img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80", span: "" },
            { img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80", span: "" },
            { img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80", span: "row-span-2" },
            { img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80", span: "" },
            { img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80", span: "" },
          ].map((item, idx) => (
            <div key={idx} className={`relative group overflow-hidden bg-muted ${item.span}`}>
              <Image src={item.img} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <Heart className="h-7 w-7 text-white" />
                <span className="text-white/70 text-xs font-medium">@ddcafe_sa</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[var(--color-espresso)] text-white py-8 text-center flex flex-col items-center justify-center gap-3">
          <p className="font-serif text-xl">{t.galleryTitle}</p>
          <a href="#" className="inline-flex items-center gap-2 font-medium text-[var(--color-gold)] hover:text-white transition-colors text-sm">
            <Instagram className="h-5 w-5" /> View on Instagram
          </a>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════ 7. VISIT US — LUXURY ════════════════ */}
      <section id="location" className="py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-espresso)] mb-4">{t.locationTitle}</h2>
              <GoldDivider />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-espresso)] text-lg">Location</h4>
                      <p className="text-muted-foreground">{t.locationAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-espresso)] text-lg">Contact Us</h4>
                      <p className="text-muted-foreground">+966 50 123 4567</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-2xl" style={{ backgroundColor: '#3B2A1E' }}>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">Craving Something Special?</h3>
                  <p className="text-white/60 mb-6 text-sm">Skip the line and pre-order for pickup or dine-in.</p>
                  <Button size="lg" className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/90 text-[var(--color-espresso)] text-lg font-semibold" asChild>
                    <Link href={`/${lang}/menu`}>{t.ctaPrimary}</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="h-[500px] w-full bg-muted rounded-2xl overflow-hidden shadow-xl border border-[var(--color-gold)]/20 relative">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                  alt="Map"
                  fill
                  className="object-cover opacity-60"
                />
                {/* Glass card floating over map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl flex flex-col items-center border border-[var(--color-gold)]/20">
                    <MapPin className="h-8 w-8 text-[var(--color-gold)] mb-2" />
                    <span className="font-serif font-bold text-[var(--color-espresso)] text-lg">DD Cafe</span>
                    <span className="text-xs text-muted-foreground mt-1">Al Mursalat, Riyadh</span>
                    <Button size="sm" className="mt-3 bg-[var(--color-gold)] text-[var(--color-espresso)] text-xs" asChild>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Get Directions</a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div >
  );
}
