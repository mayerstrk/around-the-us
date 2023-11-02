import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: {
			key: fs.readFileSync('./certs/localhost-key.pem', 'utf8'),
			cert: fs.readFileSync('./certs/localhost.pem', 'utf8'),
			passphrase: 'admin',
		},
	},
});
