import appRoutes from "./routes.generated.json";

let overlay: HTMLDivElement | null = null;
let currentTarget: HTMLElement | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const HIDE_DELAY = 400;

const buildTooltipLink = (useCaseIds: string[]): string => {
  const count = useCaseIds.length;
  return count === 1
    ? "View use case and the requirements for this component"
    : `View ${count} use cases and the requirements for this component`;
};

const scheduleHide = () => {
  cancelHide();
  hideTimer = setTimeout(() => {
    hideOverlay();
  }, HIDE_DELAY);
};

const cancelHide = () => {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
};

const getOrCreateOverlay = (): HTMLDivElement => {
  if (overlay) return overlay;

  overlay = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.zIndex = "99999";
  overlay.style.pointerEvents = "auto";
  overlay.style.maxWidth = "240px";
  overlay.style.boxSizing = "border-box";
  overlay.style.padding = "8px 12px";
  overlay.style.borderRadius = "12px";
  overlay.style.background = "rgba(254, 254, 254, 1)";
  overlay.style.color = "rgba(65, 73, 75, 1)";
  overlay.style.border = "1.5px solid rgba(65, 73, 75, 1)";
  overlay.style.boxShadow = "0 13px 27px -5px rgba(18, 27, 30, 0.2)";

  overlay.addEventListener("mouseenter", cancelHide);
  overlay.addEventListener("mouseleave", scheduleHide);

  document.body.appendChild(overlay);
  return overlay;
};

const hideOverlay = () => {
  if (overlay) overlay.style.display = "none";
  currentTarget = null;
};

const showOverlay = (target: HTMLElement, useCaseIds: string[]) => {
  const tip = getOrCreateOverlay();

  const rect = target.getBoundingClientRect();

  tip.innerHTML = "";
  const link = document.createElement("a");
  link.href = "#";

  link.style.fontFamily = "'IBM Plex Sans', sans-serif";
  link.style.fontSize = "14px";
  link.style.fontWeight = "400";
  link.style.lineHeight = "20px";
  link.style.letterSpacing = "0.005em";

  link.style.textDecoration = "underline";
  link.style.textDecorationStyle = "solid";
  link.style.textDecorationSkipInk = "auto";
  link.style.color = "inherit";
  link.style.cursor = "pointer";

  link.textContent = buildTooltipLink(useCaseIds);

  link.addEventListener("click", (e) => {
    e.preventDefault();
    emitUseCaseSelected(useCaseIds);
  });

  tip.appendChild(link);

  tip.style.top = `${rect.top - 8}px`;
  tip.style.left = `${rect.left}px`;
  tip.style.transform = "translateY(-100%)";
  tip.style.display = "block";
};

const emitUseCaseSelected = (useCaseIds: string[]) => {
  const message = JSON.stringify({
    source: "PREVIEW_FRAME",
    type: "CODE_PREVIEW:USECASES_SELECTED",
    payload: {
      selectedIds: useCaseIds,
      metadata: {
        totalSelected: useCaseIds.length,
      },
    },
    timestamp: Date.now(),
  });

  if ((window as any).parentChannel) {
    (window as any).parentChannel.postMessage(message);
  }

  document.dispatchEvent(
    new CustomEvent("usecaseselected", {
      detail: { useCaseIds },
      bubbles: true,
    }),
  );
};

const onMouseOver = (event: MouseEvent) => {
  const targetEl = event.target as HTMLElement;

  if (overlay && overlay.contains(targetEl)) {
    cancelHide();
    return;
  }

  const target = targetEl.closest("[data-usecases]") as HTMLElement | null;

  if (!target) {
    if (currentTarget) scheduleHide();
    return;
  }

  cancelHide();

  if (target === currentTarget) return;

  const raw = target.dataset.usecases ?? "";
  const useCaseIds = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!useCaseIds.length) {
    scheduleHide();
    return;
  }

  currentTarget = target;
  showOverlay(target, useCaseIds);
};

const onMouseOut = (event: MouseEvent) => {
  const related = event.relatedTarget as Node | null;
  if (related && overlay && overlay.contains(related)) return;
  if (related && currentTarget && currentTarget.contains(related)) return;
  if (currentTarget) scheduleHide();
};

let requirementsModeActive = false;

const enableRequirementsMode = () => {
  if (requirementsModeActive) return;
  requirementsModeActive = true;
  document.addEventListener("mouseover", onMouseOver);
  document.addEventListener("mouseout", onMouseOut);
};

const disableRequirementsMode = () => {
  if (!requirementsModeActive) return;
  requirementsModeActive = false;
  document.removeEventListener("mouseover", onMouseOver);
  document.removeEventListener("mouseout", onMouseOut);
  hideOverlay();
};

const navigateToPath = (path: string) => {
  const current =
    window.location.pathname + window.location.search + window.location.hash;
  if (current === path) return;
  history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

(window as any).enableRequirementsMode = enableRequirementsMode;
(window as any).disableRequirementsMode = disableRequirementsMode;
(window as any).navigateToPath = navigateToPath;

// route change emitter
const emitRouteChange = (path: string) => {
  const message = JSON.stringify({
    source: "PREVIEW_FRAME",
    type: "CODE_PREVIEW:ROUTE_CHANGED",
    payload: { path },
    timestamp: Date.now(),
  });

  if ((window as any).parentChannel) {
    (window as any).parentChannel.postMessage(message);
  }

  document.dispatchEvent(
    new CustomEvent("routechanged", {
      detail: { path },
      bubbles: true,
    }),
  );
};

const observeRouteChanges = () => {
  let isPushStateNavigation = false;

  const originalPushState = history.pushState.bind(history);
  history.pushState = (...args) => {
    isPushStateNavigation = true;
    originalPushState(...args);
    emitRouteChange(window.location.pathname);
    isPushStateNavigation = false;
  };

  const originalReplaceState = history.replaceState.bind(history);
  history.replaceState = (...args) => {
    isPushStateNavigation = true;
    originalReplaceState(...args);
    emitRouteChange(window.location.pathname);
    isPushStateNavigation = false;
  };

  window.addEventListener("popstate", () => {
    if (!isPushStateNavigation) {
      emitRouteChange(window.location.pathname);
    }
  });

  emitRouteChange(window.location.pathname);
};

const emitRoutesExtracted = () => {
  const message = JSON.stringify({
    source: "PREVIEW_FRAME",
    type: "CODE_PREVIEW:ROUTES_EXTRACTED",
    payload: { routes: appRoutes },
    timestamp: Date.now(),
  });

  if ((window as any).parentChannel) {
    (window as any).parentChannel.postMessage(message);
  }

  document.dispatchEvent(
    new CustomEvent("routesextracted", {
      detail: { routes: appRoutes },
      bubbles: true,
    }),
  );
};

const emitBridgeReady = () => {
  const message = JSON.stringify({
    source: "PREVIEW_FRAME",
    type: "CODE_PREVIEW:BRIDGE_READY",
    payload: {},
    timestamp: Date.now(),
  });

  if ((window as any).parentChannel) {
    (window as any).parentChannel.postMessage(message);
  }

  document.dispatchEvent(
    new CustomEvent("bridgeready", {
      detail: {},
      bubbles: true,
    }),
  );
};

emitRoutesExtracted();

observeRouteChanges();

(window as any).isPreviewBridgeReady = true;
emitBridgeReady();
