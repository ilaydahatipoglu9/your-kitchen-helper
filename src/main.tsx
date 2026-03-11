import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.DEV) {
    import("./devtools/useCaseInspector");
}
createRoot(document.getElementById("root")!).render(<App />);
