import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
		plugins: [react()],
		resolve: {
			alias: [
				{ find: '~', replacement: '/src' }
			]
		},
		server: {
			port: process.env.VITE_PORT || 3000
		}
	})
}
