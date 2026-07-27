"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";

import NoiseOverlay from "./NoiseOverlay";
import Loader from "./Loader";
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
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const statsRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const honeypotRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sendStatus, setSendStatus] = useState("idle");

  const reducedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const countersDoneRef = useRef(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  const sendMessage = useCallback(async () => {
    const name = nameRef.current ? nameRef.current.value.trim() : "";
    const email = emailRef.current ? emailRef.current.value.trim() : "";
    const message = messageRef.current ? messageRef.current.value.trim() : "";
    const company = honeypotRef.current ? honeypotRef.current.value : "";

    if (!name || !email || !message) {
      setSendStatus("validation");
      return;
    }

    setSendStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSendStatus(data.reason === "not_configured" ? "not_configured" : "error");
        return;
      }
      setSendStatus("success");
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (messageRef.current) messageRef.current.value = "";
    } catch {
      setSendStatus("error");
    }
  }, []);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedRef.current) {
      anime({
        targets: "[data-loader-letter]",
        opacity: [0, 1],
        translateY: [14, 0],
        delay: anime.stagger(35),
        duration: 600,
        easing: "easeOutExpo",
      });
    } else {
      document.querySelectorAll("[data-loader-letter]").forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      });
    }

    const revealHero = () => {
      const badge = document.querySelector("[data-hero-badge]");
      if (!reducedRef.current) {
        const tl = anime.timeline({ easing: "easeOutExpo" });
        if (badge) {
          tl.add({
            targets: badge,
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 500,
          });
        }
        tl.add(
          {
            targets: "[data-hero-letter]",
            opacity: [0, 1],
            translateY: [40, 0],
            delay: anime.stagger(22),
            duration: 900,
          },
          badge ? "-=250" : 0
        );
        if (heroSubRef.current) {
          tl.add(
            {
              targets: heroSubRef.current,
              opacity: [0, 1],
              translateY: [16, 0],
              duration: 700,
            },
            "-=400"
          );
        }
        if (heroCtaRef.current) {
          tl.add(
            {
              targets: heroCtaRef.current,
              opacity: [0, 1],
              translateY: [16, 0],
              duration: 700,
            },
            "-=350"
          );
        }
      } else {
        if (badge) badge.style.opacity = 1;
        document.querySelectorAll("[data-hero-letter]").forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
        });
        if (heroSubRef.current) {
          heroSubRef.current.style.opacity = 1;
          heroSubRef.current.style.transform = "translateY(0)";
        }
        if (heroCtaRef.current) {
          heroCtaRef.current.style.opacity = 1;
          heroCtaRef.current.style.transform = "translateY(0)";
        }
      }
    };

    const loadedTimer = setTimeout(() => setLoaded(true), 1400);
    const revealTimer = setTimeout(revealHero, 1500);

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
      const depth = 20;
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${dx * depth}px,${dy * depth}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-dx * depth}px,${-dy * depth}px)`;
      if (blob3Ref.current)
        blob3Ref.current.style.transform = `translate(${dx * depth * 0.6}px,${-dy * depth * 0.6}px)`;
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

      const statusDot = document.querySelector("[data-status-dot]");
      if (statusDot) {
        anime({
          targets: statusDot,
          scale: [1, 1.6],
          opacity: [1, 0.4],
          duration: 1400,
          easing: "easeInOutSine",
          direction: "alternate",
          loop: true,
        });
      }
    } else {
      if (cursorDotRef.current) cursorDotRef.current.style.display = "none";
      if (cursorRingRef.current) cursorRingRef.current.style.display = "none";
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = entry.target.style.transform.includes("translateX")
              ? "translateX(0)"
              : "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const groupIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const children = Array.from(el.children);
            if (reducedRef.current) {
              children.forEach((c) => {
                c.style.opacity = 1;
                c.style.transform = "none";
              });
            } else {
              anime({
                targets: children,
                opacity: [0, 1],
                translateY: [22, 0],
                delay: anime.stagger(70),
                duration: 650,
                easing: "easeOutExpo",
              });
            }
            groupIo.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal-stagger]").forEach((el) => groupIo.observe(el));

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
      clearTimeout(loadedTimer);
      clearTimeout(revealTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      magneticCleanups.forEach((fn) => fn());
      tiltCleanups.forEach((fn) => fn());
      hoverCleanups.forEach((fn) => fn());
      io.disconnect();
      groupIo.disconnect();
      ioStats.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <div className="relative overflow-hidden bg-canvas">
      <NoiseOverlay />
      <Loader loaded={loaded} />
      <CustomCursor dotRef={cursorDotRef} ringRef={cursorRingRef} />
      <ScrollProgress progressRef={progressRef} />
      <Navbar navRef={navRef} menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <MobileDock />

      <Hero blob1Ref={blob1Ref} blob2Ref={blob2Ref} blob3Ref={blob3Ref} heroSubRef={heroSubRef} heroCtaRef={heroCtaRef} />
      <About />
      <Work />
      <Services />
      <ExperienceProcess />
      <Skills />
      <GithubActivity />
      <Stats statsRef={statsRef} />
      <Contact
        nameRef={nameRef}
        emailRef={emailRef}
        messageRef={messageRef}
        honeypotRef={honeypotRef}
        sendMessage={sendMessage}
        sendStatus={sendStatus}
      />
      <Footer />
    </div>
  );
}
