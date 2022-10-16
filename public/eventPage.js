chrome.runtime.onInstalled.addListener(() => {
     
     let addToCalenderItem = {
          "id": 'addtocalender',
          "title": 'Add to Calender',
          'contexts': ['selection']     
     }
     chrome.contextMenus.create(addToCalenderItem);

     let sendSelfItem = {
          "id": 'sendself',
          "title": 'Send to Self',
          'contexts': ['selection']
     }
     chrome.contextMenus.create(sendSelfItem);
})

// maintain a list to reminder with the time and the text
let reminderList = [];

chrome.contextMenus.onClicked.addListener((clickData) => {
     // send the message to the content script
     if (clickData.menuItemId === 'addtocalender' && clickData.selectionText) {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
               chrome.tabs.sendMessage(tabs[0].id, { text: clickData.selectionText, id: 'addtocalender' }, function (response) {
                    console.log(response);
               });
          });
     }

     if (clickData.menuItemId === 'sendself' && clickData.selectionText) {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
               chrome.tabs.sendMessage(tabs[0].id, { text: clickData.selectionText, id: 'sendself' }, function (response) {
                    console.log(response);
               });
          });
     }
});