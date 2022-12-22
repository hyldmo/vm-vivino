export interface VivinoWine {
	id: number
	name: string
	seo_name: string
	type_id: number
	vintage_type: number
	is_natural: boolean
	region: Region | null
	review_status: number
	image: VivinoWineImage
	rank: null
	hidden: boolean
	vintages: Vintage[]
	description: string
	style_id: number | null
	grapes: number[] | null
	foods?: number[]
	non_vintage: boolean
	alcohol: number
	sweetness_id: number | null
	vintage_mask_raw: string | null
	created_at: string
	is_first_wine: boolean
	winery?: Winery | null
	statistics: VivinoWineStatistics
	objectID: string

	_highlightResult: any
}

export interface VivinoWineImage {
	location: string
	variations: Partial<PurpleVariations>
}

export interface PurpleVariations {
	bottle_large: string
	bottle_medium: string
	bottle_medium_square: string
	bottle_small: string
	bottle_small_square: string
	label: string
	label_large: string
	label_medium: string
	label_medium_square: string
	label_small_square: string
	large: string
	medium: string
	medium_square: string
	small_square: string
}

export interface Region {
	id: number
	name: string
	name_en: string
	seo_name: string
	country: string
	background_image: RegionBackgroundImage | null
	class?: Class
}

export interface RegionBackgroundImage {
	location: string
	variations: FluffyVariations
}

export interface FluffyVariations {
	large: string
	medium: string
}

export interface Class {
	id: number
	country_code: string
	abbreviation: string
	description: string | null
}

export interface VivinoWineStatistics {
	status: 'BelowThreshold' | 'Normal'
	ratings_count: number
	labels_count: number
	unified_average_ratings?: number
	ratings_average: number
	reviews_count?: number
}

export interface Vintage {
	id: number
	seo_name: string
	year: string
	name: string
	statistics?: VivinoWineStatistics
}

export interface Winery {
	id: number
	name: string
	seo_name: string
	status: number
	review_status: string
	statistics: WineryStatistics
	region: Region | null
	business_name: string
	description: string
	phone: string
	email: string
	facebook: string | null
	instagram: string | null
	is_claimed: boolean
	twitter: string | null
	website: string | null
	winemaker: string | null
	wine_maker: { name: string; id: number } | null
	address: Address | null
	image: WineryImage | null
	background_image: WineryBackgroundImage | null
	background_video?: string
	location: Location | null
	winery_group: WineryGroup | null
}

export interface Address {
	title: string | null
	name: string | null
	street: string | null
	street2: string | null
	neighborhood: string | null
	city: string | null
	zip: string | null
	state: string | null
	country: string | null
	company: string | null
	phone: string | null
	external_id: string | null
	residential: string | null
	vat_number: string | null
	vat_code: string | null
}

export interface WineryBackgroundImage {
	location: string
	variations: TentacledVariations
}

export interface TentacledVariations {
	large: string
	medium: string
	small: string
}

export interface WineryImage {
	location: string
	variations: StickyVariations
}

export interface StickyVariations {
	large: string
	medium: string
	small_square: string
}

export interface Location {
	latitude: number
	longitude: number
}

export interface WineryStatistics {
	ratings_count: number
	ratings_average: number
	labels_count: number
	wines_count: number
}

export interface WineryGroup {
	id: number
	name: string
	website: string
}
