chrome.action.onClicked.addListener(tab => {
	if (tab.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['sort.js']
		})
	} else {
		console.error(`No tab id for tab window ${tab.windowId}`, tab)
	}
})
