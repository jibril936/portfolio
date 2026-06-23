const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id], footer[id]")];
const byId = new Map(navLinks.map((link) => [link.getAttribute("href")?.slice(1), link]));

const activeObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => link.removeAttribute("aria-current"));
    byId.get(visible.target.id)?.setAttribute("aria-current", "page");
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
);

sections.forEach((section) => activeObserver.observe(section));

const revealItems = document.querySelectorAll(
  ".component-card, .project-card, .stage-card, .stage-panel, .skill-grid article, .evidence-grid article, .architecture-strip article, .pipeline article"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));
