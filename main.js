/* =========================================================
   main.js
   Runs on every page. Handles the mobile nav toggle, marks the
   current page's nav link as active, and swaps the right-hand
   nav actions between "Login / Sign up" and "user chip / Logout"
   depending on whether someone is signed in.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // --- mobile nav toggle ---
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const actions = document.querySelector(".nav-actions");
  if (toggle) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      actions.classList.toggle("open");
    });
  }

  // --- highlight active link ---
  const here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    const target = a.getAttribute("href");
    if (target === here) a.classList.add("active");
  });

  // --- auth-aware nav actions ---
  const slot = document.querySelector(".nav-actions");
  if (slot) {
    const session = ehGetSession();
    if (session) {
      const initial = session.name.trim().charAt(0).toUpperCase();
      slot.innerHTML =
        '<a href="dashboard.html" class="user-chip">' +
          '<span class="avatar">' + initial + "</span>" +
          '<span>' + session.name.split(" ")[0] + "</span>" +
        "</a>" +
        '<button class="btn btn-ghost btn-sm" id="navLogoutBtn">Log out</button>';
      document.getElementById("navLogoutBtn").addEventListener("click", function () {
        ehClearSession();
        window.location.href = "index.html";
      });
    } else {
      slot.innerHTML =
        '<a href="login.html" class="btn btn-outline btn-sm">Login</a>' +
        '<a href="signup.html" class="btn btn-primary btn-sm">Sign up</a>';
    }
  }
});
