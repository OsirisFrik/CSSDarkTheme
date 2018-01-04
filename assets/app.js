'use strict'

var switchs = {
  fb: {
    id: 'fb-switch',
    storage: 'fbDark',
    status: localStorage.getItem('fbDark'),
    switch: null,
    event: function () {
      var status = switchs.fb.switch.checked;
      localStorage.setItem('fbDark', status)
      getPages().then(tabs => {
        var tab = tabResults(tabs, 'fb');
        if (status) {
          chrome.tabs.insertCSS(tab.id, {file: './assets/styles/facebook.css'});
        } else {
          chrome.tabs.reload(tab.id);
        }

        window.close();
      });
    }
  },
  mSh: {
    id: 'mSh-switch',
    storage: 'mShDark',
    status: localStorage.getItem('mShDark'),
    switch: null,
    event: function () {
      var status = switchs.mSh.switch.checked;
      localStorage.setItem('mShDark', status)
      getPages().then(tabs => {
        var tab = tabResults(tabs, 'mSh');
        if (status) {
          chrome.tabs.insertCSS(tab.id, {file: './assets/styles/myShopify.css'});
        } else {
          chrome.tabs.reload(tab.id);
        }

        window.close();
      });
    }
  }
};

function getPages(callback) {
  var query = {
    url: ['*://*.facebook.com/*', '*://*.myshopify.com/*']
  };

  if (typeof callback === 'function') {
    chrome.tabs.query(query, callback);
  } else {
    return new Promise(function(resolve, reject) {
      chrome.tabs.query(query, tabs => {
        resolve(tabs);
      });
    });
  }
}

function tabResults(tabs, page) {
  console.log(tabs);
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].url.indexOf('facebook') > -1) {
      if (switchs.fb.status !== null && typeof switchs.fb.status !== 'undefined' && JSON.parse(switchs.fb.status) && page !== 'fb') {
        chrome.tabs.insertCSS(tabs[i].id, {file: './assets/styles/facebook.css'});
      }
      if (page === 'fb') {
        return tabs[i];
      }
    }

    if (tabs[i].url.indexOf('myshopify') > -1) {
      if (switchs.mSh.status !== null && typeof switchs.mSh.status !== 'undefined' && JSON.parse(switchs.mSh.status) && page !== 'mSh') {
        chrome.tabs.insertCSS(tabs[i].id, {file: './assets/styles/myshopify.css'});
      }
      if (page === 'mSh') {
        return tabs[i];
      }
    }
  }
}

function loadSwitchs() {
  for (var sw in switchs) {
    switchs[sw].switch = document.getElementById(switchs[sw].id);
    setValues(switchs[sw]);
    addEvents(switchs[sw]);
  }
}

function setValues(sw) {
  sw.switch.checked = JSON.parse(sw.status);
  // switchs.fb.switch.checked = JSON.parse(switchs.fb.status);
}

function addEvents(sw) {
  sw.switch.addEventListener('change', sw.event);
  // facebookSwitch.addEventListener('change', () => {
  //   var status = facebookSwitch.checked;
  //
  //   localStorage.setItem('fbDark', status);
  // });
}

window.onload = function() {
  loadSwitchs();
  getPages(tabResults);
}
