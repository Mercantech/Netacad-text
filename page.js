(() => {
  const FLAG = "netacadTextSelect";
  const STYLE_ID = "netacad-text-select-style";
  const CSS_TEXT = `
*, *::before, *::after {
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
}
`.trim();

  const BLOCKED = new Set([
    "selectstart",
    "dragstart",
    "copy",
    "cut",
    "contextmenu",
  ]);

  let enabled = true;
  let patched = false;
  let injecting = false;
  let scheduled = null;
  let lastInteraction = 0;

  function isEnabled() {
    return enabled && document.documentElement?.dataset?.[FLAG] !== "off";
  }

  function injectStyleInto(root) {
    if (!root) return;
    const target = root.head || root;
    if (!target?.querySelector || !target.appendChild) return;

    let style = null;
    try {
      style = target.querySelector(`#${STYLE_ID}`);
    } catch (_) {
      return;
    }

    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      target.appendChild(style);
    }
    if (style.textContent !== CSS_TEXT) {
      style.textContent = CSS_TEXT;
    }
  }

  function collectShadowRoots(max = 200) {
    const roots = [];
    const stack = [document.documentElement];
    const seen = new Set();

    while (stack.length && roots.length < max) {
      const node = stack.pop();
      if (!node || seen.has(node)) continue;
      seen.add(node);

      if (node.shadowRoot && !seen.has(node.shadowRoot)) {
        roots.push(node.shadowRoot);
        seen.add(node.shadowRoot);
        stack.push(node.shadowRoot);
      }

      const children = node.children;
      if (!children) continue;
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }

      // Also walk shadow root children when node is a ShadowRoot
      if (node instanceof ShadowRoot) {
        const kids = node.children;
        for (let i = 0; i < kids.length; i++) stack.push(kids[i]);
      }
    }

    return roots;
  }

  function unlockStyles() {
    if (!isEnabled() || injecting) return;
    injecting = true;
    try {
      injectStyleInto(document);
      const roots = collectShadowRoots();
      for (const root of roots) injectStyleInto(root);
    } finally {
      injecting = false;
    }
  }

  function scheduleUnlock() {
    if (scheduled != null || !isEnabled()) return;
    scheduled = setTimeout(() => {
      scheduled = null;
      unlockStyles();
    }, 250);
  }

  function patchApis() {
    if (patched) return;
    patched = true;

    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function () {
      if (isEnabled() && BLOCKED.has(this.type)) return;
      return originalPreventDefault.call(this);
    };

    const originalRemove = Selection.prototype.removeAllRanges;
    Selection.prototype.removeAllRanges = function () {
      if (isEnabled() && Date.now() - lastInteraction < 1000) return;
      return originalRemove.apply(this, arguments);
    };

    if (typeof Selection.prototype.empty === "function") {
      const originalEmpty = Selection.prototype.empty;
      Selection.prototype.empty = function () {
        if (isEnabled() && Date.now() - lastInteraction < 1000) return;
        return originalEmpty.apply(this, arguments);
      };
    }
  }

  function clearDocumentHandlers() {
    try {
      document.onselectstart = null;
      document.ondragstart = null;
      document.oncopy = null;
      document.oncut = null;
      document.oncontextmenu = null;
      window.onselectstart = null;
    } catch (_) {
      /* ignore */
    }
  }

  function enable() {
    enabled = true;
    document.documentElement.classList.remove("netacad-text-select-off");
    patchApis();
    clearDocumentHandlers();
    unlockStyles();
  }

  function disable() {
    enabled = false;
    document.documentElement.classList.add("netacad-text-select-off");
  }

  for (const type of BLOCKED) {
    document.addEventListener(
      type,
      () => {
        if (isEnabled()) lastInteraction = Date.now();
      },
      true
    );
  }

  document.addEventListener(
    "mousedown",
    () => {
      if (isEnabled()) lastInteraction = Date.now();
    },
    true
  );

  const observer = new MutationObserver((mutations) => {
    if (!isEnabled() || injecting) return;

    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-netacad-text-select"
      ) {
        if (isEnabled()) enable();
        else disable();
        return;
      }

      // Ignore our own style tag mutations
      if (mutation.target?.id === STYLE_ID) continue;
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && node.id === STYLE_ID) continue;
        if (node.nodeType === 1) {
          scheduleUnlock();
          return;
        }
      }
    }
  });

  function start() {
    if (document.documentElement.dataset[FLAG] === "off") disable();
    else enable();

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-netacad-text-select"],
    });
  }

  if (document.documentElement) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
