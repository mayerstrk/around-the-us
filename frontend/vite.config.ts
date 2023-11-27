import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "127.0.0.1",
		https: {
			key: fs.readFileSync("./certs/127.0.0.1-key.pem", "utf8"),
			cert: fs.readFileSync("./certs/127.0.0.1.pem", "utf8"),
		},
	},
});
