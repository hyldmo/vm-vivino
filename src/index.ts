import { search } from './search'

interface Product {
	index: number
	element: HTMLElement
	title: string
	rating?: number
}

const wines = new Map<string, number>()

async function onProductListChange() {
	const items: HTMLElement[] = Array.from(document.querySelectorAll('.product-item'))
	const products: Product[] = items
		.map((item, i) => ({
			index: i,
			element: item,
			title: item.querySelector('.product__name')?.textContent?.trim() as string
		}))
		.filter(product => !!product.title)

	for (const product of products) {
		const wine = await search(product.title)
		if (wine.err) {
			console.log(wine.err)
			continue
		} else {
			console.log(wine.data.hits[0].statistics.ratings_average)
		}
	}
}

const interval = setInterval(waitForProducts, 100)

function waitForProducts() {
	const listElement = document.querySelector('.product-list')
	if (listElement?.querySelector('.product-item')) clearInterval(interval)
	else return
	onProductListChange()
	const observer = new MutationObserver(onProductListChange)
	observer.observe(listElement, { childList: true, subtree: true })
}
