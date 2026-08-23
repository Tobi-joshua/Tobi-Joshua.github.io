const BUILD = "20260823";
const DATA_URL = new URL(`../data/projects.json?v=${BUILD}`, import.meta.url).href;

let _data = null;

export async function loadData() {
  if (_data) return _data;
  const res = await fetch(DATA_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
  _data = await res.json();
  return _data;
}

export { BUILD };

export function getProject(id) {
  return _data?.projects.find((p) => p.id === id) ?? null;
}

export function badgeClass(status) {
  if (status === "active") return "badge--active";
  if (status === "competition") return "badge--competition";
  return "badge--completed";
}

export function badgeLabel(status) {
  const map = { active: "Active", competition: "Competition", completed: "Done" };
  return map[status] || status;
}

export function renderNav(active = "", profile = {}) {
  const links = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "index.html#about", label: "About", key: "about" },
    { href: "index.html#experience", label: "Experience", key: "experience" },
    { href: "projects.html", label: "Projects", key: "projects" },
    { href: "index.html#ai", label: "AI & Agentic", key: "ai" },
    { href: "index.html#research", label: "Research", key: "research" },
    { href: "index.html#skills", label: "Skills", key: "skills" },
    { href: "index.html#contact", label: "Contact", key: "contact" },
  ];
  const cv = profile.cv
    ? `<a href="${profile.cv}" class="btn btn--ghost btn--sm nav__cv" download title="Download CV"><i class="fas fa-file-arrow-down"></i><span class="nav__cv-label"> CV</span></a>`
    : "";
  return `
    <nav class="nav" aria-label="Main navigation">
      <div class="container nav__inner">
        <a href="index.html" class="nav__logo">TJS<span>.</span></a>
        <button type="button" class="nav__toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
          <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
        <div class="nav__right" id="nav-menu">
          <ul class="nav__links">
            ${links.map((l) => `<li><a href="${l.href}" class="${active === l.key ? "active" : ""}">${l.label}</a></li>`).join("")}
          </ul>
          <div class="nav__actions">
            ${cv}
            <button type="button" class="theme-toggle" aria-label="Toggle theme"></button>
          </div>
        </div>
      </div>
    </nav>`;
}

export function bindNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = open
      ? '<i class="fas fa-xmark" aria-hidden="true"></i>'
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

export function renderAvatar(profile) {
  const src = profile.avatar || "assets/images/profile.png";
  const fallback = profile.avatarFallback || "assets/images/profile-placeholder.svg";
  return `
    <div class="hero__avatar-wrap">
      <span class="hero__avatar-ring" aria-hidden="true"></span>
      <img
        class="hero__avatar"
        src="${src}"
        alt="${profile.name}"
        width="140"
        height="140"
        onerror="this.onerror=null;this.src='${fallback}'"
      />
    </div>`;
}

export function cvButton(profile, className = "btn btn--ghost") {
  if (!profile.cv) return "";
  return `<a href="${profile.cv}" class="${className}" download><i class="fas fa-file-arrow-down"></i> Download CV</a>`;
}

export function renderHeroActions(profile) {
  return `
    <a href="projects.html" class="btn btn--primary"><i class="fas fa-briefcase"></i> View My Work</a>
    ${cvButton(profile, "btn btn--ghost")}
    <a href="${profile.github}" class="btn btn--ghost" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
    <a href="index.html#contact" class="btn btn--ghost"><i class="fas fa-envelope"></i> Contact Me</a>
    ${profile.company?.url ? `<a href="${profile.company.url}" class="btn btn--ghost btn--subtle" target="_blank" rel="noopener"><i class="fas fa-building"></i> ${profile.company.name}</a>` : ""}
  `;
}

