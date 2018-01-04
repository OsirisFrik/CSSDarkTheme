chrome.tabs.onUpdated.addListener((id, s, tab) => {
  if (s.status === 'complete') {
    if (tab.url.indexOf('facebook') > -1 && localStorage.getItem('fbDark') !== null && typeof localStorage.getItem('fbDark') !== 'undefined' && JSON.parse(localStorage.getItem('fbDark'))) {
      chrome.tabs.insertCSS(id, {file: './assets/styles/facebook.css'});
    }
    if (tab.url.indexOf('myshopify') > -1 && localStorage.getItem('mShDark') !== null && typeof localStorage.getItem('mShDark') !== 'undefined' && JSON.parse(localStorage.getItem('mShDark'))) {
      chrome.tabs.insertCSS(id, {file: './assets/styles/myshopify.css'});
    }
  }
});
