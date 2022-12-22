import type { Vintage, VivinoWine } from './VivinoWine'

export interface Product {
	index: number
	element: HTMLElement
	title: string | null | undefined
	stats?: Score & {
		link: string
		year: number | null
	}
}

export type Score = { score: number | null; ratingsCount: number }

export type VivinoResult = { hits: VivinoWine[] }

export type WineMeta = Omit<VivinoWine, 'vintages' | '_highlightResult' | 'statistics'> &
	Score & {
		fresh?: boolean // Indicated whether data is live or from cache
		vintage: Vintage
	}
export type Wine = Product & { meta?: WineMeta | null }
