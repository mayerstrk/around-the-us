import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: {
			key: fs.readFileSync('./certs/privatekey.pem'),
			cert: fs.readFileSync('./certs/cert.pem'),
			passphrase: 'admin',
		},
	},
});
