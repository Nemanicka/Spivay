var instruments = {
  piano  : 1,
  strings: 1,
  drums  : 1
};


console.log("Injected 3");

var backToPlay = null;

var inputReplyBoxes = document.getElementsByClassName('inline-reply-tweetbox-container');
console.log("input reply boxes = ", inputReplyBoxes.length);
for (let i=0; i<inputReplyBoxes.length; ++i) {
  // let id = inputBoxes[i].getAttribute("id");
  let btns = inputReplyBoxes[i].getElementsByClassName("nightPlay");
  console.log("replies = ", btns.length);
  if (btns.length != 1 || (btns[0].className.indexOf("listening") != -1)) {
    continue;
  }

  console.log( "reply", btns[0].className);

  btns[0].classList.add("listening");

  btns[0].addEventListener('click', function() {
    let texts = [];
    let newTweets = document.getElementsByClassName('TweetstormDialog-tweet-box');
    for (let j=0; j<newTweets.length; ++j) {
      let textareas = newTweets[j].getElementsByClassName("tweet-box");

      if (textareas.length != 1) continue;

      if (!textareas[0] ||
          !textareas[0].children ||
          !textareas[0].children[0])
          continue;

      let text = textareas[0].children[0].innerText;
      texts.push(text);
    }

    parseTexts(texts);
  });
}

console.log("Injected 1");

