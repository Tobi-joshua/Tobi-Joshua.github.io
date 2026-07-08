const BUILD = "20260711";
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
    { href: "index.html#research", label: "Research", key: "research" },
    { href: "projects.html", label: "Projects", key: "projects" },
    { href: "index.html#cicd", label: "CI/CD", key: "cicd" },
    { href: "index.html#contact", label: "Contact", key: "contact" },
  ];
  const cv = profile.cv
    ? `<a href="${profile.cv}" class="btn btn--ghost btn--sm" download title="Download CV"><i class="fas fa-file-arrow-down"></i> CV</a>`
    : "";
  return `
    <nav class="nav">
      <div class="container nav__inner">
        <a href="index.html" class="nav__logo">Tobi<span>.</span>dev</a>
        <div class="nav__right">
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

export function renderPublications(research, profile) {
  if (!research?.publications?.length) return "";
  const rg = research.profile || profile.researchgate;

  return research.publications.map((pub) => {
    const co = pub.coauthors?.length
      ? `<span class="pub__coauthors">with ${pub.coauthors.join(", ")}</span>`
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
        ${co}
        <div class="pub__links">${projectLink}${rgLink}</div>
      </article>`;
  }).join("");
}

export function renderFooter(profile) {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container footer__inner">
        <p class="footer__copy">&copy; ${year} ${profile.name}</p>
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
  const fallback = p.thumbnailFallback || "assets/images/project-fallback.svg";
  return `<img class="card__img" src="${src}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

export function renderProjectCard(p, { linkPrefix = "project.html?id=" } = {}) {
  const tech = p.tech.slice(0, 4).map((t) => `<span>${t}</span>`).join("");
  const links = [];
  if (p.links?.github) links.push(`<a href="${p.links.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fab fa-github"></i> Code</a>`);
  if (p.links?.demo) links.push(`<a href="${p.links.demo}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fas fa-arrow-up-right-from-square"></i> Demo</a>`);
  if (p.private && !p.links?.github) links.push(`<a href="#" class="private-link" onclick="event.stopPropagation(); showPrivateModal(); return false;"><i class="fas fa-lock"></i> Private</a>`);

  return `
    <article class="card" tabindex="0" role="link" data-id="${p.id}" data-href="${linkPrefix}${p.id}">
      ${projectImage(p)}
      <div class="card__body">
        <div class="card__top">
          <div>
            <h3 class="card__title">${p.title}</h3>
            <p class="card__subtitle">${p.subtitle}</p>
          </div>
          <span class="badge ${badgeClass(p.status)}">${badgeLabel(p.status)}</span>
        </div>
        <p class="card__summary">${p.summary}</p>
        <div class="card__tech">${tech}</div>
        ${links.length ? `<div class="card__links">${links.join("")}</div>` : ""}
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
