import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight, ChevronLeft, Star, Package, Truck, MapPin,
  Upload, Eye, Check, X, Phone, Mail, MapPinIcon, ChevronDown, ChevronUp, ZoomIn, Heart, ArrowRight,
  Menu, ShieldCheck
} from "lucide-react";
import {
  appbarlogo, name, email, mobile, mapImage, bannerImage, frameImages, categories, bestSellers, features, pricingPlans, howItWorks,
  galleryItems, cats, ourStory, stats, address, mapURL, instaURL, whatsupURL, footerIcons
} from "./data";



// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "home" | "form" | "gallery" | "about" | "contact";

// ─── Reusable components ──────────────────────────────────────────────────────
function Navbar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: { label: string; id: Page }[] = [
    { label: "Home", id: "home" },
    { label: "Gallery", id: "gallery" },
    { label: "About Us", id: "about" },
    { label: "Contact Us", id: "contact" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-1 group"
        >
          <div className="w-20 h-16 overflow-hidden flex items-center">
            <img
              src={appbarlogo}
              alt="Memoria Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-left -ml-1">

            <div
              className="text-xl font-bold text-primary leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Memoria Frame Makers
            </div>

            <div
              className="text-[10px] text-muted-foreground tracking-widest leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Modern & Emotional ❤️🫶
            </div>
          </div>
        </button>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="md:hidden w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={18} />
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${page === l.id ? "text-primary border-b-2 border-primary pb-0.5" : "text-foreground"}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
        </div>


      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              className={`text-sm font-medium text-left transition-colors hover:text-primary ${page === l.id ? "text-primary" : "text-foreground"}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>M</span>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Memoria</div>
                <div className="text-[10px] opacity-70 tracking-widest uppercase leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>Frame Makers</div>
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Crafting memories into timeless art. Premium custom frames delivered across India.
            </p>
            <div className="flex gap-3 mt-5">
              {footerIcons.map((Icon, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const templink = i === 0 ? instaURL : whatsupURL;

                    window.open(
                      templink,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="w-9 h-9 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Quick Links", items: [{ label: "Home", page: "home" as Page }, { label: "Gallery", page: "gallery" as Page }, { label: "About Us", page: "about" as Page }, { label: "Contact", page: "contact" as Page }] },
            { title: "Frame Types", items: [{ label: "Love Story" }, { label: "Wedding" }, { label: "Birthday" }, { label: "Family" }, { label: "Baby Frames" }] },
            { title: "Contact Info", items: [{ label: mobile }, { label: email }, { label: "Pudukkottai, Tamilnadu" }, { label: "Pan India Delivery" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm tracking-wider uppercase opacity-60 mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>{col.title}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {"page" in item ? (
                      <button onClick={() => setPage(item.page as Page)} className="text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.label}</button>
                    ) : (
                      <span className="text-sm opacity-80" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60" style={{ fontFamily: "'Poppins', sans-serif" }}>© 2026 Memoria Frames. All rights reserved.</p>
          <p className="text-sm opacity-60" style={{ fontFamily: "'Poppins', sans-serif" }}>Made with ♥ in India</p>
        </div>
      </div>
    </footer>
  );
}


// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function DecorativeFrame() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % frameImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4]">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl scale-110" />
      {/* Main frame */}
      <div className="relative w-full h-full rounded-3xl border-[10px] border-primary bg-secondary shadow-2xl overflow-hidden">
        {/* Inner mat */}
        <div className="absolute inset-4 border-2 border-primary/30 rounded-xl overflow-hidden">
          <div className="relative w-full h-full overflow-hidden">
            {frameImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Wedding memory ${index + 1}`}
                className={`
        absolute inset-0
        w-full h-full
        object-cover
        transition-all duration-[4000ms] ease-in-out
        ${currentImage === index
                    ? "opacity-100 scale-110"
                    : "opacity-0 scale-100"
                  }
      `}
              />
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-white text-sm font-medium italic" style={{ fontFamily: "'Playfair Display', serif" }}>"Forever & Always"</p>
            <p className="text-white/70 text-xs mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Memoria Frames</p>
          </div>
        </div>
        {/* Corner ornaments */}
        <div className="absolute top-1 left-1 w-5 h-5 border-l-2 border-t-2 border-accent rounded-tl-lg" />
        <div className="absolute top-1 right-1 w-5 h-5 border-r-2 border-t-2 border-accent rounded-tr-lg" />
        <div className="absolute bottom-1 left-1 w-5 h-5 border-l-2 border-b-2 border-accent rounded-bl-lg" />
        <div className="absolute bottom-1 right-1 w-5 h-5 border-r-2 border-b-2 border-accent rounded-br-lg" />
      </div>
      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Premium Quality
      </div>
      <div className="absolute -bottom-3 -left-3 bg-card border border-border shadow-lg rounded-2xl px-4 py-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#C4895A" color="#C4895A" />)}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>1000+ frames crafted</p>
      </div>
    </div>
  );
}

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>{tag}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>{subtitle}</p>}
    </div>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => setSliderIndex(i => Math.min(i + 1, bestSellers.length - visibleCount));
  const prevSlide = () => setSliderIndex(i => Math.max(i - 1, 0));

  return (
    <div>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-background via-secondary to-background overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent bg-accent/10 px-4 py-2 rounded-full mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ✦ Premium Custom Frames
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frames That <em className="text-primary">Preserve</em> Your Precious Memories
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Transform your most cherished photos into stunning, handcrafted frames. Every frame tells a story — let yours be extraordinary.
            </p>
            {/* <div className="flex gap-4 flex-wrap">
              <button onClick={() => setPage("form")}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Shop Now
              </button>

            </div> */}
          </div>
          <div className="flex justify-center">
            <DecorativeFrame />
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{label}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frame Categories */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="Collections" title="Frame Categories" subtitle="Explore our curated range of premium frame styles, each crafted for a different story." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setPage("form")}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-muted"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <p className="text-2xl mb-1">{cat.emoji}</p>
                  <p className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{cat.name}</p>
                  <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{cat.count}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Frame Sizes & Pricing */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="Pricing" title="Frame Sizes & Pricing" subtitle="Transparent, competitive pricing with no hidden costs. All frames include free engraving." />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pricingPlans.map(plan => (
              <div
                key={plan.size}
                className={`relative rounded-2xl p-7 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.popular ? "border-primary bg-primary text-primary-foreground shadow-lg" : "border-border bg-card hover:border-primary/40"}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs px-4 py-1 rounded-full font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Most Popular</span>
                )}
                <div className="mb-5">
                  <p className={`text-2xl font-bold mb-1 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`} style={{ fontFamily: "'Playfair Display', serif" }}>{plan.size}</p>
                  <p className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>{plan.label}</p>
                </div>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-primary-foreground" : "text-primary"}`} style={{ fontFamily: "'Playfair Display', serif" }}>₹{plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>/ frame</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check size={14} className={plan.popular ? "text-accent" : "text-accent"} />
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPage("form")}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="Process" title="How It Works" subtitle="From upload to doorstep in 5 simple steps. We make it effortless." />
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {howItWorks.map((step, i) => (
                <div key={step.step} className="flex flex-col items-center text-center relative">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg relative z-10 ${i % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-card border-2 border-primary text-primary"}`}>
                    <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage("form")}
              className="bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:shadow-xl inline-flex items-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Start Your Order <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Design Services Banner */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Custom Design Services</h2>
            <p className="text-primary-foreground/75 max-w-lg leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Need something truly unique? Our in-house designers work with you to create one-of-a-kind frames for corporate gifts, events, or heirloom pieces.
            </p>
          </div>
          <button
            onClick={() => setPage("contact")}
            className="flex-shrink-0 bg-primary-foreground text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-primary-foreground/90 transition-all whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Delivery Info Banner */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Express Delivery", sub: "Within 3–5 business days" },
              { icon: Package, title: "Safe Packaging", sub: "Triple-layer protection" },
              { icon: MapPin, title: "Pan India Shipping", sub: "All 28 states + UTs" },
              { icon: ShieldCheck, title: "Quality Guarantee", sub: "30-day replacement policy" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="bg-card rounded-2xl p-6 border border-border text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading tag="Popular" title="Best Sellers" />
            <div className="flex gap-2 mb-12">
              <button onClick={prevSlide} disabled={sliderIndex === 0} className="w-10 h-10 rounded-full border-2 border-primary text-primary disabled:opacity-30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextSlide} disabled={sliderIndex >= bestSellers.length - visibleCount} className="w-10 h-10 rounded-full border-2 border-primary text-primary disabled:opacity-30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${sliderIndex * (100 / visibleCount)}%)` }}
            >
              {bestSellers.map(item => (
                <div key={item.name} className="flex-shrink-0 w-full md:w-[calc(33.33%-1rem)] bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => setPage("form")}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart size={14} className="text-primary" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-accent font-medium mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.type}</p>
                    <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(item.rating) ? "#C4895A" : "none"} color="#C4895A" />)}
                      <span className="text-xs text-muted-foreground ml-1" style={{ fontFamily: "'Poppins', sans-serif" }}>({item.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>₹{item.price}</span>
                      <button className="bg-primary/10 text-primary text-xs px-4 py-2 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Order</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FORM PAGE (5-step stepper) ───────────────────────────────────────────────
const frameCategories = ["Love Story", "Wedding", "Birthday", "Family", "Baby", "Mosaic", "Dual Exposure", "Embossing", "Number"];
const frameSizes = ["4\" × 6\"", "6\" × 8\"", "8\" × 10\"", "10\" × 12\"", "12\" × 16\"", "16\" × 20\""];
const framePrices: Record<string, number> = { "4\" × 6\"": 299, "6\" × 8\"": 499, "8\" × 10\"": 799, "10\" × 12\"": 1199, "12\" × 16\"": 1799, "16\" × 20\"": 2499 };
const frameColors = ["Walnut Brown", "Ebony Black", "White Oak", "Rustic Gold", "Classic Silver", "Deep Mahogany"];
const fontOptions = ["Playfair Display", "Great Vibes", "Montserrat", "Dancing Script", "Cormorant"];
const themes = ["Romantic", "Minimalist", "Vintage", "Modern", "Rustic", "Floral"];

type OrderData = {
  category: string; size: string; orientation: string;
  photos: File[]; color: string; font: string; text: string; theme: string; date: string;
  name: string; phone: string; email: string; address: string; city: string; state: string; pin: string; notes: string;
};

function FormPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState<OrderData>({
    category: "", size: "", orientation: "Portrait",
    photos: [], color: "", font: "", text: "", theme: "", date: "",
    name: "", phone: "", email: "", address: "", city: "", state: "", pin: "", notes: ""
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const steps = ["Frame", "Photos", "Customize", "Review", "Details"];
  const totalSteps = 5;

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    setOrder(o => ({ ...o, photos: [...o.photos, ...files].slice(0, 10) }));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
    setOrder(o => ({ ...o, photos: [...o.photos, ...files].slice(0, 10) }));
  };

  const removePhoto = (i: number) => setOrder(o => ({ ...o, photos: o.photos.filter((_, idx) => idx !== i) }));

  const canNext = () => {
    if (step === 1) return order.category && order.size && order.orientation;
    if (step === 2) return order.photos.length > 0;
    if (step === 3) return order.color && order.theme;
    if (step === 4) return true;
    if (step === 5) return order.name && order.phone && order.email && order.address && order.city && order.state && order.pin;
    return true;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check size={44} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Order Placed!</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Thank you, <strong>{order.name}</strong>! Your frame is being crafted with love. You'll receive a confirmation on {order.email} within 24 hours.
          </p>
          <div className="bg-card border border-border rounded-2xl p-5 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Frame</span><span className="font-medium text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{order.category} • {order.size}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Photos</span><span className="font-medium text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{order.photos.length} uploaded</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Amount</span><span className="font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>₹{framePrices[order.size] || 0}</span></div>
          </div>
          <button onClick={() => setPage("home")} className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-primary/90 transition-all" style={{ fontFamily: "'Poppins', sans-serif" }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Create Your Frame</h1>
          <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Step {step} of {totalSteps} — {steps[step - 1]}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i + 1 < step ? "bg-primary text-primary-foreground" : i + 1 === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {i + 1 < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block ${i + 1 === step ? "text-primary" : "text-muted-foreground"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>{s}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 mb-6">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frame Category</h3>
                <div className="grid grid-cols-3 gap-3">
                  {frameCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setOrder(o => ({ ...o, category: cat }))}
                      className={`py-3 px-3 rounded-xl border-2 text-sm font-medium transition-all ${order.category === cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frame Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {frameSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setOrder(o => ({ ...o, size: sz }))}
                      className={`py-3 px-3 rounded-xl border-2 text-sm transition-all ${order.size === sz ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <span className="font-semibold">{sz}</span>
                      <br />
                      <span className="text-[11px] opacity-70">₹{framePrices[sz]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Orientation</h3>
                <div className="flex gap-3">
                  {["Portrait", "Landscape", "Square"].map(o => (
                    <button
                      key={o}
                      onClick={() => setOrder(ord => ({ ...ord, orientation: o }))}
                      className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${order.orientation === o ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/40"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Upload Your Photos</h3>
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary"}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                <Upload size={36} className="mx-auto text-primary/60 mb-4" />
                <p className="font-semibold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Drop photos here or click to browse</p>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Accepts JPEG, PNG, HEIC · Max 10 photos · Min 300 DPI recommended</p>
              </div>
              {order.photos.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{order.photos.length} photo{order.photos.length > 1 ? "s" : ""} selected</p>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{10 - order.photos.length} slots remaining</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {order.photos.map((f, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted group">
                        <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={e => { e.stopPropagation(); removePhoto(i); }}
                          className="absolute top-1 right-1 w-6 h-6 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frame Color</h3>
                <div className="grid grid-cols-3 gap-3">
                  {frameColors.map(c => (
                    <button
                      key={c}
                      onClick={() => setOrder(o => ({ ...o, color: c }))}
                      className={`py-3 rounded-xl border-2 text-sm transition-all ${order.color === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/40"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Font Style</h3>
                <div className="grid grid-cols-2 gap-3">
                  {fontOptions.map(f => (
                    <button
                      key={f}
                      onClick={() => setOrder(o => ({ ...o, font: f }))}
                      className={`py-3 rounded-xl border-2 text-sm transition-all ${order.font === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/40"}`}
                      style={{ fontFamily: f.includes("Display") || f.includes("Vibes") || f.includes("Dancing") || f.includes("Cormorant") ? `'${f}', serif` : `'${f}', sans-serif` }}
                    >{f}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frame Text</h3>
                <input
                  type="text"
                  value={order.text}
                  onChange={e => setOrder(o => ({ ...o, text: e.target.value }))}
                  placeholder="e.g. Forever & Always, Our Happy Place…"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map(t => (
                    <button
                      key={t}
                      onClick={() => setOrder(o => ({ ...o, theme: t }))}
                      className={`py-3 rounded-xl border-2 text-sm transition-all ${order.theme === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/40"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Special Date</h3>
                <input
                  type="date"
                  value={order.date}
                  onChange={e => setOrder(o => ({ ...o, date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>

              {/* Live Preview */}
              <div>
                <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Live Preview</h3>
                <div className="bg-secondary rounded-2xl p-6 flex items-center justify-center min-h-[200px]">
                  <div className={`relative rounded-xl border-[8px] border-primary shadow-xl ${order.orientation === "Landscape" ? "w-64 h-40" : order.orientation === "Square" ? "w-44 h-44" : "w-40 h-52"}`}>
                    {order.photos[0] ? (
                      <img src={URL.createObjectURL(order.photos[0])} alt="" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                        <Eye size={24} className="text-muted-foreground" />
                      </div>
                    )}
                    {order.text && (
                      <div className="absolute bottom-0 left-0 right-0 bg-primary/70 py-1 px-2 rounded-b-md text-center">
                        <p className="text-white text-xs truncate" style={{ fontFamily: order.font ? `'${order.font}', serif` : "'Playfair Display', serif" }}>{order.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Review Your Order</h3>
              <div className="space-y-3">
                {[
                  ["Category", order.category],
                  ["Size", order.size],
                  ["Orientation", order.orientation],
                  ["Photos", `${order.photos.length} photo${order.photos.length !== 1 ? "s" : ""}`],
                  ["Frame Color", order.color],
                  ["Font", order.font],
                  ["Text", order.text || "—"],
                  ["Theme", order.theme],
                  ["Date", order.date || "—"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-border last:border-0">
                    <span className="text-muted-foreground text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{label}</span>
                    <span className="text-foreground text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{val}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
                <span className="font-semibold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Total Amount</span>
                <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>₹{framePrices[order.size] || 0}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>Includes free engraving + standard packaging. GST included.</p>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", placeholder: name, type: "text" },
                  { key: "phone", label: "Phone Number", placeholder: mobile, type: "tel" },
                  { key: "email", label: "Email Address", placeholder: email, type: "email" },
                ].map(f => (
                  <div key={f.key} className={f.key === "email" ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-foreground mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={order[f.key as keyof OrderData] as string}
                      onChange={e => setOrder(o => ({ ...o, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-foreground"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Delivery Address</label>
                <textarea
                  value={order.address}
                  onChange={e => setOrder(o => ({ ...o, address: e.target.value }))}
                  placeholder="House/Flat No., Street, Area…"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-foreground resize-none"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: "city", label: "City", placeholder: "Mumbai" },
                  { key: "state", label: "State", placeholder: "Maharashtra" },
                  { key: "pin", label: "PIN Code", placeholder: "400001" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-foreground mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{f.label}</label>
                    <input
                      type="text"
                      value={order[f.key as keyof OrderData] as string}
                      onChange={e => setOrder(o => ({ ...o, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-foreground"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Special Notes (Optional)</label>
                <textarea
                  value={order.notes}
                  onChange={e => setOrder(o => ({ ...o, notes: e.target.value }))}
                  placeholder="Any special instructions for your frame…"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-foreground resize-none"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => step === 1 ? setPage("home") : setStep(s => s - 1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ChevronLeft size={16} /> {step === 1 ? "Back to Home" : "Previous"}
          </button>
          <button
            onClick={() => {
              if (step === totalSteps) { setSuccess(true); }
              else setStep(s => s + 1);
            }}
            disabled={!canNext()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {step === totalSteps ? "Place Order" : "Continue"} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────


function GalleryPage({ setPage }: { setPage: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<null | { img: string; title: string }>(null);
  const filtered = filter === "All" ? galleryItems : galleryItems.filter(g => g.cat === filter);

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center">
        <p className="text-sm tracking-widest uppercase opacity-70 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Inspiration Gallery</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Every Frame, a Masterpiece</h1>
        <p className="text-primary-foreground/75 max-w-xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Browse real frames crafted by Memoria. Each one is a unique story, preserved forever.
        </p>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >{c}</button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightbox(item)}
              className="break-inside-avoid mb-4 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-muted"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={18} className="text-white" />

                <p
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </p>

                <span
                  className="text-white/70 text-xs px-3 py-1 rounded-full bg-white/20"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {item.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={lightbox.img} alt={lightbox.title} className="w-full object-cover" />
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                <X size={18} className="text-foreground" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{lightbox.title}</h3>
                <p className="text-white/70 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{lightbox.img.split("/").pop()?.split("?")[0]}</p>
                <button onClick={() => { setLightbox(null); setPage("form"); }} className="mt-3 bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Order Similar Frame</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const team = [
  { name: "Arjun Mehta", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format", bio: "With 15 years in artisan craftsmanship, Arjun founded Memoria to bring heirloom-quality frames to every home." },
  { name: "Priya Kapoor", role: "Head of Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format", bio: "Priya leads our design team, turning photos into visual narratives with meticulous attention to detail." },
  { name: "Rahul Desai", role: "Operations Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format", bio: "Rahul ensures every frame is crafted, packaged, and delivered with the same care as the day it was designed." },
  { name: "Sneha Iyer", role: "Customer Experience", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format", bio: "Sneha and her team make sure every customer feels heard, valued, and delighted from first click to doorstep." },
];



function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-28 px-6 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Modern & Emotional ❤️🫶
          </h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Memoria Frame Makers was born in 2026 from a simple belief — every precious moment deserves to be displayed with the care it carries.
          </p>
        </div>
      </section>

      {/* Banner */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="Our Vision" title="Customized Frames & Gifts" subtitle="Passionate craftspeople and designers dedicated to making your memories last forever." />
          <div className="relative w-full">
            <div className="absolute inset-0 bg-primary/10 blur-2xl" />
            <div className="relative w-full aspect-[16/6] border-[10px] border-primary bg-secondary shadow-2xl overflow-hidden">
              <div className="absolute inset-4 border-2 border-primary/30 overflow-hidden">
                <img
                  src={bannerImage}
                  alt="Memoria Frame Makers"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story + Mission + Vision */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {ourStory.map(card => (
            <div key={card.title} className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
              <p className="text-sm opacity-75 tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-1"></div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
const faqs = [
  { q: "How long does it take to receive my frame?", a: "Standard delivery takes 3–7 business days. Express delivery (1–3 days) is available for an additional charge. We ship across India." },
  { q: "What photo resolution is recommended?", a: "We recommend a minimum of 300 DPI for best print quality. For large frames (12\" × 16\" and above), 600 DPI or higher gives excellent results." },
  { q: "Can I request a custom size not listed?", a: "Absolutely! Contact us with your custom dimensions and we'll provide a quote within 24 hours. We accommodate nearly any size." },
  { q: "What is your replacement policy?", a: "We offer a 30-day replacement guarantee for any manufacturing defects. If your frame arrives damaged, we'll replace it free of charge." },
  { q: "Do you offer bulk or corporate orders?", a: "Yes! We offer special pricing for bulk orders of 10 or more frames. Ideal for corporate gifts, events, or wedding favors. Contact us for a quote." },
];

function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-secondary to-background text-center">
        <p className="text-sm tracking-widest uppercase text-accent font-semibold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Get in Touch</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>We'd Love to Hear from You</h1>
        <p className="text-muted-foreground max-w-md mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>Whether it's a question, custom order, or just a hello — our team responds within 24 hours.</p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Contact Details</h2>
            <div className="space-y-5 mb-10">
              {[
                { icon: Phone, label: "Phone", value: mobile },
                { icon: Mail, label: "Email", value: email },
                { icon: MapPinIcon, label: "Location", value: address },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>{label}</p>
                    <p className="text-foreground font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={mapURL}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="rounded-2xl overflow-hidden border border-border h-56 relative">
                <img
                  src={mapImage}
                  alt="Location map"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/35" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">

                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <MapPinIcon size={28} className="text-white" />
                  </div>


                  <p
                    className="text-sm font-semibold drop-shadow-md"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Memoria Frame Makers
                  </p>

                  <p
                    className="text-xs text-center px-4 drop-shadow-md"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {address}
                  </p>

                  {/* Pulse */}
                  <div className="absolute w-14 h-14 rounded-full border-2 border-white/60 animate-ping" />

                </div>
              </div>
            </a>
          </div>

          {/* Enquiry Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Send an Enquiry</h2>
            {sent ? (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-500" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Message Sent!</h3>
                <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Thank you, {form.name}. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {[
                  { key: "name", label: "Your Name", placeholder: name, type: "text" },
                  { key: "email", label: "Email Address", placeholder: email, type: "email" },
                  { key: "phone", label: "Phone Number", placeholder: mobile, type: "tel" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-foreground mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(o => ({ ...o, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-foreground"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(o => ({ ...o, message: e.target.value }))}
                    placeholder="Tell us how we can help you…"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-foreground resize-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>
                <button
                  onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section >

      {/* FAQ */}
      < section className="py-20 px-6 bg-secondary" >
        <div className="max-w-3xl mx-auto">
          <SectionHeading tag="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-foreground text-sm pr-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-primary flex-shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const scrollToTop = (newPage: Page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };




  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {page !== "form" && <Navbar page={page} setPage={scrollToTop} />}

      <main>
        {page === "home" && <HomePage setPage={scrollToTop} />}
        {page === "form" && <FormPage setPage={scrollToTop} />}
        {page === "gallery" && <GalleryPage setPage={scrollToTop} />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>

      {page !== "form" && <Footer setPage={scrollToTop} />}
    </div>
  );
}
