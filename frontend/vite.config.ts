import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/around/',
	plugins: [react()],
	server: {
		host: '127.0.0.1',
		https: {
			key: fs.readFileSync('./certs/private.key.pem', 'utf8'),
			cert: fs.readFileSync('./certs/domain.cert.pem', 'utf8'),
		},
	},
});
