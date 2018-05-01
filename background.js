// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
/*
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'twitter.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Motalka");
    if (request.message === "listeners"){
      console.log("Lalka!");
      //add event handler for button click
      chrome.tabs.executeScript(null, {file: "injected_script.js"});

      //Google analytics
      //var _gaq = _gaq || [];
      //_gaq.push(['_setAccount', 'UA-107206749-1']);
      //_gaq.push(['_trackEvent', 'squishing tweet', 'squished']);

      //(function() {
      //  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      //  ga.src = 'https://ssl.google-analytics.com/ga.js';
      //  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      //})();
      // end google analytics

      sendResponse({message: "OK"});
    }
  }
);
