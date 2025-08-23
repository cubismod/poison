// Make sure function is globally available
window.toggleCollapsible = function (elementId) {
  console.log("toggleCollapsible called with:", elementId);

  const content = document.getElementById(elementId);
  const header = document.querySelector(
    `[onclick="toggleCollapsible('${elementId}')"]`,
  );

  if (!content) {
    console.error("Content element not found:", elementId);
    return;
  }

  if (!header) {
    console.error("Header element not found for:", elementId);
    return;
  }

  const icon = header.querySelector(".toggle-icon");

  if (!icon) {
    console.error("Toggle icon not found");
    return;
  }

  console.log("Current classes:", content.className);

  if (content.classList.contains("collapsed")) {
    content.classList.remove("collapsed");
    content.classList.add("expanded");
    icon.textContent = "▼";
    console.log("Expanded");
  } else {
    content.classList.add("collapsed");
    content.classList.remove("expanded");
    icon.textContent = "▶";
    console.log("Collapsed");
  }
};

// Wait for everything to load, then try multiple times to find elements
function initCollapsible() {
  // Find all collapsible headers and add event listeners
  const headers = document.querySelectorAll(".collapsible-header");

  if (headers.length === 0) {
    // If no headers found, try again after a short delay
    setTimeout(initCollapsible, 100);
    return;
  }

  headers.forEach(function (header) {
    header.addEventListener("click", function () {
      const onclick = this.getAttribute("onclick");
      const match = onclick.match(/toggleCollapsible\('([^']+)'\)/);
      if (match) {
        const elementId = match[1];
        window.toggleCollapsible(elementId);
      }
    });
  });
}

// Try multiple initialization approaches
document.addEventListener("DOMContentLoaded", initCollapsible);
window.addEventListener("load", initCollapsible);

// Also try after a delay
setTimeout(initCollapsible, 500);
