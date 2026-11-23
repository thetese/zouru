"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Coffee,
  GlassWater,
  Menu,
  Search,
  Utensils,
  X,
} from "lucide-react";
import {
  MENU_SECTIONS,
  MENU_TABS,
  type MenuSubsection,
  type MenuTabId,
} from "@/lib/menu-data";

function countSectionItems(section: MenuSubsection): number {
  return section.kind === "simple"
    ? (section.items?.length ?? 0)
    : (section.tieredItems?.length ?? 0);
}

export function MenuPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTabId>("all");
  const [query, setQuery] = useState("");

  const closeMenu = () => setMenuOpen(false);

  const visibleSections = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MENU_SECTIONS.filter(
      (section) => activeTab === "all" || section.tab === activeTab
    )
      .map((section): MenuSubsection | null => {
        if (!q) return section;

        const sectionMatches =
          section.title.toLowerCase().includes(q) ||
          section.eyebrow.toLowerCase().includes(q);

        if (sectionMatches) return section;

        if (section.kind === "simple" && section.items) {
          const matched = section.items.filter(
            (item) =>
              item.name.toLowerCase().includes(q) ||
              (item.description && item.description.toLowerCase().includes(q))
          );
          if (matched.length === 0) return null;
          return { ...section, items: matched };
        }

        if (section.kind === "tiered" && section.tieredItems) {
          const matched = section.tieredItems.filter((item) =>
            item.name.toLowerCase().includes(q)
          );
          if (matched.length === 0) return null;
          return { ...section, tieredItems: matched };
        }

        return null;
      })
      .filter((section): section is MenuSubsection => section !== null);
  }, [activeTab, query]);

  const totalVisibleItems = useMemo(
    () =>
      visibleSections.reduce(
        (sum, section) => sum + countSectionItems(section),
        0
      ),
    [visibleSections]
  );

  return (
    <div className="hotel-site">
      <div className="announcement">
        <span>A good place to land in Gisenyi</span>
        <span className="announcement-location">
          RUBAVU, RWANDA · LAKE KIVU
        </span>
      </div>

      <header className="site-header">
        <Link
          className="brand-logo"
          href="/"
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
        </Link>

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
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/#rooms" onClick={closeMenu}>
            Rooms
          </Link>
          <Link
            href="/menu"
            className="nav-active"
            aria-current="page"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link href="/#about" onClick={closeMenu}>
            Our place
          </Link>
          <Link className="nav-book" href="/#book" onClick={closeMenu}>
            Book your stay
            <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </nav>
      </header>

      <main id="top">
        <section className="menu-hero" aria-label="Restaurant and bar menu">
          <div className="menu-hero-copy">
            <Link href="/" className="menu-back-link">
              <ArrowLeft size={14} strokeWidth={1.6} aria-hidden="true" />
              Back to Zouru Hotel
            </Link>
            <p className="eyebrow">ZOURU KITCHEN &amp; BAR</p>
            <h1>
              Eat well,
              <br />
              <em>stay awhile.</em>
            </h1>
            <p className="menu-hero-desc">
              From Lake Kivu tilapia and charcoal-grilled brochettes to morning
              African tea, fresh juices, and evening cocktails. All prices are
              listed in Rwandan Francs (RWF).
            </p>
            <div className="table-tags">
              <span>
                <Utensils size={16} strokeWidth={1.5} aria-hidden="true" />
                All-day kitchen
              </span>
              <span>
                <GlassWater size={16} strokeWidth={1.5} aria-hidden="true" />
                Bar &amp; cellar
              </span>
              <span>
                <Coffee size={16} strokeWidth={1.5} aria-hidden="true" />
                Coffee &amp; tea
              </span>
            </div>
          </div>

          <div className="menu-hero-photo">
            <Image
              src="/images/hotel/hotel-bar-shelves.jpg"
              alt="Backlit wine and spirit shelves beneath brass pendant lights at Zouru Hotel"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectPosition: "50% 52%" }}
            />
          </div>
        </section>

        <section className="menu-controls" aria-label="Filter and search menu">
          <div className="menu-controls-top">
            <label className="menu-search-wrap" aria-label="Search menu items">
              <Search
                size={15}
                strokeWidth={1.7}
                className="menu-search-icon"
                aria-hidden="true"
              />
              <input
                type="search"
                className="menu-search-input"
                placeholder="Search dishes, drinks, or ingredients…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="menu-search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X size={14} strokeWidth={1.8} aria-hidden="true" />
                </button>
              )}
            </label>

            <span className="menu-count" aria-live="polite">
              {totalVisibleItems} {totalVisibleItems === 1 ? "ITEM" : "ITEMS"} ·
              PRICES IN RWF
            </span>
          </div>

          <div
            className="menu-tabs"
            role="group"
            aria-label="Menu categories"
          >
            {MENU_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`rooms-filter-btn${activeTab === tab.id ? " is-active" : ""}`}
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        <div className="menu-body">
          {visibleSections.length === 0 ? (
            <div className="menu-empty">
              <p className="eyebrow">NO MATCHES</p>
              <h2>Nothing matched &ldquo;{query.trim()}&rdquo;</h2>
              <p>
                Try another dish, drink, or ingredient — or view the full menu.
              </p>
              <button
                type="button"
                className="menu-reset-btn"
                onClick={() => {
                  setQuery("");
                  setActiveTab("all");
                }}
              >
                Show full menu
              </button>
            </div>
          ) : (
            visibleSections.map((section) => {
              const count = countSectionItems(section);
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="menu-section"
                  aria-labelledby={`heading-${section.id}`}
                >
                  <div className="menu-section-head">
                    <div>
                      <p className="eyebrow">{section.eyebrow}</p>
                      <h2 id={`heading-${section.id}`}>{section.title}</h2>
                    </div>
                    <span className="menu-section-count">
                      {String(count).padStart(2, "0")}
                    </span>
                  </div>

                  {section.note && (
                    <p className="menu-note">{section.note}</p>
                  )}

                  {section.kind === "simple" && section.items && (
                    <ul className="menu-list">
                      {section.items.map((item) => (
                        <li key={item.name} className="menu-item">
                          <div className="menu-item-row">
                            <span className="menu-item-name">{item.name}</span>
                            <span
                              className="menu-item-dots"
                              aria-hidden="true"
                            />
                            <span className="menu-item-price">
                              {item.price} <small>RWF</small>
                            </span>
                          </div>
                          {item.description && (
                            <p className="menu-item-desc">{item.description}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.kind === "tiered" && section.tieredItems && (
                    <div className="menu-table-wrap">
                      <table className="menu-tiered-table">
                        <thead>
                          <tr>
                            <th scope="col">Selection</th>
                            <th scope="col" className="num">
                              Bottle
                            </th>
                            <th scope="col" className="num">
                              Glass
                            </th>
                            <th scope="col" className="num">
                              Toti
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.tieredItems.map((item) => (
                            <tr key={`${item.name}-${item.bottle ?? ""}`}>
                              <th scope="row">{item.name}</th>
                              <td className="num">
                                {item.bottle ? `${item.bottle}` : "—"}
                              </td>
                              <td className="num">
                                {item.glass ? `${item.glass}` : "—"}
                              </td>
                              <td className="num">
                                {item.toti ? `${item.toti}` : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              );
            })
          )}
        </div>

        <section className="menu-cta-band" aria-label="Plan a visit">
          <div>
            <p className="eyebrow">TABLE OR STAY</p>
            <h2>
              Hungry already? <em>Come join us.</em>
            </h2>
            <p>
              Whether you&apos;re stopping by for Lake Kivu tilapia or planning
              a weekend in Gisenyi, we&apos;ll save you a good spot.
            </p>
          </div>
          <div className="menu-cta-actions">
            <Link className="submit-booking menu-cta-btn" href="/#book">
              <span>Book your stay</span>
              <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/">
              Back to Zouru Hotel
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <Link
            className="brand-logo footer-brand-logo"
            href="/"
            aria-label="Zouru Bravo Hotel home"
          >
            <Image
              src="/images/zouru-logo-gold.png"
              alt="Zouru Bravo Hotel"
              width={767}
              height={369}
              className="brand-logo-img"
            />
          </Link>

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

          <Link className="footer-book" href="/#book">
            Come stay awhile
            <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-bottom">
          <span>© Zouru Hotel 2026</span>
          <span>Made for the in-between moments.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
