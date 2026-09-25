const toggle = document.getElementById("toggle");
const statusText = document.getElementById("statusText");

function updateStatus(enabled) {
  toggle.checked = enabled;
  statusText.textContent = enabled ? "Aktiveret" : "Deaktiveret";
}

chrome.storage.sync.get({ enabled: true }, (result) => {
  updateStatus(result.enabled !== false);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled }, () => {
    updateStatus(enabled);
  });
});
