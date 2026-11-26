"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { MotionConfig } from "framer-motion";

import NoiseOverlay from "./NoiseOverlay";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import MobileDock from "./MobileDock";
import Hero from "./Hero";
import About from "./About";
import Work from "./Work";
import Services from "./Services";
import ExperienceProcess from "./ExperienceProcess";
import Skills from "./Skills";
import GithubActivity from "./GithubActivity";
import Stats from "./Stats";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Portfolio() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const progressRef = useRef(null);
  const navRef = useRef(null);
  const statsRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const reducedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const countersDoneRef = useRef(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      }
      if (navRef.current) {
        navRef.current.style.background = window.scrollY > 40 ? "rgba(5,5,5,0.75)" : "rgba(5,5,5,0.4)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      }
    };

    const ringScale = { v: 1 };
    const tick = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.18;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.18;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringRef.current.x - 18}px,${ringRef.current.y - 18}px) scale(${ringScale.v})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseDown = () => {
      anime({ targets: ringScale, v: 0.7, duration: 200, easing: "easeOutQuad" });
    };
    const onMouseUp = () => {
      anime({ targets: ringScale, v: 1, duration: 500, easing: "easeOutElastic(1, .6)" });
    };

    const magneticCleanups = [];
    const snapbackAnims = new Map();
    const setupMagnetic = () => {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        const onMove = (ev) => {
          const running = snapbackAnims.get(el);
          if (running) running.pause();
          const r = el.getBoundingClientRect();
          const x = ev.clientX - r.left - r.width / 2;
          const y = ev.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${x * 0.3}px,${y * 0.3}px)`;
        };
        const onLeave = () => {
          const inst = anime({
            targets: el,
            translateX: 0,
            translateY: 0,
            duration: 900,
            easing: "easeOutElastic(1, .5)",
          });
          snapbackAnims.set(el, inst);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        magneticCleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    };

    const tiltCleanups = [];
    const setupTilt = () => {
      document.querySelectorAll("[data-tilt]").forEach((el) => {
        const onMove = (ev) => {
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width - 0.5;
          const py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) scale(1.01)`;
        };
        const onLeave = () => {
          el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        tiltCleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    };

    const hoverCleanups = [];
    const setupCursorHover = () => {
      document.querySelectorAll("[data-cursor-hover]").forEach((el) => {
        const onEnter = () => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.width = "56px";
            cursorRingRef.current.style.height = "56px";
            cursorRingRef.current.style.borderColor = "rgba(110,231,183,0.9)";
          }
        };
        const onLeave = () => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.width = "36px";
            cursorRingRef.current.style.height = "36px";
            cursorRingRef.current.style.borderColor = "rgba(110,231,183,0.5)";
          }
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    };

    if (!reducedRef.current) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      rafRef.current = requestAnimationFrame(tick);
      setupMagnetic();
      setupTilt();
      setupCursorHover();
    } else {
      if (cursorDotRef.current) cursorDotRef.current.style.display = "none";
      if (cursorRingRef.current) cursorRingRef.current.style.display = "none";
    }

    const setActiveNav = (id) => {
      document.querySelectorAll("[data-nav-link]").forEach((a) => {
        const isActive = a.getAttribute("data-nav-link") === id;
        a.classList.toggle("text-ink", isActive);
        a.classList.toggle("text-ink-2", !isActive);
        const underline = a.querySelector("[data-nav-underline]");
        if (underline) {
          if (reducedRef.current) {
            underline.style.transform = isActive ? "scaleX(1)" : "scaleX(0)";
          } else {
            anime({
              targets: underline,
              scaleX: isActive ? 1 : 0,
              duration: 300,
              easing: "easeOutQuad",
            });
          }
        }
      });
    };

    const navIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ["about", "work", "services", "process", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((el) => navIo.observe(el));

    const ioStats = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersDoneRef.current) {
            countersDoneRef.current = true;
            document.querySelectorAll("[data-counter]").forEach((el) => {
              const target = parseInt(el.getAttribute("data-target"), 10) || 0;
              const proxy = { val: 0 };
              anime({
                targets: proxy,
                val: target,
                round: 1,
                duration: 1600,
                easing: "easeOutExpo",
                update: () => {
                  el.textContent = proxy.val;
                },
              });
            });
            ioStats.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) ioStats.observe(statsRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      magneticCleanups.forEach((fn) => fn());
      tiltCleanups.forEach((fn) => fn());
      hoverCleanups.forEach((fn) => fn());
      navIo.disconnect();
      ioStats.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-hidden bg-canvas">
        <NoiseOverlay />
        <CustomCursor dotRef={cursorDotRef} ringRef={cursorRingRef} />
        <ScrollProgress progressRef={progressRef} />
        <Navbar navRef={navRef} menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <MobileDock />

        <main className="portfolio-content">
          <Hero />
          <Work />
          <About />
          <Services />
          <ExperienceProcess />
          <Skills />
          <GithubActivity />
          <Stats statsRef={statsRef} />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
