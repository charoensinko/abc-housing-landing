const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el, idx) => {
  el.style.transitionDelay = `${idx * 90}ms`;
  observer.observe(el);
});

// Replace with your deployed Google Apps Script web app URL.
const APPS_SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

const signupForm = document.getElementById("signup-form");
const statusText = document.getElementById("form-status");

async function sendLeadToGoogleSheets(lead) {
  const payload = new URLSearchParams(lead).toString();

  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: payload
  });
}

if (signupForm && statusText) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusText.className = "form-status";

    if (!signupForm.checkValidity()) {
      signupForm.reportValidity();
      statusText.textContent = "Please complete all required fields.";
      statusText.classList.add("error");
      return;
    }

    if (!APPS_SCRIPT_URL.startsWith("https://script.google.com/")) {
      statusText.textContent = "Set your Apps Script Web App URL in script.js first.";
      statusText.classList.add("error");
      return;
    }

    const submitButton = signupForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    const formData = new FormData(signupForm);
    const lead = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      teamSize: String(formData.get("teamSize") || "").trim(),
      pageUrl: window.location.href,
      userAgent: navigator.userAgent
    };

    try {
      await sendLeadToGoogleSheets(lead);
      signupForm.reset();
      statusText.textContent = "Thanks. Your signup was submitted.";
      statusText.classList.add("success");
    } catch (error) {
      statusText.textContent = "Submission failed. Please try again.";
      statusText.classList.add("error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Request Access";
      }
    }
  });
}
