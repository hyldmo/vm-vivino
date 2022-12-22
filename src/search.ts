import type { Result, VivinoResult } from './types'

const UrlParams = new URLSearchParams({
	'x-algolia-agent': 'Algolia for JavaScript (3.33.0); Browser (lite)',
	'x-algolia-application-id': '9TAKGWJUXL',
	'x-algolia-api-key': '60c11b2f1068885161d95ca068d3a6ae'
})

export type SearchResult = Result<VivinoResult>

export async function search(query: string): Promise<SearchResult> {
	const params = { params: `query=${encodeURIComponent(query)}&hitsPerPage=1` }
	const response = await fetch(`https://9takgwjuxl-dsn.algolia.net/1/indexes/WINES_prod/query?${UrlParams}`, {
		headers: {
			'accept': 'application/json',
			'accept-language': 'en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,da;q=0.6,no;q=0.5',
			'content-type': 'application/json',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'cross-site'
		},
		referrer: 'https://www.vivino.com/',
		referrerPolicy: 'origin-when-cross-origin',
		body: JSON.stringify(params),
		method: 'POST',
		mode: 'cors',
		credentials: 'omit'
	})
	const data = await response.json()
	if (!response.ok) {
		console.warn(data)
		return { err: data, data: null }
	} else {
		return { err: null, data }
	}
}
