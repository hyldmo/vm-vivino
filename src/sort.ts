function sortElements() {
	// wines may already be defined in the global scope / context due how chrome extensions work
	const wineList = Array.from(wines?.values() ?? window.wines?.values() ?? []).sort(
		(a, b) => (b.stats?.score ?? 0) - (a.stats?.score ?? 0)
	)

	const listElement = document.querySelector('.product-list')

	if (listElement) {
		for (const wine of wineList) {
			if (wine.element) {
				listElement.appendChild(wine.element)
			}
		}
	}
}
sortElements()
