// JUST TO TELL YOU THE MEANING OF WHAT BACKGROUND.JS DO 

let color = 'red';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
});
// IF WE WANT TO PASS SOME DATA THROUGH THIS WE USE STORAGE API'S OF THE BROWSER LIKE WE DID IN THIS FUNCTION
// ALSO WANT TO GIVE THE PERMISSION STORAGE TO USE STORAGE API'S

// we just added the event listener after extension is installed and we can do various things now , we can get this
// variable in our popup.js file 

