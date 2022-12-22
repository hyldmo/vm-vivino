import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'
import copy from 'rollup-plugin-copy'

const config: RollupOptions = {
	input: 'src/index.ts',
	output: {
		sourcemap: true,
		dir: 'dist',
		format: 'commonjs'
	},
	plugins: [
		typescript({ sourceMap: true }),
		copy({
			targets: [
				{ src: 'manifest.json', dest: 'dist/' },
				{ src: 'images/**/*', dest: 'dist/images/' }
			]
		})
	]
}

export default config
