import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

const config: RollupOptions = {
	input: 'src/index.ts',
	output: {
		sourcemap: true,
		dir: 'dist',
		format: 'commonjs'
	},
	plugins: [typescript({ sourceMap: true })]
}

export default config
