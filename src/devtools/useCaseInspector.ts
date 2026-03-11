const params = new URLSearchParams(window.location.search);
const ENABLE_INSPECTOR = import.meta.env.DEV || params.has("inspect");

if (ENABLE_INSPECTOR) {
    let overlay: HTMLDivElement | null = null;

    const showOverlay = (target: HTMLElement, useCases: string) => {
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.zIndex = "9999";
            overlay.style.pointerEvents = "none";
            overlay.style.background = "rgba(0, 0, 0, 0.75)";
            overlay.style.color = "white";
            overlay.style.padding = "6px 10px";
            overlay.style.borderRadius = "6px";
            overlay.style.fontSize = "12px";
            document.body.appendChild(overlay);
        }

        const rect = target.getBoundingClientRect();
        overlay.textContent = `Use case(s): ${useCases}`;
        overlay.style.top = `${rect.top - 8}px`;
        overlay.style.left = `${rect.left}px`;
        overlay.style.display = "block";
    };

    const hideOverlay = () => {
        if (overlay) overlay.style.display = "none";
    };

    document.addEventListener("mouseover", (event) => {
        const target = (event.target as HTMLElement)
            ?.closest("[data-usecases]") as HTMLElement | null;

        if (!target) {
            hideOverlay();
            return;
        }

        const useCases = target.dataset.usecases;
        if (!useCases) {
            hideOverlay();
            return;
        }

        showOverlay(target, useCases);
    });
}