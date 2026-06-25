/* =========================================================
   events.js — powers events.html
   ========================================================= */

let activeCategory = "All";
let searchTerm = "";
let countdownInterval = null;

document.addEventListener("DOMContentLoaded", function () {
  // read ?q= from the URL (set by the hero search box on the home page)
  const params = new URLSearchParams(window.location.search);
  if (params.get("q")) {
    searchTerm = params.get("q");
    document.getElementById("searchInput").value = searchTerm;
  }

  renderEvents();
  renderGallery();

  document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    searchTerm = document.getElementById("searchInput").value.trim();
    renderEvents();
  });

  document.getElementById("filters").addEventListener("click", function (e) {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderEvents();
  });

  // lightbox
  const lightbox = document.getElementById("lightbox");
  document.getElementById("galleryGrid").addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
      document.getElementById("lightboxImg").src = e.target.src;
      lightbox.classList.add("open");
    }
  });
  document.getElementById("lightboxClose").addEventListener("click", function () {
    lightbox.classList.remove("open");
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });
});

function getFilteredEvents() {
  return EVENTS.filter(function (ev) {
    const matchesCat = activeCategory === "All" || ev.category === activeCategory;
    const matchesSearch = !searchTerm || ev.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
}

function renderEvents() {
  const grid = document.getElementById("eventGrid");
  const empty = document.getElementById("emptyState");
  const list = getFilteredEvents();

  if (countdownInterval) clearInterval(countdownInterval);

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  grid.innerHTML = list.map(function (ev) {
    return (
      '<div class="event-card">' +
        '<div class="event-thumb">' +
          '<img src="' + ev.image + '" alt="' + ev.name + '" loading="lazy" />' +
          '<span class="cat-tag cat-' + ev.category + '">' + ev.category + "</span>" +
          '<span class="countdown-badge" data-date="' + ev.date + '">--</span>' +
        "</div>" +
        '<div class="event-body">' +
          "<h3>" + ev.name + "</h3>" +
          '<div class="event-meta">' +
            "<span>📅 " + ehFormatDate(ev.date) + "</span>" +
            "<span>📍 " + ev.venue + "</span>" +
          "</div>" +
          '<p class="event-desc">' + ev.description + "</p>" +
          '<div class="event-foot">' +
            '<span class="fee">' + ehFormatFee(ev.fee) + (ev.fee > 0 ? " <small>/ person</small>" : "") + "</span>" +
            '<a class="btn btn-primary btn-sm" href="#" data-event-id="' + ev.id + '">Register</a>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }).join("");

  // register buttons: require login first
  grid.querySelectorAll("[data-event-id]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const id = btn.dataset.eventId;
      if (!ehIsLoggedIn()) {
        window.location.href = "login.html?redirect=" + encodeURIComponent("registration.html?id=" + id);
        return;
      }
      window.location.href = "registration.html?id=" + id;
    });
  });

  tickCountdowns();
  countdownInterval = setInterval(tickCountdowns, 1000);
}

function tickCountdowns() {
  document.querySelectorAll(".countdown-badge").forEach(function (el) {
    const target = new Date(el.dataset.date).getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      el.textContent = "Happening now";
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.textContent = days > 0
      ? days + "d " + hours + "h left"
      : hours + "h " + mins + "m " + secs + "s left";
  });
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = EVENT_GALLERY.map(function (src) {
    return '<img src="' + src + '" alt="Event gallery photo" loading="lazy" />';
  }).join("");
}
