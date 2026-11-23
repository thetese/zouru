"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  GlassWater,
  Menu,
  Pause,
  Play,
  Utensils,
  Waves,
  X,
} from "lucide-react";

const HERO_SLIDES = [
  {
    src: "/zouru-lake-kivu.png",
    alt: "The quiet shoreline of Lake Kivu from a garden terrace in Gisenyi",
    index: "01 / 03",
    caption: "A slower side of Rwanda",
  },
  {
    src: "/images/hotel/hotel-exterior-night.jpg",
    alt: "Zouru Bravo Hotel illuminated at dusk with glowing cantilevered balconies",
    index: "02 / 03",
    caption: "Warm evenings at Zouru",
  },
  {
    src: "/zouru-lake-shore.png",
    alt: "A leafy shoreline looking across Lake Kivu toward the hills",
    index: "03 / 03",
    caption: "Find your quiet by the water",
  },
] as const;

const EXPERIENCES = [
  {
    id: "stay",
    number: "01",
    category: "ROOMS & SUITES",
    title: "Stay a little longer",
    description:
      "Slow mornings, thoughtful details, and a good night\u2019s rest by the lake.",
    image: "/images/rooms/room-botanical-suite.jpg",
    alt: "Zouru Hotel king bedroom with crisp white linens, taupe headboard, and teal botanical accents",
    href: "#rooms",
  },
  {
    id: "dining",
    number: "02",
    category: "RESTAURANT & BAR",
    title: "Pull up a chair",
    description:
      "Rwandan ingredients, familiar favourites, and one more round at the bar.",
    image: "/images/hotel/hotel-bar-shelves.jpg",
    alt: "Zouru Hotel bar with warm gold hanging pendant lights and backlit wine and spirit shelves",
    href: "#book",
  },
  {
    id: "gather",
    number: "03",
    category: "MEETINGS & EVENTS",
    title: "Make room for ideas",
    description:
      "A change of scenery for the conversations that move things forward.",
    image: "/images/hotel/hotel-reception.jpg",
    alt: "Zouru Bravo Hotel reception lobby with fluted slate counter and marble crest wall",
    href: "#book",
  },
] as const;

type RoomCategory = "all" | "rooms" | "exterior" | "spaces";

