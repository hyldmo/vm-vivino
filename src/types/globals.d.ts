import type { Product } from './products'

declare global {
	const wines: Map<string, Product> | undefined
	export interface Window {
		wines?: Map<string, Product> | undefined
	}
}
