/* =========================================================
   register.js — powers registration.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");
  const ev = eventId ? findEvent(eventId) : null;

  if (!ev) {
    document.getElementById("notFound").classList.remove("hidden");
    return;
  }

  // must be logged in to register — bounce to login and come straight back
  if (!ehRequireLogin("registration.html?id=" + eventId)) return;

  document.getElementById("regContent").classList.remove("hidden");

  // fill in the event summary card
  document.getElementById("sumImage").src = ev.image;
  document.getElementById("sumImage").alt = ev.name;
  const catEl = document.getElementById("sumCat");
  catEl.textContent = ev.category;
  catEl.className = "cat-tag cat-" + ev.category;
  catEl.style.position = "static";
  document.getElementById("sumName").textContent = ev.name;
  document.getElementById("sumDate").textContent = "📅 " + ehFormatDate(ev.date);
  document.getElementById("sumVenue").textContent = "📍 " + ev.venue;
  document.getElementById("sumFee").textContent = "💳 " + ehFormatFee(ev.fee) + (ev.fee > 0 ? " per person" : "");
  document.getElementById("sumDesc").textContent = ev.description;

  // prefill from the logged-in session
  const session = ehGetSession();
  document.getElementById("regName").value = session.name;
  document.getElementById("regEmail").value = session.email;

  // block duplicate registrations for the same event
  const already = ehMyRegistrations().some(function (r) { return r.eventId === ev.id; });
  const form = document.getElementById("regForm");
  const msg = document.getElementById("formMsg");

  if (already) {
    msg.textContent = "You're already registered for this event. Manage it from My Registrations.";
    msg.className = "form-msg show error";
    form.querySelector("button[type=submit]").disabled = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const notes = document.getElementById("regNotes").value.trim();

    if (!name || !email) {
      msg.textContent = "Name and email are required.";
      msg.className = "form-msg show error";
      return;
    }

    ehAddRegistration({
      id: "reg-" + Date.now(),
      eventId: ev.id,
      eventName: ev.name,
      eventDate: ev.date,
      eventVenue: ev.venue,
      eventImage: ev.image,
      fee: ev.fee,
      userEmail: session.email,
      name: name,
      email: email,
      phone: phone,
      notes: notes,
      registeredAt: new Date().toISOString()
    });

    document.getElementById("successEventName").textContent = ev.name;
    form.classList.add("hidden");
    document.getElementById("successPanel").classList.remove("hidden");
  });
});
