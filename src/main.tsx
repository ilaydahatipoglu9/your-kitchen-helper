import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import("./devtools/previewBridge.ts");

createRoot(document.getElementById("root")!).render(<App />);
