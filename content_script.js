// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var inputBoxes = $('.TweetstormDialog-tweet-box');
for (var i=0; i<inputBoxes.length; ++i) {
  var input = inputBoxes[i];
  var inputFooters = $(input).find(".tweet-box-extras");

  if (inputFooters.length == 1) {
    var inputFooter = inputFooters[0];
    if (!$(inputFooter).hasClass("nightingaled")) {
      $(inputFooter).addClass("nightingaled");
      $(inputFooter).append("<span class='TweetBoxExtras-item'> <div> <button class='nightPlay' class='btn icon-btn js-tooltip' type='button'> Play </button> </div> </span>");
    }
  }
}

chrome.runtime.sendMessage({message: {code: "listeners"}, function (response) {
  console.log("res = ", response)
  }
});

function DOMModificationHandler(){
  $(this).unbind('DOMSubtreeModified.event1');
  setTimeout(function(){
    modify();
    $('#timeline').bind('DOMSubtreeModified.event1', DOMModificationHandler);
  },10);
}

$('#timeline').bind('DOMSubtreeModified.event1', DOMModificationHandler);

function modify(){
  $('.tweet').each(function(index){
    var t = $(this).find(".tweet-text");
    if (!t.length) return;
    var footerArray = $(this).find(".js-actions");
    if (!footerArray.length) return;
    var footer = footerArray[0];
    if (!$(footer).hasClass("nightingaled")) {
      $(footer).addClass("nightingaled");
      $(footer).append("<div class='ProfileTweet-action ProfileTweet-action--dm'> <button class='ProfileTweet-actionButton u-textUserColorHover js-actionButton '> Play </button> </div>");
    }
  });
}
