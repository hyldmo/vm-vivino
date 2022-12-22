import type { Vintage, VivinoWine } from './VivinoWine'

export type Product = {
	id: number
	datotid: string
	varenummer: number
	varenavn: string
	volum: number
	pris: number
	literpris: number
	varetype: string
	produktutvalg: string
	butikkategori: number
	fylde: number
	friskhet: number
	garvestoffer: number
	bitterhet: number
	sodme: number
	farge: string
	lukt: string
	smak: string
	passertil01: string
	passertil02: string
	passertil03: string
	land: string
	distrikt: string
	underdistrikt: string
	argang: number | null
	rastoff: string
	metode: string
	alkohol: number
	sukker: number | string | null
	syre: number | null
	lagringsgrad: string
	produsent: string
	grossist: string
	distributor: string
	emballasjetype: string
	korktype: string
	vareurl: string
	okologisk: boolean
	biodynamisk: boolean
	fairtrade: boolean
	// eslint-disable-next-line camelcase
	miljosmart_emballasje: boolean
	// eslint-disable-next-line camelcase
	gluten_lav_pa: boolean
	kosher: boolean
	hovedgtin: number
	andregtins: string
	score: number | null
	ratings: number
}

export type Score = { score: number | null; ratingsCount: number }

export type VivinoResult = { hits: VivinoWine[] }

export type WineMeta = Omit<VivinoWine, 'vintages' | '_highlightResult' | 'statistics'> &
	Score & {
		fresh?: boolean // Indicated whether data is live or from cache
		vintage: Vintage
	}
export type Wine = Product & { meta?: WineMeta | null }
