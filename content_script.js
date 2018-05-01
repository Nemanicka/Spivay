// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var input = $('#Tweetstorm-tweet-box-0');
var inputFooters = $(input).find(".tweet-box-extras");

if (inputFooters.length == 1) {
  var inputFooter = inputFooters[0];
  if (!$(inputFooter).hasClass("nightingaled")) {
    $(inputFooter).addClass("nightingaled");
    $(inputFooter).append("<span class='TweetBoxExtras-item'> <div> <button id='nightPlay' class='btn icon-btn js-tooltip' type='button'> Play </button> </div> </span>");
  }
}

chrome.runtime.sendMessage({message: "listeners", function (response) {

  }
}); 


//deal with newly loaded tweets
function DOMModificationHandler(){
  $(this).unbind('DOMSubtreeModified.event1');
  setTimeout(function(){
    modify();
    $('#timeline').bind('DOMSubtreeModified.event1', DOMModificationHandler);
  },10);
}

$('#timeline').bind('DOMSubtreeModified.event1', DOMModificationHandler);

function modify(){
  //find and modify tall tweets
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
 //   console.log("tweet");
 //   var len = t.split(/\r\n|\r|\n/).length;
 // if(!$(this).hasClass("squished") && len > threshold){
 //   $(this).addClass("squished");
 //   $(this).html(`<button class="squish-button EdgeButton EdgeButton--primary" data-original-content="${encodeURI(t)}">Show Long Tweet</button>`);
  //if we add a new button, we have to add listeners again...
    //chrome.runtime.sendMessage({message: "listeners"}, function(response) {
    //});
  });
}
