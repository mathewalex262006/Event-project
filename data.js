/* =========================================================
   data.js
   Acts as the app's "backend": sample event data plus small
   helper functions that read/write localStorage. Every page
   includes this file before its own page script.
   ========================================================= */

// ---- Sample event catalogue -------------------------------------------
// In a real app this would come from a server. Dates are set in the
// future relative to when the project was built so the countdown timers
// and "upcoming" logic have something to count down to.
const EVENTS = [
  {
    id: "evt-101",
    name: "CodeSprint: AI & ML Hackathon",
    category: "Technical",
    date: "2026-07-18T09:00:00",
    venue: "Auditorium A, Main Block",
    description: "A 24-hour build sprint where teams ship a working AI prototype from scratch. Mentors, snacks, and prizes included.",
    fee: 200,
    image: "https://picsum.photos/seed/hackathon/480/300"
  },
  {
    id: "evt-102",
    name: "Web Dev Bootcamp",
    category: "Technical",
    date: "2026-07-25T10:00:00",
    venue: "Computer Lab 2",
    description: "Hands-on session covering HTML, CSS, JavaScript and how to publish your first site with GitHub Pages.",
    fee: 0,
    image: "https://picsum.photos/seed/webdev/480/300"
  },
  {
    id: "evt-103",
    name: "Rangoli & Folk Dance Night",
    category: "Cultural",
    date: "2026-08-02T18:30:00",
    venue: "Open Air Theatre",
    description: "An evening of regional folk performances, rangoli competitions, and live music to celebrate campus culture.",
    fee: 50,
    image: "https://picsum.photos/seed/culturalnight/480/300"
  },
  {
    id: "evt-104",
    name: "Inter-Department Drama Fest",
    category: "Cultural",
    date: "2026-08-10T17:00:00",
    venue: "Main Auditorium",
    description: "Departments compete with short theatre productions on social themes. Open for all students to watch and vote.",
    fee: 30,
    image: "https://picsum.photos/seed/dramafest/480/300"
  },
  {
    id: "evt-105",
    name: "Campus Cricket Premier League",
    category: "Sports",
    date: "2026-07-30T08:00:00",
    venue: "Sports Ground",
    description: "A weekend knockout cricket tournament between department teams. Registrations are per-team, open to all years.",
    fee: 150,
    image: "https://picsum.photos/seed/cricketleague/480/300"
  },
  {
    id: "evt-106",
    name: "5K Fun Run",
    category: "Sports",
    date: "2026-07-12T06:30:00",
    venue: "Campus Perimeter Track",
    description: "An early-morning timed run open to students, staff, and alumni. Finishers get a medal and breakfast.",
    fee: 20,
    image: "https://picsum.photos/seed/funrun/480/300"
  },
  {
    id: "evt-107",
    name: "UI/UX Design Workshop",
    category: "Workshop",
    date: "2026-07-22T11:00:00",
    venue: "Design Studio, Block C",
    description: "Learn wireframing in Figma and how to translate a design into a working interface. Laptops recommended.",
    fee: 100,
    image: "https://picsum.photos/seed/uxworkshop/480/300"
  },
  {
    id: "evt-108",
    name: "Resume & Interview Skills Workshop",
    category: "Workshop",
    date: "2026-08-05T14:00:00",
    venue: "Seminar Hall 1",
    description: "Career-services led session on building a strong resume and handling common interview questions with confidence.",
    fee: 0,
    image: "https://picsum.photos/seed/resumeworkshop/480/300"
  }
];

// Extra gallery images per event (used on the Events page gallery + lightbox)
const EVENT_GALLERY = [
  "https://picsum.photos/seed/gal1/500/500",
  "https://picsum.photos/seed/gal2/500/500",
  "https://picsum.photos/seed/gal3/500/500",
  "https://picsum.photos/seed/gal4/500/500",
  "https://picsum.photos/seed/gal5/500/500",
  "https://picsum.photos/seed/gal6/500/500",
  "https://picsum.photos/seed/gal7/500/500",
  "https://picsum.photos/seed/gal8/500/500"
];

function findEvent(id) {
  return EVENTS.find(function (e) { return e.id === id; });
}

// ---- localStorage helpers ----------------------------------------------
const STORAGE_KEYS = {
  users: "eh_users",
  session: "eh_session",
  registrations: "eh_registrations"
};

function ehGetUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
}
function ehSaveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}
function ehFindUserByEmail(email) {
  return ehGetUsers().find(function (u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });
}

function ehGetSession() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || "null");
}
function ehSetSession(user) {
  // never keep the password in the session object
  localStorage.setItem(
    STORAGE_KEYS.session,
    JSON.stringify({ name: user.name, email: user.email })
  );
}
function ehClearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}
function ehIsLoggedIn() {
  return !!ehGetSession();
}

function ehGetRegistrations() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.registrations) || "[]");
}
function ehSaveRegistrations(list) {
  localStorage.setItem(STORAGE_KEYS.registrations, JSON.stringify(list));
}
function ehAddRegistration(reg) {
  const list = ehGetRegistrations();
  list.push(reg);
  ehSaveRegistrations(list);
}
function ehCancelRegistration(regId) {
  const list = ehGetRegistrations().filter(function (r) { return r.id !== regId; });
  ehSaveRegistrations(list);
}
function ehMyRegistrations() {
  const session = ehGetSession();
  if (!session) return [];
  return ehGetRegistrations().filter(function (r) {
    return r.userEmail.toLowerCase() === session.email.toLowerCase();
  });
}

// Redirect helper used by pages that require login (registration.html,
// my-registrations.html, dashboard.html)
function ehRequireLogin(redirectTarget) {
  if (!ehIsLoggedIn()) {
    const target = redirectTarget || window.location.pathname.split("/").pop();
    window.location.href = "login.html?redirect=" + encodeURIComponent(target);
    return false;
  }
  return true;
}

function ehFormatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) +
    " · " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function ehFormatFee(fee) {
  return fee === 0 ? "Free" : "₹" + fee;
}