export function renderExperience(experience = []) {
  return experience.map((exp) => `
    <article class="timeline__item">
      <div class="timeline__marker" aria-hidden="true"></div>
      <div class="timeline__card">
        <div class="timeline__header">
          <div>
            <h3 class="timeline__role">${exp.role}</h3>
            <p class="timeline__company">${exp.company}</p>
          </div>
          <div class="timeline__meta">
            <span class="timeline__period">${exp.period}</span>
            <span class="timeline__location">${exp.location}</span>
          </div>
        </div>
        <p class="timeline__desc">${exp.description}</p>
        ${exp.highlights?.length ? `<ul class="timeline__list">${exp.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>` : ""}
      </div>
    </article>
  `).join("");
}

export function renderSkills(skills = {}) {
  return Object.entries(skills).map(([category, items]) => `
    <div class="skill-group">
      <h3 class="skill-group__title">${category}</h3>
      <div class="skill-group__tags">
        ${items.map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

export function renderAiSection(ai = {}) {
  if (!ai.capabilities?.length) return "";
  return `
    <div class="ai-grid">
      <div class="ai-panel">
        <p class="ai-panel__intro">${ai.intro || ""}</p>
        <div class="ai-capabilities">
          ${ai.capabilities.map((c) => `<span class="tag tag--ai">${c}</span>`).join("")}
        </div>
      </div>
      ${ai.tools?.length ? `
        <div class="ai-tools">
          <h3 class="ai-tools__title">Tools</h3>
          <div class="ai-tools__list">
            ${ai.tools.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

export function renderLeadership(leadership = {}) {
  if (!leadership.points?.length) return "";
  return `
    <div class="leadership-panel">
      <p class="leadership-panel__intro">${leadership.intro || ""}</p>
      <ul class="leadership-panel__list">
        ${leadership.points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    </div>
  `;
}

export function renderCurrentlyBuilding(section = {}) {
  if (!section.items?.length) return "";
  return `
    <div class="building-grid">
      ${section.items.map((item) => `
        <div class="building-card">
          <h3 class="building-card__name">${item.name}</h3>
          <p class="building-card__desc">${item.desc}</p>
        </div>
      `).join("")}
    </div>
  `;
}

export function renderDelivery(delivery = []) {
  const icons = ["fa-code-branch", "fa-docker", "fa-shield-halved", "fa-cloud-arrow-up"];
  return delivery.map((c, i) => `
    <div class="cicd-card">
      <div class="cicd-card__icon"><i class="fas ${icons[i] || "fa-gears"}"></i></div>
      <h3 class="cicd-card__title">${c.title}</h3>
      <p class="cicd-card__text">${c.text}</p>
    </div>
  `).join("");
}

export function renderPublications(research, profile) {
  if (!research?.publications?.length) return "";
  const rg = research.profile || profile.researchgate;

  return research.publications.map((pub) => {
    const co = pub.coauthors?.length
      ? `<span class="pub__coauthors">with ${pub.coauthors.join(", ")}</span>`
      : "";
    const author = pub.author
      ? `<span class="pub__author">${pub.author}</span>`
      : "";
    const topics = pub.topics?.length
      ? `<div class="pub__topics">${pub.topics.map((t) => `<span class="tag tag--sm">${t}</span>`).join("")}</div>`
      : "";
    const doi = pub.doi
      ? `<a href="https://doi.org/${pub.doi}" class="pub__link" target="_blank" rel="noopener"><i class="fas fa-link"></i> DOI: ${pub.doi}</a>`
      : "";
    const projectLink = pub.projectId
      ? `<a href="project.html?id=${pub.projectId}" class="pub__link"><i class="fas fa-folder-open"></i> Related project</a>`
      : "";
    const rgLink = rg
      ? `<a href="${rg}" class="pub__link" target="_blank" rel="noopener"><i class="fab fa-researchgate"></i> ResearchGate</a>`
      : "";

    return `
      <article class="pub">
        <div class="pub__meta">
          <span class="pub__type">${pub.type}</span>
          <span class="pub__date">${pub.date}</span>
        </div>
        <h3 class="pub__title">${pub.title}</h3>
        ${author}${co}
        ${topics}
        <div class="pub__links">${doi}${projectLink}${rgLink}</div>
      </article>`;
  }).join("");
}

export function renderFooter(profile) {
  const year = new Date().getFullYear();
  const company = profile.company
    ? `<a href="${profile.company.url}" target="_blank" rel="noopener">${profile.company.name}</a>`
    : "";
  return `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__left">
          <p class="footer__copy">&copy; ${year} ${profile.name}</p>
          ${company ? `<p class="footer__company">${company}</p>` : ""}
        </div>
        <div class="footer__social">
          <a href="mailto:${profile.email}" title="Email"><i class="fas fa-envelope"></i></a>
          <a href="${profile.linkedin}" target="_blank" rel="noopener" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
          ${profile.researchgate ? `<a href="${profile.researchgate}" target="_blank" rel="noopener" title="ResearchGate"><i class="fab fa-researchgate"></i></a>` : ""}
          <a href="${profile.github}" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
          <a href="${profile.twitter}" target="_blank" rel="noopener" title="Twitter"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </footer>`;
}

export function projectImage(p) {
  const src = p.thumbnail;
  const fallback = p.thumbnailFallback || "assets/images/eduflow-preview.svg";
  return `<img class="card__img" src="${src}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

export function renderProjectCard(p, { linkPrefix = "project.html?id=" } = {}) {
  const tech = p.tech.slice(0, 4).map((t) => `<span>${t}</span>`).join("");
  const category = p.category ? `<span class="card__category">${p.category}</span>` : "";
  const links = [];
  if (p.links?.github) links.push(`<a href="${p.links.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fab fa-github"></i> Code</a>`);
  if (p.links?.demo) links.push(`<a href="${p.links.demo}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fas fa-arrow-up-right-from-square"></i> Live</a>`);
  if (p.private && !p.links?.github) links.push(`<a href="#" class="private-link" onclick="event.stopPropagation(); showPrivateModal(); return false;"><i class="fas fa-lock"></i> Private</a>`);

  return `
    <article class="card" tabindex="0" role="link" data-id="${p.id}" data-href="${linkPrefix}${p.id}">
      ${projectImage(p)}
      <div class="card__body">
        <div class="card__top">
          <div>
            ${category}
            <h3 class="card__title">${p.title}</h3>
            <p class="card__subtitle">${p.subtitle}</p>
          </div>
          <span class="badge ${badgeClass(p.status)}">${badgeLabel(p.status)}</span>
        </div>
        <p class="card__summary">${p.summary}</p>
        <div class="card__tech">${tech}</div>
        <div class="card__footer">
          <a href="${linkPrefix}${p.id}" class="card__details" onclick="event.stopPropagation()">Case study <i class="fas fa-arrow-right"></i></a>
          ${links.length ? `<div class="card__links">${links.join("")}</div>` : ""}
        </div>
      </div>
    </article>`;
}

export function bindCards(container) {
  container.querySelectorAll(".card[data-href]").forEach((card) => {
    const go = () => { window.location.href = card.dataset.href; };
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      go();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });
}

export function showPrivateModal() {
  document.getElementById("modal")?.classList.add("open");
}

export function hidePrivateModal() {
  document.getElementById("modal")?.classList.remove("open");
}

export function bindModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.querySelector(".modal__close")?.addEventListener("click", hidePrivateModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) hidePrivateModal(); });
  document.querySelectorAll(".private-link").forEach((el) => {
    el.addEventListener("click", (e) => { e.preventDefault(); showPrivateModal(); });
  });
}

export function injectJsonLd(profile, seo = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: seo.description || profile.summary,
    url: seo.url || "",
    email: profile.email,
    worksFor: profile.company ? {
      "@type": "Organization",
      name: profile.company.name,
      url: profile.company.url,
    } : undefined,
    sameAs: [
      profile.github,
      profile.linkedin,
      profile.researchgate,
      profile.twitter,
    ].filter(Boolean),
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function applySeo(profile, seo = {}) {
  const title = seo.title || `${profile.name} — ${profile.title}`;
  const description = seo.description || profile.summary;
  const url = seo.url || "";
  const image = seo.ogImage || "";

  document.title = title;

  const setMeta = (name, content, prop = false) => {
    const attr = prop ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:type", "website", true);
  if (url) setMeta("og:url", url, true);
  if (image) setMeta("og:image", image, true);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  if (image) setMeta("twitter:image", image);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical && url) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  if (canonical && url) canonical.href = url;
}
