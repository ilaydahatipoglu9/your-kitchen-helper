let overlay: HTMLDivElement | null = null;
let currentTarget: HTMLElement | null = null;
let isOverTooltip = false;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const HIDE_DELAY = 400;

const buildTooltipLink = (useCaseIds: string[]): string => {
    const count = useCaseIds.length;
    return count === 1
        ? "View use case and requirement for this element"
        : `View ${count} use cases and requirements for this element`;
};

const scheduleHide = () => {
    hideTimer = setTimeout(() => {
        if (!isOverTooltip) hideOverlay();
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
    overlay.style.whiteSpace = "nowrap";
    overlay.style.width = "auto";
    overlay.style.height = "auto"
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.padding = "8px 12px";
    overlay.style.boxSizing = "border-box";
    overlay.style.borderRadius = "12px";
    overlay.style.background = "rgba(254, 254, 254, 1)";
    overlay.style.color = "rgba(65, 73, 75, 1)";
    overlay.style.border = "1.5px solid rgba(65, 73, 75, 1)";
    overlay.style.boxShadow = "0 13px 27px -5px rgba(18, 27, 30, 0.2)";

    overlay.addEventListener("mouseenter", () => {
        isOverTooltip = true;
        cancelHide();
    });
    overlay.addEventListener("mouseleave", () => {
        isOverTooltip = false;
        scheduleHide();
    });

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
    link.style.whiteSpace = "nowrap";
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
        source: 'PREVIEW_FRAME',
        type: 'CODE_PREVIEW:USECASES_SELECTED',
        payload: {
            selectedIds: useCaseIds,
            metadata: {
                totalSelected: useCaseIds.length
            }
        },
        timestamp: Date.now()
    });

    if ((window as any).flutterChannel) {
        (window as any).flutterChannel.postMessage(message);
    }

    document.dispatchEvent(
        new CustomEvent("usecaseselected", {
            detail: { useCaseIds },
            bubbles: true,
        })
    );
};

const onMouseOver = (event: MouseEvent) => {
    const targetEl = event.target as HTMLElement;

    // If interacting with tooltip, ignore everything
    if (isOverTooltip) return;

    // If tooltip is active, do not switch targets
    if (currentTarget) return;

    if (overlay && overlay.contains(targetEl)) return;

    const target = targetEl.closest("[data-usecases]") as HTMLElement | null;

    if (!target) {
        if (!isOverTooltip) scheduleHide();
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

const onMouseOut = () => {
    if (!isOverTooltip) scheduleHide();
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

(window as any).enableRequirementsMode = enableRequirementsMode;
(window as any).disableRequirementsMode = disableRequirementsMode;