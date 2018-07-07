// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var playFooterHtml = "<span class='TweetBoxExtras-item'> <div class='play-div'> <span  class='glyphicon glyphicon-play' aria-hidden='true'></span> <button class='nightPlay nightPlayAll' \
class='btn icon-btn js-tooltip' type='button'> All </button> <button class='nightPlay nightPlayPart' class='btn icon-btn \
js-tooltip' type='button'> Part </button> <button class='nightPlay nightPlaySelf' class='btn icon-btn js-tooltip' type='button'> \
Self </button> </div>";

var stopFooterHtml = "<div class='stop-div' hidden> <button class='nightStop' \
class='btn icon-btn js-tooltip' type='button'> Stop </button> </div> </span>";

var inputBoxes = $('.TweetstormDialog-tweet-box');
for (var i=0; i<inputBoxes.length; ++i) {
  var input = inputBoxes[i];
  var inputFooters = $(input).find(".tweet-box-extras");

  if (inputFooters.length == 1) {
    var inputFooter = inputFooters[0];
    if (!$(inputFooter).hasClass("nightingaled")) {
      $(inputFooter).addClass("nightingaled");
      $(inputFooter).append(playFooterHtml + stopFooterHtml);
    }
  }
}

function ReplyModifier() {
  let inlineInputBoxes = $('.inline-reply-tweetbox-container');
  let modifiedReply = false;
  // console.log("in per b content = ", inlineInputBoxes.length);
  for (let i=0; i<inlineInputBoxes.length; ++i) {
    var input = inlineInputBoxes[i];
    var inputFooters = $(input).find(".tweet-box-extras");

    if (inputFooters.length == 1) {
      var inputFooter = inputFooters[0];
      if (!$(inputFooter).hasClass("nightingaled")) {
        console.log("modify reply");
        modifiedReply = true;
        $(inputFooter).addClass("nightingaled");
        $(inputFooter).append(playFooterHtml + stopFooterHtml);
      } else {
        let buttons = $(inputFooter).find(".nightPlay");
        for (let j=0; j<buttons.length; ++j) {
          if (!$(buttons[j]).hasClass("listening")) {
            modifiedReply = true;
          }
        }
      }
    }
  }

  if (modifiedReply) {
    console.log("modifiedReply res = ", modifiedReply);
    chrome.runtime.sendMessage({message: {code: "listeners"}, function (response) {
      console.log("res = ", response);
      }
    });
  }
}

ReplyModifier();

chrome.runtime.sendMessage({message: {code: "listeners"}, function (response) {
  console.log("res = ", response)
  }
});

function DOMModificationHandler() {
  setTimeout(function() {
    modify();
    $('#timeline').one('DOMSubtreeModified.event1', DOMModificationHandler);
  }, 10);
}

function permalinkWatcher(){
  console.log("MODIFIED 1");
  // $('#permalink-overlay').('dblclick', permalinkWatcher);
  setTimeout(function() {
    modify();
    ReplyModifier();
    $('#permalink-overlay').one('DOMSubtreeModified.event1', permalinkWatcher);
  }, 10);
}

function timelineWatcher() {
  setTimeout(function () {
    var newTl = document.getElementById("timeline");
    if (newTl) {
      $('#timeline').one('DOMSubtreeModified.event1', DOMModificationHandler);
    } else {
      $(this).one('DOMSubtreeModified.event1', timelineWatcher);
    }
  }, 10);
}

let tl = document.getElementById("timeline");
if (!tl) {
  $('#page-container').one('DOMSubtreeModified.event1', timelineWatcher);
} else {
  $('#timeline').one('DOMSubtreeModified.event1', DOMModificationHandler);
}

$('#permalink-overlay').one('DOMSubtreeModified.event1', permalinkWatcher);

function replyWatcher(){
  // console.log("MODIFIED 1");
  // $('#permalink-overlay').('dblclick', permalinkWatcher);
  setTimeout(function() {
    let replyContext = $('.TweetstormDialog-reply-context');
    if (replyContext.length === 1) {
      $(replyContext[0]).one('DOMSubtreeModified.event1', replyWatcher);
      chrome.runtime.sendMessage({message: {code: "listeners"}, function (response) {
        console.log("res = ", response);
        }
      });
    }
  }, 10);
}

let replyContext = $('.TweetstormDialog-reply-context');
if (replyContext.length === 1) {
  $(replyContext[0]).one('DOMSubtreeModified.event1', replyWatcher);
}



function modify() {
  // console.log("mod");
  let modified = false;
  $('.tweet').each(function(index){
    let id = $(this).attr("data-tweet-id");
    var t = $(this).find(".tweet-text");
    if (!t.length) return;
    // console.log("test1");
    var footerArray = $(this).find(".js-actions");
    if (!footerArray.length) return;
    // console.log("test2");
    var footer = footerArray[0];
    if (!$(footer).hasClass("nightingaled")) {
      // console.log("test3");
      $(this).addClass("nightingaledTweet");
      modified = true;
      $(footer).addClass("nightingaled");
      $(footer).append("<div style='position:absolute; padding-top: 2px;' class='ProfileTweet-action ProfileTweet-action--analytics nightFooterDiv'> <div> <button  class='ProfileTweet-actionButton nightPlay u-textUserColorHover js-actionButton'> <span  class='glyphicon glyphicon-play' aria-hidden='true'></span> </button> </div> <div hidden> <button class='ProfileTweet-actionButton nightStop u-textUserColorHover js-actionButton '>  <span class='glyphicon glyphicon-stop' aria-hidden='true'></span> </button> </div> </div>");
    }
  });
  if (modified) {
    // console.log("modified");

    chrome.runtime.sendMessage({message: {code: "listeners"}, function (response) {
      console.log("res = ", response);
      }
    });
  }
}

// modify();
