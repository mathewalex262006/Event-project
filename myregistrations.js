/* =========================================================
   myregistrations.js — powers my-registrations.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  if (!ehRequireLogin("my-registrations.html")) return;
  renderRegistrations();
});

function renderRegistrations() {
  const list = ehMyRegistrations().sort(function (a, b) {
    return new Date(a.eventDate) - new Date(b.eventDate);
  });
  const container = document.getElementById("regList");
  const empty = document.getElementById("emptyState");

  if (list.length === 0) {
    container.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  container.innerHTML = list.map(function (r) {
    const isPast = new Date(r.eventDate).getTime() < Date.now();
    return (
      '<div class="reg-row" data-reg-id="' + r.id + '">' +
        '<img src="' + r.eventImage + '" alt="' + r.eventName + '" />' +
        '<div class="info">' +
          "<h3>" + r.eventName + (isPast ? ' <span style="color:var(--muted); font-size:0.78rem;">(past)</span>' : "") + "</h3>" +
          '<div class="meta">📅 ' + ehFormatDate(r.eventDate) + " · 📍 " + r.eventVenue + "</div>" +
        "</div>" +
        '<div class="actions">' +
          '<button class="btn btn-outline btn-sm" data-action="details">View details</button>' +
          '<button class="btn btn-danger btn-sm" data-action="cancel">Cancel</button>' +
        "</div>" +
        '<div class="reg-details">' +
          "<strong>Registered as:</strong> " + r.name + " (" + r.email + ")<br/>" +
          (r.phone ? "<strong>Phone:</strong> " + r.phone + "<br/>" : "") +
          "<strong>Fee:</strong> " + ehFormatFee(r.fee) + "<br/>" +
          (r.notes ? "<strong>Notes:</strong> " + r.notes + "<br/>" : "") +
          "<strong>Registered on:</strong> " + ehFormatDate(r.registeredAt) +
        "</div>" +
      "</div>"
    );
  }).join("");

  container.querySelectorAll(".reg-row").forEach(function (row) {
    const regId = row.dataset.regId;
    row.querySelector('[data-action="details"]').addEventListener("click", function (btn) {
      row.querySelector(".reg-details").classList.toggle("show");
    });
    row.querySelector('[data-action="cancel"]').addEventListener("click", function () {
      if (confirm("Cancel this registration? This can't be undone.")) {
        ehCancelRegistration(regId);
        renderRegistrations();
      }
    });
  });
}
