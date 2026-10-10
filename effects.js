(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".header");
  const heroArt = document.querySelector(".hero-art");
  const targets = document.querySelectorAll(
    ".section-head, .card, .feature, .split, .band, .panel, .address, .category-title"
  );

  document.documentElement.classList.add("motion-ready");

  targets.forEach((element, index) => {
    element.classList.add("reveal");
    if (element.classList.contains("split")) element.classList.add("reveal-left");
    if (element.classList.contains("address")) element.classList.add("reveal-right");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 85}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px" });
    targets.forEach((element) => observer.observe(element));
  }

  let ticking = false;
  const updateMotion = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    if (heroArt && !reduceMotion) {
      const offset = Math.min(18, window.scrollY * 0.035);
      heroArt.style.setProperty("--parallax-y", `${offset}px`);
      heroArt.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateMotion);
  }, { passive: true });

  updateMotion();
})();
