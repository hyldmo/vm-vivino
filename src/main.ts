import { search } from './search'
import type { Product } from './types'

const selectors = {
	productList: '.product-list',
	productItem: '.product-item',
	productName: '.product__name',
	productDetails: '.product-details-main',
	productRating: '.product__rating',
	cartItem: '[id^="cartEntryCode"]'
} as const

function updateRatingElement(product: Product) {
	const ratingElement = product.element.querySelector(selectors.productRating)
	if (ratingElement) return ratingElement
	const newElement = document.createElement('div')
	newElement.classList.add('product__rating', 'product-tools')
	// Set padding based on what type of page we're on
	newElement.style.left = document.querySelector(selectors.productList) ? '0.5rem' : '2rem'
	newElement.style.padding = '1rem'
	newElement.style.display = 'inline-block'
	newElement.style.maxWidth = '6em'
	newElement.style.whiteSpace = 'nowrap'

	if (product.stats?.score) {
		const link = document.createElement('a')
		link.href = product.stats?.link
		link.target = '_blank'
		link.innerText = `${product.stats?.score} / 5 ⭐️`
		newElement.appendChild(link)
	} else {
		newElement.innerText = 'Ingen vurdering funnet'
	}

	product.element.appendChild(newElement)
	return newElement
}

const wines = new Map<string, Product>()
window.wines = wines

async function onProductListChange() {
	const items: HTMLElement[] = Array.from(document.querySelectorAll(selectors.productItem))
	const cartItems: HTMLElement[] = Array.from(document.querySelectorAll(selectors.cartItem))
	const products: Product[] = items.length
		? items.map((item, i) => ({
				index: i,
				element: item,
				title: item.querySelector(selectors.productName)?.textContent?.trim()
		  }))
		: cartItems.length
		? cartItems.map((item, i) => ({
				index: i,
				element: item,
				title: item.querySelector('h3')?.textContent?.trim()
		  }))
		: document.querySelector(selectors.productDetails)
		? [
				{
					index: 0,
					element: document.querySelector(selectors.productDetails) as HTMLElement,
					title: document.querySelector(selectors.productName)?.textContent?.trim()
				}
		  ]
		: []

	for (const product of products) {
		if (!product.title) continue
		let wine = wines.get(product.title)
		if (!wine || !wine.stats) {
			const result = await search(product.title)
			if (result.err) {
				console.warn(result.err)
			} else if (result.data.hits.length > 0) {
				const data = result.data.hits[0]
				const lastWord = product.title.split(' ').pop()
				const year = lastWord?.match(/^\d+$/) ? Number.parseInt(lastWord, 10) : null
				const stats: Product['stats'] = {
					score: data.statistics.ratings_average,
					ratingsCount: data.statistics.ratings_count,
					year,
					link: `https://www.vivino.com/${data.seo_name}/w/${data.id}${year ? `?year=${year}` : ''}`
				}
				product.stats = stats
			}
			wine = product
		}
		wine.element = product.element
		wines.set(product.title, wine)
		updateRatingElement(wine)
	}
}

const interval = setInterval(waitForProducts, 100)

function waitForProducts() {
	const listElement = document.querySelector(selectors.productList)
	if (listElement?.querySelector(selectors.productItem)) {
		const observer = new MutationObserver(onProductListChange)
		observer.observe(listElement, { childList: true })
	} else if (document.querySelector(selectors.productDetails)) {
		// Product detail page - no observer needed
	} else if (document.querySelector(selectors.cartItem)) {
		// Cart page - observe parent list for changes
		const cartItem = document.querySelector(selectors.cartItem)
		const cartList = cartItem?.parentElement
		if (cartList) {
			const observer = new MutationObserver(onProductListChange)
			observer.observe(cartList, { childList: true })
		}
	} else return
	clearInterval(interval)
	onProductListChange()
}