var parseTexts = function (params, btnsDiv) {
  if (!params) {
    return;
  }

  let texts = params.texts;
  console.log(params);
  melodies = {
    '0': []
  };

  if (params.mode === 3) {
    texts = [params.self];
  }

  let playPart = -1;
  if (params.mode === 2 && params.self) {
    let n = params.self.search(/#spivay/i);
    if (n !== -1) {
      let melody = params.self.substr(n);
      let tokens = melody.split(' ');
      if (tokens.length >= 3) {
        let meta = tokens[1].split('_');
        if (instruments[meta[0]] === 1) {
          if (meta.length !== 1) {
            playPart = parseInt(meta[1]);
          } else {
            playPart = 0;
          }
          console.log("part = ", playPart);
        }
      }
    }
  }

  for (let i=0; i<texts.length; ++i) {
    if (!texts[i]) continue;

    let n = texts[i].search(/#spivay/i);
    if (n === -1) {
      continue;
    }

    let melody = texts[i].substr(n);
    let tokens = melody.split(' ');
    if (tokens.length < 3) {
      continue;
    }

    let meta = tokens[1].split('_');

    if (instruments[meta[0]] !== 1) {
      continue;
    }

    if (meta.length === 1) {
      if (params.mode !== 2 || playPart === 0) {
        melodies['0'].push(tokens);
      }
    } else {
      let accomp = parseInt(meta[1]);
      if (!accomp) {
        continue;
      }

      if (params.mode !== 2) {
        if (!melodies[meta[1]]) {
          melodies[meta[1]] = [];
        }
        melodies[meta[1]].push(tokens);
      } else {
        if (accomp === playPart) {
          melodies['0'].push(tokens);
        }
      }
    }
  }

  console.log("trying to play...", melodies);
  chrome.runtime.sendMessage({message: {code: "play", melodies: melodies}}, function (response) {
    btnsDiv.children[0].hidden = true;
    btnsDiv.children[1].hidden = false;

    backToPlay = setTimeout(function () {
      btnsDiv.children[1].hidden = true;
      btnsDiv.children[0].hidden = false;
    }, response.duration);
    console.log(response.duration);
  });
}

console.log("Injected 2");

var inputBoxes = document.getElementsByClassName('TweetstormDialog-tweet-box');
console.log("regular box size = ", inputBoxes.length);
for (let i=0; i<inputBoxes.length; ++i) {
  let id = inputBoxes[i].getAttribute("id");
  let btns = inputBoxes[i].getElementsByClassName("nightPlay");

  if (btns.length != 3) {
    continue;
  }

  let stopBtns = btns[0].parentElement.parentElement.children[1].children;
  console.log("stop = ", btns[0].parentElement.parentElement.children[1].children);
  if (stopBtns.length != 1 || (stopBtns[0].className.indexOf("nightListening") != -1)) {
    console.log("continue");
    continue;
  }

  stopBtns[0].classList.add("nightListening");

  stopBtns[0].addEventListener('click', function() {
    chrome.runtime.sendMessage({message: {code: "stop"}}, function (response) {
      console.log("sent stop code");
      stopBtns[0].parentElement.parentElement.children[0].hidden = false;
      stopBtns[0].parentElement.parentElement.children[1].hidden = true;
      if (backToPlay) {
        clearTimeout(backToPlay);
      }
    });
  });

  for (let k=0; k<btns.length; ++k) {
    if (btns[k].className.indexOf("listening") != -1) {
      continue;
    }
    console.log(btns[k].className);

    btns[k].classList.add("listening");

    btns[k].addEventListener('click', function() {
      let texts = [];
      let newTweets = document.getElementsByClassName('TweetstormDialog-tweet-box');
      let params = {
        texts: [],
        self: null,
        mode: 0
      };

      if (btns[k].className.indexOf("nightPlayAll") != -1) {
        params.mode = 1;
      }

      if (btns[k].className.indexOf("nightPlayPart") != -1) {
        params.mode = 2;
      }

      if (btns[k].className.indexOf("nightPlaySelf") != -1) {
        params.mode = 3;
      }

      for (let j=0; j<newTweets.length; ++j) {
        let textareas = newTweets[j].getElementsByClassName("tweet-box");
        let tweetId = newTweets[j].getAttribute("id");

        if (textareas.length != 1) continue;

        if (!textareas[0] ||
            !textareas[0].children ||
            !textareas[0].children[0])
            continue;

        let text = textareas[0].children[0].innerText;

        if (tweetId === id) {
          console.log("ID = ", id, tweetId, text);
          params.self = text;
        }

        texts.push(text);
      }

      params.texts = texts;
      parseTexts(params, btns[0].parentElement.parentElement);
    });
  }
}


var inputTweetBoxes = document.getElementsByClassName('tweet');
for (let i=0; i<inputTweetBoxes.length; ++i) {
  inputTweetBoxes[i].classList.add("nightingaledListening");
  inputTweetBoxes[i].classList.remove("nightingaledTweet");
  let id =   inputTweetBoxes[i].getAttribute("data-tweet-id");
  let link = inputTweetBoxes[i].getAttribute("data-permalink-path");
  console.log(link);
  let divs = inputTweetBoxes[i].getElementsByClassName("nightFooterDiv");
  let btns = inputTweetBoxes[i].getElementsByClassName("nightPlay");
  // if (!playDiv || !playDiv.children || playDiv.children.length != 2 ) {
  //   console.log(playDiv );
  //   continue;
  // }

  // let btns = playDiv.children[0].children;
  // console.log("btns.length", btns.length);

  if (btns.length != 1 || (btns[0].className.indexOf("nightListening") != -1)) {
    continue;
  }

  console.log("got a button, parent = ", btns[0].parentElement.parentElement.children[1].children[0]);

  btns[0].classList.add("nightListening");
  btns[0].addEventListener('click', function() {
    let url = "https://twitter.com" + link;
    console.log(url);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );

    let parser = new DOMParser();
    let response = parser.parseFromString(xmlHttp.responseText, "text/html");
    // let response = document.implementation.createDocument(xmlHttp.responseText, xmlHttp.responseText, null);
    let current     = response.getElementsByClassName("permalink-tweet-container");
    let currentBox  = current[0].getElementsByClassName("tweet-text");
    let inReplyTo   = response.getElementsByClassName("permalink-in-reply-tos");
    let replyBoxes  = [];
    if (inReplyTo.length) {
      replyBoxes = inReplyTo[0].getElementsByClassName("tweet-text");
    }

    let texts = [];
    for (let i=0; i<currentBox.length; ++i) {
      let text = currentBox[i].innerText;
      texts.push(text);
    }

    for (let i=0; i<replyBoxes.length; ++i) {
      let text = replyBoxes[i].innerText;
      texts.push(text);
    }

    parseTexts(texts, btns[0].parentElement.parentElement);
  });



  let stopBtns = btns[0].parentElement.parentElement.children[1].children;
  console.log("stop = ", btns[0].parentElement.parentElement.children[1].children);
  if (stopBtns.length != 1 || (stopBtns[0].className.indexOf("nightListening") != -1)) {
    console.log("continue");
    continue;
  }

  stopBtns[0].classList.add("nightListening");

  stopBtns[0].addEventListener('click', function() {
    chrome.runtime.sendMessage({message: {code: "stop"}}, function (response) {
      stopBtns[0].parentElement.parentElement.children[0].hidden = false;
      stopBtns[0].parentElement.parentElement.children[1].hidden = true;
      if (backToPlay) {
        clearTimeout(backToPlay);
      }
    });
  });
}
