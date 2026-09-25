(() => {
  const FLAG = "netacadTextSelect";
  const STYLE_ID = "netacad-text-select-css";
  const CSS_TEXT = `
html:not(.netacad-text-select-off),
html:not(.netacad-text-select-off) body,
html:not(.netacad-text-select-off) body * {
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
}
`.trim();

  let injecting = false;
  let scheduled = null;

  function setEnabled(on) {
    document.documentElement.dataset[FLAG] = on ? "on" : "off";
    document.documentElement.classList.toggle("netacad-text-select-off", !on);
  }

  function injectInto(root) {
    if (!root?.querySelector || !root.appendChild) return;
    const target = root.head || root;
    let style = target.querySelector(`#${STYLE_ID}`);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      target.appendChild(style);
    }
    if (style.textContent !== CSS_TEXT) style.textContent = CSS_TEXT;
  }

  function injectAll() {
    if (injecting) return;
    injecting = true;
    try {
      injectInto(document);
      const all = document.querySelectorAll("*");
      for (let i = 0; i < all.length; i++) {
        const el = all[i];
        if (el.shadowRoot) injectInto(el.shadowRoot);
      }
    } finally {
      injecting = false;
    }
  }

  function scheduleInject() {
    if (scheduled != null || injecting) return;
    scheduled = setTimeout(() => {
      scheduled = null;
      injectAll();
    }, 250);
  }

  injectAll();

  const observer = new MutationObserver((mutations) => {
    if (injecting) return;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && node.id !== STYLE_ID) {
          scheduleInject();
          return;
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  chrome.storage.sync.get({ enabled: true }, (result) => {
    setEnabled(chrome.runtime.lastError || result.enabled !== false);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.enabled) return;
    setEnabled(changes.enabled.newValue !== false);
  });
})();
