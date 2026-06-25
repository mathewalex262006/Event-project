/* =========================================================
   dashboard.js — powers dashboard.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  if (!ehRequireLogin("dashboard.html")) return;

  const session = ehGetSession();
  document.getElementById("dashAvatar").textContent = session.name.trim().charAt(0).toUpperCase();
  document.getElementById("dashName").textContent = session.name;
  document.getElementById("dashEmail").textContent = session.email;

  document.getElementById("dashLogoutBtn").addEventListener("click", function () {
    ehClearSession();
    window.location.href = "index.html";
  });

  const registrations = ehMyRegistrations();
  const now = Date.now();
  const upcoming = registrations.filter(function (r) { return new Date(r.eventDate).getTime() >= now; });
  const past = registrations.filter(function (r) { return new Date(r.eventDate).getTime() < now; });
  const totalFees = registrations.reduce(function (sum, r) { return sum + (r.fee || 0); }, 0);

  document.getElementById("statRegistered").textContent = registrations.length;
  document.getElementById("statUpcoming").textContent = upcoming.length;
  document.getElementById("statPast").textContent = past.length;
  document.getElementById("statSpent").textContent = "₹" + totalFees;

  const nextUp = upcoming.sort(function (a, b) { return new Date(a.eventDate) - new Date(b.eventDate); }).slice(0, 3);
  const list = document.getElementById("nextUpList");
  const empty = document.getElementById("dashEmptyState");

  if (nextUp.length === 0) {
    list.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  list.innerHTML = nextUp.map(function (r) {
    return (
      '<div class="reg-row">' +
        '<img src="' + r.eventImage + '" alt="' + r.eventName + '" />' +
        '<div class="info">' +
          "<h3>" + r.eventName + "</h3>" +
          '<div class="meta">📅 ' + ehFormatDate(r.eventDate) + " · 📍 " + r.eventVenue + "</div>" +
        "</div>" +
      "</div>"
    );
  }).join("");
});
