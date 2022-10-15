var contextMenuItem = {
     "id": 'addtoquemas',
     "title": 'Add to Que Mas',
     'contexts': ['selection']
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(() => {

})