const ROOM_GALLERY = [
  {
    src: "/images/rooms/room-botanical-suite.jpg",
    title: "Botanical King Room",
    tag: "01 / ROOMS",
    category: "rooms" as const,
    note: "Taupe tufted headboard, crisp white linens, and teal-gold botanical accents.",
    alt: "Zouru Hotel bedroom with taupe tufted headboard, crisp white pillows, and teal botanical throw cushions",
    objectPosition: "center center",
  },
  {
    src: "/images/hotel/hotel-exterior-night.jpg",
    title: "Zouru at Dusk",
    tag: "02 / EXTERIOR",
    category: "exterior" as const,
    note: "Warmly lit cantilevered balconies, stone columns, and calm Gisenyi evenings.",
    alt: "Zouru Hotel exterior illuminated at night with glowing balconies and potted greenery",
    objectPosition: "center center",
  },
  {
    src: "/images/rooms/room-amber-king.jpg",
    title: "Amber King Room",
    tag: "03 / ROOMS",
    category: "rooms" as const,
    note: "Channeled beige headboard with warm bronze throw pillows and king bedding.",
    alt: "Zouru Hotel king bed with channeled beige leather headboard, white sheets, and textured bronze runner",
    objectPosition: "center center",
  },
  {
    src: "/images/hotel/hotel-reception.jpg",
    title: "Reception & Welcome",
    tag: "04 / RECEPTION",
    category: "spaces" as const,
    note: "Fluted slate reception desk, marble emblem wall, and warm first hellos.",
    alt: "Zouru Bravo Hotel reception desk beneath a marble wall emblem and ring chandelier",
    objectPosition: "center center",
  },
  {
    src: "/images/hotel/hotel-balcony-view.jpg",
    title: "Lantern Balcony",
    tag: "05 / BALCONY",
    category: "exterior" as const,
    note: "Sunlit marble walkways, hanging wrought-iron lanterns, and misty Rubavu hills.",
    alt: "Sunlit hotel balcony walkway with hanging lanterns looking out toward the hills of Rubavu",
    objectPosition: "50% 42%",
  },
  {
    src: "/images/hotel/hotel-bar-shelves.jpg",
    title: "Hotel Bar",
    tag: "06 / BAR & LOUNGE",
    category: "spaces" as const,
    note: "Warm pendant lights, backlit shelves, and unhurried evening drinks.",
    alt: "Zouru Hotel bar shelves stocked with wine and spirits beneath warm brass pendant lights",
    objectPosition: "50% 52%",
  },
  {
    src: "/images/rooms/room-amber-art.jpg",
    title: "Terracotta Tree Suite",
    tag: "07 / ROOMS",
    category: "rooms" as const,
    note: "Warm botanical canvas triptych above plush king pillows and soft walls.",
    alt: "Zouru Hotel bedroom headboard with vibrant terracotta tree triptych artwork above",
    objectPosition: "center center",
  },
  {
    src: "/images/hotel/hotel-exterior-day.jpg",
    title: "Modern Facade",
    tag: "08 / EXTERIOR",
    category: "exterior" as const,
    note: "Crisp white balconies, blue architectural glass, and leafy terrace accents.",
    alt: "Modern white and slate exterior facade of Zouru Hotel under a bright Gisenyi sky",
    objectPosition: "center center",
  },
  {
    src: "/images/rooms/room-botanical-art.jpg",
    title: "Sunset Suite",
    tag: "09 / ROOMS",
    category: "rooms" as const,
    note: "Warm golden artwork, dark tufted headboard, and airy floor-length drapes.",
    alt: "Zouru Hotel suite featuring golden sunset artwork above a dark tufted leather headboard",
    objectPosition: "center center",
  },
  {
    src: "/images/hotel/hotel-lounge-seating.jpg",
    title: "Velvet Guest Lounge",
    tag: "10 / LOUNGE",
    category: "spaces" as const,
    note: "Teal velvet sofa and sunlit armchairs arranged for easy conversation.",
    alt: "Bright guest lounge with teal velvet sofa, yellow scalloped chairs, and coffee table",
    objectPosition: "center center",
  },
  {
    src: "/images/hotel/hotel-night-tower.jpg",
    title: "Evening Corner Lounge",
    tag: "11 / EXTERIOR",
    category: "exterior" as const,
    note: "Glowing upper glass lounge and tiered balconies against the night sky.",
    alt: "Nighttime corner view of Zouru Hotel showing glowing glass top floor and balconies",
    objectPosition: "50% 35%",
  },
  {
    src: "/images/rooms/room-rain-shower.jpg",
    title: "Walk-in Rain Shower",
    tag: "12 / EN-SUITE",
    category: "spaces" as const,
    note: "Overhead rainfall showerhead and handheld wand in bright tiled en-suites.",
    alt: "Modern chrome rainfall shower and handheld wand inside a white-tiled Zouru Hotel bathroom",
    objectPosition: "50% 24%",
  },
] as const;

const ROOM_FILTER_OPTIONS: { value: RoomCategory; label: string }[] = [
  { value: "all", label: "All photos (12)" },
  { value: "rooms", label: "Rooms (4)" },
  { value: "exterior", label: "Exterior & views (4)" },
  { value: "spaces", label: "Spaces & bath (4)" },
];

const ROOM_TYPES = [
  "Lake view room",
  "Garden room",
  "Suite",
  "Not sure yet",
] as const;

const GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function HotelSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero slideshow state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Rooms gallery & lightbox state
  const [roomFilter, setRoomFilter] = useState<RoomCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Booking form state
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState<string>("Lake view room");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [minDates, setMinDates] = useState({ today: "", tomorrow: "" });

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    setMinDates({
      today: toLocalIsoDate(now),
      tomorrow: toLocalIsoDate(tomorrow),
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isPaused || isHovering || isFocused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, isHovering, isFocused, prefersReducedMotion]);

  const filteredRooms =
    roomFilter === "all"
      ? ROOM_GALLERY
      : ROOM_GALLERY.filter((photo) => photo.category === roomFilter);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null
            ? null
            : (current - 1 + ROOM_GALLERY.length) % ROOM_GALLERY.length
        );
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % ROOM_GALLERY.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex]);

  const activeLightboxPhoto =
    lightboxIndex !== null ? ROOM_GALLERY[lightboxIndex] : null;

  const currentSlide = HERO_SLIDES[activeSlide];
  const closeMenu = () => setMenuOpen(false);
  const goPrev = () =>
    setActiveSlide(
      (current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  const goNext = () =>
    setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          email: email.trim(),
          checkIn,
          checkOut,
          guests: Number(guests),
          roomType,
          phone: phone.trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(
          data.error ||
            "We couldn't send your request right now. Please check your details and try again."
        );
        return;
      }

      setSuccessMessage(
        "Thanks \u2014 we\u2019ve received your request. Our team will be in touch to confirm."
      );
      setGuestName("");
      setEmail("");
      setCheckIn("");
      setCheckOut("");
      setGuests("2");
      setRoomType("Lake view room");
      setPhone("");
    } catch {
      setErrorMessage(
        "We couldn't reach the booking service right now. Please try again shortly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="hotel-site">
      <div className="announcement">
        <span>A good place to land in Gisenyi</span>
        <span className="announcement-location">
          RUBAVU, RWANDA · LAKE KIVU
        </span>
      </div>

      <header className="site-header">
        <a
          className="brand-logo"
          href="#home"
          aria-label="Zouru Bravo Hotel home"
        >
          <Image
            src="/images/zouru-logo-dark.png"
            alt="Zouru Bravo Hotel"
            width={767}
            height={369}
            priority
            className="brand-logo-img"
          />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={1.7} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.7} aria-hidden="true" />
          )}
        </button>

        <nav
          className={`main-nav${menuOpen ? " nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#stay" onClick={closeMenu}>
            Stay
          </a>
          <a href="#dining" onClick={closeMenu}>
            Eat &amp; drink
          </a>
          <a href="#gather" onClick={closeMenu}>
            Gather
          </a>
          <a href="#about" onClick={closeMenu}>
            Our place
          </a>
          <a className="nav-book" href="#book" onClick={closeMenu}>
            Book your stay
            <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="hero"
          role="region"
          aria-roledescription="carousel"
          aria-label="Lake Kivu views at Zouru Hotel"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setIsFocused(false);
            }
          }}
        >
          <div className="hero-slides">
            {HERO_SLIDES.map((slide, index) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`hero-image${index === activeSlide ? " is-active" : ""}`}
                aria-hidden={index !== activeSlide}
              />
            ))}
          </div>

          <div className="hero-shade" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">ON THE SHORES OF LAKE KIVU</p>
            <h1>
              Come for the <em>lake.</em> Stay for the feeling.
            </h1>
            <p className="hero-copy">
              A warm welcome, a table worth lingering at, and a little more room
              to breathe. Find us in Gisenyi.
            </p>
            <a className="hero-link" href="#stay">
              Get to know us
              <ArrowDown size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>

          <span className="hero-note" aria-hidden="true">
            2°29&apos; S &nbsp; 29°12&apos; E
          </span>

          <div className="hero-caption" aria-live="polite">
            <span>{currentSlide.index}</span>
            <span>{currentSlide.caption}</span>
          </div>

          <div
            className="hero-controls"
            role="group"
            aria-label="Slideshow controls"
          >
            <button type="button" aria-label="Previous slide" onClick={goPrev}>
              <ChevronLeft size={16} strokeWidth={1.7} aria-hidden="true" />
            </button>

            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={`hero-dot${index === activeSlide ? " is-active" : ""}`}
                aria-label={`Show slide ${index + 1}: ${slide.caption}`}
                aria-current={index === activeSlide ? "true" : undefined}
                onClick={() => setActiveSlide(index)}
              >
                <span />
              </button>
            ))}

            <button
              type="button"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={isPaused}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {isPaused ? (
                <Play size={13} strokeWidth={1.7} aria-hidden="true" />
              ) : (
                <Pause size={13} strokeWidth={1.7} aria-hidden="true" />
              )}
            </button>

            <button type="button" aria-label="Next slide" onClick={goNext}>
              <ChevronRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section id="book" className="booking-band" aria-label="Book your stay">
          <div className="booking-intro">
            <p className="eyebrow">YOUR ROOM BY THE WATER</p>
            <h2>Let&apos;s get you here.</h2>
            <p>
              Tell us a little about your stay. Our team will confirm
              availability and get back to you.
            </p>
            <div className="booking-contact">
              Not sure what suits you?
              <a href="#dining">
                Explore the hotel
                <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <label>
              Your name
              <input
                type="text"
                name="guestName"
                placeholder="Name"
                minLength={2}
                maxLength={100}
                required
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                maxLength={254}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              Arrival
              <input
                type="date"
                name="checkIn"
                required
                min={minDates.today || undefined}
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </label>

            <label>
              Departure
              <input
                type="date"
                name="checkOut"
                required
                min={minDates.tomorrow || undefined}
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </label>

            <label>
              Guests
              <select
                name="guests"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              >
                {GUEST_COUNTS.map((count) => (
                  <option key={count} value={String(count)}>
                    {count} {count === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="select-chevron"
                size={14}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </label>

            <label>
              Room style
              <select
                name="roomType"
                value={roomType}
                onChange={(event) => setRoomType(event.target.value)}
              >
                {ROOM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="select-chevron"
                size={14}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </label>

            <label className="booking-phone">
              Phone <span>(optional)</span>
              <input
                type="tel"
                name="phone"
                placeholder="+250"
                maxLength={30}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>

            <button
              type="submit"
              className="submit-booking"
              disabled={submitting}
            >
              <span>{submitting ? "Sending…" : "Request a stay"}</span>
              <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </button>

            {(successMessage || errorMessage) && (
              <div className="booking-feedback" aria-live="polite">
                {successMessage && (
                  <span className="success-message">
                    <Check size={15} strokeWidth={2} aria-hidden="true" />
                    {successMessage}
                  </span>
                )}
                {errorMessage && (
                  <span className="error-message">{errorMessage}</span>
                )}
              </div>
            )}

            <p className="booking-fineprint">
              No payment now. We&apos;ll confirm your dates personally.
            </p>
          </form>
        </section>

        <section id="about" className="welcome-section">
          <div className="welcome-kicker">
            <p className="eyebrow">A PLACE WITH A PULSE</p>
            <span className="section-index">
              RUBAVU, RWANDA &nbsp;/&nbsp; SINCE ALWAYS
            </span>
          </div>

          <div className="welcome-copy">
            <h2>
              Not just somewhere to sleep.
              <br />
              <em>Somewhere to settle in.</em>
            </h2>
            <p>
              There&apos;s a particular kind of ease to life beside Lake Kivu.
              At Zouru, we try to bring a little of that feeling into everything
              — from the first hello at reception to the last cup of coffee.
            </p>
            <a className="text-link" href="#experiences">
              A little more about us
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>

          <div className="welcome-stamp" aria-hidden="true">
            <Waves size={25} strokeWidth={1.2} />
            <span>
              RIGHT
              <br />
              WHERE YOU
              <br />
              SHOULD BE
            </span>
          </div>
        </section>

        <section id="experiences" className="experience-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MAKE YOURSELF AT HOME</p>
              <h2>
                There&apos;s a place
                <br />
                for <em>every kind</em> of day.
              </h2>
            </div>
            <p className="section-aside">
              A restful night, a long lunch, a good room to bring everyone
              together. Start wherever you like.
            </p>
          </div>

          <div className="experience-grid">
            {EXPERIENCES.map((item) => (
              <article key={item.id} id={item.id} className="experience-card">
                <a
                  className="experience-photo"
                  href={item.href}
                  aria-label={item.title}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 680px) 100vw, 33vw"
                  />
                </a>
                <div className="experience-meta">
                  <span>
                    {item.number} &nbsp; / &nbsp; {item.category}
                  </span>
                  <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a className="card-link" href={item.href}>
                  Find out more
                  <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="rooms"
          className="rooms-section"
          aria-label="Hotel photo gallery"
        >
          <div className="section-heading rooms-heading">
            <div>
              <p className="eyebrow">INSIDE ZOURU</p>
              <h2>
                Spaces made
                <br />
                for <em>slow mornings.</em>
              </h2>
            </div>
            <p className="section-aside">
              Illuminated balconies, welcoming lounges, crisp white linens, and
              calm rooms — a real look inside Zouru Hotel in Gisenyi.
            </p>
          </div>

          <div className="rooms-toolbar">
            <div
              className="rooms-filters"
              role="group"
              aria-label="Filter hotel photos"
            >
              {ROOM_FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`rooms-filter-btn${roomFilter === option.value ? " is-active" : ""}`}
                  aria-pressed={roomFilter === option.value}
                  onClick={() => setRoomFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span className="rooms-count">
              {String(filteredRooms.length).padStart(2, "0")} /{" "}
              {String(ROOM_GALLERY.length).padStart(2, "0")} VIEWS
            </span>
          </div>

          <div
            className={`rooms-gallery${roomFilter !== "all" ? " is-filtered" : ""}`}
          >
            {filteredRooms.map((photo, index) => {
              const fullIndex = ROOM_GALLERY.findIndex(
                (entry) => entry.src === photo.src
              );
              const tileVariant =
                roomFilter !== "all"
                  ? ""
                  : index === 0
                    ? " room-tile-lead"
                    : index === 1
                      ? " room-tile-secondary"
                      : index === 6 || index === 7
                        ? " room-tile-feature"
                        : " room-tile-sub";

              return (
                <button
                  key={photo.src}
                  type="button"
                  className={`room-tile${tileVariant}`}
                  onClick={() => setLightboxIndex(fullIndex)}
                  aria-label={`View ${photo.title} full size`}
                >
                  <div className="room-tile-photo">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={
                        roomFilter === "all" && index === 0
                          ? "(max-width: 680px) 100vw, 58vw"
                          : roomFilter === "all" &&
                              (index === 1 || index === 6 || index === 7)
                            ? "(max-width: 680px) 100vw, 48vw"
                            : "(max-width: 680px) 100vw, 25vw"
                      }
                      style={{ objectPosition: photo.objectPosition }}
                    />
                    <span className="room-tile-zoom" aria-hidden="true">
                      <ArrowUpRight size={15} strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="room-tile-caption">
                    <span className="room-tile-title">{photo.title}</span>
                    <span className="room-tile-tag">{photo.tag}</span>
                  </div>
                  <p className="room-tile-note">{photo.note}</p>
                </button>
              );
            })}
          </div>

          <div className="rooms-footer">
            <p>
              Real photography from Zouru Hotel · Select any image to view full
              size.
            </p>
            <a className="text-link" href="#book">
              Book your stay
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="table-section" aria-label="Dining and bar">
          <div className="table-image">
            <Image
              src="/images/hotel/hotel-bar-shelves.jpg"
              alt="The Zouru Hotel bar with warm brass pendant lighting and backlit wine and spirit shelves"
              fill
              sizes="(max-width: 680px) 100vw, 58vw"
              style={{ objectPosition: "50% 52%" }}
            />
          </div>

          <div className="table-copy">
            <p className="eyebrow">A GOOD TABLE IS A GATHERING PLACE</p>
            <h2>
              Come hungry.
              <br />
              <em>Leave happy.</em>
            </h2>
            <p>
              Easygoing lunches, unhurried dinners, a drink that turns into two.
              Our kitchen brings local flavour and honest hospitality to the
              table.
            </p>
            <div className="table-tags">
              <span>
                <Utensils size={16} strokeWidth={1.5} aria-hidden="true" />
                Restaurant
              </span>
              <span>
                <GlassWater size={16} strokeWidth={1.5} aria-hidden="true" />
                Bar &amp; lounge
              </span>
              <span>
                <Coffee size={16} strokeWidth={1.5} aria-hidden="true" />
                Coffee, always
              </span>
            </div>
            <a className="light-link" href="#book">
              Plan a visit
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="gather-section" aria-label="Meetings and gatherings">
          <div className="gather-copy">
            <p className="eyebrow">BRING YOUR PEOPLE</p>
            <h2>
              Good things
              <br />
              happen when
              <br />
              <em>we get together.</em>
            </h2>
            <p>
              From working sessions to celebrations worth remembering,
              we&apos;ll help you find the right space and make it feel like
              yours.
            </p>
            <a className="text-link" href="#book">
              Ask about a gathering
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>

          <div className="gather-image">
            <Image
              src="/images/hotel/hotel-lounge-seating.jpg"
              alt="Zouru Hotel guest lounge with velvet teal sofa, sunlit yellow armchairs, and coffee table"
              fill
              sizes="(max-width: 680px) 100vw, 45vw"
            />
          </div>
        </section>

        <section className="neighbourhood" aria-label="Location">
          <div className="neighbourhood-top">
            <p className="eyebrow">A LITTLE CLOSER TO THE GOOD STUFF</p>
            <span>01 / 03</span>
          </div>

          <h2>
            Gisenyi, at its
            <br />
            <em>own easy pace.</em>
          </h2>
          <p>
            Walk the lakefront. Find a little local market. Watch the evening
            light change over the water. We&apos;re happy to point you in the
            right direction.
          </p>
          <a
            className="neighbourhood-link"
            href="https://maps.google.com/?q=Gisenyi+Rubavu+Rwanda"
            target="_blank"
            rel="noreferrer"
          >
            Find us in Rubavu
            <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </a>

          <div className="neighbourhood-mark" aria-hidden="true">
            KIVU
            <span>LAKE / RWANDA</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a
            className="brand-logo footer-brand-logo"
            href="#home"
            aria-label="Zouru Bravo Hotel home"
          >
            <Image
              src="/images/zouru-logo-gold.png"
              alt="Zouru Bravo Hotel"
              width={767}
              height={369}
              className="brand-logo-img"
            />
          </a>

          <p>
            A good place to land.
            <br />
            A lovely place to linger.
          </p>

          <div className="footer-contact">
            <span>Lake Kivu</span>
            <span>Rubavu, Gisenyi</span>
            <span>Western Province, Rwanda</span>
          </div>

          <a className="footer-book" href="#book">
            Come stay awhile
            <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© Zouru Hotel 2026</span>
          <span>Made for the in-between moments.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxPhoto.title}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="lightbox-top"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lightbox-meta">
              <span>
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(ROOM_GALLERY.length).padStart(2, "0")}
              </span>
              <span>{activeLightboxPhoto.tag}</span>
            </div>
            <button
              type="button"
              className="lightbox-btn"
              aria-label="Close photo viewer"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <div
            className="lightbox-stage"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-btn"
              aria-label="Previous photo"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + ROOM_GALLERY.length) %
                    ROOM_GALLERY.length
                )
              }
            >
              <ChevronLeft size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>

            <div className="lightbox-frame">
              <Image
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                fill
                sizes="90vw"
                priority
              />
            </div>

            <button
              type="button"
              className="lightbox-btn"
              aria-label="Next photo"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % ROOM_GALLERY.length)
              }
            >
              <ChevronRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <div
            className="lightbox-bottom"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>{activeLightboxPhoto.title}</h3>
            <p>{activeLightboxPhoto.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
