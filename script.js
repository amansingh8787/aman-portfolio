/* ===== EDIT YOUR DETAILS HERE ===== */
const CONFIG = {
  roles: ["BCA Student", "Python & Web Developer", "Cyber Security Intern", "Always Learning"],
  skills: [
    { t: "Programming", d: "Python, C and Java for building logic-driven applications.", tags: ["Python", "C", "Java"] },
    { t: "Web Development", d: "Building responsive pages and web projects.", tags: ["HTML", "Web Development"] },
    { t: "Data & AI", d: "Working with data, databases and AI tools.", tags: ["Excel", "DBMS", "AI", "OpenAI"] },
    { t: "Cyber Security", d: "Internship exposure to VAPT, networking and web security.", tags: ["Nmap", "Burp Suite", "Wireshark", "OWASP"] }
  ],
  projects: [
    { t: "Currency Converter", d: "A tool that converts an amount from one currency to another quickly and accurately.", tags: [] },
    { t: "Password Strength Analyzer", d: "A Python tool that checks length, character variety and common weak patterns, then suggests how to improve the password. It runs locally and never sends passwords anywhere.", tags: ["Python", "Cyber Security", "Regex"] }
  ],
  social: [
    { t: "LinkedIn", url: "https://www.linkedin.com/in/aman-singh-116077274" },
    { t: "Email", url: "mailto:amansingh98821@gmail.com" },
    { t: "GitHub", url: "" } /* add your GitHub profile link here */
  ]
};
/* ================================== */
const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
$("foot").textContent = "© " + new Date().getFullYear() + " Aman Singh. All rights reserved.";

// name letters
let k = 0; const nameEl = $("name");
"Aman Singh".split(" ").forEach(word => {
  const w = document.createElement("span"); w.className = "w"; w.setAttribute("aria-hidden", "true");
  [...word].forEach(ch => { const s = document.createElement("span"); s.textContent = ch; s.style.transitionDelay = (0.2 + k++ * 0.06) + "s"; w.appendChild(s); });
  nameEl.appendChild(w);
});

// content
$("skillGrid").innerHTML = CONFIG.skills.map(s => `<div class="card tilt"><h3>${s.t}</h3><p>${s.d}</p><div class="tags">${s.tags.map(t => `<span>${t}</span>`).join("")}</div></div>`).join("");
const all = ["Excel", "Python", "C", "OpenAI", "HTML", "Web Development", "Java", "AI", "DBMS", "Cyber Security"];
$("marq").innerHTML = [...all, ...all].map(x => `<span>${x}</span>`).join("");
$("projectGrid").innerHTML = CONFIG.projects.map(p => `<div class="card tilt"><h3>${p.t}</h3><p>${p.d}</p>${p.tags.length ? `<div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>` : ""}</div>`).join("");
CONFIG.social.filter(s => s.url).forEach(s => { const a = document.createElement("a"); a.className = "btn mag"; a.href = s.url; a.textContent = s.t; if (s.url.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; } $("social").appendChild(a); });

// typing
(function () {
  let r = 0, c = 0, del = false; const el = $("typed");
  (function tick() {
    const full = CONFIG.roles[r]; c += del ? -1 : 1; el.textContent = full.slice(0, c);
    let t = del ? 40 : 85;
    if (!del && c === full.length) { del = true; t = 1400; } else if (del && c === 0) { del = false; r = (r + 1) % CONFIG.roles.length; t = 300; }
    setTimeout(tick, t);
  })();
})();

// preloader then hero entrance
function startSite() { $("pre").classList.add("done"); document.body.classList.remove("lock"); setTimeout(() => document.body.classList.add("go"), 350); }
if (reduce) { document.body.classList.remove("lock"); document.body.classList.add("go"); }
else {
  let n = 0; const t0 = performance.now();
  (function step(now) {
    n = Math.min(100, Math.round((now - t0) / 14));
    $("preBar").style.width = n + "%"; $("preNum").textContent = n + "%";
    n < 100 ? requestAnimationFrame(step) : setTimeout(startSite, 250);
  })(t0);
}

// scroll reveal + counters
const count = el => { const to = +el.dataset.count, t0 = performance.now(); (function f(now) { const p = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); };
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); e.target.querySelectorAll("[data-count]").forEach(count); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// tilt + magnetic
document.querySelectorAll(".tilt").forEach(c => {
  c.addEventListener("pointermove", e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`; });
  c.addEventListener("pointerleave", () => c.style.transform = "");
});
document.querySelectorAll(".mag").forEach(b => {
  b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
  b.addEventListener("pointerleave", () => b.style.transform = "");
});

// password demo (same rules as the Python project)
const COMMON = ["password", "password123", "12345678", "qwerty", "admin", "welcome"];
$("pw").addEventListener("input", e => {
  const p = e.target.value; let s = 0; const tips = [];
  if (!p) { $("mt").style.width = "0"; $("lvl").textContent = "Waiting for input"; $("tips").innerHTML = ""; return; }
  if (p.length >= 12) s += 2; else if (p.length >= 8) s += 1; else tips.push("Use at least 12 characters.");
  if (/[A-Z]/.test(p)) s++; else tips.push("Add an uppercase letter.");
  if (/[a-z]/.test(p)) s++; else tips.push("Add a lowercase letter.");
  if (/\d/.test(p)) s++; else tips.push("Add a number.");
  if (/[^A-Za-z0-9]/.test(p)) s++; else tips.push("Add a special character.");
  if (COMMON.includes(p.toLowerCase())) { s = Math.max(0, s - 3); tips.push("Avoid common passwords."); }
  const lv = s <= 2 ? ["Weak", "#ff5d73"] : s <= 4 ? ["Moderate", "#ffc24b"] : ["Strong", "#3de0c5"];
  $("mt").style.width = Math.max(8, s / 6 * 100) + "%"; $("mt").style.background = lv[1];
  $("lvl").textContent = lv[0]; $("lvl").style.color = lv[1];
  $("tips").innerHTML = tips.map(t => `<li>${t}</li>`).join("");
});

// background network, cursor glow, scroll bar, FPS
const cv = $("net"), ctx = cv.getContext("2d"), glow = $("glow");
let W, H, pts = [], mouse = { x: -999, y: -999 }, gx = innerWidth / 2, gy = innerHeight / 2;
function resize() {
  const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
  cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  pts = Array.from({ length: Math.min(90, Math.floor(W * H / 16000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 }));
}
addEventListener("resize", resize); resize();
addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
let last = performance.now(), frames = 0, acc = 0;
function loop(now) {
  const dt = Math.min((now - last) / 16.67, 3); acc += now - last; last = now; frames++;
  if (acc >= 500) { $("fps").textContent = Math.round(frames * 1000 / acc) + " FPS"; frames = 0; acc = 0; }
  gx += (mouse.x - gx) * .12 * dt; gy += (mouse.y - gy) * .12 * dt; glow.style.transform = `translate(${gx}px,${gy}px)`;
  const mx = document.documentElement.scrollHeight - H; $("bar").style.transform = `scaleX(${mx > 0 ? scrollY / mx : 0})`;
  ctx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
    const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
    if (d < 140 && d > 0) { p.x += dx / d * 1.6 * dt; p.y += dy / d * 1.6 * dt; }
    ctx.fillStyle = "rgba(61,224,197,.8)"; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283); ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
    if (d < 130) { ctx.strokeStyle = `rgba(124,92,255,${(1 - d / 130) * .5})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
  }
  requestAnimationFrame(loop);
}
if (!reduce) requestAnimationFrame(loop); else { $("fps").remove(); glow.remove(); }
