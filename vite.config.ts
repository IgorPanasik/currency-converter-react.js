import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/currency-converter-react.js',
	plugins: [react(), tailwindcss()],
});
